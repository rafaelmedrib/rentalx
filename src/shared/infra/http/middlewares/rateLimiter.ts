import { NextFunction, Response, Request } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

import { AppError } from "@shared/errors/AppError";

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
  });

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: 5,
    duration: 5,
    keyPrefix: "rateLimiter",
  });

  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw new AppError("Too many requests", 429);
  }
}

export { rateLimiter };
