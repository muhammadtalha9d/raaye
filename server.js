const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let filePath;

    // Route: /linkedin-growth-engine/ -> linkedin-growth-engine/index.html
    if (parsedUrl.pathname === '/linkedin-growth-engine/' || parsedUrl.pathname === '/linkedin-growth-engine') {
        filePath = path.join(__dirname, 'linkedin-growth-engine', 'index.html');
    }
    // Route: /linkedin-growth-engine/* -> linkedin-growth-engine/*
    else if (parsedUrl.pathname.startsWith('/linkedin-growth-engine/')) {
        const filename = parsedUrl.pathname.substring('/linkedin-growth-engine/'.length);
        filePath = path.join(__dirname, 'linkedin-growth-engine', filename);
    }
    // Route: / -> index.html (root)
    else if (parsedUrl.pathname === '/' || parsedUrl.pathname === '') {
        filePath = path.join(__dirname, 'index.html');
    }
    // NEW: Serve any static files from root directory
    else {
        filePath = path.join(__dirname, parsedUrl.pathname);
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }

        // Determine content type
        const ext = path.extname(filePath);
        const mimeTypes = {
            '.html': 'text/html; charset=utf-8',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.webp': 'image/webp'
        };

        const contentType = mimeTypes[ext] || 'text/plain';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`\n✨ Raaye Web Server is running!\n`);
    console.log(`📝  Main Site:     http://${HOST}:${PORT}/`);
    console.log(`📝  LinkedIn Growth: http://${HOST}:${PORT}/linkedin-growth-engine/`);
    console.log(`\n✅ Press Ctrl + C to stop the server\n`);
});