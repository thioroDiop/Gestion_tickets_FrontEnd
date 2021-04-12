let lineCounter = 1;
let lastHelpRequestName = "";

document.getElementById("help-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Je récupère le nom de la personne qui veut de l'aide
    const name = document.getElementById("input-name").value;

    if (name !== lastHelpRequestName) {
        // Je m'occupe de créer une nouvelle ligne dans le tableau
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

        button.addEventListener("click", function () {
           // if (button.parentElement.parentElement.style.textDecoration === "line-through") {
           //     button.parentElement.parentElement.style.textDecoration = "none";
           //     button.textContent = "Je passe mon tour";
           // } else {
           //     button.parentElement.parentElement.style.textDecoration = "line-through";
           //     button.textContent = "Je veux mon tour";
           // }

            if (button.parentElement.parentElement.className === "line-through") {
                button.parentElement.parentElement.className = "";
                button.textContent = "Je passe mon tour";
            } else {
                button.parentElement.parentElement.className = "line-through";
                button.textContent = "Je veux mon tour";
            }
        });

        td3.appendChild(button);
        ligne.appendChild(td3);

        const table = document.getElementById("table-body");
        table.appendChild(ligne);

        // J'incrémente mon compteur de personnes qui ont besoin d'aide
        lineCounter++;

        // Je met à jour le lastHelpRequestName
        lastHelpRequestName = name;

        // A la fin, on vide le champ input pour pouvoir mettre un nouveau nom.
        document.getElementById("input-name").value = "";
    } else {
        alert("Tu es déjà dans la liste mon coco.");
    }
});

document.getElementById("button-next").addEventListener("click", function () {
    const nameTable = document.getElementById("table-body");

    if (nameTable.firstElementChild !== null) {
        nameTable.removeChild(nameTable.firstElementChild);
    }

    // const tableRows = document.getElementsByTagName("tr");
    // if (tableRows.length > 1)
    //     tableRows[1].remove();
});
