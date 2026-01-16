import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import styles from './BusinessDetail.module.css';
import BookingForm from '@/components/BookingForm/BookingForm';
import Loader from '@/components/Loader/Loader';
import toast from 'react-hot-toast';

const BusinessDetail = () => {
    const { id } = useParams();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`);
                setBusiness(res.data);
            } catch (error) {
                toast.error("Помилка при завантаженні:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBusiness();
    }, [id]);

    if (loading) {
        return <Loader />
    }

    if (!business) {
        return <div className={styles.centered}>Заклад не знайдено або сталася помилка.</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img src={business.image} alt={business.name} className={styles.mainImage} />
                <div className={styles.details}>
                    <h1>{business.name}</h1>
                    <p className={styles.description}>{business.serviceInfo}</p>

                    <button
                        className={styles.openModalBtn}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Записатися на прийом
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.closeBtn}
                            onClick={() => setIsModalOpen(false)}
                        >
                            &times;
                        </button>

                        <BookingForm
                            businessId={id}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BusinessDetail;