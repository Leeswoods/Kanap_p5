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

        //Créaction d'une fonction
function getItem() {
    
    // Introduction de l'id dans la requête
    fetch(page_produits + `/${idProduct}`) // Récupérer l'URL de l'API et l'id des produits qui est égal à params.get("id") identifié grâce au $
    .then((res) => {
        return res.json();
    }) // Créaction d'une Promise (Promesse) transforme cette promesse en .json  : la Promise est un objet qui fournit une fonction then qui sera exécutée quand le résultat aura été obtenu
    
    // Les données sont exportés et les caractéristiques du produits (couleur, nom, prix, etc..) sont affichés grâce ) la fonction "displayItem"
    .then((data) => {
        displayItem(data);
        getProductForCart(data);
    }) // Permet de traiter la promesse 

    // Permet d'afficher une alerte s'il y a un message d'erreur
    .catch(function(error){
        alert("Erreur de la requête");
    })
};


// Etape 6 :  Insérer un produit et ses détails dans la page Produit

// Affichage du produit
function displayItem(article) {
    
    // Affichage de l'image 
    let imgItem = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgItem);
    imgItem.src = article.imageUrl;
    imgItem.alt = article.altTxt;

    // Affichage nom du produit 
    document.querySelector("#title").innerHTML = article.name;

    // Affichage du prix 
    document.querySelector("#price").innerHTML = article.price;

    // Affichage de la description
    document.querySelector("#description").innerHTML = article.description;

    // Affichage des différentes couleurs 
    for(let color of article.colors){
        let colorChoice = document.createElement("option");
        document.querySelector("#colors").appendChild(colorChoice),
        colorChoice.value = color;
        colorChoice.innerHTML = color;
    }
}

getItem(); // Appel à la fonction getItem




// Envoyer les informations Page Produit vers Page Panier 

// Etape 7 :  Ajouter des produits dans le panier

function getProductForCart(product) {
    
    // Déclaration des variables 
    const addBtn = document.querySelector("#addToCart");
    const colorChoice = document.querySelector("#colors");
    const quantity = document.querySelector("#quantity");

    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const myProduct = {
            name : product.name,
            id : product._id,
            colorChoice: colorChoice.value,
            quantity: parseInt(quantity.value, 10)
        };

        // Créer une alerte si une couleur n'est pas séléctionner 
        if (myProduct.colorChoice == "") {
            alert("Veuillez saisir une couleur");
        }
        else{
            // Créer une alerte si une quantité est égal à 0 et supérieur à 100 Ou inférieur à 0
            if (myProduct.quantity <= 0 || myProduct.quantity > 100) {
                alert("Veuillez saisir une quantité supérieur à 0 et inférieur à 100");
            }
            else {
                let basket = JSON.parse(localStorage.getItem("basket"));
                if(basket){

                    // Même id et même couleur
                    const foundProduct = basket.find(kanap => kanap.id == product._id && kanap.colorChoice == colorChoice.value)
                    console.log(foundProduct);
                    if(foundProduct){
                        let finalQuantity = myProduct.quantity + foundProduct.quantity;
                        console.log(finalQuantity);
                        foundProduct.quantity = finalQuantity;
                        console.log(foundProduct.quantity);
                        saveBasket(basket)
                    }
                    else{
                        basket.push(myProduct);
                        saveBasket(basket);
                    }
                }
                else{
                    basket = [];
                    basket.push(myProduct);
                    saveBasket(basket);
                }
                alert(`Vous avez ajouté ${myProduct.quantity} articles au panier`);
            }
        }
    })
}

function saveBasket(myProduct) {

    localStorage.setItem("basket", JSON.stringify(myProduct));
}