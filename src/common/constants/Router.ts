const ROUTER = {
    LOGIN: '/login',
    HOME: '/home',
    LIST: '/list',
} as const;
type ROUTER = typeof ROUTER[keyof typeof ROUTER];

export default ROUTER;