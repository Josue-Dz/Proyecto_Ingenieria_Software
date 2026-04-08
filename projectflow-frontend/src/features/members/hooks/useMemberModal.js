import { useState } from "react";

export const useMemberModal = (member, onRolChange, onRemove, onClose) => {
    const [editingRol, setEditingRol] = useState(member.rol);
    const [rolLoading, setRolLoading] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRolSave = async () => {
        if (editingRol === member.rol) {
            onClose();
            return;
        }
        setError(null);
        setRolLoading(true);
        try {
            await onRolChange(member.idUsuario, editingRol);
            onClose();
        } catch (err) {
            const status = err?.response?.status;
            setError(
                status === 403 ? "Sin permisos para cambiar roles." :
                status === 400 ? "No puedes cambiar tu propio rol." :
                "No se pudo cambiar el rol."
            );
        } finally {
            setRolLoading(false);
        }
    };

    const handleRemove = async () => {
        setError(null);
        setRemoveLoading(true);
        try {
            await onRemove(member.idUsuario);
            onClose();
        } catch (err) {
            const status = err?.response?.status;
            setError(
                status === 403 ? "Sin permisos para eliminar miembros." :
                status === 400 ? "No puedes removerte a ti mismo." :
                "No se pudo eliminar el miembro."
            );
        } finally {
            setRemoveLoading(false);
        }
    };

    return {
        editingRol,
        setEditingRol,
        rolLoading,
        removeLoading,
        error,
        handleRolSave,
        handleRemove,
    };
};