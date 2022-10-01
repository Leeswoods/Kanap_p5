// Page Panier 



// Déclaration des Variables formulaires
let submitBtn = document.querySelector("#order");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.querySelector("#email");

// Déclaration des Variables Page Panier 
let messagePanierVide = document.querySelector("#cartAndFormContainer > h1");
let messagePanier = document.querySelector("#cart__items");

// Déclaration des Variables 

// Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier

//Récupération des infos stocké dans le local storage
let panier = JSON.parse(localStorage.getItem("produit"));

//Affichage des éléments du panier
function afficherPanier() {
    // Si panier vide
    if (panier === null || panier.length == 0) {
        messagePanierVide.textContent += " est vide";
    }
    // Si il y a un ou plusieurs éléments dans le panier
    else {
        for (let i = 0; i < panier.length; i++) {
          document.querySelector("#cart__items").innerHTML += `
            <article class="cart__item" data-id="${panier[i][0].idProduct}">
                <div class="cart__item__img">
                  <img src="${panier[i][0].image}" alt="${panier[i][0].imageAlt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${panier[i][0].name}</h2>
                    <p>${panier[i][0].colorChoice}</p>
                    <p>${panier[i][0].price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input index="${[i]}" onchange="getNewQty(this)" id="cartQty" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i][0].quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p product="${[i]}" onclick="deleteProducts(this)" class="deleteItem">Supprimer</p>
                  </div>
              </div>
          </div>
              </article>`;
        }
    }
}
afficherPanier();

// Etape 9 :  Gérer la modification et la suppression de produits dans la page Panier

  

  
  
// GERER LA SUPRESSION DE PRODUITS DANS LA PAGE PANIER  
  
// Supression de la ligne  au clic du bouton supprimer 
  // Première étape on va crée une fonction deleteProducts qui est une class évènement => onclick="deleteProducts(this)"
  // On va chercher l'attribut "product" qui se trouve dans l'input et qu'on a crée pour l'occassion
  // Grâce à la méthode splice on va modifié le contenu d'un tableau donc celui de "panier" en retirant des éléments
  // On enregistre le panier dans le localStorage et on rafraichit la page
  // Sa envoie une alerte


function deleteProducts(e) {
  let product = e.getAttribute("product");
  panier.splice(product, 1);
  localStorage.setItem("produit", JSON.stringify(panier));
  alert("Ce produit a bien été supprimé du panier");
  location.reload();
}

// GERER LA MODIFICATION DE PRODUITS DANS LA PAGE PANIER 

  // Première étape on va crée une fonction qui est une class évènement => onchange="getNewQty(this)"
  // On va chercher l'attribut "index" qui se trouve dans l'input et qu'on a crée pour l'occassion
  // On va crée une variable qui signifie que newQuantity renvoie une valeur
  // On dit que le panier (localStorage) égal la variable newQuantity
  // Sa envoie une alerte que la quantité a bien été modifié 
  // Si la newQuantity est égale à 0 : on utilise la méthode splice on va modifié le contenu d'un tableau donc celui de "panier" en retirant des éléments
  // Donc si la quantité est de 1 et qu'on la passe à 0 alors le produit
  // On envoie une alerte que la quantité a été modifié
  // On enregistre le panier dans le localStorage et on rafraichit la page
  // Sinon on va chercher l'id totalQuantity et totalPrice
  // On enregistre le panier dans le localStorage et on rafraichit la page

function getNewQty(e) {
  let index = e.getAttribute("index");
  let newQuantity = e.value;
  panier[index][0].quantity = newQuantity ;
  alert("La quantité du produit a bien été modifié");

  if (newQuantity  == 0) {
    panier.splice(index, 1);
    localStorage.setItem("produit", JSON.stringify(panier));
    alert("Le produit a été supprimé du panier");
    location.reload();
  } else {
    document.querySelector("#totalQuantity").innerHTML = totalQty();
    document.querySelector("#totalPrice").innerHTML = totalPrice();
    localStorage.setItem("produit", JSON.stringify(panier));
  }
}

// Calcul du total prix

  // Première étape on va crée une fonction 
  // On va crée une variable qui signifie que totalprix est égale à 0 et renvoie la valeur 0
  // On crée une boucle 

function totalPrice() {
  let totalprix = 0;
  for (let i = 0; i < panier.length; i++) {
      let quantity = parseInt(panier[i][0].quantity);
      let prix = parseInt(panier[i][0].price);
      totalprix += prix * quantity;
  }
  return totalprix;
}
// affichage du total prix
document.querySelector("#totalPrice").innerHTML = totalPrice();

// Calcul du total quantité(s)

  // Première étape on va crée une fonction 
  // On va crée une variable qui signifie que totalqty est égale à 0 et renvoie la valeur 0
  // On crée une boucle 

function totalQty() {
  let totalqty = 0;
  for (let i = 0; i < panier.length; i++) {
      let quantity = parseInt(panier[i][0].quantity);
      totalqty += quantity;
  }
  return totalqty;
}

// affichage du total quantités
document.querySelector("#totalQuantity").innerHTML = totalQty();