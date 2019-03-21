const createLists = (data, productLists) => {
  data.reduce((pre, item) => {
    const {  main_image, price, colors, title, id  } = item;
    let colorBlocks = colors.map(
      ({ code }) => (`<div class="square" style="background-color: #${code}"></div>`)
    );
    productLists.push(
      `<div class="column">
        <a href="product.html?id=${id}">
        <img class="img-${pre}" src=${main_image} alt=${title}/>
        </a>
        <div class="column-square">${colorBlocks.join('')}</div>
        <p class="p-up"><a href="product.html?id=${id}">${title}</a></p>
        <p class="p-down">TWD. ${price}</p>
      </div>`
    );
    return ++pre;
  }, 1);
};

const createMoreLists = (data, productLists) => {
  data.reduce((pre, item) => {
    const {  main_image, price, colors, title, id  } = item;
    let colorBlocks = colors.map(
      ({ code }) => (`<div class="square" style="background-color: #${code}"></div>`)
    );
    productLists.push(
      `<a href="product.html?id=${id}">
      <img class="img-${pre}" src=${main_image} alt=${title}/>
      </a>
      <div class="column-square">${colorBlocks.join('')}</div>
      <p class="p-up"><a href="product.html?id=${id}">${title}</a></p>
      <p class="p-down">TWD. ${price}</p>`
    );
    return ++pre;
  }, 1);
};