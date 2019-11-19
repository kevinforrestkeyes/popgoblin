# project overview

popgoblin is just a tiny piece of a larger application [wjisk](https://github.com/kevinforrestkeyes/wjisk) - for taking product data that has been uploaded to [Depop](https://www.depop.com/) and transferring it to a store on [Shopify](https://shopify.com/). it can be tedious to try to maintain parity between the two platforms as there are no existing tools for moving data between them. i wanted to create a simple application to bridge the gap between these platforms and allow the user some control over how the products were being processed as they move from Depop to Shopify. this repository is only the part of this application, and is used to support other applications that i built specifically to facilitate this process. 

## this repository

popgoblin is just a small serverless lambda function that runs puppeteer on a headless chrome instance to scrape detailed product data from specified Depop product pages. for more context on this, visit the other repositories.

## supporting applications

* [wjisk](https://github.com/kevinforrestkeyes/wjisk)
* [popwizard](https://github.com/kevinforrestkeyes/popwizard)
* [anpoorte](https://github.com/kevinforrestkeyes/anpoorte)
