import toast from 'react-hot-toast';

export const confirmToast = (message, onConfirm) => {
    toast((t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{message}</span>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={() => {
                        toast.dismiss(t.id);
                        onConfirm(); // Викликаємо функцію видалення
                    }}
                    style={{
                        background: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Так
                </button>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    style={{
                        background: '#f1f5f9',
                        border: '1px solid #cbd5e1',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Ні
                </button>
            </div>
        </div>
    ), {
        duration: 5000,
        position: 'top-center',
    });
};