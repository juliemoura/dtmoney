import React, { useContext } from 'react';
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { TransactionsContext } from "../../TransactionsContext";

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  /**calculando o valor total de depositos */
  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type == 'deposit'){
      acc.deposits += transaction.amount; /**se for deposito, eu so vou somar o novo valor com o valor que ja tinha */
      acc.total += transaction.amount; /**se for deposito, eu so vou somar o valor novo ao total*/
    }
    else {
      acc.withdraws += transaction.amount; /**se for retirada, eu so vou diminuir o novo valor com o valor que ja tinha */
      acc.total -= transaction.amount;  /**se for retirada, eu so vou diminuir o valor novo ao total*/
    }

    return acc; /**retornando com as mudancas realizadas */
  }, { 
    deposits: 0,
    withdraws: 0,
    total: 0,
  })
  
  return (
      <Container>
        <div>
          <header>
            <p>Entradas</p>
            <img src={incomeImg} alt="Entradas" />
          </header>
          <strong>
            {new Intl.NumberFormat("pt-BR", {
                  style: "currency" /**para dar o style de valor de moeda*/,
                  currency: "BRL" /**o tipo de moeda*/,
                }).format(summary.deposits)}
            </strong>
        </div>
        <div>
          <header>
            <p>Saídas</p>
            <img src={outcomeImg} alt="Saídas" />
          </header>
          <strong> -
          {new Intl.NumberFormat("pt-BR", {
                  style: "currency" /**para dar o style de valor de moeda*/,
                  currency: "BRL" /**o tipo de moeda*/,
                }).format(summary.withdraws)}  
          </strong>
        </div>
        <div className="highlight-background">
          <header>
            <p>Total</p>
            <img src={totalImg} alt="Total" />
          </header>
          <strong>
          {new Intl.NumberFormat("pt-BR", {
                  style: "currency" /**para dar o style de valor de moeda*/,
                  currency: "BRL" /**o tipo de moeda*/,
                }).format(summary.total)}
          </strong>
        </div>
      </Container>
  );
}
