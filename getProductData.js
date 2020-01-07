const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getProductData(url) {
	const browser = await puppeteer.launch({
		args: chrome.args,
		executablePath: await chrome.executablePath,
		headless: chrome.headless
	});

	const page = await browser.newPage();
	await page.goto(url);
	await autoScroll(page);
	const description = await page.$eval('.styles__DescriptionContainer-uwktmu-9', el => el.textContent);
	const timestamp = await page.$eval('.styles__Details-uwktmu-4 time', el => el.getAttribute('datetime'));
	const images = await page.$$eval('.styles__Desktop-uwktmu-2 .styles__Image-uwktmu-7', images => {
		return images.map(image => image.src); 
	});
	await browser.close();
	return {
		description,
		images,
		timestamp
	};
}

async function autoScroll(page) {
	await page.evaluate(async () => {
		await new Promise((resolve, reject) => {
			var totalHeight = 0;
			var distance = 50;
			var timer = setInterval(() => {
				var scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;
				if (totalHeight >= scrollHeight) {
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
}

module.exports = async (req, res) => {
	let productSlug = req.url.replace('/', '');
	const url = `https://www.depop.com/products/${productSlug}`;
	const data = await getProductData(url);
	res.statusCode = 200;
	res.send({ data });
}