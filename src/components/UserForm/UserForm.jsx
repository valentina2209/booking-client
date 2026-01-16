import { useState, useEffect } from 'react';
import axios from 'axios';
import { uploadImageToCloudinary } from '@/api/uploadService';
import styles from './UserForm.module.css';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';

export default function UserForm({ userToEdit, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'client',
        image: null,
        serviceInfo: ''
    });

    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                name: userToEdit.name || '',
                email: userToEdit.email || '',
                role: userToEdit.role || 'client',
                image: userToEdit.image || '',
                serviceInfo: userToEdit.serviceInfo || ''
            });
        }
    }, [userToEdit]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            if (userToEdit) {
                response = await axios.put(`${import.meta.env.VITE_API_URL}/users/${userToEdit._id}`, formData);
            } else {
                response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, formData);
            }
            toast.success(userToEdit ? "Дані оновлено!" : "Користувача створено!");
            onSave(response.data);
        } catch {
            toast.error("Помилка при збереженні даних:");
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        try {
            setIsUploading(true);
            const imageUrl = await uploadImageToCloudinary(file)
            toast.success("Фото завантажено!");
            if (imageUrl) {
                setFormData(prev => ({ ...prev, image: imageUrl }));
            }

        } catch (error) {
            toast.error("Помилка завантаження фото: " + error.message);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h2 className={styles.title}>{userToEdit ? 'Редагувати' : 'Створити'} користувача</h2>

            <div className={styles.fieldGroup}>
                <label className={styles.label}>Основна інформація</label>
                <input className={styles.input} name="name" value={formData.name} onChange={handleChange} placeholder="Ім'я" required />
                <input className={styles.input} name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.label}>Фото профілю:</label>
                <div className={styles.uploadContainer}>
                    <label className={styles.customUploadBtn}>
                        <span>{isUploading ? <Loader /> : 'Обрати файл'}</span>
                        <input type="file" accept="image/*" onChange={handleFileChange} className={styles.hiddenInput} />
                    </label>
                    {formData.image ? (
                        <div className={styles.previewWrapper}>
                            <img src={formData.image} alt="Аватар" className={styles.previewImage} />
                        </div>
                    ) : null}

                </div>
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.label}>Роль та послуги</label>
                <select className={styles.select} name="role" value={formData.role} onChange={handleChange}>
                    <option value="client">Клієнт</option>
                    <option value="business">Бізнес (Користувач/Заклад)</option>
                </select>
            </div>

            {formData.role === 'business' && (
                <textarea
                    className={styles.textarea}
                    name="serviceInfo"
                    value={formData.serviceInfo}
                    onChange={handleChange}
                    placeholder="Опис послуг (тільки для бізнесу)"
                />
            )}

            <div className={styles.buttons}>
                <button type="submit" className={styles.saveBtn}>Зберегти</button>
                <button type="button" onClick={onCancel} className={styles.cancelBtn}>Скасувати</button>
            </div>
        </form>
    );
};

