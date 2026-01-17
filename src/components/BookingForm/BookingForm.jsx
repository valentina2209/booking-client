import { useNavigate } from 'react-router'
import useForm from '@/hooks/useForm'
import axios from 'axios'
import styles from "./BookingForm.module.css"
import toast from 'react-hot-toast'
import { useEffect } from 'react'

export default function BookingForm({ businessId, onClose, bookingToEdit, onSave }) {
    const navigate = useNavigate()
    const isEditMode = Boolean(bookingToEdit)

    const { values, handleChange, setValues } = useForm({
        userName: bookingToEdit?.userName || '',
        userEmail: bookingToEdit?.userEmail || '',
        bookingDate: bookingToEdit?.bookingDate || '',
        bookingTime: bookingToEdit?.bookingTime || '',
    })

    useEffect(() => {
        if (bookingToEdit) {
            setValues({
                userName: bookingToEdit.userName || '',
                userEmail: bookingToEdit.userEmail || '',
                bookingDate: bookingToEdit.bookingDate || '',
                bookingTime: bookingToEdit.bookingTime || '',
            })
        }
    }, [bookingToEdit, setValues])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (isEditMode) {
                await axios.patch(`${import.meta.env.VITE_API_URL}/bookings/${bookingToEdit._id}`, {
                    ...values,
                    businessId: businessId
                })
                toast.success("Запис успішно оновлено!")
                if (onSave) onSave()
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, {
                    ...values,
                    businessId: businessId
                })
                toast.success("Бронювання успішне!")
                navigate("/my-bookings")
            }
            if (onClose) onClose();
        } catch (error) {
            toast.error(isEditMode ? "Помилка при оновленні" : "Сталася помилка при бронюванні");
            console.error(error)
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2 className={styles.title}>
                        {isEditMode ? "Редагувати запис" : "Забронювати послугу"}
                    </h2>

                    <div>
                        <label className={styles.label}>Ваше ім'я:</label>
                        <input
                            name="userName"
                            value={values.userName}
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
                            value={values.userEmail}
                            placeholder="Введіть пошту"
                            onChange={handleChange}
                            required
                            className={styles.input}
                            disabled={isEditMode}
                        />
                    </div>

                    <div>
                        <label className={styles.label}>Дата:</label>
                        <input
                            type="date"
                            name="bookingDate"
                            value={values.bookingDate}
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
                            value={values.bookingTime}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitBtn}>
                            {isEditMode ? "Зберегти зміни" : "Підтвердити запис"}
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
        </div>

    )
}