import { chromium } from "playwright";

export async function extractExitoProducts(page) {
  // Find all li elements that contain a child with class priceSection_container-promotion_discount__EArt7
  const productsWithDiscount = await page.$$(
    "li:has(.priceSection_container-promotion_discount__EArt7)"
  );

  // For each product, extract the discount and the title
  const products = [];
  for (const product of productsWithDiscount) {
    let discount = await product.$eval(
      ".priceSection_container-promotion_discount__EArt7",
      (el) => el.innerText.replace(/[-\n%]/g, "")
    );

    const price = await product.$eval(
      ".ProductPrice_container__price__LS1Td",
      (el) => el.innerText
    );

    const image = await product.$eval(".imagen_plp", (el) => el.src);

    const title = await product.$eval("h3", (el) => el.innerText);

    products.push({ discount, title, price, image });
  }

  return products;
}

// Get all exito products
export const getExitoProducts = async () => {
  const browser = await chromium.launch(); // Launch the browser

  const urls = [
    "https://www.exito.com/coleccion/23855",
    "https://www.exito.com/coleccion/8539",
    "https://www.exito.com/coleccion/27551?productClusterIds=27551&facets=productClusterIds&sort=orders_desc&page=0",
  ]; // Add more URLs as needed

  const allProducts = [];
  for (const url of urls) {
    const page = await browser.newPage(); // Open a new page
    await page.goto(url, { waitUntil: "load" }); // Navigate to the URL

    const products = await extractExitoProducts(page);
    allProducts.push(...products);
  }

  return allProducts;
};
