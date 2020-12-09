let isUpdate=false;
let employeePayrollObj={};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input',function(){
        if(name.value.length==0){
            setTextValue('.text-error',"");
            return ;
        }
        try{
            (new EmployeePayroll()).name=name.value;
            setTextValue('.text-error',"");
        }catch(e){
            setTextValue('.text-error',e);
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
        let startDate=getInputValueById('#day')+" "+
                        getInputValueById('#month')+" "+
                        getInputValueById('#year');
        try{
            (new EmployeePayroll()).startDate=startDate;
            // new Date(Date.parse(startDate));
            setTextValue('.date-error',"");
        }catch(e){
            setTextValue('.date-error',e);
        }
    });

    checkForUpdate();
});

const saveForm = () => {

    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_Page);
    } catch (e) {
        return;
    }
}


const setEmployeePayrollObject=()=>{
    employeePayrollObj._name=getInputValueById('#name');
    employeePayrollObj._picture=getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender=getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department=getSelectedValues('[#salary]');
    employeePayrollObj._salary=getInputValueById('#salary');
    employeePayrollObj._notes=getInputValueById('#notes');
    let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+
                getInputValueById('#year');
    employeePayrollObj._startDate=date;
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
    let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+
                getInputValueById('#year');
    employeePayroll.startDate=Date.parse(date);
    // employeePayroll.startDate = new Date(parseInt(document.getElementById("year").value), parseInt(document.getElementById("month").value) - 1, parseInt(document.getElementById("day").value));
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

const createAndUpdateStorage=()=> {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData=employeePayrollList.
                find(empData=>empData._id==employeePayrollObj._id)
        if(!empPayrollData){
            employeePayrollList.push(createEmployeePayroll());
        }else{
            const index=employeePayrollList
                        .map(empData => empData._id)
                        .indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1,createEmployeePayrollData(empPayrollData._id));
        }

    }else{
        employeePayrollList=[createEmployeePayroll()]
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}


const createEmployeePayrollData=(id)=>{
    let employeePayrollData=new EmployeePayroll();
    if(!id) employeePayrollData.id=createNewEmployeeId();
    else employeePayrollData.id=id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}


const setEmployeePayrollData=(employeePayrollData)=>{
    try{
        employeePayrollData.name=employeePayrollObj._name;
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.picture=employeePayrollObj._picture;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.notes = employeePayrollObj._notes;
    try{
        employeePayrollData.startDate=
            new Date(Date.parse(employeePayrollObj._startDate));
    }catch(e){
        setTextValue('.date-error',e);
        throw e;
    }
    alert(employeePayrollData.toString());

}


const createNewEmployeeId=()=>{
    let empID=localStorage.getItem("EmployeeID");
    empID=!empID?1:(parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}



const setForm=()=>{
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._picture);
    setSelectedValues('[name=gender]',
    employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary)
    setTextValue('.salary-output',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._notes);
    let date=stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    let array=new Array('','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
    let month=array.indexOf(date[1]);
    setValue('#month',month);
    setValue('#year',date[2]);
}

const setSelectedValues=(propertyValue,value)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked=true;
            }
        }
        else if(item.value === value)
            item.checked=true;
    });
}





const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
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
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex=(id,index)=>{
    const element=document.querySelector(id);
    element.setSelectedIndex=index;
}

const checkForUpdate=()=>{
    const employeePayrollJson=localStorage.getItem('editEmp');
    isUpdate=employeePayrollJson?true:false;
    if(!isUpdate) return;
    employeePayrollObj=JSON.parse(employeePayrollJson);
    setForm();
}

