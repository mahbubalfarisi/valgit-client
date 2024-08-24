const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read configuration file
const configPath = path.join(__dirname, 'config.txt');
const config = fs.readFileSync(configPath, 'utf8').split('\n');

let APP_PORT, APP_DOMAIN;
config.forEach(line => {
    const [key, value] = line.split('=');
    if (key === 'APP_PORT') {
        APP_PORT = value.trim();
    } else if (key === 'APP_DOMAIN') {
        APP_DOMAIN = value.trim();
    }
});

// Creating Tunnel
console.log(`\nGenerating HTTP Tunnel for Port ${APP_PORT}...`);
console.log("______________________________________________\n");

exec(`ngrok http --domain=${APP_DOMAIN} ${APP_PORT}`, (err, stdout, stderr) => {
    if (err) {
        console.error(`Error: ${err.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(stdout);
    console.log("Generate HTTP Tunnel completed.");
});
