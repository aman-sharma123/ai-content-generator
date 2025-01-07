/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "postgresql",
  schema: "./utils/schema.tsx",
  dbCredentials: {
    url: 'postgresql://Ai-Content-Generator_owner:IZ7lQHgDmfv5@ep-dry-haze-a12i32id.ap-southeast-1.aws.neon.tech/Ai-Content-Generator?sslmode=require'
  },
};