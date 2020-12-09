let employeePayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
    employeePayrollList = getEmployeePayrollDataFromStorage();
    createInnerHtml();
    document.querySelector("#emp-count").textContent = employeePayrollList.length;
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    let result=localStorage.getItem('EmployeePayrollList') ? 
    JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    return result;
}

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    if (employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const employee of employeePayrollList) {
        innerHtml = `${innerHtml}
    <tr>
    <td><img class="profile" alt="" src="${employee._picture}"> </td>
    <td>${employee._name}</td>
    <td>${employee._gender}</td>
    <td>${getDeptHtml(employee._department)}</td>
    <td>${employee._salary}</td>
    <td>${stringifyDate(employee._startDate)}</td>
    <td>
        <img id="${employee._name}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
        <img id="${employee._name}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
    </td>
 </tr>
    `;
    }
    document.querySelector("#display").innerHTML = innerHtml;
};

const getDeptHtml = (deptList) => {
    let deptHtml = "";
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
};

const remove = (node) => {
    let employeeData = employeePayrollList.find(empData => empData._name == node.id);
    if (!employeeData) return;
    const index = employeePayrollList
    .map(empData => empData._name).indexOf(employeeData._name);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
}

const update=(node)=>{
    let empPayrollData=employeePayrollList.find(empData => empData._name==node.id);
    if(!empPayrollData) return;
    localStorage.setItem('editEmp' , JSON.stringify(empPayrollData));
    window.location.replace(site_properties.add_emp_payroll_page);
}