import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_ENDPOINTS } from '@/api/apiRoutes';
import frontRoutes from '@/routes/frontRoutes';
import styles from './BusinessList.module.css';
import Loader from '@/components/Loader/Loader';
import toast from 'react-hot-toast';

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.USERS.BUSINESS);
                setBusinesses(response.data);
            } catch (error) {
                toast.error("Помилка при завантаженні:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loader />

    return (
        <div className={styles.container}>
            {businesses.map((item) => (
                <div key={item._id} className={styles.card}>
                    <img
                        src={item.image && item.image.trim() !== ""
                            ? item.image
                            : 'https://placehold.co/100x100?text=No+Photo'}
                        alt={item.name}
                        className={styles.image}
                    />
                    <div className={styles.content}>
                        <h3 className={styles.title}>{item.name}</h3>
                        <p className={styles.info}>{item.serviceInfo}</p>
                        <button
                            className={styles.button}
                            onClick={() => navigate(frontRoutes.NAVIGATE.BUSINESSES.DETAIL(item._id))}
                        >
                            Записатися
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BusinessList;