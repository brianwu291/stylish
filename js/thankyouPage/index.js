(function(){
  let params = new URL(location.href).searchParams.get('ordernumber'); 
  if(params){
    document.querySelector('.main-content__body').textContent = `這是您的訂單編號：${params}`;
  };
})();
