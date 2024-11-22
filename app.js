const http = require("node:http");

const webServer = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    /* what you are sending to the website inside the res.end - html, png, plan text etc */
    res.end(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Temperature Converter</title>
    </head>
    <body>
        <h1>Temperature converter</h1>
    <form method="post">
    <label for="temp">Temperature:</label>
    <input type="number" name="temperature" placeholder="Enter a value" />

    <fieldset>
      <legend>Convert to?</legend>
      <label for="ftoc">F to C </label>
      <input type="radio" id="ftoc" name="conversion" value="ftoc" />
      <label for="ctof"> C to F </label>
      <input type="radio" id="ctof" name="conversion" value="ctof" />
    </fieldset>

    <input type="submit" class="convert" value="Convert" />
</form>
</body>
</html>`);
  } else if (req.method === "POST") {
    let totalData = "";

    req.on("data", (chunk) => {
      totalData += chunk.toString();
    });

    req.on("end", () => {
      console.log(totalData);

      const firstBreak = totalData.split("&");
      const temp = parseFloat(firstBreak[0].split("=")[1]);
      const value = firstBreak[1].split("=")[1];

      if (value === "ctof") {
        const f = temp * 1.8 + 32;
        res.end(
          `${temp} degrees celsius is ${Math.round(f)} degrees fahrenheit`
        );
      } else if (value === "ftoc") {
        const c = (temp - 32) / 1.8;
        res.end(
          `${temp} degrees fahrenheit is ${Math.round(c)} degrees celsius`
        );
      }
    });
  }
});

webServer.listen(8081, () => {
  console.log("The Webserver is now running");
});
