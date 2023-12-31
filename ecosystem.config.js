require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "dict-app",
      script: "app.js", // Replace with your actual entry script
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000, // Use the HTTPS port
        SSL_KEY: process.env.SSL_KEY,
        SSL_CERT: process.env.SSL_CERT,
      },
    },
  ],
};
