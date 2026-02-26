import SignUpForm from "../components/SignUpForm"

const SignUpPage = () => {
  return (
    <div className=' text-white grid w-full justify-center pt-6'>
        <div className='w-full max-w-md rounded-2xl border border-gray-600 p-4 md:p-6'>
            <h2 className='text-2x md:text-3xl font-semibold text-center mb-4'>Crear Cuenta</h2>
            <SignUpForm />
        </div>
        
    </div>
  )
}

export default SignUpPage