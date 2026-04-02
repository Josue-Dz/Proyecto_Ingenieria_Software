import { useState, useEffect } from "react";
import { getMyProfileRequest, updateMyProfileRequest, changeMyPasswordRequest } from "../../auth/services/userService";
import Field from "./Field";
import Alert from "../../../shared/components/feedback/Alert";

const ProfileSection = () => {
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const [profileForm, setProfileForm] = useState({ nombre: "", apellido: "" });
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileFeedback, setProfileFeedback] = useState({ type: null, message: null });

    const [passwordForm, setPasswordForm] = useState({ contraseniaActual: "", nuevaContrasenia: "", confirmar: "" });
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordFeedback, setPasswordFeedback] = useState({ type: null, message: null });
    const [showPasswords, setShowPasswords] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getMyProfileRequest();
                setProfile(data);
                setProfileForm({ nombre: data.nombre, apellido: data.apellido });
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchProfile();
    }, []);

    const handleProfileChange = (e) => {
        setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
        setProfileFeedback({ type: null, message: null });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (!profileForm.nombre.trim() || !profileForm.apellido.trim()) {
            setProfileFeedback({ type: "error", message: "Nombre y apellido son obligatorios." });
            return;
        }
        setProfileLoading(true);
        try {
            const updated = await updateMyProfileRequest(profileForm);
            setProfile(updated);
            setProfileFeedback({ type: "success", message: "Perfil actualizado correctamente." });
        } catch (err) {
            const status = err?.response?.status;
            setProfileFeedback({
                type: "error",
                message: status === 403 ? "No tienes permisos para realizar esta acción." : "No se pudo actualizar el perfil."
            });
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
        setPasswordFeedback({ type: null, message: null });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!passwordForm.contraseniaActual || !passwordForm.nuevaContrasenia) {
            setPasswordFeedback({ type: "error", message: "Todos los campos son obligatorios." });
            return;
        }
        if (passwordForm.nuevaContrasenia.length < 8) {
            setPasswordFeedback({ type: "error", message: "La nueva contraseña debe tener al menos 8 caracteres." });
            return;
        }
        if (passwordForm.nuevaContrasenia !== passwordForm.confirmar) {
            setPasswordFeedback({ type: "error", message: "Las contraseñas no coinciden." });
            return;
        }
        setPasswordLoading(true);
        try {
            await changeMyPasswordRequest({
                contraseniaActual: passwordForm.contraseniaActual,
                nuevaContrasenia: passwordForm.nuevaContrasenia,
            });
            setPasswordFeedback({ type: "success", message: "Contraseña actualizada correctamente." });
            setPasswordForm({ contraseniaActual: "", nuevaContrasenia: "", confirmar: "" });
        } catch (err) {
            const status = err?.response?.status;
            setPasswordFeedback({
                type: "error",
                message: status === 400 ? "La contraseña actual es incorrecta." : "Contraseña actual incorrecta."
            });
        } finally {
            setPasswordLoading(false);
        }
    };

    // ── Skeleton ─
    if (loadingProfile) {
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                {[1, 2].map(i => (
                    <div key={i} className="bg-slate-100 dark:bg-black/60 border border-slate-200
                     dark:border-white/10 rounded-xl p-6 animate-pulse space-y-4">
                        <div className="w-1/3 h-4 rounded bg-slate-200 dark:bg-white/10" />
                        <div className="w-full h-9 rounded bg-slate-200 dark:bg-white/10" />
                        <div className="w-full h-9 rounded bg-slate-200 dark:bg-white/10" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">

            {/* Avatar + nombre */}
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-[#A3FF12]/15 border
                 border-indigo-400 dark:border-[#A3FF12]/30 flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-[#A3FF12] font-bold text-2xl">
                        {profile?.iniciales}
                    </span>
                </div>
                <div>
                    <h1 className="text-slate-800 dark:text-white text-xl font-bold">{profile?.nombreCompleto}</h1>
                    <p className="text-slate-400 dark:text-white/40 text-sm">{profile?.correo}</p>
                </div>
            </div>

            {/* Información personal */}
            <section className="bg-white dark:bg-black/60 border border-slate-200
             dark:border-white/10 rounded-xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-rounded text-indigo-500 dark:text-[#A3FF12] text-lg">person</span>
                    <h2 className="text-slate-700 dark:text-white font-semibold text-sm">Información personal</h2>
                </div>
                <form onSubmit={handleProfileSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Nombre" name="nombre" value={profileForm.nombre} onChange={handleProfileChange} required placeholder="Tu nombre" />
                        <Field label="Apellido" name="apellido" value={profileForm.apellido} onChange={handleProfileChange} required placeholder="Tu apellido" />
                    </div>
                    <Field label="Correo electrónico" name="correo" value={profile?.correo || ""} readOnly />
                    <Alert type={profileFeedback.type} message={profileFeedback.message} />
                    <div className="flex justify-end pt-1">
                        <button type="submit" disabled={profileLoading}
                            className="flex items-center gap-2 px-5 py-2 rounded-lg
                             bg-indigo-600 dark:bg-[#A3FF12]/15 border border-indigo-600
                              dark:border-[#A3FF12]/30 text-white dark:text-[#A3FF12] text-sm font-semibold
                               hover:bg-indigo-700 dark:hover:bg-[#A3FF12]/25 transition-colors disabled:opacity-50">
                            {profileLoading
                                ? <span className="material-symbols-rounded text-sm animate-spin">progress_activity</span>
                                : <span className="material-symbols-rounded text-sm">save</span>}
                            {profileLoading ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </section>

            {/* Cambiar contraseña */}
            <section className="bg-white dark:bg-black/60 border border-slate-200
             dark:border-white/10 rounded-xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-rounded text-indigo-500 dark:text-[#A3FF12] text-lg">lock</span>
                        <h2 className="text-slate-700 dark:text-white font-semibold text-sm">Cambiar contraseña</h2>
                    </div>
                    <button type="button" onClick={() => setShowPasswords(!showPasswords)}
                        className="text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/60 transition-colors">
                        <span className="material-symbols-rounded text-lg">
                            {showPasswords ? "expand_less" : "expand_more"}
                        </span>
                    </button>
                </div>
                {showPasswords && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-3">
                        <Field label="Contraseña actual" name="contraseniaActual" type="password" value={passwordForm.contraseniaActual} onChange={handlePasswordChange} required placeholder="••••••••" />
                        <Field label="Nueva contraseña" name="nuevaContrasenia" type="password" value={passwordForm.nuevaContrasenia} onChange={handlePasswordChange} required placeholder="Mínimo 8 caracteres" />
                        <Field label="Confirmar nueva contraseña" name="confirmar" type="password" value={passwordForm.confirmar} onChange={handlePasswordChange} required placeholder="Repite la nueva contraseña" />
                        <Alert type={passwordFeedback.type} message={passwordFeedback.message} />
                        <div className="flex justify-end pt-1">
                            <button type="submit" disabled={passwordLoading}
                                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 dark:bg-[#A3FF12]/15 border border-indigo-600 dark:border-[#A3FF12]/30 text-white dark:text-[#A3FF12] text-sm font-semibold hover:bg-indigo-700 dark:hover:bg-[#A3FF12]/25 transition-colors disabled:opacity-50">
                                {passwordLoading
                                    ? <span className="material-symbols-rounded text-sm animate-spin">progress_activity</span>
                                    : <span className="material-symbols-rounded text-sm">key</span>}
                                {passwordLoading ? "Actualizando..." : "Cambiar contraseña"}
                            </button>
                        </div>
                    </form>
                )}
            </section>

        </div>
    );
};

export default ProfileSection;