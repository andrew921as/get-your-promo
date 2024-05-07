import { chromium } from "playwright";

export const getAlkostoPdf = async () => {
  const browser = await chromium.launch(); // Launch the browser
  const page = await browser.newPage(); // Open a new page

  await page.goto("https://www.alkosto.com/mercado-tiendas-fisicas"); // Navigate to the URL

  // Find an element by its accessibility name
  const element = await page.locator(
    'role=link[name="mercado Descarga Catalogo aquí"]'
  );

  if ((await element.count()) > 0) {
    const href = await element.getAttribute("href"); // Fetch the href attribute of the element

    // Return the pdf file link
    return href;
  } else {
    console.log("No element found with the specified accessibility name.");
  }

  await browser.close(); // Close the browser
};
