// 'use strict'
// // Declaring Arrays
// let department = ["Administration", "Marketing", "Development", "Finance"];
// let level = ["Junior", "Mid-Senior", "Senior"];
let min;
let max;
let employees = [];

// Employee Constructor
function Employee(fullName, department, level, imageUrl, salary) {
    this.employeeID = generateEmployeeId(); // Assign generated ID
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imageUrl = imageUrl;
    this.salary = salary;
    employees.push(this);
}

// Salary Calculation

Employee.prototype.calculateSalary = function () {
    let levelSalary;
    switch (this.level) {
        case 'Junior': levelSalary = getRandomSalary(500, 1000);
            break;
        case 'Mid-Senior': levelSalary = getRandomSalary(1000, 1500);
            break;
        case 'Senior': levelSalary = getRandomSalary(1500, 2000);
            break;
        default:
            break;
    }
    this.salary = levelSalary;
    const netSalary = Math.floor(this.salary - this.salary * 0.075);
    return (this.salary = netSalary);// further explanation
}
function getRandomSalary(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    let result = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    return result;
}

// Unique ID Generation
function generateEmployeeId() {

    let unique = false;
    let generatedId;

    // Uniquness Checking      
    while (!unique) {
        generatedId = Math.floor(Math.random() * 9000) + 1000;

        unique = true; // Assume it's unique initially  

        // Check against existing employees using a for loop:
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeID === generatedId) {
                unique = false; // Duplicate found!
                break; // Exit the for loop early
            }
        }
    }

    return generatedId;
}

// Function to save employees to Local Storage
function saveEmployeesToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Function to load employees from Local Storage
function loadEmployeesFromLocalStorage() {
    let storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
        employees = JSON.parse(storedEmployees).map(employee => new Employee( employee.fullName, employee.department, employee.level, employee.imageUrl));
    }
}

// Form Handling 
let formElement = document.getElementById("fillingForm");

formElement.addEventListener("submit", handleForm);
    function handleForm(event){
    event.preventDefault(); // Prevent default page reload
    let fname = document.getElementById("fName").value;
    let department = document.getElementById("department").value;
    let level = document.getElementById("level").value;
    let image = document.getElementById("image").value;
    const salary = Employee.prototype.calculateSalary();
    const employee = new Employee( fname, department, level, image,salary);
    // employee.generateEmployeeId();
    // employee.calculateSalary();
    // employees.push(employee);
    saveEmployeesToLocalStorage();
    renderEmployeeCard(employee); // Render the card 
}

function renderEmployeeCard(employee) {
    const cardContainer = document.getElementById("employeeCards"); // Get the container

    const card = document.createElement('div');
    card.classList.add('card'); // further explanation

    // Image Container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container'); // further explanation
    const employeeImage = document.createElement('img');
    employeeImage.src = employee.imageUrl;
    employeeImage.alt = employee.fullName;
    imageContainer.appendChild(employeeImage);

    // Info Container
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container'); // further explanation
    infoContainer.innerHTML = `
              <h2>${employee.fullName} - ${employee.employeeID} </h2>
              <p>Department: ${employee.department}</p>
              <p>Level: ${employee.level}</p>
              <p>Salary: ${employee.salary}</p>
            `;

    // Append elements to the card
    card.appendChild(imageContainer);
    card.appendChild(infoContainer);

    // Append card to the DOM
    cardContainer.appendChild(card);
}

//Part AAA - Filling Employees Data (Creating Objects)
 employees = [
    new Employee("Ghazi Samer","Administration","Senior","./assets/Ghazi.jpg"),
    new Employee("Lana Ali","Finance","Senior","./assets/Lana.jpg"),
    new Employee("Tamara Ayoub","Marketing","Senior","./assets/Tamara.jpg"),
    new Employee("Safi Walid","Administration","Mid-Senior","./assets/Safi.jpg"),
    new Employee("Omar Zaid","Development","Senior","./assets/Omar.jpg"),
    new Employee("Rana Saleh","Development","Junior","./assets/Rana.jpg"),
    new Employee("Hadi Ahmad","Finance","Mid-Senior","./assets/Hadi.jpg"),
];

    // Initial rendering
    function renderInitialEmployees() { 
        employees.forEach(employee => {
            employee.calculateSalary(); // Calculate salaries on load
            renderEmployeeCard(employee);
        });
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        loadEmployeesFromLocalStorage(); // Load first
        employees.forEach(employee => {
            employee.calculateSalary();
            renderEmployeeCard(employee);

    });
    })


// // Notes :
// // Constructor Object gets its values (Parameters) from linked Objects 
// // Methods (Functions) give value to the objects through the prototype function exist in constructor 
// // it has to be prototype function so it doesnt consume process power or memory unneeded (DRY)
// // "this" a very strong method that update the constructor with new Key,Property