export const env = {
  PORT: process.env.PORT || 3000,

  JWT_SECRET: process.env.JWT_SECRET || "secret",

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",

  DATABASE_URL: process.env.DATABASE_URL || "",
};
