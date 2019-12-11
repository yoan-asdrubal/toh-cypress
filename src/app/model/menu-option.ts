export interface MenuOption {
    id: number;
    path: string;
    label: string;
}

export const menuData: MenuOption[] = [
    {
        id: 1,
        path: '/dashboard',
        label: 'Dashboard'
    },
    {
        id: 2,
        path: '/heroes',
        label: 'Heroes'
    },
];
