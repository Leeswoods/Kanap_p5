// Page Produits

// Etape 4 :  Faire le lien entre un produit de la page d’accueil et la page Produit

// Déclarations des variables
let page_produits = "http://localhost:3000/api/products";

//Récupération de l'id depuis l'url
// On extrait les paramètres de l'ID
let params = (new URL(document.location)).searchParams;
let idProduct = params.get("id"); // permet à la variable IdProduct d'avoir l'id des produits


// Etape 5 :  Récupérer l’id du produit à afficher


// Récupérer les  données depuis l'API.

        //Créaction d'une constante
const fetchProductId = async () => {
    await fetch(page_produits + `/${idProduct}`) // Récupérer l'URL de l'API et l'id des produits qui est égal à params.get("id") identifié grâce au $
    .then((res) => {
        return res.json();
    }) // Créaction d'une Promise (Promesse) transforme cette promesse en .json  : la Promise est un objet qui fournit une fonction then qui sera exécutée quand le résultat aura été obtenu
    .then((data) => {
        return (products = data);
    }) // Permet de traiter la promesse 
};


// Etape 6 :  Insérer un produit et ses détails dans la page Produit

// Affichage du produit
const afficherLeProduit = async function () {
    await fetchProductId();
    let choixColor = document.querySelector("#colors");
    document.querySelector(".item__img").innerHTML = `<img src="${products.imageUrl}" alt="${products.altTxt}">`;
    document.getElementById("title").textContent = products.name;
    document.getElementById("price").textContent = products.price;
    document.getElementById("description").textContent = products.description;
    products.colors.forEach((option) => {
        choixColor.innerHTML += `<option value="${option}">${option}</option>`;
    });
};
afficherLeProduit();



// Envoyer les informations Page Produit vers Page Panier 

// Etape 7 :  Ajouter des produits dans le panier


// Bouton ("Ajouter au panier") séléctionner => id 
let cartButton = document.getElementById ("addToCart");

// Déclarations des variables couleur et quantité => depuis l'id
let colorChoice = document. querySelector("#colors").value;
let producQuantity = document.querySelector("#quantity").value;

// Evènement lors du clique sur le bouton pour ajouter dans le panier 
cartButton.addEventListener("click", (e) => {

    // Si la quantité est supérieur à 0 et inférieur ou égal à 100 et la couleur a une valeur => on procède au code suivant 
    if (producQuantity.value > 0 && producQuantity.value <=100 && producQuantity.value != 0 && colorChoice.value != 0) {

         // Séléction de tous les éléemnts qui vont être dans le panier
         let image = document.querySelector("body > main > div > section > article > div.item__img > img").src;
         let imageAlt = document.querySelector("body > main > div > section > article > div.item__img > img").alt;
         let name = document.getElementById("title").textContent;
         let price = document.getElementById("price").textContent + "€";
         let productID = idProduct;
         let colorChoice = document. querySelector("#colors").value;

         // Passe la quantité en nombre
         let producQuantity = document.querySelector("#quantity").value;
         let qantity = Number(producQuantity );
 
         // Boucle pour permettre de savoir si on met le même produit dans le panier (même id + même couleur)
         //pour tester la boucle et l'arreter
         let boucle = 0;
     
         // LocalStorage =>
 
         // ajout des elt du panier dans un tableau
         let eltPanier = [{ image, imageAlt, name, productID, colorChoice, qantity }];
 
         // On va vérifier si il y a quelque chose dans le localStorage 
         let produitTableau = JSON.parse(localStorage.getItem("produit"));
         
         //Si le localstorage est vide, on créer tableau, on met tout les élément dans le panier (push) et on stock dans localStorage
         if (produitTableau == null) {
             produitTableau= []; // Créaction du tableau
             produitTableau.push(eltPanier); 
             localStorage.setItem("produit", JSON.stringify(produitTableau));
         }
         // Avant de stock dans local storage => Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent dans le panier (même id + même couleur), on incrémente simplement la quantité du produit correspondant dans l’array.
         else {
             for (let i = 0; i < produitTableau.length; i++) {
                 if (produitTableau[i][0].name === name && produitTableau[i][0].colorChoice === colorChoice) {
                     produitTableau[i][0].qantity += qantity;
                     boucle = 1;
                 }
             }
             //Si pas égale (si pas même id et même couleur), on stop la boucle et on push le panier et on stock dans localStorage
             if (boucle == 0) {
                 produitTableau.push(eltPanier);
             }
             
             localStorage.setItem("produit", JSON.stringify(produitTableau));
         }
         // Alerte sur la quantité mise dans le panier
         if (qantity > 1) {
             alert(`Vous avez ajouté ${qantity} articles au panier`);
         } else if (qantity == 1) {
             alert(`Vous avez ajouté ${qantity} article au panier`);
         }
    } 
    // Si la quantité n'est pas supérieur ou égal à 0 et supérieur à 100 et la couleur n'a de valeur défini (choix des couleurs proposés) => on affiche le message suivant
    else {
        alert("Veuillez choisir une couleur et/ou une quantité");
        e.preventDefault();
    }
});
