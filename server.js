const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read and parse config.txt
const configPath = path.join(__dirname, 'config.txt');
const config = fs.readFileSync(configPath, 'utf-8')
    .split('\n')
    .reduce((acc, line) => {
        const [key, value] = line.split('=');
        acc[key.trim()] = value.trim();
        return acc;
    }, {});

// Extract APP_PORT from config
const PORT = config.APP_PORT || 3000; // Default to 3000 if APP_PORT is not found
const REPO_BRANCH = config.REPO_BRANCH;
const LOCAL_REPO_DIR = config.LOCAL_REPO_DIR;
const LOCAL_REPO_PATH = config.LOCAL_REPO_PATH;

const app = express();

app.get('/echotest', (req, res) => {
    console.log('Triggering Echo Test');
    res.send('Echo Test Success!');
});

app.get('/trigger-pull', (req, res) => {
    console.log('Triggering Pull Request');
    console.log(`Executing command: ${LOCAL_REPO_DIR} && cd ${LOCAL_REPO_PATH} && git pull origin ${REPO_BRANCH}`);

    const command = `${LOCAL_REPO_DIR} && cd ${LOCAL_REPO_PATH} && git pull origin ${REPO_BRANCH}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Failed to trigger git pull.');
        }
        // if (stderr) {
        //     console.error(`Stderr: ${stderr}`);
        //     return res.status(500).send(`Git pull completed with errors: ${stderr}`);
        // }

        console.log(`Git Pull Output: ${stdout}`);
        res.send(`Git pull operation completed successfully:\n${stdout}`);
    });
});

app.get('/trigger-push', (req, res) => {
    console.log('Triggering Push Request');
    console.log(`Executing command: ${LOCAL_REPO_DIR} && cd ${LOCAL_REPO_PATH} && git add . && git commit -m "Automatic Commit by ValheimDiscordBot" && git push -u origin ${REPO_BRANCH}`);

    const command = `${LOCAL_REPO_DIR} && cd ${LOCAL_REPO_PATH} && git add . && git commit -m "Automatic Commit by ValheimDiscordBot" && git push -u origin ${REPO_BRANCH}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Failed to trigger git push.');
        }
        // if (stderr) {
        //     console.error(`Stderr: ${stderr}`);
        //     return res.status(500).send(`Git push completed with errors: ${stderr}`);
        // }

        console.log(`Git Push Output: ${stdout}`);
        res.send(`Git Push operation completed successfully:\n${stdout}`);
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Please run ngrok-start.bat on port ${PORT} by double-clicking the file`);
});
