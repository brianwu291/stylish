// 建立照片，故事
function createImg(main_image, images, title) {
  let mainImg = document.createElement('img')
  mainImg.src = main_image, mainImg.alt = title;
  
  const imageLists = [];
  images.forEach(ele => {
    let detailImg = document.createElement('img');
    detailImg.src = ele, detailImg.alt = title;
    imageLists.push(detailImg);
  });
  
  return [ mainImg, imageLists ];
};

// 建立名稱、id 跟價格
function createIdTitlePrice(id, title, price) {
  let id_p = document.createElement('p'), 
      title_p = document.createElement('p'),
      price_p = document.createElement('p');
  id_p.textContent = id, id_p.className = 'id',
  title_p.textContent = title, title_p.className = 'name',
  price_p.textContent = `TWD.${price}`, price_p.className = 'price';

  return [ title_p, id_p, price_p ];
}

// 建立顏色和尺寸
function createColorSize(colors, sizes) {
  let colorBtnLists = [];
  colors.forEach(({ code }) => {
    let wrapDiv = document.createElement('div'), btn = document.createElement('button');
    wrapDiv.className = `color-btn-wrap`;
    btn.id = code;
    btn.className = 'color-btn';
    btn.style = `background-color: #${code}`; 
    btn.dataset.color = code;
    wrapDiv.appendChild(btn);
    colorBtnLists.push(wrapDiv);
  });
  let sizeBtnLists = [];
  sizes.forEach(item => {
    let btn = document.createElement('button');
    btn.id = item;
    btn.className = 'size';
    btn.dataset.size = item;
    btn.textContent = item;
    sizeBtnLists.push(btn);
  })

  return [ colorBtnLists, sizeBtnLists ];
}

// 建立產品備註說明
function createProductNote(note, texture, description, place) {
  let desLists = description.split("\n");
  let mainNote_p = document.createElement('p'),
      material_p = document.createElement('p'),
      madeIn_p = document.createElement('p');
  mainNote_p.textContent = note, 
  mainNote_p.className = 'main-note';
  material_p.innerHTML = `${texture}<br/>${desLists[0]}<br/>${desLists[1]}<br/>`,
  material_p.className = 'material';
  madeIn_p.innerHTML = `素材產地 / ${place}<br/>加工產地 / ${place}`, 
  madeIn_p.className = 'made-in';
  
  return [ mainNote_p, material_p, madeIn_p ];
}