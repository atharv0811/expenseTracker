let submit = document.getElementById("submit");
let amount = document.getElementById("amount");
let description = document.getElementById("description");
let category = document.getElementById("category");
let table = document.getElementById("table");
let tableBody = document.getElementById("tableBody");

window.addEventListener("DOMContentLoaded", async () => {
    await create();
});

submit.addEventListener("click", (e => {
    e.preventDefault();
    if (amount.value == "" || description.value == "" || category.value == "") {
        alert("fill the values")
    }
    else {
        let amountVal = amount.value;
        let descriptionVal = description.value;
        let categoryVal = category.value;
        if (submit.value === 'Add') {
            axios.post('/post-data', { amountVal, descriptionVal, categoryVal }).then(create()).catch(err => console.log(err));
        }
        else if (submit.value === "Update") {
            let id = submit.getAttribute("id");
            axios.post('/editdata', { id, amountVal, descriptionVal, categoryVal }).then(() => {
                create();
                submit.removeAttribute('id');
                submit.value = 'Add';
            }).catch(err => console.log(err));
        }
    }
}));

tableBody.addEventListener("click", del);
tableBody.addEventListener("click", edit);

async function create() {
    let response = await axios.get('/getData');
    let infoParsed = response.data;
    tableBody.innerText = '';
    for (let i = 0; i < infoParsed.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute('data-id', infoParsed[i].id);
        let td1 = document.createElement("td");
        td1.className = "td1";
        td1.setAttribute("attr", infoParsed["amount"])
        td1.appendChild(document.createTextNode(infoParsed[i].amount));
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.className = "td2";
        td2.appendChild(document.createTextNode(infoParsed[i].category));
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.className = "td3";
        td3.appendChild(document.createTextNode(infoParsed[i].description));
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td1.className = "td4";
        var delbutton = document.createElement('button');
        delbutton.className = "btn btn-danger btn-sm float-right m-0 delete w-25";
        delbutton.appendChild(document.createTextNode("X"));

        var Editbutton = document.createElement('button');
        Editbutton.className = "btn mr-1 btn-info btn-sm float-right ms-2 edit w-25";
        Editbutton.appendChild(document.createTextNode("Edit"));
        td4.appendChild(delbutton)
        td4.appendChild(Editbutton)
        tr.appendChild(td4)
        tableBody.appendChild(tr);
    }
    amount.value = "";
    description.value = "";
    category.value = "";
}

async function del(e) {
    if (e.target.classList.contains('delete')) {
        let ParEle = e.target.parentElement.parentElement;
        let id = ParEle.getAttribute('data-id');
        try {
            await axios.post('/delete-user', { id });
            tableBody.removeChild(ParEle);
            await create();
        }
        catch (error) {
            console.error('Error deleting data: ', error);
        }
    }
}

async function edit(e) {
    if (e.target.classList.contains('edit')) {
        let ParEle = e.target.parentElement.parentElement;
        let id = ParEle.getAttribute('data-id');
        let response = await axios.post('/getdatasingle', { id });
        let infoParsed = response.data;
        amount.value = infoParsed.amount;
        description.value = infoParsed.description;
        category.value = infoParsed.category;
        submit.setAttribute('id', id);
        tableBody.removeChild(ParEle);
        submit.value = "Update";
    }
}


