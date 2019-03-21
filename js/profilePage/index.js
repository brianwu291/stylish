// 一進入首頁，就載入localstorage
let data = (localStorage.getItem('cartData')) ? JSON.parse(localStorage.getItem('cartData')) : {
  cart: []
};
if (localStorage.getItem('cartData')) {
  let cartNoneLists = document.querySelectorAll('.cart-none');
  cartNoneLists.forEach(item => {
    item.classList.remove('cart-none');
    item.classList.add('quantity-in-cart');
    item.textContent = parseInt(data.cart.length) > 9 ? `9+` : `${parseInt(data.cart.length)}`;
  });
}