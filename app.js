'use strict'
// Declaring Arrays
let department = ["Administration", "Marketing", "Development", "Finance"];
let level = ["Junior", "Mid-Senior", "Senior"];
let allEmployees = [];
console.log(allEmployees);

// Employee Constructor
function Employee(name, department, level, url, salary) {
    this.employeeID = generateEmployeeId(); // Assign generated ID
    this.fullName = name;
    this.department = department;
    this.level = level;
    this.url = url;
    this.salary = salary;
    allEmployees.push(this);
}

//Part AAA - Filling Employees Data (Creating Objects)

const ghazi = new Employee("Ghazi Samer","Administration","Senior","./assets/Ghazi.jpg")
const lana = new Employee("Lana Ali","Finance","Senior","./assets/Lana.jpg")
const tamara = new Employee("Tamara Ayoub","Marketing","Senior","./assets/Tamara.jpg")
const safi = new Employee("Safi Walid","Administration","Mid-Senior","./assets/Safi.jpg")
const omar = new Employee("Omar Zaid","Development","Senior","./assets/Omar.jpg")
const rana = new Employee("Rana Saleh","Development","Junior","./assets/Rana.jpg")
const hadi = new Employee("Hadi Ahmad","Finance","Mid-Senior","./assets/Hadi.jpg")

function renderInitialEmployees() { 
    allEmployees.forEach(employee => {
        employee.calculateSalary(); // Calculate salaries on load
        renderEmployeeCard(employee);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderInitialEmployees();
});
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
    const netSalary = this.salary - this.salary * 0.075;
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
        for (let i = 0; i < allEmployees.length; i++) {
            if (allEmployees[i].employeeID === generatedId) {
                unique = false; // Duplicate found!
                break; // Exit the for loop early
            }
        }
    }

    return generatedId;
}


// Form Handling 
let formElement = document.getElementById("form");

formElement.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default page reload
    console.log(event.target); // further explanation 
    let fname = document.getElementById("fname").value;
    let department = document.getElementById("department").value;
    let level = document.getElementById("level").value;
    let imageUrl = document.getElementById("image").value;
    const newEmployee = new Employee(fname, department, level, imageUrl);
    newEmployee.calculateSalary();
    renderEmployeeCard(newEmployee); // Render the card 
})

function renderEmployeeCard(employee) {
    const card = document.createElement('div');
    card.classList.add('card'); // further explanation

    // Image Container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container'); // further explanation
    const employeeImage = document.createElement('img');
    employeeImage.src = employee.url;
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
    document.getElementById("employeeCards").appendChild(card);}

// Notes :
// Constructor Object gets its values (Parameters) from linked Objects 
// Methods (Functions) give value to the objects through the prototype function exist in constructor 
// it has to be prototype function so it doesnt consume process power or memory unneeded (DRY)
// "this" a very strong method that update the constructor with new Key,Property