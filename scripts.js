"use strict";

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};
const btnsActions = document.querySelectorAll("[data-btn-action]");
const btnsActionsTotal = document.querySelectorAll("[data-btn-actiontotal]");
const products = document.querySelectorAll(".product");
const iconsPlus = document.querySelectorAll(".icon-plus");

//Abre el modal con detalles del producto seleccionado
function openModal() {
  const id = $(this).attr("data-id");
  $("#pId").html(id);
  $("#modal_previewDetail").modal("show");
}

//Muestra/Oculta el div de acciones correspondiente al boton [+] seleccionado
function showActions() {
  let parent = this.parentElement;
  let divActions = parent.querySelector(".actions");
  let quantity = divActions.querySelector(".quantity");

  this.classList.add("d-none");
  divActions.classList.toggle("d-none");
  quantity.textContent = 1;
}

//Actualiza la cantidad de un producto modificador al hacer clic en los botones [+][-]
function UpdateQuantity() {
  let divActions = this.parentElement;
//   console.log(divActions);
  let spanQ = divActions.querySelector(".quantity");
  let quantity = parseInt(spanQ.textContent);
  let icon = divActions.parentElement.querySelector(".icon-plus");

  if (this.classList.contains("btnAdd")) quantity++;

  if (this.classList.contains("btnRemove")) quantity--;

  //Si la cantidad es 0, oculta acciones y muestra botón [+]
  if (quantity < 1) {
    divActions.classList.toggle("d-none");
    icon.classList.toggle("d-none");
  }
  spanQ.textContent = quantity;
}

//Actualiza la cantidad de un producto modificador al hacer clic en los botones [+][-]
function UpdateQuantityTotal() {
  let divActions = this.parentElement;
  let spanQ = divActions.querySelector(".quantity");
  let quantity = parseInt(spanQ.textContent);

  if (this.classList.contains("btnAdd")) {
    quantity++;
    let btnMinus = divActions.querySelector(".btnRemove");
    $(btnMinus).attr("disabled", false);
  }

  if (this.classList.contains("btnRemove")) quantity--;

  //Si la cantidad es 0....
  if (quantity < 2) $(this).attr("disabled", true);

  spanQ.textContent = quantity;
}

//** Esta es otra forma de llamar los eventos de los elementos en el DOM ***/

//Al hacer clic en un producto para abrir su modal con detalles
addEventOnElem(products, "click", openModal);

//Al hacer click en icono [+]
addEventOnElem(iconsPlus, "click", showActions);

//Al hacer click en botones [+][-]
addEventOnElem(btnsActions, "click", UpdateQuantity);

addEventOnElem(btnsActionsTotal, "click", UpdateQuantityTotal);

/*Sticky Sidebar when scroll*/
$(document).ready(function () {
  let menu = $("#sidebarMenu");
  let btnTop = document.getElementById("btnTop");
  window.onscroll = function () {
    scrollMenu();
    scrollFunction();
  };
  function scrollMenu() {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      menu.addClass("sidebar");
      menu.removeClass("sidebar-off");
    } else {
      menu.addClass("sidebar-off");
      menu.removeClass("sidebar");
    }
  }

  function scrollFunction() {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    )
      btnTop.style.display = "block";
    else btnTop.style.display = "none";
  }
});

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
