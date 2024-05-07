import { chromium } from "playwright";

export async function extractCarullaProducts(page) {
  console.log("Finding products");

  // Find all li elements that contain a child with class priceSection_container-promotion_discount__EArt7
  const productsWithDiscount = await page.$$(
    ".vtex-product-summary-2-x-element:has(.exito-vtex-components-4-x-badgeDiscount)"
  );

  console.log("Found products", productsWithDiscount.length);

  // For each product, extract the discount and the title
  const products = [];
  for (const product of productsWithDiscount) {
    let discount = await product.$eval(
      ".exito-vtex-components-4-x-badgeDiscount",
      (el) => el.innerText.replace(/[-\n%]/g, "")
    );

    const price = await product.$eval(
      ".exito-vtex-components-4-x-currencyContainer",
      (el) => el.innerText
    );

    const image = await product.$eval(
      ".vtex-product-summary-2-x-imageNormal",
      (el) => el.src
    );

    const title = await product.$eval(
      ".vtex-store-components-3-x-productBrand ",
      (el) => el.innerText
    );

    products.push({ discount, title, price, image });
  }

  return products;
}

// Get all carulla products
export const getCarullaProducts = async () => {
  console.log("Getting Carulla products");
  const browser = await chromium.launch(); // Launch the browser

  const urls = [
    "https://www.carulla.com/tecnologia",
    // "https://www.carulla.com/mercado/mejor-precio",
  ]; // Add more URLs as needed

  const allProducts = [];
  for (const url of urls) {
    console.log("Creating new page");
    const page = await browser.newPage(); // Open a new page

    console.log("Navigating to", url);
    await page.goto(url); // Navigate to the URL

    console.log("Scraping", url);

    const products = await extractCarullaProducts(page);
    allProducts.push(...products);
  }

  return allProducts;
};
