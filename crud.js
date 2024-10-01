let data = [
    { id: 1, firstName: "Rohan", lastName: "Singh", age: 25 },
    { id: 2, firstName: "Ashish", lastName: "Sharma", age: 30 }
];

let isUpdate = false;
let editId = 0;

document.addEventListener("DOMContentLoaded", readAll);

function readAll() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    data.forEach((item, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.id}</td>
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>${item.age}</td>
                <td>
                    <button class="btn btn-primary" onclick="handleEdit(${item.id})">Edit</button>
                    <button class="btn btn-danger" onclick="handleDelete(${item.id})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function handleSave() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const age = document.getElementById("age").value;

    if (!firstName || !lastName || !age || isNaN(age) || age <= 0) {
        alert("Please enter valid data");
        return;
    }

    if (isUpdate) {
        const index = data.findIndex(item => item.id === editId);
        data[index].firstName = firstName;
        data[index].lastName = lastName;
        data[index].age = age;
        isUpdate = false;
        editId = 0;
    } else {
        const newObject = {
            id: data.length + 1,
            firstName: firstName,
            lastName: lastName,
            age: age
        };
        data.push(newObject);
    }

    handleClear();
    readAll();
}

function handleEdit(id) {
    const person = data.find(item => item.id === id);
    document.getElementById("firstName").value = person.firstName;
    document.getElementById("lastName").value = person.lastName;
    document.getElementById("age").value = person.age;

    isUpdate = true;
    editId = id;
}

function handleDelete(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        data = data.filter(item => item.id !== id);
        readAll();
    }
}

function handleClear() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("age").value = "";
    isUpdate = false;
    editId = 0;
}
