// Calculate department statistics
function calculateDepartmentStatistics(employees) {
    let departmentStats = {};

    employees.forEach(employee => {
        if (!departmentStats[employee.department]) {
            departmentStats[employee.department] = { count: 0, totalSalary: 0 };
        }
        departmentStats[employee.department].count++;
        departmentStats[employee.department].totalSalary += employee.salary;
    });

    Object.keys(departmentStats).forEach(department => {
        departmentStats[department].averageSalary = departmentStats[department].totalSalary / departmentStats[department].count;
    });

    return departmentStats;
}

// Render department statistics in a table
function renderDepartmentStatistics(departmentStats) {
    let table = `
        <table>
            <thead>
                <tr>
                    <th>Department</th>
                    <th># of Employees</th>
                    <th>Total Salary</th>
                    <th>Average Salary</th>
                </tr>
            </thead>
            <tbody>
    `;

    let totalEmployees = 0;
    let totalSalary = 0;

    Object.keys(departmentStats).forEach(department => {
        let stats = departmentStats[department];
        totalEmployees += stats.count;
        totalSalary += stats.totalSalary;

        table += `
            <tr>
                <td>${department}</td>
                <td>${stats.count}</td>
                <td>${stats.totalSalary.toFixed(2)}</td>
                <td>${stats.averageSalary.toFixed(2)}</td>
            </tr>
        `;
    });

    let averageSalaryAllDepartments = totalSalary / totalEmployees;

    table += `
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>${totalEmployees}</td>
                    <td>${totalSalary.toFixed(2)}</td>
                    <td>${averageSalaryAllDepartments.toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>
    `;

    document.getElementById('accountingTable').innerHTML = table;
}

// Load employees from local storage
function loadEmployeesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('employees')) || [];
}

// Calculate and render department statistics
function calculateAndRenderDepartmentStatistics() {
    let employees = loadEmployeesFromLocalStorage();
    let departmentStats = calculateDepartmentStatistics(employees);
    renderDepartmentStatistics(departmentStats);
}

// Calculate and render department statistics when the page loads
calculateAndRenderDepartmentStatistics()