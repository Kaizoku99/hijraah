import { RateLimiterRes } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

interface RateLimiterConfig {
  redis: Redis;
  limiter: {
    requests: number;
    duration: number; // in seconds
  };
}

export class RateLimiter {
  private redis: Redis;
  private requests: number;
  private duration: number;

  constructor(config: RateLimiterConfig) {
    this.redis = config.redis;
    this.requests = config.limiter.requests;
    this.duration = config.limiter.duration;
  }

  async isRateLimited(identifier: string): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  }> {
    const key = `rate_limit:${identifier}`;
    const now = Math.floor(Date.now() / 1000);

    const multi = this.redis.multi();
    multi.zremrangebyscore(key, 0, now - this.duration);
    multi.zcard(key);
    multi.zadd(key, { score: now, member: now });
    multi.expire(key, this.duration);

    const [, current] = await multi.exec<[null, number]>();

    return {
      success: current < this.requests,
      limit: this.requests,
      remaining: Math.max(0, this.requests - current),
      reset: now + this.duration,
    };
  }

  async getRemainingRequests(identifier: string): Promise<number> {
    const key = `rate_limit:${identifier}`;
    const now = Math.floor(Date.now() / 1000);

    const multi = this.redis.multi();
    multi.zremrangebyscore(key, 0, now - this.duration);
    multi.zcard(key);

    const [, current] = await multi.exec<[null, number]>();
    return Math.max(0, this.requests - current);
  }
}
