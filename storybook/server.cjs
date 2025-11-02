const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 6006;
const env = process.env.STORYBOOK_ENV || "local";
const staticDir = path.join(__dirname, "storybook-static");

// Enable request logging in non-production environments
if (env !== "production") {
  app.use((req, res, next) => {
    console.log(`📦 ${req.method} ${req.url}`);
    next();
  });
}

// Serve static subfolders explicitly (required for Storybook chunks)
app.use("/sb-preview", express.static(path.join(staticDir, "sb-preview")));
app.use("/sb-manager", express.static(path.join(staticDir, "sb-manager")));
app.use("/sb-addons", express.static(path.join(staticDir, "sb-addons")));
app.use("/sb-common-assets", express.static(path.join(staticDir, "sb-common-assets")));
app.use("/styles", express.static(path.join(staticDir, "styles")));

// Serve root static files
app.use(express.static(staticDir));

// Redirect root access to Storybook landing page
app.get("/", (_, res) => {
  res.redirect("/?path=/access-introduction--welcome");
});

// Enable SPA fallback for Docker and Production
if (env === "docker" || env === "production") {
  app.get(/^\/(?!.*\.(js|css|html|png|jpg|svg|woff|ttf|map)$)/, (_, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`✅ Storybook preview running at http://localhost:${port} [env: ${env}]`);
});
