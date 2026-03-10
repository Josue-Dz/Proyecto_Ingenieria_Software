import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const LoginForm = () => {

    const { login } = useAuth();
    const navigate = useNavigate();
    const [showPasword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password)
        try {
            await login({ email, password });
            navigate("/dashboard")
        } catch (error) {
            console.error("error", error)
        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm md:text-base">
                <div>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" placeholder="Correo Electrónico" id="email" name="email" autoComplete="email" required className="w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400" />
                </div>

                <div className="relative w-full justify-center">
                    <label htmlFor="password">Contraseña</label>
                    <div className="relative">
                        <input type={showPasword ? "text" : "password"} placeholder="Contraseña" id="password" name="password" autoComplete="current-password" required className="w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400 pr-10 autofill:bg-transparent" />
                        <span className="material-symbols-rounded absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPasword)}>
                            {showPasword ? "visibility_off" : "visibility"}
                        </span>
                    </div>
                </div>

                <div>
                    <a href="/forgot-password" className="hover:underline text-sm text-gray-700">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                <button type="submit" className="w-full p-3 text-white bg-indigo-600 dark:bg-[#c81e3a] rounded-xl text-base md:text-lg font-medium hover:opacity-90 transition">Iniciar Sesión</button>

                <div className="flex items-center gap-2 mt-4">
                    <p>¿No tienes cuenta?
                        <a href="/signup" className="hover:underline text-sm text-gray-400">
                            Regístrate aquí
                        </a>
                    </p>

                </div>
            </form>
        </div>
    )
}

export default LoginForm