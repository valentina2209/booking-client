import { NavLink } from 'react-router'
import frontRoutes from '@/routes/frontRoutes'
import styles from './Header.module.css'

function Header() {
    console.log("Конфіг роутів:", frontRoutes);
    return (
        <header className={styles.header}>
            <div className={styles.navList}>
                <NavLink
                    to={frontRoutes.PAGES.HOME}
                    className={({ isActive }) => [styles.link, isActive ? styles.active : ''].join(' ')}
                >
                    Головна
                </NavLink>
                <NavLink
                    to={frontRoutes.PAGES.BUSINESSES.ROOT}
                    className={({ isActive }) => [styles.link, isActive ? styles.active : ''].join(' ')}
                >
                    Бізнес
                </NavLink>
                <NavLink
                    to={frontRoutes.PAGES.MY_BOOKINGS}
                    className={({ isActive }) => [styles.link, isActive ? styles.active : ''].join(' ')}
                >
                    Мої бронювання
                </NavLink>
                <NavLink
                    to={frontRoutes.PAGES.USERS.ROOT}
                    className={({ isActive }) => [styles.link, isActive ? styles.active : ''].join(' ')}
                >
                    Користувачі
                </NavLink>

            </div>

        </header>
    )
}

export default Header