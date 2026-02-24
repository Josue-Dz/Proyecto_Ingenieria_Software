import { Routes, Route } from 'react-router-dom';
import LandingPage from '../features/landing/LandingPage';
import PublicLayout from './layouts/PublicLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import SignUpPage from '../features/auth/pages/SignUpPage';

function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;