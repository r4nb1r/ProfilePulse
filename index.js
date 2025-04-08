const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();

// Use Render’s port or 3000 locally
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const scopes = ['https://www.googleapis.com/auth/business.manage'];

app.get('/auth', (req, res) => {
  const url = oauth2Client.generateAuthUrl({ scope: scopes });
  res.redirect(url);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.send('Authentication successful! Close this tab.');
});

// Use the correct API for Business Information
const businessProfile = google.mybusinessbusinessinformation({ version: 'v1', auth: oauth2Client });

async function claimGBP(businessName, address) {
  const response = await businessProfile.accounts.list();
  const account = response.data.accounts[0].name;
  const location = {
    storeCode: businessName.replace(/\s/g, '-'),
    title: businessName,
    address: { addressLines: [address] },
  };
  await businessProfile.locations.create({
    parent: account,
    requestBody: location,
  });
  console.log('GBP claimed!');
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', async (req, res) => {
  const { businessName, address } = req.body;
  await claimGBP(businessName, address);
  res.send('Business submitted for GBP automation!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});