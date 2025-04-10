const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Vite build output in client/dist
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle all routes by serving index.html (for client-side routing with Wouter)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Start the server
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});