import axios from 'axios';

/**
 * Сервіс для завантаження файлів на Cloudinary
 * @param {File} file - Об'єкт файлу з input
 * @returns {Promise<string>} - Посилання на завантажену картинку
 */
export const uploadImageToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET || 'ml_default');

    try {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        );

        return res.data.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw new Error('Помилка при завантаженні файлу на сервер');

    }
};
