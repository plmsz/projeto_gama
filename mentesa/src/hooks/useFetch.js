import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useFetch = (route) => {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(route);
                setData(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.message);
                }
            }
            setIsFetching(false);
        };
        fetchData();
    }, []);

    return {
        data,
        isFetching,
        error,
    };
};