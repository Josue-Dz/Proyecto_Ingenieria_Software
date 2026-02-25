import { Routes, Route } from 'react-router-dom';
import LandingPage from '../features/landing/LandingPage';
import PublicLayout from './layouts/PublicLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import SignUpPage from '../features/auth/pages/SignUpPage';
import PrivateLayout from './layouts/PrivateLayout';
import DashboardPage from '../features/boards/pages/DashboardPage';

function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
            </Route>
            <Route element={ <PrivateLayout />}>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route />
            </Route>
        </Routes>
    )
}

export default AppRoutes;