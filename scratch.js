let lineCounter = 1;
let lastHelpRequestName = "";
const baseApiUrl = "http://localhost:8080/api/"

//fonction mettre a jour un ticket
//function updateLine(id){
/* let request = {
    // On choisit la méthode
    method: "PUT",
    // On définit le corps de la requête
    body: JSON.stringify({
        date: new Date(),
        description: document.getElementById("input-description").value,
        learnerIdx: document.getElementById("learner-select").value,
        solved: true
    }),
    // On dit qu'on envoit du JSON
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}*/
//methode PUT dans le fetch
//     choice="tickets/"+id
// fetch(baseApiUrl + choice, {method: "PUT"}).then(function (response) {
//     response.json().then(function (result) {
//         console.log(result);// le resultat de la methode POST est le nouveau ticket
//
//     })
// })










//fonction pour créer les lignes de la table Ticket, avec les colonnes comme paramétre
function createLine(id, date, description, appreunant, solved){

    let tablerow = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerText =  id;

    let td2 = document.createElement("td");
    td2.innerText = date;

    let td3 = document.createElement("td");
    td3.innerText = description;

    let td4 = document.createElement("td");
    td4.id=appreunant;
    td4.innerText = appreunant;

    let td5 = document.createElement("td");
    td5.innerText = solved
// la 6ieme colonne contient un bouton
    const td6 = document.createElement("td");
    const button = document.createElement("button");
    button.id=id;
    button.textContent = "Je passe mon tour";

    button.addEventListener("click", function () {
        //2iem click
        if (button.parentElement.parentElement.className === "line-through") {

            //modifier la base de données pour remettre le statut du ticket en false
            let request2 = {
                // On choisit la méthode
                method: "PUT",
                // On définit le corps de la requête
                body: JSON.stringify({
                    id:id,
                    date: date,
                    description: description,
                    learnerIdx: appreunant,
                    solved: solved
                }),
                // On dit qu'on envoit du JSON
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            choice="tickets/"+id
            fetch(baseApiUrl + choice,request2 ).then(function (response) {
                response.json().then(function (result) {
                    console.log(result);// le resultat de la methode POST est le nouveau ticket
//lorsqu'on reclick les lignes ne sont plus barré
                    button.parentElement.parentElement.className = "";
                    button.textContent = "Je passe mon tour";
                    td5.innerText=(solved);

                })
            })



        } else {//lorsqu'on clique sur le bouton les lignes est barré

            button.parentElement.parentElement.className = "line-through";
                    button.textContent = "Je veux mon tour";

                    //on appele la fonction PUT pour modifier le statut courant
            let request = {
                // On choisit la méthode
                method: "PUT",
                // On définit le corps de la requête
                body: JSON.stringify({
                    id:id,
                    date: date,
                    description: description,
                    learnerIdx: appreunant,
                    solved: !solved
                }),
                // On dit qu'on envoit du JSON
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
                }

           choice="tickets/"+id
            fetch(baseApiUrl + choice,request ).then(function (response) {
                response.json().then(function (result) {
                    console.log(result);// le resultat de la methode POST est le nouveau ticket
                    button.parentElement.parentElement.className = "line-through";
                    button.textContent = "Je veux mon tour";
                    td5.innerText=(!solved);

            })
            })

        }
    });
    td6.appendChild(button);

    tablerow.appendChild(td1);
    tablerow.appendChild(td2);
    tablerow.appendChild(td3);
    tablerow.appendChild(td4);
    tablerow.appendChild(td5);
    tablerow.appendChild(td6);

    return tablerow;

}

// Fonction pour afficher la liste des learners sur l'en-tête
function printLearner(baseApiUrl) {
    let choice = "learners"
//Appel API avec le methode GET
    fetch(baseApiUrl + choice).then(function (response) {
        response.json().then(function (result) {

            //Permet de vider le tableau de ses précédentes valeurs
            //document.getElementById('table-body').innerHTML = "";
            console.log(result);

            let select=document.getElementById("learner-select");
            for (let i = 0; i < result.length; i++) {
                let option = document.createElement("option");
                option.innerText = result[i]["firstName"] + ' ' + result[i]["lastName"];
                option.value = result[i]["id"];
                select.appendChild(option);
            }
        })
    })
}


// Fonction pour afficher les tickets
function printTickets(baseApiUrl) {
    let choice = "tickets"
//Appel API
    fetch(baseApiUrl + choice).then(function (response) {
        response.json().then(function (result) {

            //Permet de vider le tableau de ses précédentes valeurs
            document.getElementById('table-body').innerHTML = "";

            let tableBody = document.getElementById("table-body");
            for (let i = 0; i < result.length; i++) {
                tableBody.appendChild(createLine(result[i].id, result[i].date, result[i].description, result[i].learnerIdx, result[i].solved));
            }
        })
    })
}


//fonction Bouton ajout de ticket "Je veux de l'aide"
document.getElementById("help-form").addEventListener("submit", function (event) {
    event.preventDefault();

//On recherche si l'idLearner est présent dans les tickets
    let idLearner = document.getElementById("learner-select").value
//Recherche de cet Id dans le tableau
    let collection = document.getElementById("table-body").getElementsByTagName("td");
    let trouve = false;
    for (let i = 0; i < collection.length; i++)
    {
        if (collection[i]["id"] == idLearner) {
            alert("Tu es déjà dans la liste Coco!");
            trouve = true;
            break;
        }
    }
//Si l'id n'existe pas, on insère le ticket
    if (!trouve) {//si  l'id n'est pas dans la liste des tickets

         // on prepare le body request
        let requestDetails = {
            // On choisit la méthode
            method: "POST",
            // On définit le corps de la requête
            body: JSON.stringify({
                date: new Date(),
                description: document.getElementById("input-description").value,
                learnerIdx: document.getElementById("learner-select").value,
                solved: false
            }),
            // On dit qu'on envoit du JSON
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        //methode POST dans le fetch
        fetch(baseApiUrl + 'tickets', requestDetails).then(function (response) {
            response.json().then(function (result) {
                console.log(result);// le resultat de la methode POST est le nouveau ticket
                //On actualise le tableau
                //Appel de la fonction printTickets
                //printTickets(baseApiUrl);

                let tableBody = document.getElementById("table-body");
                // on rajoute le nouveau ticket dans la liste de la table Ticket
                tableBody.appendChild(createLine(result.id, result.date, result.description, result.learnerIdx, result.solved));
            })
        })
    }
});



//fonction pour le click du bouton Au suivant qui supprime
document.getElementById("button-next").addEventListener("click", function () {
    const nameTable = document.getElementById("table-body");

    if (nameTable.firstElementChild !== null) {

let num= nameTable.firstElementChild.firstChild.textContent;

        let choice = "tickets/"+num;

//Appel API pour la methode delete
      //  fetch(baseApiUrl + choice, deleteMethod).then(function (response) {
        fetch(baseApiUrl + choice, {method: 'DELETE'}).then(function () {
                nameTable.removeChild(nameTable.firstElementChild);
        })
    }

    // const tableRows = document.getElementsByTagName("tr");
    // if (tableRows.length > 1)
    //     tableRows[1].remove();
});


printLearner(baseApiUrl);
printTickets(baseApiUrl);
