import React from 'react';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    // Konsolidacja transakcji wydatków według kategorii
    const consolidatedExpenseData = expenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += amount;
        return acc;
    }, {});

    // Konsolidacja transakcji przychodów według daty
    const consolidatedIncomeData = incomes.reduce((acc, income) => {
        const { date, amount } = income;
        const formattedDate = dateFormat(date);
        if (!acc[formattedDate]) {
            acc[formattedDate] = 0;
        }
        acc[formattedDate] += amount;
        return acc;
    }, {});

    // Pastelowe kolory
    const pastelColors = ['#FFD1DC', '#FFECB3', '#B2DFDB', '#FFCC80', '#D1C4E9'];

    const expenseData = {
        labels: Object.keys(consolidatedExpenseData),
        datasets: [
            {
                data: Object.values(consolidatedExpenseData),
                backgroundColor: pastelColors,
            }
        ]
    };

    const incomeData = {
        labels: Object.keys(consolidatedIncomeData),
        datasets: [
            {
                data: Object.values(consolidatedIncomeData),
                backgroundColor: pastelColors,
            }
        ]
    };

    return (
        <ChartContainer>
            <ChartStyled>
                <Doughnut data={expenseData} />
            </ChartStyled>
            <ChartStyled>
                <Doughnut data={incomeData} />
            </ChartStyled>
        </ChartContainer>
    );
}

const ChartContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    margin: 1rem;
    height: 100%;
`;

export default Chart;
