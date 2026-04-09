import { useEffect, useState, useCallback } from "react";
import { getMembersRequest } from '../../members/services/MemberService';

export const useProjectRol = (idProyecto, user) => {
    const [members, setMembers] = useState([]);
    const [userRol, setUserRol] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMembers = useCallback(async () => {
        if (!idProyecto || !user?.idUsuario) return;
        setLoading(true);
        try {
            const data = await getMembersRequest(idProyecto);
            setMembers(data);
            const me = data.find((m) => Number(m.idUsuario) === Number(user.idUsuario));
            setUserRol(me?.rol ?? null);
        } catch (error) {
            console.error("Error: ", error);
        } finally {
            setLoading(false);
        }
    }, [idProyecto, user?.idUsuario]);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    return { members, userRol, loading, refetch: fetchMembers };
};