window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayroll()).name = name.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });

    const startDate = document.querySelector('#date');
    startDate.addEventListener("input", function() {
        const day = document.getElementById("day").value;
        const month = document.getElementById("month").value;
        const year = document.getElementById("year").value;
        const dateError = document.querySelector(".date-error");
        try {
            (new EmployeePayroll()).startDate = new Date(parseInt(year),
            parseInt(month) - 1, parseInt(day));
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;
        }
    });
});

const saveForm = () => {
    try {
        let employeePayroll = createEmployeePayroll();
        createAndUpdateStorage(employeePayroll);
    } catch (e) {
        return
    }
}

const createEmployeePayroll = () => {
    let employeePayroll = new EmployeePayroll();
    try {
        employeePayroll.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayroll.picture = getSelectedValues('[name=profile]').pop();
    employeePayroll.gender = getSelectedValues('[name=gender]').pop();
    employeePayroll.department = getSelectedValues('[name=department]');
    employeePayroll.salary = getInputValueById('#salary');
    employeePayroll.notes = getInputValueById('#notes');
    employeePayroll.startDate = new Date(parseInt(document.getElementById("year").value), parseInt(document.getElementById("month").value) - 1, parseInt(document.getElementById("day").value));
    alert(employeePayroll.toString());
    return employeePayroll;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked) setItems.push(item.value);
    });
    return setItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

function createAndUpdateStorage(employeePayroll) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayroll);
    } else {
        employeePayrollList = [employeePayroll];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2020');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.getElementById(id);
    element.value = value;
}