const LoginForm = () => {
    return (
        <div>

            {/**Revisar el backend con Jose Daniel para validar los campos */}
            <form className='space-y-4'>
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

                <button type='submit' className='w-full p-3 bg-[#c81e3a] rounded-full text-lg font-medium hover:opacity-90 transition'>Iniciar Sesión</button>

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