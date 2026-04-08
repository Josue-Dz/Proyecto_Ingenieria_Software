import React, { useEffect, useState } from 'react'
import UserAnalytics from './UserAnalytics'
import { usersMock, tasksMock } from '../hooks/mockData'
import { useParams } from 'react-router-dom';
import { getUserAnalyticsRequest } from '../services/reportService';

const UserAnalyticsPage = () => {

    const [data, setData] = useState([]);
    const { boardId: idTablero } = useParams();

    useEffect(() => {
        const fetchUserAnalytics = async () => {
            try {
                const data = await getUserAnalyticsRequest(idTablero);
                setData(data);
            } catch (error) {
                console.error("Error al obtener reporte: ", error)
            }
        }

        if (idTablero) {
            fetchUserAnalytics();
        }
    }, [idTablero]);

    return (
        <UserAnalytics users={data} tasks={[]} onBack={() => window.history.back()} />
    )
}

export default UserAnalyticsPage