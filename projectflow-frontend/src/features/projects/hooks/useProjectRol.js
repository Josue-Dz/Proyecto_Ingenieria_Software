import { useEffect, useState } from "react";
import { getMembersRequest } from "../services/MemberService";

export const useProjectRol = (idProyecto, user) => {
    const [members, setMembers] = useState([]);
    const [userRol, setUserRol] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            if (!idProyecto || !user?.idUsuario) return;

            setLoading(true);
            try {
                const members = await getMembersRequest(idProyecto);
                setMembers(members);

                const me = members.find((m) => Number(m.idUsuario) === Number(user.idUsuario));
                setUserRol(me?.rol ?? null);
            } catch (error) {
                console.error("Error: ", error)
            } finally {
                setLoading(false);
            }
        }

        fetchMembers();
    }, [idProyecto, user?.idUsuario]);

    return { members, userRol, loading };
}