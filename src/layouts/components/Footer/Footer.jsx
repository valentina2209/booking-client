import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.text}>
                <strong>BookNow</strong> - Сучасна платформа для миттєвого бронювання послуг.
                Знайдіть свій ідеальний заклад та запишіться за лічені секунди.
            </p>
            <p className={styles.text}>
                © 2026 Усі права захищено.
            </p>
        </footer>
    )
}

export default Footer