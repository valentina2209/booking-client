import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.spinner}>
                <div className={styles.doubleBounce1}></div>
                <div className={styles.doubleBounce2}></div>
            </div>
        </div>
    );
};

export default Loader;