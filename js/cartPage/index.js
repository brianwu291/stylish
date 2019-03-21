(function() {
  let productDetail = document.querySelector('.product-detail');
  let data = getLocalstorage();
  let order = { 
    shipping: '', 
    payment: '',
    subtotal: 0,
    freight: 0,
    total: 0,
    recipient: {
      name: '',
      phone: '',
      email: '',  
      address: '',
      time: ''
    },
    list:[]
  };
  let userCheckoutPrime = {
    prime: ''
  };
  function renderProductLists() {
    if (!data.cart.length) {
      productDetail.textContent = "You Don't Have Any Product In Cart";
    }
    //建立 product-item div
    let productItem = document.createElement('div')
    productItem.classList.add('product-item');
    // 把商品們加上去
    data.cart.forEach((item, index) => {
      let productItem = document.createElement('div')
      productItem.classList.add('product-item');
      productItem.classList.add(`product-item-${index}`);
      
      let itemImgAndDetail = createItemImgAndDetail(item.image, item.name, item.id, item.color.name, item.size, index)
      productItem.appendChild(itemImgAndDetail);

      let quantityPriceSumup = createQuantityPriceSumup(item.qty, item.stock, item.price, index);
      productItem.appendChild(quantityPriceSumup);
      productDetail.append(productItem);
    });
    //計算每個項目商品小計、運費＆總價
    let productPrice = 0;
    document.querySelectorAll('.sumup-text').forEach(item => {
      productPrice = parseInt(productPrice) + parseInt(item.innerHTML);
    });
    document.querySelector('.product-price-text').textContent = productPrice;
    order.subtotal = productPrice;
    order.freight = 30;
    let totalPrice = productPrice + 30;
    document.querySelector('.total-price-text').textContent = totalPrice;
    order.total = totalPrice;

    // 監聽改變商品數量、同時改變小、總金額與應付金額，並更新localstorage
    data.cart.forEach((item, index) => {
      let quantity = document.querySelector(`.quantity-text-${index}`);
      let price = document.querySelector(`.price-text-${index}`);
      let total = document.querySelector(`.sumup-text-${index}`);
      function modifyQuantityAndPrice(e) {
        if(e.target.className.includes(index)){
          item.qty = parseInt(quantity.value); //更新data
          setDataAndLocalstorage(data);
          getLocalstorage();
        }
        total.textContent = parseInt(e.target.value) * parseInt(price.innerHTML);
        let productPrice = 0;
        document.querySelectorAll('.sumup-text').forEach(item => {
          productPrice = parseInt(productPrice) + parseInt(item.innerHTML);
          order.subtotal = productPrice;
        });
        document.querySelector('.product-price-text').textContent = productPrice;
        order.freight = 30;
        let totalPrice = productPrice + 30;
        document.querySelector('.total-price-text').textContent = totalPrice;
        order.total = totalPrice;
      };
      quantity.addEventListener('change', modifyQuantityAndPrice);
    });

    // 監聽刪除按鈕，移除後改變小計、總金額、應付金額，並更新localstorage，更新data。
    data.cart.forEach((item, index) => {
      function modifyDataAndLocalstorage(e){
        // 重新設定 data、localstorage
        if(e.target.id.includes(index)){
          data.cart.splice(index, 1); //設定data
          setDataAndLocalstorage(data);
          while (productDetail.firstChild) {
            productDetail.removeChild(productDetail.firstChild);
          }
          getLocalstorage();
          renderProductLists();
        }
        // 改變頁面laylout、重新計算金額
      };
      document.querySelector(`#web-remove-${index}`).addEventListener('click', modifyDataAndLocalstorage)
      document.querySelector(`#mobile-remove-${index}`).addEventListener('click', modifyDataAndLocalstorage)
    });
  };
  renderProductLists();

  function getUserSubmit() {
    let name = document.querySelector('.name-input').value;
    let email = document.querySelector('.email-input').value;
    let phone = document.querySelector('.phone-input').value;
    let address = document.querySelector('.address-input').value;
    // 防呆
    if(name === '' || typeof(name) !== 'string' || parseInt(name)){
      document.querySelector('.name-input').value = '請輸入姓名！！';
    }else if(email === '' || !email.includes('@')){
      document.querySelector('.email-input').value = '電子郵件格式不正確';
    }else if(phone === '' || phone.length !== 10 || !parseInt(phone)){
      document.querySelector('.phone-input').value = '電話號碼格式不正確！！';
    }else if(address === '' || typeof(address) !== 'string' || parseInt(address)){
      document.querySelector('.address-input').value = '請輸入有效地址！！';
    }else{
      order.shipping = 'delivery';
      order.payment = 'credit';
      order.recipient.name = name;
      order.recipient.email = email;
      order.recipient.phone = phone;
      order.recipient.address = address;
      document.getElementsByName('time').forEach(item => {
        if (item.checked) {
          order.recipient.time = item.value;
        }
      });
      document.querySelector('.debit').classList.remove('payment-hide');
    }    
  }
  document.querySelector('.checkout-button').addEventListener('click', getUserSubmit);
  // handle 信用卡 付款
  function submitAll(){
    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();
    // 確認是否可以 getPrime
    if(tappayStatus.canGetPrime === false){
      alert('卡片資訊錯誤，請重新交易!');
      return;
    }else if(tappayStatus.canGetPrime === true){
      TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
          alert('卡片資訊錯誤，請重新交易!');
          return;
        }else{
          document.getElementById('submit-checkout-button').classList.add('loading-hide');
          document.getElementById('after-submit-checkout-button').classList.remove('loading-hide');
          userCheckoutPrime = {
            ...userCheckoutPrime,
            prime: result.card.prime
          };

          order.list = data.cart;
          let checkoutReqBody = {
            prime: userCheckoutPrime.prime,
            order: {...order}
          };

          const checkoutReq = new Request(`${apiDomain}/order/checkout`);
          let Header = new Headers({
            'Content-Type': 'application/json'
          });
          let checkoutPostInit = {
            method: 'POST',
            mode: 'cors',
            headers: Header,
            body: JSON.stringify(checkoutReqBody)
          };
          console.log(checkoutPostInit);
          fetch(checkoutReq, checkoutPostInit)
            .then(pro => pro.json())
            .then(res => {
              console.log(res.data.number);
              window.location.assign(`https://brianwu291.github.io/Web-Front-End-2019-Spring/students/Brian/stylish/pages/thankyou.html?ordernumber=${res.data.number}`);
              localStorage.clear();
            });
        };
      });
    };
  };
  document.querySelector('#submit-checkout-button').addEventListener('click', submitAll);
})();