// This was all from my friend. Obviously I knew nothing about backend yet, but I was stuck trying to get around CORS errors for so many hours. He  taught me how to set up this simple node.js server.
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())


app.get('/summoner', async (req, res) => {
    try {
        const apiKey = 'RGAPI-0756ec8c-c305-4be3-abef-4a175713a2d4'
        const summonerName = req.query.name

        const apiUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/na1?api_key=${apiKey}`

        const response = await axios.get(apiUrl)
        const puuid = response.data.puuid

        res.json({ puuid })
    } catch (error) {
        console.error('API request failed:', error)
        res.status(500).json({ error: 'API request failed' })
    }
})

// Start the server
app.listen(port, `127.0.0.1`, () => {
    console.log(`Server listening at http://localhost:${port}`)
})