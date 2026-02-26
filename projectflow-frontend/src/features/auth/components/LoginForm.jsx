import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password)
        try{
            const data = await login({ email, password });
            console.log("Usuario logueado", data); {/**Ojo: Console.log favor borrar para la entrega final por si yo no lo hago*/}
            navigate("/dashboard")
        } catch (error) {
            console.error("error", error)
        }
    }

    return (
        <div>

            {/**Revisar el backend con Jose Daniel para validar los campos */}
            <form onSubmit={ handleSubmit } className='space-y-3 text-sm md:text-base'>
                <div>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type='email' placeholder='Correo Electrónico' id='email' name='email' autoComplete='email' required className='w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400' />
                </div>

                <div >
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' placeholder='Contraseña' id='password' name='password' autoComplete='current-password' required className='w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400' />
                </div>

                <div>
                    <a href='/forgot-password' className='hover:underline text-sm text-gray-400'>
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                <button type='submit' className='w-full p-3 bg-[#c81e3a] rounded-full text-base md:text-lg font-medium hover:opacity-90 transition'>Iniciar Sesión</button>

                <div className='flex items-center gap-2 mt-4'>
                    <p>¿No tienes cuenta?
                        <a href='/signup' className='hover:underline text-sm text-gray-400'>
                            Regístrate aquí
                        </a>
                    </p>

                </div>
            </form>
        </div>
    )
}

export default LoginForm