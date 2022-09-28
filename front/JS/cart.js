// Page Panier 


// Déclaration des Variables



// Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier


// Récupération du localStorage =>  on récupère toutes les informations stockés 
let panier = JSON.parse(localStorage.getItem("produit"));


// On va afficher les éléments

function afficherPanier() {
    //Si panier vide
    if (panier === null || panier.length == 0) {
        document.querySelector("#cartAndFormContainer > h1").textContent += " est vide";
    }
}

