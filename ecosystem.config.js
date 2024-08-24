module.exports = {
    apps: [
      {
        name: 'server',          // Name of your Node.js app
        script: 'E:/Projects/valgit/server.js',   // Path to your server.js file
        env: {
          NODE_ENV: 'production'
        }
      },
      {
        name: 'ngrok',           // Name of the Ngrok process
        script: 'E:/Projects/valgit/ngrok-start.js',         // The Ngrok executable
        env: {
          NODE_ENV: 'production'
        }
      }
    ]
  };