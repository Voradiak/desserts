const data = [
    {
       "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
     }
];

let cart = [];
let yourOrder = [];

function addProduct(id) {
    const product = data[id];
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
        yourOrder.push({
            id: id,
            name: product.name,
            price: product.price,
            quantity: 1
        })
    }
    updateCartDisplay();
    renderCatalog();
}

function renderCatalog() {
    let innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        const existingItem = cart.find(item => item.id === i);
        const quantity = existingItem ? existingItem.quantity : 0;

        innerHTML += `<div class="product-card">
                        <div class="product">
                            <img src="${product.image.desktop}" class="product-img">
                            <div class="buttonBlock">
                            ${quantity > 0 
                                ? `<div class="quantity-controls">
                                        <button onclick="removeProduct(${i})" class="remove">-</button>
                                        <span>${quantity}</span>
                                        <button onclick="addProduct(${i})" class="add">+</button>
                                    </div>`
                                : `<button class="addToCart" onclick="addProduct(${i})"><img src="assets/images/icon-add-to-cart.svg" alt="">Add to cart</button>`
                            }
                            </div>
                        </div>
                        <div class="productData">
                            <h5>${product.category}</h5>
                            <p class="product-name">${product.name}</p>
                            <p class="product-price">$${product.price.toFixed(2)}</p>
                        </div>
                    </div>`;
    }

    catalog.innerHTML = innerHTML;
}

function removeProduct(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
            yourOrder[index].quantity--;
        } else {
            cart.splice(index, 1);
            yourOrder.splice(index, 1);
        }
    }
    updateCartDisplay();
    renderCatalog();
}

function updateCartDisplay() {
    const cartList = document.querySelector('.cartList');
    const cartList1 = document.querySelector('#cartList');
    const carbonDelivery = document.querySelector('.carbonDelivery');
    let productCartHTML = '';
    let cartHTML = '';
    let total = 0;
    let totalItems = 0;
    let yourOrderHTML = '';

    if (cart == 0) {
        productCartHTML += `<img src="assets/images/illustration-empty-cart.svg" alt="" class="emptyCart">`
        carbonDelivery.classList.remove('nonEmptyCart');
    } else {
        cart.forEach(item => {
            productCartHTML += `
                <div class="cart-element" data-id="${item.id}">
                    <p class="product-name">${item.name}</p>
                    <div class="quantity">
                        <span class="itemQuantity"> X ${item.quantity} </span><span>* $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>`;
            total += item.price * item.quantity;
            totalItems += item.quantity;
        });
    }

    if (cart != 0) {
        carbonDelivery.classList.add('nonEmptyCart');
        cartHTML += 
          `<img src="assets/images/icon-carbon-neutral.svg" alt="">
          <span>This is a <b>carbon-neutral</b> delivery</span>`
    }

    // if (cart > )
    
    carbonDelivery.innerHTML = cartHTML;
    cartList.innerHTML = productCartHTML;
    cartList1.innerHTML = productCartHTML;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('yourCart').textContent = `Your Cart (${totalItems})`
}

const dialog = document.querySelector('dialog');
const confirmButton = document.getElementById('confirm-order');
const approve = document.getElementById('approve');

confirmButton.addEventListener("click", () => {
    dialog.showModal();
});

approve.addEventListener("click", () => {
    dialog.close();
    total = 0;
    totalItems = 0;
    cart = [];

    updateCartDisplay();
    renderCatalog();
});



renderCatalog();
