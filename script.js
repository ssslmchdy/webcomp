class ExpenseCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.expenses = [];
        this.total = 0;
        this.shadowRoot.innerHTML = `
            <style>
                .expanse-calculator{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border: 1px solid black;
                    border-radius: 20px;
                }
                input{
                    height: 25px;
                    border-radius: 20px;
                }
                button{
                    height: 30px;
                    border-radius: 20px;
                }
                button:hover{
                    background-color: gray;
                    transition: 0.2s;
                }
                #expense-list{
                    display: flex;
                    align-items: center;
                    margin: 20px;
                }
                .card{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid black;
                    border-radius: 10px;
                    padding: 5px;
                    width: fit-content;
                    height: 200px;
                    margin: 10px;
                }
                .card > button{
                    width: 100px;
                    border-radius: 10px;
                }
            </style>
            <div class='expanse-calculator'>
                <h1>Калькулятор расходов</h1>
                <form id="expense-form">
                    <input type="text" id="expense-name" placeholder="Расход" required>
                    <input type="number" id="expense-amount" placeholder="Сумма" required>
                    <button type="submit">Добавить</button>
                </form>
                <div id="expense-list"></div>
                <h2>Общая сумма расходов: <span id="total-expenses">0</span></h2>
            </div>
        `;

        this.shadowRoot.getElementById('expense-form').addEventListener('submit', this.addExpense.bind(this));
    }

    addExpense(event) {
        event.preventDefault();
        const nameInput = this.shadowRoot.getElementById('expense-name');
        const amountInput = this.shadowRoot.getElementById('expense-amount');
        const name = nameInput.value;
        const amount = +amountInput.value;
        if (name.trim() === '' || amount <= 0) {
            alert('Неправильно введено имя, или сумма меньше или равна 0');
            return;
        }
        this.expenses.push({ name, amount });
        this.total += amount;
        this.displayExpenses();
        this.updateTotal();
        nameInput.value = '';
        amountInput.value = '';
    }

    displayExpenses() {
        const expenseList = this.shadowRoot.getElementById('expense-list');
        expenseList.innerHTML = '';
        this.expenses.forEach((expense, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class='card'>
                <p>Название расхода:${expense.name}</p>
                <p>Потрачено: ${expense.amount} рублей</p>
                <button data-index="${index}">Удалить</button>
                </div>
            `;
            expenseList.appendChild(div);
            div.querySelector('button').addEventListener('click', this.deleteExpense.bind(this));
        });
    }

    updateTotal() {
        const totalExpenses = this.shadowRoot.getElementById('total-expenses');
        totalExpenses.textContent = this.total;
    }

    deleteExpense(event) {
        const index = event.target.dataset.index;
        const deletedAmount = this.expenses[index].amount;
        this.expenses.splice(index, 1);
        this.total -= deletedAmount;
        this.displayExpenses();
        this.updateTotal();
    }
}

customElements.define('expense-calculator', ExpenseCalculator);