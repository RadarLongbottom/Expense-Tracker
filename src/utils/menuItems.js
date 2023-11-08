import { dashboard, expenses, transactions, trend } from "./Icons"

export const menuItems = [
    {
        id: 1,
        title: 'Panel',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: 'Transakcje ',
        icon: transactions,
        link: '/transactions'
    },
    {
        id: 3,
        title: 'Przychody',
        icon: trend,
        link: '/incomes'
    },
    {
        id: 4,
        title: 'Wydatki',
        icon: expenses,
        link: '/expenses'
    },
]