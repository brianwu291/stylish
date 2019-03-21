// 建立item-img-and-detail
function createItemImgAndDetail(image_src, name, id, colorname, size, index) {
  let itemImgAndDetail = document.createElement('div');
  itemImgAndDetail.classList.add('item-img-and-detail');
  let itemDetail = document.createElement('div');
  itemDetail.classList.add('item-detail');
  let detailTitleId = document.createElement('div');
  detailTitleId.classList.add('detail-title-id');
  let colorAndSize = document.createElement('div');
  colorAndSize.classList.add('color-and-size');
  
  // 放上照片
  let itemImg = document.createElement('img');
  itemImg.src = image_src, itemImg.alt = name;
  itemImg.style.width = '114px';
  itemImg.style.height = '151.519px';
  itemImgAndDetail.appendChild(itemImg);
  
  // 建立名稱、型號
  let p_title = document.createElement('p');
  p_title.classList.add('title'), p_title.textContent = name;
  detailTitleId.appendChild(p_title);
  let p_id = document.createElement('p');
  p_id.classList.add('id'), p_id.textContent = id;
  detailTitleId.appendChild(p_id);
  itemDetail.appendChild(detailTitleId);
  
  // 建立顏色、尺寸
  let p_colorName = document.createElement('p');
  p_colorName.classList.add('color'), p_colorName.textContent = `顏色 | ${colorname}`;
  colorAndSize.appendChild(p_colorName);
  let p_size = document.createElement('p');
  p_size.classList.add('size'), p_size.textContent = `尺寸 | ${size}`;
  colorAndSize.appendChild(p_size);
  itemDetail.appendChild(colorAndSize);
  // 放上名稱、型號、顏色、尺寸
  itemImgAndDetail.appendChild(itemDetail);
  
  //建立行動版移除按鈕
  let removeMobile = document.createElement('div');
  removeMobile.classList.add('remove-mobile');
  let removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  let removeBtnImg = document.createElement('img');
  removeBtnImg.src = '../images/cart/cart-remove.png', 
  removeBtnImg.alt = 'remove button';
  removeBtnImg.id = `mobile-remove-${index}`;
  // 放上行動版移除按鈕
  removeButton.appendChild(removeBtnImg);
  removeMobile.appendChild(removeButton);
  itemImgAndDetail.appendChild(removeMobile);

  return itemImgAndDetail;
};
// 建立quantity, price, sumup等等，並計算總價
function createQuantityPriceSumup(quantity, stock, price, index){
  let quantityPriceSumup = document.createElement('div');
  quantityPriceSumup.classList.add('quantity-price-sumup');
  //建立 title 們
  let title = document.createElement('div');
  title.classList.add('title');
  let p_quantityTitle = document.createElement('p');
  p_quantityTitle.classList.add('quantity-title'), p_quantityTitle.textContent = '數量';
  title.appendChild(p_quantityTitle);
  let p_priceTitle = document.createElement('p');
  p_priceTitle.classList.add('price-title'), p_priceTitle.textContent = '單價';
  title.appendChild(p_priceTitle)
  let p_sumupTitle = document.createElement('p');
  p_sumupTitle.classList.add('sumup-title'), p_sumupTitle.textContent = '小計';
  title.appendChild(p_sumupTitle);
  // title 放上 quantity-price-sumup
  quantityPriceSumup.appendChild(title);

  // 建立數量、單價和小計
  let text = document.createElement('div');
  text.classList.add('text');
  let selectQuantity = document.createElement('select');
  selectQuantity.classList.add('quantity-text');
  selectQuantity.classList.add(`quantity-text-${index}`);
  for (let i = 1; i <= stock ; i++) {
    let optionEle = document.createElement('option');
    optionEle.value = i, optionEle.textContent = i;
    if (optionEle.value == quantity) {
      optionEle.selected = true;
    }
    selectQuantity.appendChild(optionEle);
  }
  text.appendChild(selectQuantity);
  // 加上單價
  let p_priceText = document.createElement('p');
  p_priceText.classList.add('price-text');
  p_priceText.classList.add(`price-text-${index}`)
  p_priceText.textContent = price;
  text.appendChild(p_priceText);
  // 加上總價
  let p_sumupText = document.createElement('p');
  p_sumupText.classList.add('sumup-text');
  p_sumupText.classList.add(`sumup-text-${index}`);
  p_sumupText.textContent = parseInt(selectQuantity.value) * price;
  text.appendChild(p_sumupText);
  // text 放上 quantity-price-sumup
  quantityPriceSumup.appendChild(text);

  //建立 web 版移除按鈕
  let removeWeb = document.createElement('div');
  removeWeb.classList.add('remove-web');
  let removeButton = document.createElement('button');
  removeWeb.classList.add('remove');
  let removeBtnImg = document.createElement('img');
  removeBtnImg.src = '../images/cart/cart-remove.png', 
  removeBtnImg.alt = 'remove button',
  removeBtnImg.id = `web-remove-${index}`;
  // 放上 Web 版移除按鈕
  removeButton.appendChild(removeBtnImg);
  removeWeb.appendChild(removeButton);
  quantityPriceSumup.appendChild(removeWeb);

  return quantityPriceSumup;
};