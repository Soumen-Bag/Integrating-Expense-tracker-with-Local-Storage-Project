// index.js

document.addEventListener('DOMContentLoaded', function () {
    // Event listener for the "Add Expense" button
    document.getElementById('addExpense').addEventListener('click', addExpense);

    // Load existing expenses on page load
    loadExpenses();
});

function addExpense() {
    // Get input values
    const expenseInput = document.getElementById('expense');
    const descriptionInput = document.getElementById('description');
    const categorySelect = document.querySelector('select[name="Choose a category"]');

    const amount = parseFloat(expenseInput.value.trim());
    const description = descriptionInput.value.trim();
    const category = categorySelect.value;

    if (isNaN(amount) || amount <= 0 || description === '') {
        alert('Please enter valid expense details.');
        return;
    }

    // Create expense object
    const expenseObject = {
        id: new Date().getTime(),
        amount: amount,
        description: description,
        category: category
    };

    // Get existing expenses from local storage
    let expenses = getExpenses();

    // Add the new expense to the array
    expenses.push(expenseObject);

    // Save the updated expenses array to local storage
    setExpenses(expenses);

    // Clear input fields
    expenseInput.value = '';
    descriptionInput.value = '';

    // Reload and display the updated expense list
    loadExpenses();
}

// function loadExpenses() {
//     // Get existing expenses from local storage
//     const expenses = getExpenses();

//     // Get the user list container
//     const userListItems = document.getElementById('userListItems');

//     // Clear previous content
//     userListItems.innerHTML = '';

//     // Loop through expenses and display them
//     expenses.forEach(function (expense) {
//         const listItem = document.createElement('li');
//         listItem.textContent = `Expense: $${expense.amount} - Description: ${expense.description} - Category: ${expense.category}`;

//         userListItems.appendChild(listItem);
//     });
// }

function getExpenses() {
    // Get expenses from local storage or initialize an empty array
    const expensesString = localStorage.getItem('expenses');
    return expensesString ? JSON.parse(expensesString) : [];
}

function setExpenses(expenses) {
    // Save expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// index.js

// ... (previous code)

function loadExpenses() {
    // Get existing expenses from local storage
    const expenses = getExpenses();

    // Get the user list container
    const userListItems = document.getElementById('userListItems');

    // Clear previous content
    userListItems.innerHTML = '';

    // Loop through expenses and display them
    expenses.forEach(function (expense) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span> ${expense.amount} - ${expense.description} - ${expense.category}</span>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
            <button onclick="editExpense(${expense.id})">Edit</button>
        `;

        userListItems.appendChild(listItem);
    });
}

// ... (other functions)

// Function to delete an expense
function deleteExpense(id) {
    let expenses = getExpenses();
    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });
    setExpenses(expenses);
    loadExpenses();
}

// Function to edit an expense
function editExpense(id) {
    // Find the expense with the given ID
    const expenses = getExpenses();
    const selectedExpense = expenses.find(expense => expense.id === id);

    // Prompt the user to edit the expense details
    const editedAmount = prompt('Edit Expense Amount:', selectedExpense.amount);
    const editedDescription = prompt('Edit Description:', selectedExpense.description);
    const editedCategory = prompt('Edit Category:', selectedExpense.category);

    // Update the selected expense with the edited values
    if (editedAmount !== null && editedDescription !== null && editedCategory !== null) {
        selectedExpense.amount = parseFloat(editedAmount);
        selectedExpense.description = editedDescription;
        selectedExpense.category = editedCategory;

        // Save the updated expenses array to local storage
        setExpenses(expenses);

        // Reload and display the updated expense list
        loadExpenses();
    }
}

