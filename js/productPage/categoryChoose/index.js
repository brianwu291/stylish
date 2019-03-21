function colorSizeAndQuantityChoose(variants, colors, sizes, id, main_image, price, title) {
  let cartJson = localStorage.getItem('cartData');
  let data = cartJson ? JSON.parse(cartJson) : { cart: []};
  if (localStorage.getItem('cartData')) {
    let cartNoneLists = document.querySelectorAll('.cart-none');
    cartNoneLists.forEach(item => {
      item.classList.remove('cart-none');
      item.classList.add('quantity-in-cart');
      item.textContent = parseInt(data.cart.length) > 9 ? `9+` : `${parseInt(data.cart.length)}`;
    });
  }
  let colorlists = []; 
  let sizeLists = [];
  let userChoice = { 
    name: title,
    id: id ,
    image: main_image ,
    color: {
      name: '',
      code: ''
    },
    size: '',
    price: price,
    stock: 0
  };
  colors.forEach(item => {
    colorlists.push(item.code);
  });

  sizes.forEach(item => {
    sizeLists.push(item);
  });

  function changeAddToCartCTA() {
    variants.forEach(item => {
      if (item.color_code === userChoice.color.code && item.size === userChoice.size) {
        userChoice.stock = item.stock;
        document.getElementById('quantity-input').value = 1;
      }
      if (userChoice.color.code !== '' && userChoice.size !== '' && userChoice.stock !== 0) {
        document.querySelector('.add-to-cart').textContent = '加入購物車';
        document.querySelector('.add-to-cart').disabled = false;
      }
      if (userChoice.stock === 0 && userChoice.color.code !== '' && userChoice.size !== '') {
        document.querySelector('.add-to-cart').textContent = '此商品沒有存貨了';
        document.getElementById('quantity-input').value = 0;
        document.querySelector('.add-to-cart').disabled = true;
      }    
    });
  }
  // 設定頁面顏色變化
  function setColorActive(e) {
    let seletedBtnLists = document.querySelectorAll('.color-btn.btn-selected');
      if(seletedBtnLists.length){
        seletedBtnLists.forEach(item => item.classList.remove('btn-selected'));
      }
      e.target.classList.toggle('btn-selected');
  };
  // 顏色選擇
  function storeColorChoice(e) {
    const color_code = e.target.dataset.color;
    colors.forEach(item => {
      if (color_code === item.code) {
        userChoice.color.name = item.name;
      }
    });
    userChoice.color.code = color_code;
    changeAddToCartCTA();
  }

  // 設定頁面尺寸變化
  function setSizeActive(e) {
    let seletedBtnLists = document.querySelectorAll('.size.size-btn-selected');
    if(seletedBtnLists.length) {
      seletedBtnLists.forEach(item => item.classList.remove('size-btn-selected'));
    }
    e.target.classList.toggle('size-btn-selected');
  }
  // 尺寸選擇
  function storeSizeChoice(e) {
    userChoice.size = e.target.dataset.size;
    changeAddToCartCTA();
  }
  
  // 商品數量增加
  function plusQuantity() {
    let input = document.querySelector('#quantity-input');
    if (input.value >= userChoice.stock) {
      input.value = userChoice.stock;
    }else{
      input.value = parseInt(input.value) + 1;
    }
  };  
  // 商品數量減少
  function minusQuantity(){
    let input = document.querySelector('#quantity-input');
    if (input.value <= 1 && userChoice.stock !== 0) {
      input.value = 1;
    }else if(userChoice.stock === 0) {
      document.querySelector('.add-to-cart').textContent = '此商品沒有存貨了';
      document.getElementById('quantity-input').value = 0;
      document.querySelector('.add-to-cart').disabled = true;
    }else if(input.value > userChoice.stock){
      input.value = userChoice.stock;
    }else{
      input.value = parseInt(input.value) - 1;
    }
  }

  // 加入購物車: 存入localstorage，並在購物車icon顯示已加入項目數字。
  // cart-none  quantity-in-cart
  function addItemToCart() {
    userChoice.qty = parseInt(document.getElementById('quantity-input').value);
    let isRepeated = data.cart.some((item, index) => {
      if (item.color.code === userChoice.color.code && item.size === userChoice.size) {
        data.cart[index] = 
        { ...item, 
          qty: (parseInt(item.qty) + parseInt(userChoice.qty) >= userChoice.stock ? 
          userChoice.stock : parseInt(item.qty) + parseInt(userChoice.qty)) 
        };
        return true;
      }
    });
    if (isRepeated) {
      localStorage.setItem('cartData', JSON.stringify(data));
    } else {
      data.cart.push(JSON.parse(JSON.stringify(userChoice)));
      localStorage.setItem('cartData', JSON.stringify(data));
    }
  }
  // 加入購物車項目數量顯示
  function addItemToCartNum() {
    if (document.querySelectorAll('.quantity-in-cart').length) {
      let cartLists = document.querySelectorAll('.quantity-in-cart');
      cartLists.forEach(item => {
        let totalLists = parseInt(data.cart.length);
        item.textContent = totalLists > 9 ? `9+` : `${totalLists}`;
      });
    }
    if (document.querySelectorAll('.cart-none').length) {
      let cartNoneLists = document.querySelectorAll('.cart-none');
      cartNoneLists.forEach(item => {
        item.classList.remove('cart-none');
        item.classList.add('quantity-in-cart');
        item.textContent = `${parseInt(data.cart.length)}`;
      });
    }
  };
  
  // 處理顏色選擇 addEventlistener
  colorlists.forEach(item => {
    const color = document.getElementById(`${item}`);
    color.addEventListener('click', setColorActive);
    color.addEventListener('click', storeColorChoice);
  });
  // 處理尺寸選擇 addEventlistener
  sizeLists.forEach(item => {
    const size = document.querySelector(`#${item}`);
    size.addEventListener('click', setSizeActive);
    size.addEventListener('click', storeSizeChoice);
  });
  // 處理商品數量選擇 addEventlistener
  document.querySelector('#minus-btn').addEventListener('click', minusQuantity);
  document.querySelector('#plus-btn').addEventListener('click', plusQuantity);
  // 處理加入購物車，並存在 localstorage
  document.querySelector('.add-to-cart').addEventListener('click', addItemToCart);
  document.querySelector('.add-to-cart').addEventListener('click', addItemToCartNum);

};
