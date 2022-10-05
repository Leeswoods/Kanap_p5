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
      console.log(data);
      return (products = data);
    }) // Permet de traiter la promesse 
};
fetchProducts();



// Déclaration des Variables 

// Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier

// Fonction permettant d'afficher tous les élements du panier contenu dans le localStorage
function getCart(){
  // On fait appel à notre localStorage
  let basket = JSON.parse(localStorage.getItem("basket"));
  for(let i in basket){
  document.querySelector("#cart__items").innerHTML += showCart(basket[i]);
  }
}


//Récupération des infos stocké dans le local storage
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket);
//Affichage des éléments du panier
function showCart(product) {
    // Si panier vide
    if (basket === null || basket.length == 0) {
      document.querySelector("#cartAndFormContainer > h1").textContent += " est vide";
    }
    // Si il y a un ou plusieurs éléments dans le panier
    else {
          return `
          <article class="cart__item" data-id="${product.id}" data-color="${product.colorChoice}">
          <div class="cart__item__img">
            <img src="${product.Picture}" alt="${product.PictureTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${product.colorChoice}</p>
              <p>${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
        }
    }

getCart();

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