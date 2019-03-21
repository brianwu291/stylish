(function () {
  const campaignReq = new Request(`${apiDomain}/marketing/campaigns`);
  fetch(campaignReq, getInit)
    .then(pro => pro.json())
    .then( 
      ({ data }) => {
        let photoLists = [];
        createPhotos(data, photoLists);
        //console.log(photoLists);
        document.querySelector('.campaign-wrapper').innerHTML = photoLists.join('');
      }
    );
})();