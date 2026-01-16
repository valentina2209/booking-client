import { Outlet } from 'react-router'
import Header from '@/layouts/components/Header/Header'
import Footer from '@/layouts/components/Footer/Footer'
import styles from './MainLayout.module.css'

function MainLayout() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout