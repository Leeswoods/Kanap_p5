// Récupération de l'orderId du produit via l' URL
var idUrl = window.location.href;
var url = new URL(idUrl);
let showOrderId = url.searchParams.get("order_id");


// affichage du numéro de commande
document.querySelector("#orderId").innerText = showOrderId;