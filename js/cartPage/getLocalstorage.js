function getLocalstorage() {
  let cartJson = localStorage.getItem('cartData');
  let data = cartJson ? JSON.parse(cartJson) : { cart: []};
  if (localStorage.getItem('cartData')) {
    let cartNoneLists = document.querySelectorAll('.cart-none');
    cartNoneLists.forEach(item => {
      item.classList.remove('cart-none');
      item.classList.add('quantity-in-cart');
      item.textContent = parseInt(data.cart.length) > 9 ? `9+` : `${parseInt(data.cart.length)}`;
    });
    let cartHasLists = document.querySelectorAll('.quantity-in-cart');
    cartHasLists.forEach(item => {
      item.textContent = parseInt(data.cart.length) > 9 ? `9+` : `${parseInt(data.cart.length)}`;
    });
  }
  return data;
}

function setDataAndLocalstorage(data){
  localStorage.setItem('cartData', JSON.stringify(data));
};