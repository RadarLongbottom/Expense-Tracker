import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { InnerLayout } from "../../styles/Layouts";
import IncomeItem from "../IncomeItem/IncomeItem";
import { useGlobalContext } from "../../context/globalContext";

function Transactions() {
    const { incomes, getIncomes, expenses, getExpenses, deleteIncome, deleteExpense } = useGlobalContext();
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    const filteredIncomes = incomes.filter((income) => {
        const incomeDate = new Date(income.date);
        return (
            (!dateRange.startDate || incomeDate >= dateRange.startDate) &&
            (!dateRange.endDate || incomeDate <= dateRange.endDate)
        );
    });

    const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
            (!dateRange.startDate || expenseDate >= dateRange.startDate) &&
            (!dateRange.endDate || expenseDate <= dateRange.endDate)
        );
    });

    return (
        <TransactionsStyled>
            <InnerLayout>
                <h1>Transakcje</h1>

                {/* Date range selection with the same styling as in Form */}
                <div className="date-range">
                    <DatePicker
                        className="input-control"  // Apply the same styling as input controls
                        selected={dateRange.startDate}
                        onChange={(date) => setDateRange({ ...dateRange, startDate: date })}
                        selectsStart
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        placeholderText="Wybierz datę początkową"
                        dateFormat="dd/MM/yyyy"
                    />
                    <DatePicker
                        className="input-control"  // Apply the same styling as input controls
                        selected={dateRange.endDate}
                        onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
                        selectsEnd
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        minDate={dateRange.startDate}
                        placeholderText="Wybierz datę końcową"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>

                <div className="labels">
                    <h2><span>Przychody</span></h2>
                    <h2><span>Wydatki</span></h2>
                </div>

                <div className="transaction-content">
                    <div className="column">
                        <div className="transactions">
                            {filteredIncomes.length === 0 && (
                                <p>Brak transakcji w wybranym okresie dla przychodów</p>
                            )}
                            {filteredIncomes.map((income) => {
                                 return <IncomeItem
                                key={income._id}
                                id={income._id}
                                title={income.title}
                                description={income.description}
                                amount={income.amount}
                                date={income.date}
                                type={income.type}
                                indicatorColor="var(--color-green)"
                                category={income.category}
                                deleteItem={deleteIncome}
                            />
                            })}
                        </div>
                    </div>

                    <div className="column">
                        <div className="transactions">
                            {filteredExpenses.length === 0 && (
                                <p>Brak transakcji w wybranym okresie dla wydatków</p>
                            )}
                            {filteredExpenses.map((expense) => {
                                return <IncomeItem
                                key={expense._id}
                                id={expense._id}
                                title={expense.title}
                                description={expense.description}
                                amount={expense.amount}
                                date={expense.date}
                                type={expense.type}
                                indicatorColor="var(--color-red)"
                                category={expense.category}
                                deleteItem={deleteExpense}
                            />
                            })}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </TransactionsStyled>
    );
}

const TransactionsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .transaction-content {
        display: flex;
        gap: 2rem;

        .column {
            flex: 1;
            overflow: auto;
            max-height: 660px;
        }
    }

    .labels {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;

        span {
            font-weight: bold;
        }
    }

    /* Additional styles for date range selection */
    .date-range {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);

        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }

    .selects {
        display: flex;
        justify-content: flex-end;

        select {
            color: rgba(34, 34, 96, 0.4);

            &:focus, &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }
`;
export default Transactions;
