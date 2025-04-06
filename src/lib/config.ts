export const config = {
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  },
  db: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  },
  qstash: {
    restUrl: process.env.QSTASH_URL,
    token: process.env.QSTASH_TOKEN,
    currentSigning: process.env.QSTASH_CURRENT_SIGNING_KEY,
    nextSigning: process.env.QSTASH_NEXT_SIGNING_KEY,
  },
  mux: {
    tokenId: process.env.MUX_TOKEN_ID,
    secretKey: process.env.MUX_SECRET_KEY,
    whsec:process.env.MUX_SIGNING_SECRET
  }
};