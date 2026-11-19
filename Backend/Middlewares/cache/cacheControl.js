/**
 * Caching middleware for high-traffic optimization (5,000+ daily visitors).
 * Ensures CDN and edge proxies cache public content while strictly protecting private data.
 */

// Reusable public endpoint cache middleware
const cachePublic = (seconds = 60, sMaxAge = 120, swr = 300) => (req, res, next) => {
  if (req.method === "GET") {
    res.set("Cache-Control", `public, max-age=${seconds}, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}`);
  }
  next();
};

// Private route cache protection middleware
const cachePrivate = (req, res, next) => {
  res.set("Cache-Control", "private, no-store");
  next();
};

// No-store for health check and dynamic status
const cacheNoStore = (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
};

module.exports = {
  cachePublic,
  cachePrivate,
  cacheNoStore,
};
