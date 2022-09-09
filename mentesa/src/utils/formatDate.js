export const formatDate = (value) => {
    return new Intl.DateTimeFormat('pt-BR').format(value);
};

export const formatDateTime = (value) => {
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'America/Sao_Paulo',
    }).format(value);
};

export const option = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};