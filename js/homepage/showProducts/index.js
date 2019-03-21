const fetchData = (req, init) => {
  return fetch(req, init)
    .then(pro => pro.json())
    .then(
      result => {
        const { data } = result;
        let productLists = [];

        if (data.length) {
          createLists(data, productLists);
          document.querySelector('.flex-column').innerHTML = productLists.join('');
        } else {
          document.querySelector('.flex-column').textContent = 'There are no result';
        }
        return result;
      }
    );
};