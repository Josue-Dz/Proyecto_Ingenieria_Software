import LoginForm from "../components/LoginForm"

const LoginPage = () => {
    return (
        <div className="grid w-full justify-center items-center text-white pt-6">

            <div className='w-full max-w-md rounded-2xl border border-gray-600 p-4 md:p-6'>
                <h2 className='text-2x md:text-3xl font-semibold text-center mb-4'>Iniciar Sesión</h2>
                <LoginForm />
            </div>
            
            
        </div>
    )
}

export default LoginPage