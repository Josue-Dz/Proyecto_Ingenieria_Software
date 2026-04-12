import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useLoginForm = () => {
    const { login } = useAuth();
    const navigate  = useNavigate();

    const [form, setForm]             = useState({ email: "", password: "" });
    const [touched, setTouched]       = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (serverError) setServerError(null);
    };

    const handleBlur = (e) =>
        setTouched(prev => ({ ...prev, [e.target.name]: true }));

    const fieldError = {
        email:    touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
        password: touched.password && !form.password.trim(),
    };

    const isFormValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.password.trim();

    const inputClass = (field) =>
        `w-full p-3 border-b-2 outline-none placeholder-gray-400 transition-colors ${
            fieldError[field]
                ? "border-red-400 bg-red-50/40"
                : touched[field] && !fieldError[field]
                    ? "border-green-400"
                    : "border-gray-300"
        }`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit ejecutado");
        setTouched({ email: true, password: true });
        if (!isFormValid) return;

        setSubmitting(true);
        setServerError(null);
        try {
            await login({ email: form.email, password: form.password });
            navigate("/dashboard");
        } catch  {
    setServerError("Correo electrónico o contraseña incorrectos.");
}
 finally {
            setSubmitting(false);
        }
    };

    return {
        form, touched, showPassword, submitting, serverError, fieldError,
        handleChange, handleBlur, handleSubmit, setShowPassword, inputClass,
    };
};