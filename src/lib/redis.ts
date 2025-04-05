import {Redis} from '@upstash/redis'
import { config } from './config'
import {Ratelimit} from "@upstash/ratelimit";

const redis = new Redis({
  url: config.redis.url,
  token: config.redis.token,
});
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "10s"),
});


export { redis, ratelimit };
