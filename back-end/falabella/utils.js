import { chromium } from "playwright";

export async function extractFalabellaProducts(page) {
  console.log("Finding products");

  // Find all li elements that contain a child with class priceSection_container-promotion_discount__EArt7
  const productsWithDiscount = await page.$$(
    ".jsx-1484439449:has(.jsx-2575670149)"
  );

  console.log("Found products", productsWithDiscount.length);

  // For the first 5 products, extract the discount, price, image, and title
  const products = [];
  for (const product of productsWithDiscount.slice(0, 7)) {
    try {
      let discount = await product.$eval(
        ".jsx-2575670149",
        (el) => el.innerText.replace(/[-\n%]/g, ""),
        { timeout: 5000 }
      );

      console.log("Discount", discount);

      const price = await product.$eval(
        ".copy10.primary.jsx-3451706699.normal.line-height-22",
        (el) => el.innerText,
        { timeout: 5000 }
      );

      console.log("Price", price);

      const image = await product.$eval("img.jsx-1996933093", (el) => el.src, {
        timeout: 5000,
      });

      console.log("Image", image);

      const title = await product.$eval(".pod-subTitle", (el) => el.innerText, {
        timeout: 5000,
      });

      console.log("Title", title);

      const link = await product.$eval("a", (el) => el.href, {
        timeout: 5000,
      });

      products.push({
        discount,
        title,
        price,
        image,
        store: "Falabella",
        link,
      });
    } catch (err) {
      console.log("Error evaluating product:", error);
      continue; // Skip to the next iteration of the loop
    }
  }

  return products;
}

// Get all carulla products
export const getFalabellaProducts = async () => {
  console.log("Getting Fallabela products");
  const browser = await chromium.launch(); // Launch the browser

  const urls = [
    "https://www.falabella.com.co/falabella-co/category/cat50868/Tecnologia",
    "https://www.falabella.com.co/falabella-co/category/cat10270963/Muebles-y-Organizacion",
    "https://www.falabella.com.co/falabella-co/category/cat5440960/Belleza--higiene-y-salud",
    // "https://www.carulla.com/mercado/mejor-precio",
  ]; // Add more URLs as needed

  const allProducts = [];
  for (const url of urls) {
    console.log("Creating new page");
    const page = await browser.newPage(); // Open a new page

    console.log("Navigating to", url);
    await page.goto(url, { waitUntil: "load" }); // Navigate to the URL

    console.log("Scraping", url);

    const products = await extractFalabellaProducts(page);
    allProducts.push(...products);
  }

  return allProducts;
};
