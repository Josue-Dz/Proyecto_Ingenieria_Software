import { useState, useEffect } from "react";
import {getMembersRequest, inviteMemberRequest, changeRolRequest, removeMemberRequest} from "../services/MemberService";
import { useAuth } from '../../auth/hooks/useAuth';

export const useMembers = (idProyecto, onMembersChanged) => {
    const { user } = useAuth();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getMembersRequest(idProyecto);
                setMembers(data);
            } catch (err) {
                setError(`No se pudieron cargar los miembros. ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idProyecto]);

    const isAdmin = members.some(
        (m) => Number(m.idUsuario) === Number(user?.idUsuario) && m.rol === "ADMIN"
    );

    const handleInvite = async ({ correo, rol }) => {
        const newMember = await inviteMemberRequest(idProyecto, { correo, rol });
        setMembers(prev => [...prev, newMember]);
        onMembersChanged?.();
        return newMember;
    };

    const handleRolChange = async (idUsuario, rol) => {
        const updated = await changeRolRequest(idProyecto, idUsuario, { rol });
        setMembers(prev => prev.map(m => m.idUsuario === idUsuario ? updated : m));
        onMembersChanged?.();
        return updated;
    };

    const handleRemove = async (idUsuario) => {
        await removeMemberRequest(idProyecto, idUsuario);
        setMembers(prev => prev.filter(m => m.idUsuario !== idUsuario));
        onMembersChanged?.();
    };

    return { members, loading, error, isAdmin, handleInvite, handleRolChange, handleRemove };
};