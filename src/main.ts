import './style.css'
import './reset.css'

/*

This is how an item object should look like

{
  id: 1, // <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 // <- You can come up with your own prices
}

*/
let state = {
  storeItems: [
    {
      id: 1,
      name: "beetroot",
      price: 0.35,
      inCard: 0,
      path: "assets/icons/001-beetroot.svg",
    },

    {
      id: 2,
      name: "carrot",
      price: 0.52,
      inCard: 0,
      path: "assets/icons/002-carrot.svg",
    },

    {
      id: 3,
      name: "apple",
      price: 0.15,
      inCard: 0,
      path: "assets/icons/003-apple.svg",
    },

    {
      id: 4,
      name: "apricot",
      price: 1.5,
      inCard: 0,
      path: "assets/icons/004-apricot.svg",
    },

    {
      id: 5,
      name: "avocado",
      price: 2.5,
      inCard: 0,
      path: "assets/icons/005-avocado.svg",
    },

    {
      id: 6,
      name: "bananas",
      price: 1.2,
      inCard: 0,
      path: "assets/icons/006-bananas.svg",
    },

    {
      id: 7,
      name: "bell-pepper",
      price: 1.75,
      inCard: 0,
      path: "assets/icons/007-bell-pepper.svg",
    },

    {
      id: 8,
      name: "berry",
      price: 1.75,
      inCard: 0,
      path: "assets/icons/008-berry.svg",
    },

    {
      id: 9,
      name: "bluberry",
      price: 3.5,
      inCard: 0,
      path: "assets/icons/009-blueberry.svg",
    },

    {
      id: 10,
      name: "eggplant",
      price: 2.15,
      inCard: 0,
      path: "assets/icons/010-eggplant.svg",
    },
  ],

  total: 0,
};

renderStoreItems();

function renderStoreItems() {
  let ul = document.querySelector(".store--item-list");

  for (let item of state.storeItems) {
    let li = document.createElement("li");

    let div = document.createElement("div");
    div.className = "store--item-icon";

    let img = document.createElement("img");
    img.src = item.path;
    img.alt = item.name;
    div.append(img);

    let button = document.createElement("button");
    button.textContent = "Add to cart";
    button.addEventListener("click", function () {
      item.inCard++;

      renderCartItems();
      calculateTotal();
    });

    li.append(div, button);

    ul.append(li);
  }
}

function renderCartItems() {
  let ul = document.querySelector(".cart--item-list");
  ul.innerHTML = "";

  for (let item of state.storeItems) {
    if (item.inCard > 0) {
      let li = document.createElement("li");
      let img = document.createElement("img");
      img.className = "cart--item-icon";
      img.src = item.path;
      img.alt = item.name;

      let p = document.createElement("p");
      p.textContent = item.name;

      let buttonMinus = document.createElement("button");
      buttonMinus.className = "quantity-btn remove-btn center";
      buttonMinus.textContent = "-";
      buttonMinus.addEventListener("click", function () {
        item.inCard--;

        renderCartItems();
        calculateTotal();
      });

      let span = document.createElement("span");
      span.className = "quantity-text center";
      span.textContent = item.inCard;

      let buttonPlus = document.createElement("button");
      buttonPlus.className = "quantity-btn add-btn center";
      buttonPlus.textContent = "+";
      buttonPlus.addEventListener("click", function () {
        item.inCard++;

        renderCartItems();
        calculateTotal();
      });

      li.append(img, p, buttonMinus, span, buttonPlus);

      ul?.append(li);
    }
  }
}

function calculateTotal() {
  state.total = 0;

  for (let item of state.storeItems) {
    state.total += item.inCard * item.price;
  }

  let span = document.querySelector(".total-number");
  span.textContent = `$${state.total.toFixed(2)}`;
}
