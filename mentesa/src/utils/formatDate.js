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
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};
export const optionDate = {
    month: 'short',
    day: 'numeric',
};
export const optionHour = {
    hour: 'numeric',
    minute: 'numeric',
};
