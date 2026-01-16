import { useState, useEffect, useCallback } from 'react';
import { API_ENDPOINTS } from '@/api/apiRoutes';
import UserForm from '@/components/UserForm/UserForm';
import styles from './UsersPage.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader/Loader';
import { confirmToast } from '@/utils/confirmToast';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadUsers = useCallback(async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(API_ENDPOINTS.USERS.ROOT)
            setUsers(res.data)
        } catch {
            toast.error('Сервер прокидається, зачекайте трохи...')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadUsers()
    }, [loadUsers]);

    const handleSave = () => {
        loadUsers();
        setIsFormOpen(false);
        setEditingUser(null);
    }

    const handleDelete = (id) => {
        confirmToast("Видалити користувача?", async () => {
            const deletePromise = axios.delete(`${API_ENDPOINTS.USERS.ROOT}/${id}`);

            toast.promise(deletePromise, {
                loading: 'Видаляємо...',
                success: () => {
                    loadUsers();
                    return 'Користувача видалено';
                },
                error: 'Помилка видалення',
            });
        });
    };

    return (
        <div className={styles.page}>
            {isLoading ? (
                <div className={styles.initialLoader}>
                    <Loader />
                    <p>З'єднуємося з сервером...</p>
                </div>
            ) : (
                <>
                    <button className={styles.addBtn}
                        onClick={() => {
                            setEditingUser(null);
                            setIsFormOpen(true);
                        }}
                    >
                        + Додати користувача
                    </button>
                    {isFormOpen && (
                        <div className={styles.modalOverlay}>
                            <div
                                className={styles.modalBackdrop}
                                onClick={() => setIsFormOpen(false)}
                            />
                            <div className={styles.modalContent}>
                                <UserForm
                                    userToEdit={editingUser}
                                    onSave={handleSave}
                                    onCancel={() => setIsFormOpen(false)}
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.grid}>
                        {users.map((user) => (
                            <div key={user._id} className={styles.userCard}>
                                <img
                                    className={styles.avatar}
                                    src={(user.image && user.image.trim() !== "")
                                        ? user.image
                                        : 'https://placehold.co/100x100?text=No+Photo'}
                                    alt="avatar"
                                    onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=Error'; }}
                                />

                                <div className={styles.userInfo}>
                                    <h4 className={styles.userName}>
                                        {user.name}
                                    </h4>
                                    <div className={styles.roleBadge}>
                                        <p className={user.role === 'business' ? styles.roleBusiness : styles.roleClient}>
                                            {user.role}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    <button
                                        className={styles.editBtn}
                                        onClick={() => {
                                            setEditingUser(user);
                                            setIsFormOpen(true);
                                        }}
                                    >
                                        ✎
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(user._id)}>🗑</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}