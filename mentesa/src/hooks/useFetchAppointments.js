import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { axios } from 'axios';
import { useAuth } from './useAuth';

export const useFetch = (route, update) => {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(route);
                setData(response.data);
            } catch (err) {
                if (axios?.isAxiosError(err)) {
                    setError(err.message);
                }
            }
            setIsFetching(false);
        };
        console.log(user);
        if (user?.role !== undefined) {
            fetchData();
        }
    }, [update, user]);

    return {
        data,
        isFetching,
        error,
    };
};