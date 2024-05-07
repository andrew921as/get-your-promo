import { chromium } from "playwright";
import dotenv from "dotenv";

dotenv.config();

const HOST = process.env.HOST || "localhost:3001";

export const getJumboPdf = async () => {
  const browser = await chromium.launch(); // Launch the browser
  const page = await browser.newPage(); // Open a new page

  await page.goto("https://www.tiendasjumbo.co/ofertas"); // Navigate to the URL

  // Go to the Jumbo website and create a PDF of the promotions website
  await page.pdf({ path: "./pdfs/jumbo-promotions.pdf" });

  return `http://${HOST}/pdfs/jumbo-promotions.pdf`;
};
