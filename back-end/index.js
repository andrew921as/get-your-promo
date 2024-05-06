import express, { response } from "express";
import corse from "cors";
import { chromium } from "playwright";
import { getExitoProducts } from "./exito/utils.js";
import { getCarullaProducts } from "./carulla/utils.js";
import { promisify } from "util";

// Redis configuration
import { getFalabellaProducts } from "./falabella/utils.js";

import { createClient } from "redis";

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect(); // Create a new Redis client

await client.set("key", "me funciono");
const value = await client.get("key");
console.log(value);

// Express configuration
const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(corse());

// Serve static files from the "pdfs" directory
app.use("/pdfs", express.static("pdfs"));

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Welcome the Get Your Promo API!");
});

app.get("/alkosto", async (req, res) => {
  const browser = await chromium.launch(); // Launch the browser
  const page = await browser.newPage(); // Open a new page

  await page.goto("https://www.alkosto.com/mercado-tiendas-fisicas"); // Navigate to the URL

  // Find an element by its accessibility name
  const element = await page.locator(
    'role=link[name="mercado Descarga Catalogo aquí"]'
  );

  if ((await element.count()) > 0) {
    const href = await element.getAttribute("href"); // Fetch the href attribute of the element

    // Send the pdf file
  } else {
    console.log("No element found with the specified accessibility name.");
    res
      .send({
        response: "No element found with the specified accessibility name.",
      })
      .status(404);
  }

  await browser.close(); // Close the browser
});

app.get("/jumbo", async (req, res) => {
  const browser = await chromium.launch(); // Launch the browser
  const page = await browser.newPage(); // Open a new page

  await page.goto("https://www.tiendasjumbo.co/ofertas"); // Navigate to the URL

  // Go to the Jumbo website and create a PDF of the promotions website
  await page.pdf({ path: "./pdfs/jumbo-promotions.pdf" });

  // Return the PDF link
  res.send({ link: `http://${req.headers.host}/pdfs/jumbo-promotions.pdf` });
});

app.get("/exito", async (req, res) => {
  try {
    const exitoProducts = await client.get("exitoProducts");
    res.send(JSON.parse(exitoProducts));
  } catch (err) {}
});

app.get("/carulla", async (req, res) => {
  try {
    const carullaProducts = await getCarullaProducts();
    res.send(carullaProducts);
  } catch (err) {}
});

app.get("/falabella", async (req, res) => {
  try {
    const falabellaProducts = await getFalabellaProducts();
    res.send(falabellaProducts);
  } catch (err) {}
});

const saveAllProducts = async () => {
  console.log("Saving all products to the Redis database...");

  // const carullaProducts = await getCarullaProducts();
  // console.log(carullaProducts);

  const exitoProducts = await getExitoProducts();
  console.log(exitoProducts);

  // Save the products to the Redis database
  await client.set("exitoProducts", JSON.stringify(exitoProducts));
  console.log("All products saved successfully!");
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  saveAllProducts();
});
