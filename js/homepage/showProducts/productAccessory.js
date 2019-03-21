(function() {
	let params = new URL(location.href).searchParams.get('category');
	if (params === 'accessory') {
		console.log(params);
		getAccessoryProduct();
	}
	async function getAccessoryProduct(){
		const accessoryProductReq = new Request(`${apiDomain}/products/accessories`);
		const product = await fetchData(accessoryProductReq, getInit);
		if (product.paging) {
			let moreAccessoryReq = new Request(`${apiDomain}/products/accessories?paging=${product.paging}`);
			let isLoaded = true;
			function getMoreAccessoryProduct() {
				let body = document.documentElement; 
				let bodyRect = body.getBoundingClientRect();
				if (Math.floor(bodyRect.height) <= body.scrollTop + body.clientHeight + 100 && isLoaded) {
					scrollDownFetchData(moreAccessoryReq, getInit);
					isLoaded = false;
				}
			};
		}
		document.onscroll = getMoreAccessoryProduct;
	};
	document.querySelectorAll('.accessory-item').forEach(item => { 
		item.onclick = getAccessoryProduct;
	});
})();