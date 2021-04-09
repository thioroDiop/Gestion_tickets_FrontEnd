let lineCounter = 1;

document.getElementById("help-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("input-name").value;

    const ligne = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = "#" + lineCounter;
    ligne.appendChild(td1);

    const td2 = document.createElement("td");
    td2.textContent = name;
    ligne.appendChild(td2);

    const td3 = document.createElement("td");
    const button = document.createElement("button");
    button.textContent = "Je passe mon tour";
    td3.appendChild(button);
    ligne.appendChild(td3);

    const table = document.getElementById("table-body");
    table.appendChild(ligne);

    lineCounter++;
});
