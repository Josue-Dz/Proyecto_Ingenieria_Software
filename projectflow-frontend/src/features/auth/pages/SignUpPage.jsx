import SignUpForm from "../components/SignUpForm"

const SignUpPage = () => {
  return (
    <div className=' text-white grid w-full h-screen justify-center'>
        <div className='w-107.5 rounded-2xl shadow-lg'>
            <h2 className='text-3xl font-semibold text-center mb-4'>Crear Cuenta</h2>
            <SignUpForm />
        </div>
        
    </div>
  )
}

export default SignUpPage