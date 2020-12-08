window.addEventListener('DOMContentLoaded',(event)=>{
    const name=document.querySelector('#name');
    const textError=document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length==0){
            textError.textContent="";
            return;
        }
        try{
            (new EmployeePayrollData()).name=name.value;;
            textError.textContent="";
        }catch(e){
            textError.textContent=e;                      
        }
    });

    const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input',function(){
    output.textContent=salary.value;
    })

    const startDate = document.querySelector('#date');
    startDate.addEventListener("input", function() {
        const day = document.getElementById("day").value;
        const month = document.getElementById("month").value;
        const year = document.getElementById("year").value;
        const dateError = document.querySelector(".date-error");
        try {
            (new EmployeePayrollData()).startDate = new Date(parseInt(year),
            parseInt(month) - 1, parseInt(day));
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;
        }
    });

})


const save=()=>{
    try {
        let employeePayrollData=createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (error) {
        return;
    }
}

const createEmployeePayroll=()=>{
    let employeePayrollData=new EmployeePayrollData();
    try {
        employeePayrollData.name=getInputValueById('#name');
    } catch (error) {
        setTextValue('.text-error',e);
        throw e;
    }

    employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
    employeePayrollData.department=getSelectedValues('[name=department]');
    employeePayrollData.salary=getInputValueById('#salary');
    employeePayrollData.note=getInputValueById('#notes');
    employeePayrollData.startDate = new Date(parseInt(document.getElementById("year").value),
                             parseInt(document.getElementById("month").value) - 1, 
                             parseInt(document.getElementById("day").value));
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues=(propertyValue)=>{
    let allItmes=document.querySelectorAll(propertyValue);
    let selItems=[];
    allItmes.forEach(item =>{
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById=(id)=>{
    let value=document.querySelector(id).value;
    return value;
}    

const getInputElementValue=(id)=>{
    let value=document.getElementById(id).value;
    return value;
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }
    else{
        employeePayrollList=[employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}

const resetForm=()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}

const unsetSelectedValues=(propertyValue)=>{
    let allItmes=document.querySelectorAll(propertyValue);
    allItmes.forEach(item=>{
        item.checked=false;
    });
}

const setTextValue=(id,value)=>{
    const element=document.querySelector(id);
    element.textContent=value;
}

const setValue=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}