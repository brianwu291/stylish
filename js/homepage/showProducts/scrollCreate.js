const scrollDownFetchData = (req, init) => {
  fetch(req, init)
    .then(pro => pro.json())
    .then(
      ({ data }) => {
        let productLists = [];
        createMoreLists(data, productLists);

        productLists.forEach(item => {
          let moreProductNode = document.createElement('div');
          moreProductNode.className = 'column';
          moreProductNode.innerHTML = item;
          document.querySelector('.flex-column').appendChild(moreProductNode);
        });
      }
    );
};