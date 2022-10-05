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

// Permet d'enregsitrer le panier dans le localStorage / le JSON.stringify permet de transformer en chaîne de caractère
function saveBasket(myProduct) {
    localStorage.setItem("basket", JSON.stringify(myProduct));
}



// On récupère l'item "basket" qu'on avait enregistrer en haut
function getBasket() {
    let basket = localStorage.getItem("basket");
    // Si le panier est vide on crée un tableau
    if (basket == null){
        return [];
    }
    // Sinon on renvoie l'analyse de la chaîne de caractères "basket" 
    else{
        return JSON.parse(basket);
    }
}



// Ajout au panier
function addBasket(product) {
    let basket = getBasket();
    basket.push(product);
    saveBasket(basket);
}

// Pour supprimer un élément du panier
function removeFromBasket(product){
    //on recupere le panier
    let basket = getBasket();
    // on utilise la methode filter filtre un array par rapport une condition
    basket = basket.filter(p => p.id != product.id && p.colorChoice == product.colorChoice);
    saveBasket(basket);
}


// Pour ajouter un produit dans le localStorage
function addLocalStorage(myProduct) {
    let basket = getBasket();

    // Créer une alerte si une couleur n'est pas séléctionner 
    if (myProduct.colorChoice == "") {
        alert("Veuillez saisir une couleur");
    }
    else{
        // Créer une alerte si une quantité est égal à 0 et supérieur à 100 Ou inférieur à 0
        if (myProduct.quantity == 0 || myProduct.quantity > 100 || myProduct.quantity < 0) {
            alert("Veuillez saisir une quantité supérieur à 0 et inférieur à 100");
        }
        else {
            // Regarde s'il y a le même id et même couleur
            let foundProduct = basket.find(product => product.id == myProduct.id && product.colorChoice == myProduct.colorChoice);

            // Si produit ne correspond pas au même id et même couleur => on rajoute le produit dans la localStorage
            if (foundProduct === undefined ) {
                addBasket(myProduct)
                alert(`Vous avez ajouté ${myProduct.quantity} articles au panier`);
                return
            }
            // Sinon si le produit correspond au même id et même couleur on supprime le tableau et on rajoute la quantité ancienne et nouvelle
            else {
                removeFromBasket(foundProduct)
                foundProduct.quantity += myProduct.quantity;
                addBasket(foundProduct)
                return
            }
        }
    }
}

// Evènement lors du clique sur le bouton pour ajouter dans le panier 
document.getElementById("addToCart").addEventListener("click", (e) => {
    e.preventDefault();
    // Séléction de tous les éléments qui vont être dans le panier
    const myProduct = {
        id : idProduct,
        colorChoice : document.querySelector("#colors").value,
        quantity : parseInt(document.querySelector("#quantity").value),
        name : document.getElementById("title").textContent,
    }
    addLocalStorage(myProduct);
})