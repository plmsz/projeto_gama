import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { axios } from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { calculateAge } from '../../utils/ageValidator';
import { getAppointments } from '../../services/appointmentsRequests';
import { getUsers } from '../../services/usersRequests';

export const useFetchPatients = (route, update) => {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientsFromProfessional = await getAppointments(`?professionalId=${user.userId}`);
                const patientsInfoFromProfessional = await getUsers('patient');

                const patientsId = Array.from(new Set(patientsFromProfessional.map((patient) => patient.patientId)));
                let patientsData = [];
                patientsInfoFromProfessional.forEach(function (element) {
                    if (patientsId.indexOf(element.userId) !== -1) patientsData.push(element);
                });
                const dataModifiedAge = patientsData.map((row) => ({ ...row, birthday: calculateAge(row.birthday) }));

                setData(dataModifiedAge);
            } catch (err) {
                if (axios?.isAxiosError(err)) {
                    setError(err.message);
                }
            }
            if (user?.role) {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [update, user]);

    return {
        data,
        isFetching,
        error,
    };
};