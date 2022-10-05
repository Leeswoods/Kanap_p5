// Page Panier 

// // Déclaration des Variables formulaires
// let submitBtn = document.querySelector("#order");
// let firstName = document.querySelector("#firstName");
// let lastName = document.querySelector("#lastName");
// let address = document.querySelector("#address");
// let city = document.querySelector("#city");
// let email = document.querySelector("#email");

// // Déclaration des Variables Page Panier 
// let messagePanierVide = document.querySelector("#cartAndFormContainer > h1");
// let messagePanier = document.querySelector("#cart__items");



// On récupère l'item "basket" dans le localStorage
function getBasket() {
  // Récupération des infos stocké dans le local storage
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
getBasket(); // Affiche la fonction

// Cette fonction permet de déclarer le localStorage et l'API
function getData() {

  // Variable products qui va stocker la Data de l'API
  let products;

  // Récupération des infos stocké dans le local storage
  let localStorage = basket();

  //Créaction d'une boucle
  for (let i = 0; i < localStorage.length; i++) {
    let id = localStorage[i].id;
    let colorChoice = localStorage[i].colorChoice;
    let quantity = localStorage[i].quantity;
    // Récupérer les  données depuis l'API.
    fetch('http://localhost:3000/api/products/${productId}')
    .then((res) => {
        return res.json();
    }) // Créaction d'une Promise (Promesse) transforme cette promesse en .json  : la Promise est un objet qui fournit une fonction then qui sera exécutée quand le résultat aura été obtenu
    .then((data) => {
      console.log(data);
      return (products = data);
    }) // Permet de traiter la promesse 
    
  }
}



// Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier

// DOM => Article 
let productArticle = document.createElement('article'); 
  productArticle.classList.add('cart_item');
  productArticle.setAttribute('data-id', '${id}');
  productArticle.setAttribute('data-color', '${colorChoice}');
  document.querySelector("#cart__items").appendChild(productArticle);

// DOM => IMAGE
let productDivImg = document.createElement("div");
  productDivImg.classList.add('cart__item__img');
  productDivImg = document.createElement('img');
  productDivImg.src = '${products.imageUrl}';
  productDivImg.setAttribute('alt', '${products.altTxt}');


// DOM => Container : Description / SETTINGS 
let productItemContent = document.createElement("div");
  productItemContent.classList.add('cart__item__content');

// DOM => DESCRIPTION
let  productItemContentDescription = document.createElement("div");
  productItemContentDescription.classList.add('cart__item__content__description');

// DOM => DESCRIPTION -> H2 TITRE / P / P
let productTitle = document.createElement("h2");
  productTitle.innerHTML = '${products.name}';

// DOM => DESCRIPTION -> PARAGRAPHE COULEUR / P
let productColor = document.createElement("p");
  productColor.innerHTML = "Couleur : " + '${colorChoice}';

// DOM => DESCRIPTION -> PARAGRAPHE PRIX
let productPrice = document.createElement("p");
  productPrice.innerHTML = '${products.price}' + " €";


// DOM => SETTINGS
let  productItemContentSettings = document.createElement("div");
  productItemContentSettings.classList.add('cart__item__content__settings');

// DOM => SETTINGS -> QUANTITE 
let productItemContentSettingsQuantity = document.createElement("div");
  productItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');

// DOM => SETTINGS -> QUANTITE -> PARAGRAPHE (TITRE) QUANTITE
let productTitleQuantity = document.createElement("p");
  productTitleQuantity.innerHTML = "Quantité : ";

// DOM => SETTINGS -> QUANTITE -> INPUT QUANTITE
let productQuantity = document.createElement("input");
  productQuantity.value = '${quantity}';
  productQuantity.classList.add = "itemQuantity";
  productQuantity.setAttribute("type", "number");
  productQuantity.setAttribute("min", "1");
  productQuantity.setAttribute("max", "100");
  productQuantity.setAttribute("name", "itemQuantity");

// DOM => SETTINGS -> BOUTTON DELETE
let  productItemContentSettingsDelete = document.createElement("div");
  productItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');

// DOM => SETTINGS -> BOUTTON DELETE -> PARAGRAPHE SUPPRIMER
let productDelete = document.createElement("p");
  productDelete.classList.add = "deleteItem";
  productDelete.innerHTML = "Supprimer";

// FONCTION POUR DEFINIR LA STRUCTURE DU HTML
function appendChildProducts() {
  // Cart__items parent de productArticle
  document.querySelector("#cart__items").appendChild(productArticle);

  // productArticle est le parent de productDivImg
  productArticle.appendChild(productDivImg);

  // productArticle est le parent de productItemContent
  productArticle.appendChild(productItemContent);

  // productItemContent est le parent de productItemContentDescription
  productItemContent.appendChild(productItemContentDescription);

  // productItemContentDescription est le parent de productTitle
  productItemContentDescription.appendChild(productTitle);

  // productItemContentDescription est le parent de productColor
  productItemContentDescription.appendChild(productColor);

  // productItemContentDescription est le parent de productPrice
  productItemContentDescription.appendChild(productPrice);


  // productItemContent est le parent de productItemContentSettings
  productItemContent.appendChild(productItemContentSettings);

  // productItemContentSettings est le parent de productItemContentSettingsQuantity
  productItemContentSettings.appendChild(productItemContentSettingsQuantity);

  // productItemContentSettingsQuantity est le parent de productTitleQuantity
  productItemContentSettingsQuantity.appendChild(productTitleQuantity);


  // productItemContentSettingsQuantity est le parent de productQuantity
  productItemContentSettingsQuantity.appendChild(productQuantity);

  // productItemContentSettings est le parent de productItemContentSettingsDelete
  productItemContentSettings.appendChild(productItemContentSettingsDelete);

  // productItemContentSettingsDelete est le parent de productDelete
  productItemContentSettingsDelete.appendChild(productDelete);
}



// // Etape 9 :  Gérer la modification et la suppression de produits dans la page Panier
  
  
// // GERER LA SUPRESSION DE PRODUITS DANS LA PAGE PANIER  
  
// // Supression de la ligne  au clic du bouton supprimer 
//   // Première étape on va crée une fonction deleteProducts qui est une class évènement => onclick="deleteProducts(this)"
//   // On va chercher l'attribut "product" qui se trouve dans l'input et qu'on a crée pour l'occassion
//   // Grâce à la méthode splice on va modifié le contenu d'un tableau donc celui de "panier" en retirant des éléments
//   // On enregistre le panier dans le localStorage et on rafraichit la page
//   // Sa envoie une alerte


// function deleteProducts(e) {
//   let product = e.getAttribute("product");
//   basket.splice(product, 1);
//   localStorage.setItem("basket", JSON.stringify(basket));
//   alert("Ce produit a bien été supprimé du panier");
//   location.reload();
// }

// // GERER LA MODIFICATION DE PRODUITS DANS LA PAGE PANIER 

//   // Première étape on va crée une fonction qui est une class évènement => onchange="getNewQty(this)"
//   // On va chercher l'attribut "index" qui se trouve dans l'input et qu'on a crée pour l'occassion
//   // On va crée une variable qui signifie que newQuantity renvoie une valeur
//   // On dit que le panier (localStorage) égal la variable newQuantity
//   // Sa envoie une alerte que la quantité a bien été modifié 
//   // Si la newQuantity est égale à 0 : on utilise la méthode splice on va modifié le contenu d'un tableau donc celui de "panier" en retirant des éléments
//   // Donc si la quantité est de 1 et qu'on la passe à 0 alors le produit
//   // On envoie une alerte que la quantité a été modifié
//   // On enregistre le panier dans le localStorage et on rafraichit la page
//   // Sinon on va chercher l'id totalQuantity et totalPrice pour les afficher
//   // On enregistre le panier dans le localStorage et on rafraichit la page

// function getNewQty(e) {
//   let index = e.getAttribute("index");
//   let newQuantity = e.value;
//   basket[index][0].quantity = newQuantity ;
//   alert("La quantité du produit a bien été modifié");

//   if (newQuantity  == 0) {
//     basket.splice(index, 1);
//     localStorage.setItem("basket", JSON.stringify(basket));
//     alert("Le produit a été supprimé du panier");
//     location.reload();
//   } else {
//     document.querySelector("#totalQuantity").innerHTML = totalQty();
//     document.querySelector("#totalPrice").innerHTML = totalPrice();
//     localStorage.setItem("basket", JSON.stringify(basket));
//   }
// }

// // Calcul du total prix

//   // Première étape on va crée une fonction 
//   // On va crée une variable qui signifie que totalprix est égale à 0 et renvoie la valeur 0
//   // On crée une boucle 

// function totalPrice() {
//   let totalprix = 0;
//   for (let i = 0; i < basket.length; i++) {
//       let quantity = parseInt(basket[i][0].quantity);
//       let prix = parseInt(basket[i][0].price);
//       totalprix += prix * quantity;
//   }
//   return totalprix;
// }
// // affichage du total prix
// document.querySelector("#totalPrice").innerHTML = totalPrice();

// // Calcul du total quantité(s)

//   // Première étape on va crée une fonction 
//   // On va crée une variable qui signifie que totalqty est égale à 0 et renvoie la valeur 0
//   // On crée une boucle 

// function totalQty() {
//   let totalqty = 0;
//   for (let i = 0; i < basket.length; i++) {
//       let quantity = parseInt(basket[i][0].quantity);
//       totalqty += quantity;
//   }
//   return totalqty;
// }

// // affichage du total quantités
// document.querySelector("#totalQuantity").innerHTML = totalQty();