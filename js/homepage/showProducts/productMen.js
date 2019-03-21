(function() {
	let params = new URL(location.href).searchParams.get('category');
	if (params === 'men') {
		console.log(params);
		getMenProduct();
	}
	async function getMenProduct(){
		const menProductReq = new Request(`${apiDomain}/products/men`);
		const product = await fetchData(menProductReq, getInit);
		if (product.paging) {
			let moreMenReq = new Request(`${apiDomain}/products/men?paging=${product.paging}`);
			let isLoaded = true;
			function getMoreMenProduct() {
				let body = document.documentElement; 
				let bodyRect = body.getBoundingClientRect();
				if (Math.floor(bodyRect.height) <= body.scrollTop + body.clientHeight + 100 && isLoaded) {
					scrollDownFetchData(moreMenReq, getInit);
					isLoaded = false;
				}
			};
		}
		document.onscroll = getMoreMenProduct;
	};
	document.querySelectorAll('.man-item').forEach(item => { 
		item.onclick = getMenProduct;
	});
})();