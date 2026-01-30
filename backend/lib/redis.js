// import Redis from "ioredis";
// import dotenv from "dotenv";

// dotenv.config();

// export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// only create redis if UPSTASH_REDIS_URL exists
export const redis = process.env.UPSTASH_REDIS_URL
  ? new Redis(process.env.UPSTASH_REDIS_URL, {
      maxRetriesPerRequest: 1,      // stop retry storm
      enableOfflineQueue: false,    // don't queue commands if redis fails
      retryStrategy: () => null,    // stop auto reconnect
    })
  : null;

// handle errors so they don't crash your app
if (redis) {
  redis.on("connect", () => console.log("✅ Redis connected"));
  redis.on("error", (err) => console.warn("⚠️ Redis error (ignored):", err.message));
}
