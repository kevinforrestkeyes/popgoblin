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
	const description = await page.$eval('.styles__DescriptionContainer-uwktmu-9', el => el.textContent);
	await browser.close();
	return description;
}

module.exports = async (req, res) => {
	const pathname = url.parse(req.url).pathname;
	console.log(pathname);
	let url = pathname.slice(1);
	if (!url.startsWith('http')) {
			url = 'https://' + url;
	}
	const description = await getProductData(url);
	res.statusCode = 200;
	res.end(description);
}