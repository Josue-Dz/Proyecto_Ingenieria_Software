import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/authService";

const SignUpForm = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const lastname = e.target.lastname.value;
        const nombre = name + lastname;  //Unicamente para prueba de conexion con el backend luego lo remuevo
        const correo = e.target.email.value; //Recordar cambiar a ingles, tambien en la bd
        const password = e.target.password.value;

        try{
            // const data = await registerRequest({ nombre, lastname, email, password });
            const data = await registerRequest({ nombre, correo, password })
            console.log("Usuario Registrado Correctamente:", data); {/**Ojo: Console.log favor borrar para la entrega final por si yo no lo hago*/}
        }catch(error){
            console.error(error);
        }
    }

    return (
        <div>
            {/**Revisar el backend con Jose Daniel para validar los campos */}
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