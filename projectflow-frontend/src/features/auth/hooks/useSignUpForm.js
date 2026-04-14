import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const PASSWORD_RULES = [
    { id: "length",    label: "Al menos 8 caracteres",        test: (p) => p.length >= 8 },
    { id: "lowercase", label: "Al menos 1 letra minúscula",   test: (p) => /[a-z]/.test(p) },
    { id: "uppercase", label: "Al menos 1 letra mayúscula",   test: (p) => /[A-Z]/.test(p) },
    { id: "number",    label: "Al menos 1 número",            test: (p) => /[0-9]/.test(p) },
    { id: "special",   label: "Al menos 1 carácter especial", test: (p) => /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(p) },
];

export const getStrength = (passed) => {
    if (passed <= 1) return { label: "Muy débil", color: "bg-red-500",    width: "w-1/5" };
    if (passed === 2) return { label: "Débil",    color: "bg-orange-400", width: "w-2/5" };
    if (passed === 3) return { label: "Regular",  color: "bg-yellow-400", width: "w-3/5" };
    if (passed === 4) return { label: "Buena",    color: "bg-blue-500",   width: "w-4/5" };
    return                   { label: "Fuerte",   color: "bg-green-500",  width: "w-full" };
};

export const useSignUpForm = () => {
    const navigate = useNavigate();
    const { register, error: authError } = useAuth();

    const [form, setForm] = useState({
        nombre: "", apellido: "", correo: "", password: "", confirmPassword: ""
    });
    const [touched, setTouched]           = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm]   = useState(false);
    const [submitting, setSubmitting]     = useState(false);
    const [success, setSuccess]           = useState(false);
    const [correoDuplicado, setCorreoDuplicado] = useState(false);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.name === "correo")
            setCorreoDuplicado(false);
    };

    const handleBlur = (e) =>
        setTouched(prev => ({ ...prev, [e.target.name]: true }));

    const passwordResults = useMemo(() =>
        PASSWORD_RULES.map(rule => ({ ...rule, passed: rule.test(form.password) })),
        [form.password]
    );

    const passedCount    = passwordResults.filter(r => r.passed).length;
    const strength       = getStrength(passedCount);
    const allRulesPassed = passedCount === PASSWORD_RULES.length;
    const passwordsMatch = form.password === form.confirmPassword;

    const fieldError = {
        nombre:          touched.nombre && !form.nombre.trim(),
        apellido:        touched.apellido && !form.apellido.trim(),
        correo:          touched.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo),
        password:        touched.password && !allRulesPassed,
        confirmPassword: touched.confirmPassword && !passwordsMatch,
    };

    const isFormValid =
        form.nombre.trim() && form.apellido.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo) &&
        allRulesPassed && passwordsMatch;

    const inputClass = (field) =>
        `w-full p-3 border-b-2 outline-none placeholder-gray-400 transition-colors ${
            fieldError[field]
                ? "border-red-400 bg-red-50/40"
                : touched[field]
                    ? "border-green-400"
                    : "border-gray-300"
        }`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ nombre: true, apellido: true, correo: true,
                     password: true, confirmPassword: true });
        if (!isFormValid) return;

        setSubmitting(true);
        try {
            await register({
                nombre:   form.nombre,
                apellido: form.apellido,
                correo:   form.correo,
                password: form.password,
            });
            setSuccess(true);
            setTimeout(() => navigate("/projects"), 1500);
        } catch(err) {
           const mensaje = err?.response?.data?.message ?? "";
        if (mensaje.toLowerCase().includes("duplicate") ||
            mensaje.toLowerCase().includes("correo")) {
            setTouched(prev => ({ ...prev, correo: true }));
            setCorreoDuplicado(true); 
        }
        } finally {
            setSubmitting(false);
        }
    };

    return {
        form, touched, showPassword, showConfirm,
        submitting, success, authError,
        passwordResults, passedCount, strength,
        passwordsMatch, fieldError,
        handleChange, handleBlur, handleSubmit,
        setShowPassword, setShowConfirm,
        inputClass,
        correoDuplicado,
    };
    
};
