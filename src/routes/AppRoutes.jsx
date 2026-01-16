import { Route, Routes } from 'react-router'
import MainLayout from '@/layouts/MainLayout'
import frontRoutes from './frontRoutes'
import HomePage from '@/pages/HomePage/HomePage'
import BusinessList from '@/pages/BusinessList/BusinessList'
import BusinessDetail from '@/pages/BusinessDetail/BusinessDetail'
import MyBookings from '@/pages/MyBookings/MyBookings'
import UsersPage from '@/pages/UsersPage/UsersPage'

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path={frontRoutes.PAGES.HOME} element={<HomePage />} />

                <Route path={frontRoutes.PAGES.BUSINESSES.ROOT}>
                    <Route index element={<BusinessList />} />
                    <Route path={frontRoutes.PAGES.BUSINESSES.DETAIL} element={<BusinessDetail />} />
                    <Route path={frontRoutes.PAGES.BUSINESSES.ADD} element={<div>Сторінка додавання</div>} />
                </Route>

                <Route path={frontRoutes.PAGES.MY_BOOKINGS} element={<MyBookings />} />

                {/* <Route path={frontRoutes.PAGES.USERS.ROOT} element={<UsersPage />} /> */}
                <Route path="/users" element={<UsersPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes