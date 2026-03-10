import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const SignUpForm = () => {

    const navigate = useNavigate();
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nombre = e.target.name.value;
        const apellido = e.target.lastname.value;
        const correo = e.target.email.value;
        const password = e.target.password.value;

        try {
            await register({ nombre, apellido, correo, password });
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>

            <form className="space-y-3 text-sm md:text-base" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" placeholder="Nombre" id="name" name="name" autoComplete="given-name" required className="w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400" />
                </div>

                <div>
                    <label htmlFor="lastname">Apellido</label>
                    <input type="text" placeholder="Apellido" id="lastname" name="lastname" autoComplete="family-name" required className="w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400" />
                </div>

                <div>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" placeholder="Correo Electrónico" id="email" name="email" autoComplete="email" required className="w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400" />
                </div>

                <div className="relative">
                    <label htmlFor="password">Contraseña</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Contraseña" id="password" name="password" autoComplete="new-password" required className="w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400 pr-10" />
                        <span className="material-symbols-rounded absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Confirmar Contraseña" id="confirmPassword" name="confirmPassword" autoComplete="new-password" required className="w-full p-3 border-b-2 border-gray-300 outline-none placeholder-gray-400" />
                    </div>
                </div>

                <button type="submit" className="w-full p-3 bg-indigo-600 text-white dark:bg-[#c81e3a] rounded-xl text-lg font-medium hover:opacity-90 transition">Registrarse</button>

            </form>
        </div>
    )
}

export default SignUpForm