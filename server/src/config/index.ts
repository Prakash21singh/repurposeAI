// # Defining the config so it won't be changed in future
export const config = {
  PORT: process.env.PORT || 8000,
} as const;
