import LoginForm from "../components/LoginForm"

const LoginPage = () => {
    return (
        <div className="grid w-full h-screen justify-center text-white">
            <div className='w-107.5 rounded-2xl shadow-lg'>
                <h2 className='text-3xl font-semibold text-center mb-4'>Iniciar Sesión</h2>
                <LoginForm />
            </div>
            
            
        </div>
    )
}

export default LoginPage