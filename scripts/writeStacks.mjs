import fetch from "node-fetch";
import fs from "fs/promises";

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3002/stacklist");
    const data = await response.json();
    fs.writeFile("stacks.json", JSON.stringify(data), "utf8");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
