// Page Panier 

// Déclaration des Variables formulaires
let submitBtn = document.querySelector("#order");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.querySelector("#email");

// API URL 
let site = "http://localhost:3000/api/products/";

// Varaible localStorage
let products = JSON.parse(localStorage.getItem("basket"));



// Déclaration des Variables Page Panier 
// let messagePanierVide = document.querySelector("#cartAndFormContainer > h1");


// On récupère l'item "basket" dans le localStorage
function getBasket() {
  // Récupération des infos stocké dans le local storage
  let basket = localStorage.getItem("basket");
  // Si le panier est vide on crée un tableau
  if (basket === null){
      return [];
  }
  // Sinon, il existe et on renvoie l'analyse de la chaîne de caractères "basket" 
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
    productTitle.textContent = `${data.name}`;
  
  let productColor = document.createElement("p");
    productColor.textContent = "Couleur : " + `${colorChoice}`;

  let productPrice = document.createElement("p");
    productPrice.textContent = `${data.price}` + " €";
  
  // DOM => SETTINGS
  let productItemContentSettings = document.createElement("div");

    productItemContentSettings.classList.add('cart__item__content__settings');

  // DOM => SETTINGS -> QUANTITE 
  let productItemContentSettingsQuantity = document.createElement("div");

    productItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');

  // DOM => SETTINGS -> QUANTITE -> PARAGRAPHE (TITRE) QUANTITE
  let productTitleQuantity = document.createElement("p");

    productTitleQuantity.textContent = "Quantité : ";

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
      productDelete.textContent = "Supprimer";
  
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
  document.querySelector("#totalQuantity").innerText = totalQuantity();

  // Supprimer un produit => Appel la fonction
  deleteProduct();

  // Modifier Quantité => Appel la fonction
  changeQuantity();
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
  let basket = JSON.parse(localStorage.getItem("basket"));

  // On séléctionne les boutons "Supprimer"
  let deleteBtn = document.querySelectorAll(".deleteItem");

  // Pour itérer (répéter) sur tous les boutons supprimés. A la selection dans le DOM, le résultat est rendu sous forme d'un array
  for(let b = 0; b < deleteBtn.length; b++){
    deleteBtn[b].addEventListener("click", function(){

      // Alerte pour avertir que le produit va être supprimer
      if (window.confirm("Voulez-vous supprimer cet article ?")) {

        // On rajoute l'id et la couleur dans des variables
        let removeProductId = basket[b].id;
        let removeProductColor = basket[b].colorChoice;

        // Avec la méthode filter je sélectionne les élements à garder et je supprime l'élément où le btn supprimer a été cliqué
        const myNewCart = basket.filter(element => element.id !== removeProductId || element.colorChoice !== removeProductColor);

        // Sauvegarde dans le localStorage => on envoie la variable dans le localStorage
        localStorage.setItem("basket", JSON.stringify(myNewCart));

        // Rechargement de la page
        location.reload();
      }

    })
  }
}

// fonction qui gère les changements de quantité de les inputs
function changeQuantity() {

  // On récupère le panier dans la variable basket
  let basket = JSON.parse(localStorage.getItem("basket"));

  // Sélection de tous les inputs
  const quantity = document.querySelectorAll(".itemQuantity");

  // Boucle qui parcourt la quantité dans le DOM
  for (let changeQuantity of quantity) {
    changeQuantity.addEventListener("change", (e) => {

          // Boucle qui parcourt le produit dans le localStorage
          for (products of basket) {

              // Récupère le DOM => toute la structrure d'article
              let article = changeQuantity.closest("article");

              // Condition 
              // && renvoie vrai si et uniquement si ses deux opérandes sont true ou équivalents à true
              // === Egalité Stricte 
              // Faut que la valeur de l'évènement soit supérieur ou égal à 1 et inférieur ou égale à 100

              // Si sa respecte c'est condition alors : 
              // La Quantité saisis est égale à celle de l'évènement => La fonction parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée.
              // Sauvegarde dans le localStorage la nouvelle quantité  
              // La Quantité du DOM est égale à celle de l'évènement
              // Alerte pour avertir que le produit a été modifier

              // Sinon si : 
              // La quantité est inférieur à 1 ou supérieur à 100 => alerte
              // Renvoie la même valeur donc la valeur précédente
              if (
                  products.id === article.dataset.id &&
                  article.dataset.color === products.colorChoice &&
                  e.target.value >= 1 &&
                  e.target.value <= 100
              ) {
                  products.quantity = parseInt(e.target.value);
                  localStorage.basket = JSON.stringify(basket);
                  article.dataset.quantité = parseInt(e.target.value);
                  alert("La quantité a bien été modifier");
              } else if (e.target.value < 1 || e.target.value > 100) {
                  alert(
                      "Indiquez des quantités comprises entre 1 et 100"
                  );
                  changeQuantity.value = article.dataset.quantité;
              }
          }
          // Appel Fonction pour le total prix et quantité 
          totalPrice();
          totalQuantity();

          // Rechargement de la page
          location.reload();
      });
  }
}


// FORMULAIRE

// Fonction de Control User : Prénom, nom, email, etc...
function userInformationControl() {
  
  // Contrôle Prénom / Variable qui appel l'élément du DOM message d'erreur : #firstNameErrorMsg
  let fistNameValidation = document.querySelector("#firstNameErrorMsg");

    // Evènement change de la variable (Variables Formulaire) fistName
    firstName.addEventListener("change", (e) => {
      
      // Condition avec RegExp / Message erreur
      
      // Si le Prénom respect la condition, le prénom est validé
      // Le e.target.valueest la propriété value d'un élément DOM, dans ce cas cela signifie le texte saisi dans l'entrée de recherche.
      if (/^[A-Za-z\é\è\ê\-]+$/.test(e.target.value)) {
        fistNameValidation.innerText = "";
      }

      // Sinon, message d'erreur, prénom non validé
      else{
        fistNameValidation.innerText = "Le prénom doit commencer par une majuscule et ne contenir que des lettres.";
      }
    })
  
  // Contrôle Nom / Variable qui appel l'élément du DOM message d'erreur : #addressErrorMsg
  let lastNameValidation = document.querySelector("#lastNameErrorMsg");
    
    // Evènement change de la variable (Variables Formulaire) lastName
    lastName.addEventListener("change", (e) => {

      // Condition avec RegExp / Message erreur

      // Si le Nom respect la condition, le nom est validé
      if (/^[A-Za-z\é\è\ê\-]+$/.test(e.target.value)) {
        lastNameValidation.innerText = "";
      }

      // Sinon, message d'erreur, nom non validé
      else{
        lastNameValidation.innerText = "Le nom doit commencer par une majuscule et ne contenir que des lettres.";
      }

    })
  
  
  // Contrôle Adresse / Variable qui appel l'élément du DOM message d'erreur : #addressErrorMsg
  let adressValidation = document.querySelector("#addressErrorMsg");

    // Evènement change de la variable (Variables Formulaire) address
    address.addEventListener("change", (e) => {

      // Condition avec RegExp / Message erreur

      // Si l'adresse respect la condition, l'adresse est validé
      if (/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(e.target.value)) {
        adressValidation.innerText = "";
      }

      // Sinon, message d'erreur, adresse non validé
      else{
        adressValidation.innerText = "Votre adresse est invalide";
      }

    })
  
  // Contrôle Ville / Variable qui appel l'élément du DOM message d'erreur : #cityErrorMsg
  let cityValidation = document.querySelector("#cityErrorMsg");

  // Evènement change de la variable (Variables Formulaire) city
  city.addEventListener("change", (e) => {

    // Condition avec RegExp / Message erreur

    // Si l'adresse respect la condition, l'adresse est validé
    if (/^[A-Za-z\é\è\ê\-]+$/.test(e.target.value)) {
      cityValidation.innerText = "";
    }

    // Sinon, message d'erreur, adresse non validé
    else{
      cityValidation.innerText = "Vous devez renseigner une ville existante et qui commence par une majuscule";
    }

  })

  // Contrôle Email / Variable qui appel l'élément du DOM message d'erreur : #emailErrorMsg
  let emailValidation = document.querySelector("#emailErrorMsg");

  // Evènement change de la variable (Variables Formulaire) email
  email.addEventListener("change", (e) => {

    // Condition avec RegExp / Message erreur

    // Si l'adresse respect la condition, l'adresse est validé
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      emailValidation.innerText = "";
    }

    // Sinon, message d'erreur, adresse non validé
    else{
      emailValidation.innerText = "Adresse email incorrect";
    }

  })
}


// API, envoyer les données de l'utilisateur 

// Vérifications du formulaire et du panier
// On va chercher l'ID du bouton & Ecoute du bonton "commander" 
submitBtn.addEventListener("click", (e) => {

  // On récupère la clé du Local Storage dans la variable basket
  let basket = JSON.parse(localStorage.getItem("basket"));

  // Appel de la Fonction getBasket
  getBasket();

  // Empêcher l'action par défaut
  e.preventDefault();

  // Condition 
  // Si les Informations du formulaires sont correctements remplit et que le panier est différent de 0
  if (firstName.value !== "" && lastName.value !== "" && address.value !== "" && city.value !== "" && email.value !== "" && basket.length != 0) 
  {
        // Variable qui renvoie un tableau 
    let productsInfo = [];

    // ajout de chaque id par produit dans un tableau produit
    for (let i = 0; i < basket.length; i++) {
      productsInfo.push(basket[i].id);
    }

    // Variable qui contient les informations de l'utilisateur 
    const userInfo = {
      contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
      },
      products: productsInfo
    }
    // Constante qui contient la méthode post "envoi"
    const options = {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json"
      }
    }
    // fetch avec la constante qui contient la methode post "envoi"
    // Envoie les information userInfo
    fetch("http://localhost:3000/api/products/order", options)
    .then((res) => {
      // Requête valide (succès) alerte pour informer la validation / 201 : Requête traitée avec succès et création d’un document.
      // Sinon afficher message erreur
        if (res.status == 201) {
            alert("Votre commande a bien été validée");
            return res.json();
        } else if (res.status !== 201) {
            alert(
                "une erreur est survenue lors de l'envoi du formulaire, veuillez réessayer"
            );
        }
    })
    .then((data) => {
      // Ouvre la page de confirmation avec le numéro de commande dans l'URL
      window.location.href = `../html/confirmation.html?order_id=${data.orderId}`;
      // Vide le localStorage
      localStorage.clear();
    })
    // Envoie l'erreur dans la console s'il y a une erreur
    .catch((error) => console.log("Erreur : " + error));
  } 
  // Alerte si le formulaire n'est pas correctement remplit ou pas remplit et si le panier est vide
  else {
    alert("Vous devez remplir votre panier et le formulaire")
  }
})

userInformationControl(); // Appel de ma fonction userInformationControl
