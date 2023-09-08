let submit = document.getElementById("submit");
let amount = document.getElementById("amount");
let description = document.getElementById("description");
let category = document.getElementById("category");
let table = document.getElementById("table");
let tableBody = document.getElementById("tableBody");


submit.addEventListener("click", (e => {
    var id = amount.value + category.value;
    e.preventDefault();
    console.log(id)
    if (amount.value == "" || description.value == "" || category.value == "") {
        alert("fill the values")
    }
    else {
        let data = {
            "amount": amount.value,
            "description": description.value,
            "category": category.value
        }
        let jsonData = JSON.stringify(data);
        localStorage.setItem(id, jsonData)

        let infoParsed = JSON.parse(localStorage.getItem(id));
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.className = "td1";
        td1.appendChild(document.createTextNode(infoParsed["amount"] + " "));
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td1.className = "td2";
        td2.appendChild(document.createTextNode(infoParsed["category"] + " "));
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td1.className = "td3";
        td3.appendChild(document.createTextNode(infoParsed["description"]));
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
        amount.value = "";
        description.value = "";
        category.value = "";
    }
    tableBody.addEventListener("click", del);
    tableBody.addEventListener("click", edit);
    function del(e) {
        if (e.target.classList.contains('delete')) {
            let ParEle = e.target.parentElement.parentElement;
            tableBody.removeChild(ParEle);
            let textContent = ParEle.textContent.split(" ");
            let id = textContent[0] + textContent[1];
            localStorage.removeItem(id)
        }
    }
    function edit(e) {
        if (e.target.classList.contains('edit')) {
            let ParEle = e.target.parentElement.parentElement;
            tableBody.removeChild(ParEle);
            let textContent = ParEle.textContent.split(" ");
            let id = textContent[0] + textContent[1];
            let data = localStorage.getItem(id);
            localStorage.removeItem(id);
            let dataParsed = JSON.parse(data);
            amount.value = dataParsed["amount"];
            description.value = dataParsed["description"];
            category.value = dataParsed["category"];
        }
    }
}));

