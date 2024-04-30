import express, { response } from 'express';
import corse from 'cors';
import { chromium } from 'playwright';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(corse());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
	res.send('Welcome the Get Your Promo API!');
});

app.get('/alkosto', async (req, res) => {
    const browser = await chromium.launch();  // Launch the browser
    const page = await browser.newPage();     // Open a new page

    await page.goto('https://www.alkosto.com/mercado-tiendas-fisicas');  // Navigate to the URL

    // Find an element by its accessibility name
	const element = await page.locator('role=link[name="mercado Descarga Catalogo aquí"]');


    if (await element.count() > 0) {
        const href = await element.getAttribute('href');  // Fetch the href attribute of the element
        console.log(href);  // Print the href
        res.send({ response: href});
    } else {
        console.log("No element found with the specified accessibility name.");
        res.send({ response: "No element found with the specified accessibility name."}).status(404);
    }

    await browser.close();  // Close the browser
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});