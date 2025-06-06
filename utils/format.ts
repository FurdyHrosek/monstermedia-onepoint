type TimeSpanOptions = {
    hours?: number;
    days?: number;
    months?: number;
};

export const format = {
    timeSpan: ({ hours = 0, days = 0, months = 0 }: TimeSpanOptions = {}): number => {
        const hourMs = 60 * 60 * 1000;
        const dayMs = 24 * hourMs;
        const monthMs = 30 * dayMs;

        return (hours * hourMs) + (days * dayMs) + (months * monthMs);
    },
    kebabcase: (string: string) => {
        return string
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase() 
    },
    camelcase: (string: string) => {
        return string.replace(/[:_\-](\w?)/g, (_, c) => c ? c.toUpperCase() : '');
    },
    stripHTML: (html: string) => html.replace(/<[^>]+>/g, '')
};