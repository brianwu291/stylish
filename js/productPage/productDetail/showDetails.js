(function() {
  let idParams = new URL(location.href).searchParams.get('id');
  const productDetailReq =  new Request(`${apiDomain}/products/details?id=${idParams}`);
  fetchData(productDetailReq, getInit);
})();