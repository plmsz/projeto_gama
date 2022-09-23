import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { axios } from 'axios';
import { useAuth } from './useAuth';

export const useFetch = (route) => {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const { update } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(route);
                setData(response.data);
                if (user?.role) {
                    setIsFetching(false);
                }
            } catch (err) {
                if (axios?.isAxiosError(err)) {
                    setError(err.message);
                }
            }
        };
        fetchData();
    }, [update, user?.role, user?.id]);

    return {
        data,
        isFetching,
        error,
    };
};