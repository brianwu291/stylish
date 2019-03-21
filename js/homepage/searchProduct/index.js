(function() {
  // handle search params from other page
  let params = new URL(location.href).searchParams.get('search');
	if(params){
    //console.log(params);
    (async function() {
      const searchReq = new Request(`${apiDomain}/products/search?keyword=${params}`);
      const product = await fetchData(searchReq, getInit);
      if (product.paging) {
        let isLoaded = true;
        let searchMoreReq = new Request(`${apiDomain}/products/search?keyword=${userInput}&paging=${product.paging}`);
        function getMoreSearchProduct() {
          let body = document.documentElement; 
          let bodyRect = body.getBoundingClientRect();
          if (Math.floor(bodyRect.height) <= body.scrollTop + body.clientHeight && isLoaded) {
            scrollDownFetchData(searchMoreReq, getInit);
            isLoaded = false;
          }
        };
        document.onscroll = getMoreSearchProduct;
      }
    })();
  };
  const searchFormLists = document.querySelectorAll('.search-form'); 
  searchFormLists.forEach(item => {
    item.addEventListener('submit', e => {
      e.preventDefault();
      const inputNodeLists = document.querySelectorAll('.input');

      inputNodeLists.forEach(item => {
        let userInput = item.value;

        async function searchProduct() {
          if (!userInput) {
            item.placeholder = '請輸入商品名稱';
          }else{
            const searchReq = new Request(`${apiDomain}/products/search?keyword=${userInput}`);
            const product = await fetchData(searchReq, getInit);
            if (product.paging) {
              let isLoaded = true;
              let searchMoreReq = new Request(`${apiDomain}/products/search?keyword=${userInput}&paging=${product.paging}`);
              function getMoreSearchProduct() {
                let body = document.documentElement; 
                let bodyRect = body.getBoundingClientRect();
                if (Math.floor(bodyRect.height) === body.scrollTop + body.clientHeight && isLoaded) {
                  scrollDownFetchData(searchMoreReq, getInit);
                  isLoaded = false;
                }
              };
            }
            document.onscroll = getMoreSearchProduct;
            item.value = '';
          }
        };
        searchProduct();
      });
    });
  });
  
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
})();