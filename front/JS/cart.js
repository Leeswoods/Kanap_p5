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
            messagePanier.innerHTML += `
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
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i][0].qantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
        }
    }
}
afficherPanier();
