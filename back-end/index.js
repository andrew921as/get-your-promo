import express, { response } from "express";
import corse from "cors";
import { chromium } from "playwright";
import { getExitoProducts } from "./exito/utils.js";
import { getCarullaProducts } from "./carulla/utils.js";
import { getFalabellaProducts } from "./falabella/utils.js";
import { getJumboPdf } from "./jumbo/utils.js";
import { getAlkostoPdf } from "./alkosto/utils.js";
import dotenv from "dotenv";

// Redis configuration
import { createClient } from "redis";

dotenv.config();

const client = await createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
})
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
  try {
    const alkostoPdf = await client.get("alkostoPdf");
    res.send({ link: alkostoPdf });
  } catch (err) {}
});

app.get("/jumbo", async (req, res) => {
  try {
    const jumboPdf = await client.get("jumboPdf");
    res.send({ link: jumboPdf });
  } catch (err) {}
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
    const fallabelaProducts = await client.get("fallabelaProducts");
    res.send(JSON.parse(fallabelaProducts));
  } catch (err) {}
});

app.get("/all", async (req, res) => {
  try {
    const exitoProducts = await client.get("exitoProducts");
    const fallabelaProducts = await client.get("fallabelaProducts");

    // Unify the products and send them as a response
    res.send([...JSON.parse(exitoProducts), ...JSON.parse(fallabelaProducts)]);
  } catch (err) {}
});

app.get("/resave", async (req, res) => {
  const exitoProducts = await getExitoProducts();
  // Save the products to the Redis database
  await client.set("exitoProducts", JSON.stringify(exitoProducts));

  const fallabelaProducts = await getFalabellaProducts();
  // Save the products to the Redis database
  await client.set("fallabelaProducts", JSON.stringify(fallabelaProducts));

  const jumboPdf = await getJumboPdf();
  // Save the products to the Redis database
  await client.set("jumboPdf", jumboPdf);

  const alkostoPdf = await getAlkostoPdf();
  // Save the products to the Redis database
  await client.set("alkostoPdf", alkostoPdf);

  res.send("Products were saved to the database.");
});

const saveAllProducts = async () => {
  if (!(await client.get("exitoProducts"))) {
    console.log("Saving exito products to the Redis database...");
    const exitoProducts = await getExitoProducts();
    // Save the products to the Redis database
    await client.set("exitoProducts", JSON.stringify(exitoProducts));
  }

  if (!(await client.get("fallabelaProducts"))) {
    console.log("Saving falabella products to the Redis database...");
    const fallabelaProducts = await getFalabellaProducts();
    // Save the products to the Redis database
    await client.set("fallabelaProducts", JSON.stringify(fallabelaProducts));
  }

  if (!(await client.get("jumboPdf"))) {
    console.log("Saving jumbo pdf to the Redis database...");
    const jumboPdf = await getJumboPdf();
    // Save the products to the Redis database
    await client.set("jumboPdf", jumboPdf);
  }

  if (!(await client.get("alkostoPdf"))) {
    console.log("Saving alkosto pdf to the Redis database...");
    const alkostoPdf = await getAlkostoPdf();
    // Save the products to the Redis database
    await client.set("alkostoPdf", alkostoPdf);
  }

  console.log("All products saved successfully!");
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  saveAllProducts();
});
