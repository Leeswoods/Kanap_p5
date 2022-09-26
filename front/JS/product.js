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

