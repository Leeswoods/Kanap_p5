// Page Panier 

// Déclaration des Variables formulaires


// API URL 
let site = "http://localhost:3000/api/products/";

// Varaible localStorage
let products = JSON.parse(localStorage.getItem("basket"));

// Variables Formulaire
let submitBtn = document.querySelector("#order");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.querySelector("#email");

// Déclaration des Variables Page Panier 
let messagePanierVide = document.querySelector("#cartAndFormContainer > h1");


// On récupère l'item "basket" dans le localStorage
function getBasket() {
  // Récupération des infos stocké dans le local storage
  let basket = localStorage.getItem("basket");
  // Si le panier est vide on crée un tableau
  if (basket == null){
    messagePanierVide.innerHTML = "Votre panier est vide" ;
      return [];
  }
  // Sinon on renvoie l'analyse de la chaîne de caractères "basket" 
  else{
      return JSON.parse(basket);
  }
}

// Cette fonction permet de déclarer le localStorage et l'API
function getData() {
  
  
  
  
  // Récupération des infos stocké dans le local storage
  let localStorage = getBasket();
  
  //Créaction d'une boucle
  for (let i = 0; i < localStorage.length; i++) {
    let productId = localStorage[i].id;
    let colorChoice = localStorage[i].colorChoice;
    let quantity = localStorage[i].quantity;
    // Récupérer les  données depuis l'API.
    fetch(site + `${productId}`)
    .then((res) => {
      return res.json();
    }) // Créaction d'une Promise (Promesse) transforme cette promesse en .json  : la Promise est un objet qui fournit une fonction then qui sera exécutée quand le résultat aura été obtenu
    .then((data) => {
      displayProducts(data, productId, colorChoice, quantity);

    })// Permet de traiter la promesse    
  }
  
}
getBasket(); // Affiche la fonction
getData(); // Affiche la fonction

// CREACTION DU DOM 

// FONCTION POUR DEFINIR LES CLASS, ID, ETC...
function displayProducts(data, productId, colorChoice, quantity) {


  // DOM => Article 
  let productArticle = document.createElement('article'); 

    productArticle.classList.add('cart__item');
    productArticle.setAttribute('data-id', `${productId}`);
    productArticle.setAttribute('data-color', `${colorChoice}`);

  // DOM => IMAGE
  let productDivImg = document.createElement("div");

    productDivImg.classList.add('cart__item__img');

  let productImg = document.createElement('img');

    productImg.src = `${data.imageUrl}`;
    productImg.setAttribute('alt', `${data.altTxt}`);
    productDivImg.appendChild(productImg);

  // DOM => Container : Description / SETTINGS 
  let productItemContent = document.createElement("div");

    productItemContent.classList.add('cart__item__content');

  // DOM => DESCRIPTION
  let productItemContentDescription = document.createElement("div");

    productItemContentDescription.classList.add('cart__item__content__description');

  // DOM => DESCRIPTION -> H2 TITRE / P / P
  let productTitle = document.createElement("h2");
    productTitle.innerHTML = `${data.name}`;
  
  let productColor = document.createElement("p");
    productColor.innerHTML = "Couleur : " + `${colorChoice}`;

  let productPrice = document.createElement("p");
    productPrice.innerHTML = `${data.price}` + " €";
  
  // DOM => SETTINGS
  let productItemContentSettings = document.createElement("div");

    productItemContentSettings.classList.add('cart__item__content__settings');

  // DOM => SETTINGS -> QUANTITE 
  let productItemContentSettingsQuantity = document.createElement("div");

    productItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');

  // DOM => SETTINGS -> QUANTITE -> PARAGRAPHE (TITRE) QUANTITE
  let productTitleQuantity = document.createElement("p");

    productTitleQuantity.innerHTML = "Quantité : ";

  // DOM => SETTINGS -> QUANTITE -> INPUT QUANTITE
  let productQuantity = document.createElement("input");

    productQuantity.value = `${quantity}`;
    productQuantity.classList.add("itemQuantity");
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

  // DOM => SETTINGS -> BOUTTON DELETE
  let productItemContentSettingsDelete = document.createElement("div");

    productItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');

  // DOM => SETTINGS -> BOUTTON DELETE -> PARAGRAPHE SUPPRIMER
  let productDelete = document.createElement("p");
  
      productDelete.classList.add("deleteItem");
      productDelete.innerHTML = "Supprimer";
  
  // APPENCHILD 

    // productArticle est le parent de productDivImg et de productItemContent
    productArticle.append(productDivImg, productItemContent);
    
    // productItemContent est le parent de productItemContentDescription  et de productItemContentSettings
    productItemContent.append(productItemContentDescription, productItemContentSettings);

    // productItemContentDescription est le parent de productTitle et de productColor et de productPrice 
    productItemContentDescription.append(productTitle, productColor, productPrice);

    // productItemContentSettings est le parent de productItemContentSettingsQuantity et productItemContentSettingsDelete 
    productItemContentSettings.append(productItemContentSettingsQuantity, productItemContentSettingsDelete);

    // productItemContentSettingsQuantity est le parent de productTitleQuantity et de productQuantity
    productItemContentSettingsQuantity.append(productTitleQuantity, productQuantity);

    // productItemContentSettingsDelete est le parent de productDelete
    productItemContentSettingsDelete.append(productDelete);
    
    // PUSH DANS LE DOM ===> Cart__items parent de productArticle
    document.querySelector("#cart__items").append(productArticle);

    // Bouton supprimer 
    document.querySelectorAll('.cart__item__content__settings__delete').forEach(element => {
      element.append(productDelete)
    })
  
  // AFFICHE LE TOTAL DU PRIX 
  document.querySelector("#totalPrice").innerHTML = totalPrice();

  // AFFICHE LE TOTAL DE LA QUANTITE 
  document.querySelector("#totalQuantity").innerHTML = totalQuantity();

  // Supprimer un produit 
  deleteProduct();
}

// Calculer le total
function totalPrice() {


  let totalPrice = 0;
  let items = document.getElementsByClassName("cart__item");
  for ( let i of items ) {
    let productQuantity = i.querySelector('.itemQuantity').value;

    // Converti la string en number
    let quantity = Number(productQuantity );

    // Le LastElementChild isole le prix
    let Productprice = i.querySelector('.cart__item__content__description').lastElementChild;

    // Le TextContent converti l'objet en string donc enlève les balise <p></p>
    let newPrice = Productprice.textContent;

    // Convertir string en number et supp le signe euro et l'espace
    let price = parseFloat(newPrice);

    // Faire l'opération : incrémenté totalprice 

    totalPrice += price * quantity;
  }
  return totalPrice;
}

// Calcul du total quantité(s)
function totalQuantity() {
  let localStorage = getBasket();
  let totalQuantity = 0;
  for (let i = 0; i < localStorage.length; i++) {
    let quantity = parseInt(localStorage[i].quantity);
    totalQuantity += quantity;
  }
  return totalQuantity;
}


// Supprimer un produit du panier 

function deleteProduct() {
  
  // On récupère le panier dans la variable basket
  let basket = getBasket();

  // On séléctionne le bouton "Supprimer"
  let deleteBtn = document.querySelectorAll(".deleteItem");

  // Pour itérer sur tous les boutons supprimés. A la selection dans le DOM, le résultat est rendu sous forme d'un array
  for(let b = 0; b < deleteBtn.length; b++){
    deleteBtn[b].addEventListener("click", function(event){
      event.preventDefault();

      // On rajoute l'id et la couleur dans des variables
      let removeProductId = basket[b].id;
      let removeProductColor = basket[b].colorChoice;

      // Ici filter() sert a garder uniquement les produits qui n'ont pas été sélectionnés 
      // Si le produit sélectionner n'a pas le même id et même couleur => il ne sera pas supprimer 
      const myNewCart = basket.filter(element => element.id !== removeProductId || element.colorChoice !== removeProductColor);

      localStorage.setItem("basket", JSON.stringify(myNewCart));

      alert("Ce produit a bien été supprimé du panier");

      location.reload();

    })
  }
}
