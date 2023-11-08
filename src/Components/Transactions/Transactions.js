import React, { useEffect } from "react";
import styled from 'styled-components';
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import IncomeItem from "../IncomeItem/IncomeItem";


function Transactions() {
    const { incomes, getIncomes, expenses, getExpenses, deleteIncome, deleteExpense } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <TransactionsStyled>
            <InnerLayout>
                <h1>Transakcje</h1>
                <div className="labels">
                    <h2><span>Przychody</span></h2>
                    <h2><span>Wydatki</span></h2>
                </div>
                <div className="transaction-content">
                    <div className="column">
                        <div className="transactions">
                            {incomes.map((income) => {
                                const { _id, title, amount, date, category, description, type } = income;
                                return <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    indicatorColor="var(--color-green)"
                                    category={category}
                                    deleteItem={deleteIncome}
                                />
                            })}
                        </div>
                    </div>
                    <div className="column">
                        <div className="transactions">
                            {expenses.map((expense) => {
                                const { _id, title, amount, date, category, description, type } = expense;
                                return <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    indicatorColor="var(--color-red)"
                                    category={category}
                                    deleteItem={deleteExpense}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </TransactionsStyled>
    )
}

const TransactionsStyled = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
    }
    .labels span {
        font-weight: bold;
    }

    .transactions .amount,
    .transactions .date,
    .transactions .description {
        font-size: .8rem; /* Zmniejsz czcionkę dla kwoty, daty i opisu. */
    }
};
`
export default Transactions;
