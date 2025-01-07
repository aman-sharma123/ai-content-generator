import { config } from 'dotenv';
config();

console.log("Database URL:", process.env.NEXT_PUBLIC_DRIZZLE_DB_URL); // Debugging

export default {
  dialect: "postgresql",
  schema: "./utils/schema.tsx",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
};
