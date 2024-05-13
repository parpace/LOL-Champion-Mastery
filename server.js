const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express();
const port = 3000; // Choose a port for your server

app.use(cors())

const apiKey = 'RGAPI-a90bc479-a90e-4360-aa73-3421a5b38c8c'; // Replace 'YOUR_API_KEY' with your Riot Games API key

// Define a route to handle requests from your webpage
app.get('/summoner', async (req, res) => {
    try {
        const summonerName = req.query.name; // Get summoner name from query parameter

        const apiUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/na1?api_key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const puuid = response.data.puuid;

        res.json({ puuid }); // Send JSON response with summoner PUUID
    } catch (error) {
        console.error('API request failed:', error);
        res.status(500).json({ error: 'API request failed' }); // Send error response
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
