var selectRow = null;
var employees = [];

updateAfterPageRefresh();



function onSubmitForm(){
    if(validate()){
        var formData = readForm();
        if(selectRow == null){
            insertNewRecord(formData);
        }
        else{
            updateRecord(formData);
        }
        resetForm();
    }
    
    
}
function readForm(){
    var formData = {};
    formData["Id"] = document.getElementById("Id").value;
    formData["Name"] = document.getElementById("Name").value;
    formData["Nit"] = document.getElementById("Nit").value;
    formData["fecha"] = document.getElementById("fecha").value;
    formData["direccion"] = document.getElementById("direccion").value;
    return formData
}
function insertNewRecord(formData){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.Id;
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = formData.Name;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = formData.Nit;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = formData.fecha;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = formData.direccion;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<a onClick=editForm(this)>Edit</a><a onClick=deleteRecord(this)>Delete</a>`
    employees.push(formData);
    localStorage.setItem("employees",JSON.stringify(employees));
}
function resetForm(){
    document.getElementById("Id").value = "";
    document.getElementById("Name").value = "";
    document.getElementById("Nit").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("direccion").value = "";
    selectRow = null;
}
function deleteRecord(a){
    var row = a.parentElement.parentElement
    if(confirm("Estas seguro de eliminar esta fila")){
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        employees.splice(row.rowIndex-1,1);
        localStorage.setItem("employees",JSON.stringify(employees));

    }
}
function editForm(a){
    selectRow = a.parentElement.parentElement;
    document.getElementById("Id").value = selectRow.cells[0].innerHTML;
    document.getElementById("Name").value = selectRow.cells[1].innerHTML;
    document.getElementById("Nit").value = selectRow.cells[2].innerHTML;
    document.getElementById("fecha").value = selectRow.cells[3].innerHTML;
    document.getElementById("direccion").value = selectRow.cells[4].innerHTML;
}
function updateRecord(formData){
    selectRow.cells[0].innerHTML = formData.Id;
    selectRow.cells[1].innerHTML = formData.Name;
    selectRow.cells[2].innerHTML = formData.Nit;
    selectRow.cells[3].innerHTML = formData.fecha;
    selectRow.cells[4].innerHTML = formData.direccion;
    employees.splice(selectRow.rowIndex-1,1,{Name:formData.Id,Name:formData.Name,Nit:formData.Nit,fecha:formData.fecha,direccion:formData.direccion});
    localStorage.setItem("employees",JSON.stringify(employees));
}
function validate(){
    isValid = true;
    if(document.getElementById("Name").value == ""){
        isValid = false;
        document.getElementById("labelId").classList.remove("hide");
    }
    else{
        isValid = true;
        if(!document.getElementById("labelId").classList.contains("hide")){
            document.getElementById("labelId").classList.add("hide");
        }
    }
    return isValid;
}

function updateAfterPageRefresh(){
    if(localStorage.getItem("employees")==null){
        console.log("No hay nada en el almacenamiento local.")
    }
    else{
        employees = JSON.parse(localStorage.getItem("employees"));
        for (let index = 0; index < employees.length; index++) {
            let id = employees[index].Id;
            let nombre = employees[index].Name;
            let nit = employees[index].Nit;
            let fecha = employees[index].fecha;
            let direccion = employees[index].direccion;

            document.getElementById("tbody").innerHTML +=
            `<tr>
                <td>${nombre}</td>
                <td>${id}</td>
                <td>${fecha}</td>
                <td>${direccion}</td>
                <td><a onClick=editForm(this)>Edit</a><a onClick=deleteRecord(this)>Delete</a></td>
            </tr>
            `
            
        }
    }
    
}
