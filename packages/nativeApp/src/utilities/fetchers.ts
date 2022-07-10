export const getQuery = (url: string) => fetch(url).then(res => res.json());
