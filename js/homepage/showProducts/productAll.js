(function(){
  let params = new URL(location.href).searchParams.get('search');
	if(params){
    console.log(params);
    return;
  }
  if(!params){
    //console.log('all');
    const allProductReq = new Request(`${apiDomain}/products/all`);
    async function getAllProduct(){
      const product = await fetchData(allProductReq, getInit);
      if(product.next_paging){
        let moreProductReq = new Request(`${apiDomain}/products/all?paging=${product.next_paging}`);
        let isLoaded = true;
        function getMoreAllProduct(){
          let body = document.documentElement; 
          let bodyRect = body.getBoundingClientRect();
          if(Math.floor(bodyRect.height) <= body.scrollTop + body.clientHeight + 100 && isLoaded){
            //console.log('has scroll');
            scrollDownFetchData(moreProductReq, getInit);
            isLoaded = false;
          }
          // 當 Math.floor(bodyRect.height) === body.scrollTop + body.clientHeight 且 isLoaded 為 true
          // 觸發 scrollDownFetchData 
        };
      }
      document.onscroll = getMoreAllProduct;
    };
    getAllProduct();
    document.querySelector('.logo').onclick = getAllProduct;
  }
})();