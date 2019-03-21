(function() {
	let params = new URL(location.href).searchParams.get('category');
	if (params === 'women') {
		console.log(params);
		getWomenProduct();
	}
	async function getWomenProduct(){
		const womenProductReq = new Request(`${apiDomain}/products/women`);
		const product = await fetchData(womenProductReq, getInit);
		if (product.paging) {
			let moreWoenReq = new Request(`${apiDomain}/products/women?paging=${product.paging}`);
			let isLoaded = true;
			function getMoreWomenProduct() {
				let body = document.documentElement; 
				let bodyRect = body.getBoundingClientRect();
				if (Math.floor(bodyRect.height) <= body.scrollTop + body.clientHeight + 100 && isLoaded) {
					scrollDownFetchData(moreWoenReq, getInit);
					isLoaded = false;
				}
			};
		}
		document.onscroll = getMoreWomenProduct;
	};
	document.querySelectorAll('.women-item').forEach(item => { 
		item.onclick = getWomenProduct;
	});
})();