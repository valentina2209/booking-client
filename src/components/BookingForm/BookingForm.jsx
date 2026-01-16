import { useNavigate } from 'react-router'
import useForm from '@/hooks/useForm'
import axios from 'axios'
import styles from "./BookingForm.module.css"
import toast from 'react-hot-toast'

export default function BookingForm({ businessId, onClose }) {
    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        userName: '',
        userEmail: '',
        bookingDate: '',
        bookingTime: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, {
                ...values,
                businessId: businessId
            })

            toast("Бронювання успішне!")

            if (onClose) {
                onClose();
            }
            navigate("/my-bookings")
        } catch (error) {
            toast.error("Сталася помилка при бронюванні", error);
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Забронювати послугу</h2>

                <div>
                    <label className={styles.label}>Ваше ім'я:</label>
                    <input
                        name="userName"
                        placeholder="Введіть ім'я"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <div>
                    <label className={styles.label}>Ваша електронна пошта:</label>
                    <input
                        type="email"
                        name="userEmail"
                        placeholder="Введіть пошту"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <div>
                    <label className={styles.label}>Дата:</label>
                    <input
                        type="date"
                        name="bookingDate"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <div>
                    <label className={styles.label}>Час:</label>
                    <input
                        type="time"
                        name="bookingTime"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitBtn}>
                        Підтвердити запис
                    </button>
                    <button
                        type="button"
                        className={styles.cancelBtn}
                        onClick={onClose}
                    >
                        Скасувати
                    </button>
                </div>
            </form>
        </div>
    )
}