import PasswordRules from "./PasswordRules";
import { useSignUpForm } from "../hooks/useSignUpForm";

const SignUpForm = () => {
    const {
        form, showPassword, showConfirm,
        submitting, success,
        passwordResults, passedCount,
        passwordsMatch, fieldError,
        handleChange, handleBlur, handleSubmit,
        setShowPassword, setShowConfirm,
        inputClass,
        correoDuplicado,
    } = useSignUpForm();


    return (
        <div>

            {success && (
                <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl
                 bg-green-50 border border-green-200 text-green-700 text-sm">
                    <span className="material-symbols-rounded text-[18px]">check_circle</span>
                    ¡Cuenta creada exitosamente! Redirigiendo...
                </div>
            )}

            <form className="space-y-4 text-sm md:text-base" onSubmit={handleSubmit} noValidate>
               
        
                <div>
                    <label htmlFor="nombre"
                     className="block mb-1 font-medium text-gray-700">Nombre</label>
                    <input type="text" id="nombre" name="nombre"
                        value={form.nombre} onChange={handleChange} onBlur={handleBlur}
                        placeholder="Nombre" autoComplete="given-name"
                        className={inputClass("nombre")} />
                    {fieldError.nombre && (
                        <p className="text-red-500 text-xs mt-1">El nombre es obligatorio.</p>
                    )}
                </div>

                <div>
                    <label htmlFor="apellido"
                     className="block mb-1 font-medium text-gray-700">Apellido</label>
                    <input type="text" id="apellido" name="apellido"
                        value={form.apellido} onChange={handleChange} onBlur={handleBlur}
                        placeholder="Apellido" autoComplete="family-name"
                        className={inputClass("apellido")} />
                    {fieldError.apellido && (
                        <p className="text-red-500 text-xs mt-1">El apellido es obligatorio.</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="correo" name="correo"
                        value={form.correo} onChange={handleChange} onBlur={handleBlur}
                        placeholder="Correo Electrónico" autoComplete="email"
                        className={inputClass("correo")} />
                    {fieldError.correo && (
                        <p className="text-red-500 text-xs mt-1">
                            Ingresa un correo electrónico válido.
                        </p>
                    )}

                            {correoDuplicado && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span className="material-symbols-rounded text-[14px]">error</span>
                    Este correo ya está registrado.
                </p>
            )}
                </div>


                <div>
                    <label htmlFor="password"
                     className="block mb-1 font-medium text-gray-700">Contraseña</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"}
                            id="password" name="password"
                            value={form.password} onChange={handleChange} onBlur={handleBlur}
                            placeholder="Contraseña" autoComplete="new-password"
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
                    {form.password.length > 0 && (
                        <PasswordRules
                            passwordResults={passwordResults}
                            passedCount={passedCount}
                        />
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword"
                     className="block mb-1 font-medium text-gray-700">
                        Confirmar Contraseña
                    </label>
                    <div className="relative">
                        <input type={showConfirm ? "text" : "password"}
                            id="confirmPassword" name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange} onBlur={handleBlur}
                            placeholder="Repetir contraseña" autoComplete="new-password"
                            className={`${inputClass("confirmPassword")} pr-10`} />
                        <button type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2
                             text-gray-400 hover:text-gray-600 transition-colors">
                            <span className="material-symbols-rounded text-[20px]">
                                {showConfirm ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>
                    {fieldError.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">
                            Las contraseñas no coinciden.
                        </p>
                    )}
                    {form.confirmPassword && passwordsMatch && (
                        <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                            <span className="material-symbols-rounded text-[14px]">check</span>
                            Las contraseñas coinciden.
                        </p>
                    )}
                </div>
                        
                <button type="submit" disabled={submitting || success}
                    className="w-full p-3 bg-indigo-600 dark:bg-[#c81e3a] text-white
                     rounded-xl text-lg font-medium hover:opacity-90 transition
                     disabled:opacity-60 disabled:cursor-not-allowed flex items-center
                     justify-center gap-2">
                    {submitting && (
                        <span className="material-symbols-rounded text-sm animate-spin">
                            progress_activity
                        </span>
                    )}
                    {submitting ? "Registrando..." : "Registrarse"}
                </button>

            </form>
        </div>
    )
}

export default SignUpForm