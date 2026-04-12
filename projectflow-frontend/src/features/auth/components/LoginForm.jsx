import { useLoginForm } from "../hooks/useLoginForm";

const LoginForm = () => {
    const {
        form, showPassword, submitting, fieldError,
        handleChange, handleBlur, handleSubmit, serverError, setShowPassword, inputClass,
    } = useLoginForm()

    return (
       
         <div>     
            {serverError && (
                <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl
                 bg-red-50 border border-red-200 text-red-600 text-sm">
                    <span className="material-symbols-rounded text-[18px]">error</span>
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-sm md:text-base"
             noValidate>

                <div>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                    type="email"
                    placeholder="Correo Electrónico"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("email")}
                  
                />
                    {fieldError.email && (
                        <p className="text-red-500 text-xs mt-1">
                            Ingresa un correo electrónico válido.
                        </p>
                    )}
                </div>

                
                <div className="relative w-full justify-center">
                    <label htmlFor="password">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"}
                            id="password" name="password"
                            value={form.password}
                            onChange={handleChange} onBlur={handleBlur}
                            placeholder="Contraseña" autoComplete="current-password"
                            className={`${inputClass("password")} pr-10`} />
                        <button type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2
                             text-gray-400 hover:text-gray-600 transition-colors">
                            <span className="material-symbols-rounded text-[20px]">
                                {showPassword ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>
                    {fieldError.password && (
                        <p className="text-red-500 text-xs mt-1">
                            La contraseña es obligatoria.
                        </p>
                    )}
                </div>

            
                <div>
                    <a href="/forgot-password"
                     className="hover:underline text-sm text-gray-700">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                
                <button type="submit" disabled={submitting}
                    className="w-full p-3 text-white bg-indigo-600 dark:bg-[#c81e3a]
                     rounded-xl text-base md:text-lg font-medium hover:opacity-90
                     transition disabled:opacity-60 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2">
                    {submitting && (
                        <span className="material-symbols-rounded text-sm animate-spin">
                            progress_activity
                        </span>
                    )}
                    {submitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>


               
                <div className="flex items-center gap-2 mt-4">
                    <p>¿No tienes cuenta?
                        <a href="/signup"
                         className="hover:underline p-1 text-sm text-gray-400">
                            Regístrate aquí
                        </a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm