let side = document.querySelector('.side');
let sideBar = document.querySelector('.side-bar');
let sideBtn = document.querySelectorAll('.nav-btn');
let nav = document.querySelector('.fa-bars');
let content = document.querySelectorAll('.content');
let menu = document.querySelector('.order');
let section = document.querySelector('.section');
let logo = document.querySelector('.logo');
let menuSection = document.querySelector('.menu-section');
let cartBtn = document.querySelector('.cart-btn');
let closeCart = document.querySelector('.close-cart');
let cartOverlay = document.querySelector('.cart-overlay');
let cart = document.querySelector('.cart');
let bagBtn = document.querySelectorAll('.bag-btn');
let cartContent = document.querySelector('.cart-content');
let remove = document.querySelector('.remove-item');
let cartTotal = document.querySelector('.cart-total');
let clearCart = document.querySelector('.clear-cart');
let cartItems = document.querySelector('.cart-items');
let cartList = [];
let cartData = [
    {
        id: 1,
        title: 'redwine',
        price: 15.99,
        img: 'redwine.jpg',
        desc: 'goooood foooood'
    },
    {
        id: 2,
        title: 'redwine',
        price: 15.99,
        img: 'redwine.jpg',
        desc: 'goooood foooood'
    },
    {
        id: 3,
        title: 'redwine',
        price: 15.99,
        img: 'redwine.jpg',
        desc: 'goooood foooood'
    },
    {
        id: 4,
        title: 'redwine',
        price: 15.99,
        img: 'redwine.jpg',
        desc: 'goooood foooood'
    },
    {
        id: 5,
        title: 'pizza',
        price: 19.99,
        img: 'pizza.jpg',
        desc: 'delicious foood'
    },
    {
        id: 6,
        title: 'redwine',
        price: 15.99,
        img: 'redwine.jpg',
        desc: 'goooood foooood'
    }

];
let totalPrice = 0;

cartContent.addEventListener('click', event => {
    if (event.target.classList.contains('remove-item')) {
        let id = parseInt(event.target.dataset.id) - 1;

        let parentElment = event.target.parentNode.parentNode;

        cartContent.removeChild(parentElment)
        console.log(cartList);



    }
});
clearCart.addEventListener('click', function () {
    cartList.splice(0);
    displayCartItems();

    cartContent.textContent = '';
    totalPrice = 0;
    cartTotal.textContent = totalPrice;
});

bagBtn.forEach(function (btn) {
    btn.addEventListener('click', function (btn) {

        let id = parseInt(btn.target.dataset.id) - 1;
        let cartItem = `
         <div class="cart-item" >


                        <img src="${cartData[id].img}" alt="product">
                        <div>
                            <h4>${cartData[id].title}</h4>
                            <h5>${cartData[id].price}</h5>
                            <span class="remove-item" data-id="${cartData[id].id}">remove</span>

                        </div>
                        <div>
                            <i class="fas fa-chevron-up"></i>
                            <p class="item-amount">1</p>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>`;
        cartList.push(cartItem);
        calculateTotalPrice(cartData[id].price);
        cartContent.innerHTML = this.cartList;
        displayCartItems();

    });
});

closeCart.addEventListener('click', function () {
    cartOverlay.classList.remove('transparentBcg');
    cart.classList.remove('showCart');
});

cartBtn.addEventListener('click', function () {
    cartOverlay.classList.add('transparentBcg');
    cart.classList.add('showCart');
});

nav.addEventListener('click', function () {
    side.classList.toggle('show-sidebar');

});

sideBar.addEventListener('click', function (e) {
    const id = e.target.dataset.id;
    if (id) {
        sideBtn.forEach(function (btn) {
            btn.classList.remove('active');
            e.target.classList.add('active');
        });
    }

    content.forEach(function (content) {
        content.classList.remove('active');

    });
    const element = document.getElementById(id);

    element.classList.add('active');
    section.style.display = 'block';
    logo.style.display = 'block';
    menuSection.style.display = 'none';
    cartBtn.classList.remove('active');

    console.log(id);

});

menu.addEventListener('click', function () {
    clearSection();
    menuSection.classList.add('active');
    menuSection.style.display = 'block';
    cartBtn.classList.add('active');

});

function clearSection () {
    section.style.display = 'none';
    logo.style.display = 'none';

}

function displayCartItems () {
    cartItems.textContent = cartList.length;
}

function calculateTotalPrice (cur) {
    totalPrice += cur;
    cartTotal.textContent = totalPrice;
}





