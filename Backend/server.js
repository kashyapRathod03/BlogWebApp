const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const IndexRoute = require("./Routers/index");
const connectDatabase = require("./Helpers/database/connectDatabase");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");
const { cacheNoStore } = require("./Middlewares/cache/cacheControl");

// Load environment configuration (.env takes priority, with legacy Config/config.env fallback)
const envPaths = [
  path.resolve(__dirname, "../.env"),
  path.resolve(__dirname, ".env"),
  path.resolve(__dirname, "Config/config.env"),
  path.resolve(__dirname, "../Config/config.env"),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

const { UPLOAD_DIR } = require("./Config/upload");

connectDatabase();

const app = express();

// Security & Parsing
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Production CORS Configuration
const allowedOrigins = [
  "https://techorcas.com",
  "https://www.techorcas.com",
  "https://techorcas.blog",
  "https://www.techorcas.blog",
  "https://techorcas.co",
  "https://www.techorcas.co",
  "http://localhost:5173",
  "http://localhost:3000",
];

if (process.env.FRONTEND_URL) {
  const customFrontend = process.env.FRONTEND_URL.replace(/\/$/, "");
  if (!allowedOrigins.includes(customFrontend)) {
    allowedOrigins.push(customFrontend);
  }
  if (customFrontend.startsWith("https://") && !customFrontend.includes("www.")) {
    const wwwFrontend = customFrontend.replace("https://", "https://www.");
    if (!allowedOrigins.includes(wwwFrontend)) {
      allowedOrigins.push(wwwFrontend);
    }
  }
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, or same-origin on Hostinger)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Permissive fallback for staging/preview domains
      return callback(null, true);
    },
    credentials: true,
  })
);

// Lightweight Health Check Route (No DB query, Cache-Control: no-store)
app.get(["/api/health", "/health"], cacheNoStore, (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Mount API & Feature Routes
app.use("/", IndexRoute);

// Serve static uploaded assets from persistent UPLOAD_DIR and legacy public/
app.use("/uploads", express.static(UPLOAD_DIR, { maxAge: "7d" }));
app.use(express.static(path.join(__dirname, "public")));

// Express Static Serving & SPA Fallback for Hostinger Managed Node.js
const candidateDistPaths = [
  path.resolve(__dirname, "../Frontend/dist"),
  path.resolve(__dirname, "dist"),
  path.resolve(__dirname, "../dist"),
  path.resolve(__dirname, "../Frontend/build"),
];

const distDir = candidateDistPaths.find((p) => fs.existsSync(p));

if (distDir) {
  console.log(`Serving unified production frontend from: ${distDir}`);

  // Serve hashed assets (/assets/*, .js, .css, .woff2) with 1-year immutable cache
  app.use(
    express.static(distDir, {
      maxAge: "1y",
      immutable: true,
      index: false,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) {
          // Serve index.html with no-cache so deployments reflect immediately
          res.setHeader("Cache-Control", "no-cache, must-revalidate");
        } else if (
          filePath.includes("/assets/") ||
          filePath.includes("\\assets\\") ||
          /\.(js|css|woff2|webp|png|jpg|jpeg|svg)$/.test(filePath)
        ) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    })
  );

  // Catch-all SPA fallback route for React Router URLs (/article/*, /dashboard, etc.)
  app.get("*", (req, res, next) => {
    if (
      req.path.startsWith("/api") ||
      req.path.startsWith("/auth") ||
      req.path.startsWith("/story") ||
      req.path.startsWith("/user") ||
      req.path.startsWith("/comment") ||
      req.path.startsWith("/storyImages") ||
      req.path.startsWith("/userPhotos") ||
      req.path.startsWith("/uploads")
    ) {
      return next();
    }

    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.sendFile(path.join(distDir, "index.html"));
  });
}

// Error Handler
app.use(customErrorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} : ${process.env.NODE_ENV || "development"}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Logged Error : ${err}`);
});

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err}`);
});
