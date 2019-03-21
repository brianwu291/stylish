const fetchData = (req, init) => {
  return fetch(req, init)
    .then(pro => pro.json())
    .then(
      ({ data }) => {
        const { colors, description, id, images, main_image,  
          note, place, price, sizes, story, texture, title, variants, wash
        } = data;
        // 填上照片, 故事
        const [ main_img, imgLists ] = createImg(main_image, images, title);
        document.querySelector('.main-img').append(main_img);
        document.querySelectorAll('.detail-text').forEach(item => {
          item.textContent = story;
        });
        document.querySelector('.detail-first-part').appendChild(imgLists[0]);
        document.querySelector('.detail-second-part').appendChild(imgLists[1]);

        // 填上 id, title, price
        const idTitlePrice = createIdTitlePrice(id, title, price);
        idTitlePrice.forEach(item => {
          document.querySelector('.name-id-price').appendChild(item);
        });

        // 填上顏色，尺寸
        const [ colorBtnLists, sizeBtnLists ] = createColorSize(colors, sizes);
        colorBtnLists.forEach(item => {
          document.querySelector('.color-group').appendChild(item);
        });
        sizeBtnLists.forEach(item => {
          document.querySelector('.size-group').appendChild(item);
        });

        // 填上產品備註說明
        const productNoteLists = createProductNote(note, texture, description, place);
        productNoteLists.forEach(item => {
          document.querySelector('.product-note').appendChild(item);
        });

        // handle color, size and quantity choose
        colorSizeAndQuantityChoose(variants, colors, sizes, id, main_image, price, title);
      }
    );
};