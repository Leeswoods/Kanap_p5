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


// FONCTION POUR DEFINIR LES CLASS, ID, ETC...
function displayProducts(data, productId, colorChoice, quantity) {

  console.log(data);

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
    productQuantity.classList.add = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

  // DOM => SETTINGS -> BOUTTON DELETE
  let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');

  // DOM => SETTINGS -> BOUTTON DELETE -> PARAGRAPHE SUPPRIMER
  let productDelete = document.createElement("p");
      productDelete.classList.add = "deleteItem";
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
      fetch(`http://localhost:3000/api/products/${productId}`)
      .then((res) => {
        return res.json();
      }) // Créaction d'une Promise (Promesse) transforme cette promesse en .json  : la Promise est un objet qui fournit une fonction then qui sera exécutée quand le résultat aura été obtenu
      .then((data) => {
        displayProducts(data, productId, colorChoice, quantity);
      }) // Permet de traiter la promesse 
  }

}
getBasket(); // Affiche la fonction
getData();






