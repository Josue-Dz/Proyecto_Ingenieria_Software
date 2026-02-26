import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SignUpForm = () => {

    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nombre = e.target.name.value;
        const apellido = e.target.lastname.value;
        const correo = e.target.email.value;
        const password = e.target.password.value;

        try{
            await register({ nombre, apellido, correo, password });
            navigate("/dashboard");
        }catch(error){
            console.error(error);
        }
    }

    return (
        <div>
        
            <form className='space-y-3 text-sm md:text-base' onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input type='text' placeholder='Nombre' id='name' name='name' autoComplete='given-name' required className='w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400' />
                </div>

                <div>
                    <label htmlFor='lastname'>Apellido</label>
                    <input type='text' placeholder='Apellido' id='lastname' name='lastname' autoComplete='family-name' required className='w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400' />
                </div>

                <div>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type='email' placeholder='Correo Electrónico' id='email' name='email' autoComplete='email' required className='w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400' />
                </div>

                <div>
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' placeholder='Contraseña' id='password' name='password' autoComplete='new-password' required className='w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400' />
                </div>

                <div>
                    <label htmlFor='confirmPassword'>Confirmar Contraseña</label>
                    <input type='password' placeholder='Confirmar Contraseña' id='confirmPassword' name='confirmPassword' autoComplete='new-password' required className='w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400' />
                </div>

                <button type='submit' className='w-full p-3 bg-[#c81e3a] rounded-full text-lg font-medium hover:opacity-90 transition'>Registrarse</button>

            </form>
        </div>
    )
}

export default SignUpForm