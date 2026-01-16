import { useState } from 'react';
import axios from 'axios';
import styles from './MyBookings.module.css';
import Loader from '@/components/Loader/Loader';
import toast from 'react-hot-toast';
import { confirmToast } from '@/utils/confirmToast';

const MyBookings = () => {
    const [email, setEmail] = useState('');
    const [bookings, setBookings] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings?email=${email}`);
            setBookings(res.data);
            setHasSearched(true);
            toast.success(`Знайдено ${res.data.length} записів`);
        } catch {
            toast.error("Помилка при пошуку:");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = (id) => {
        confirmToast("Скасувати цей запис?", async () => {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`);
                setBookings(prev => prev.filter(b => b._id !== id));
                toast.success("Запис скасовано");
            } catch {
                toast.error("Не вдалося скасувати");
            }
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Керування записами</h1>

            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                    type="email"
                    placeholder="Введіть ваш Email, вказаний при бронюванні"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className={styles.searchBtn}
                    disabled={loading}
                >
                    {loading ? <Loader /> : "Знайти мої записи"}
                </button>
            </form>

            <div className={styles.list}>
                {hasSearched && bookings.length === 0 && (
                    <p className={styles.emptyMsg}>Записів за цією поштою не знайдено.</p>
                )}

                {bookings.map((booking) => (
                    <div key={booking._id} className={styles.card}>
                        <div className={styles.info}>
                            <h3 className={styles.businessName}>
                                {booking.businessId?.name || "Послуга"}
                            </h3>
                            <p className={styles.dateTime}>
                                📅 {booking.bookingDate} о {booking.bookingTime}
                            </p>
                            <p className={styles.clientName}>Клієнт: {booking.userName}</p>
                        </div>

                        <div className={styles.actions}>
                            <span className={styles.statusBadge}>
                                {booking.status === 'active' ? 'Підтверджено' : booking.status}
                            </span>
                            <button
                                onClick={() => handleCancel(booking._id)}
                                className={styles.cancelBtn}
                            >
                                Скасувати запис
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;