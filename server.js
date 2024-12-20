// server.js
const express = require('express');
const cors = require('cors'); // Only needed to allow cors for testing purposes when using local endpoint on staging
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const generateConfig = require('./tailwind.config');

const app = express();
const port = 9876;

const sourceCSS = '@tailwind base; @tailwind components; @tailwind utilities';

app.use(cors()); // Only needed to allow cors for testing purposes when using local endpoint on staging

app.use(express.json({ limit: "10mb" })); // Need to define limit, otherwise the default will set very small limit of size of payload

// This route is just to test locally if specific tailwind styles are applying
app.get('/', (req, res) => {
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello World</title>
        <script>
          function applyStyles(cssString) {
            const styleElement = document.createElement('style');
            styleElement.innerHTML = cssString;
            document.head.appendChild(styleElement);
          }
        </script>
      </head>
      <body>
        <section class="section-display">
          <div class="section-base">
            <h1 class='text-red-500 text-[10px] bg-[#00FF00] w-[50%] p-[10px] hover:bg-[#0000FF]'>Hello World!</h1>
            <p class='text-white bg-black'>White on black</p>
            <button class="btn">Test Button</button>
            <div class="flex w-full">
              <span class="w-[40px] bg-[#FF0000]">Finite</span>
              <span class="grow-[1] bg-[#00FF00]">Fill</span>
            </div>
          </div>
        </section>
        <script>
          fetch(
            "http://localhost:${port}/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ htmlFragment: document.querySelector("body").outerHTML })
            }
          ).then((res) => res.json()).then((data) => {
            applyStyles(data.css);
          });
        </script>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.post("/", (req, res) => {
  const data = req.body;
  const config = {
    ...(generateConfig(data.theme || {})),
    content: [{ raw: data.htmlFragment }],
  };
  postcss([tailwindcss(config)])
    .process(sourceCSS)
    .then((tailwind) => {
      res.send({css: tailwind.css});
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});