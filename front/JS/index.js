// COMMENCEMENT DU PROJET 


// ETAPES 3 : Insérer les produits dans la page d’accueil

// Déclarations des variables
let site = "http://localhost:3000/api/products";


// Récupérer les  données depuis l'API.

        //Créaction d'une constante
const fetchProducts = async () => {
    await fetch(site) // Récupérer l'URL de l'API
    .then((res) => {
        return res.json();
    }) // Créaction d'une Promise (Promesse) transforme cette promesse en .json  : la Promise est un objet qui fournit une fonction then qui sera exécutée quand le résultat aura été obtenu
    .then((data) => {
        return (products = data);;
    }) // Permet de traiter la promesse 
};

//Sélection élément HTML ou afficher produits
const lesProduits = document.querySelector("#items");

//Affichage des produits sur la page d'acceuil
async function afficherLesProduits() {
    // attente que la constante fetchProducts se charge
    await fetchProducts();
    products.forEach((product) => {
        lesProduits.innerHTML += `
            <a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}" />
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>  
            </article>
            </a>`;
    });
};

afficherLesProduits(); // Affiche la fonction 

