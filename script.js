/*-------------------------------- Obtaining PUUID from summoner name --------------------------------*/

// Function and listener for obtaining PUUID based on summoner name
const searchForm = document.querySelector('#summonerForm')
const searchInput = document.querySelector('#summoner-search')

let summonerPuuid = ``

const submitSummoner = async (event) => {
    event.preventDefault()

    const summonerName = searchInput.value

    try {
        const response = await fetch(`http://127.0.0.1:3000/summoner?name=${summonerName}`)
        const data = await response.json()

        summonerPuuid = data.puuid
        console.log(summonerPuuid)

        await updateChampMastery()
    } catch (error) {
        console.error('Failed to fetch summoner PUUID:', error)
        }
}

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        submitSummoner(event)
    }
})
searchForm.addEventListener('submit', submitSummoner)


/*-------------------------------- Obtaining Summoner's highest mastery champions --------------------------------*/

const updateChampMastery = async () => {
    const apiKey = 'RGAPI-dca6b402-8c2d-45c7-be01-22e18a0f9d02'
    const puuid = summonerPuuid

    const response = await axios.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${apiKey}`)
    
    // Oh my goodness I'm trying to understand this. At first I only had the forEach below which ChatGBT helped me understand. However, I was naturally getting all of the champions that this summoner has mastery of. So much data. Because of this, I needed to target just the parts of the array that I wanted, which are the 3 highest mastery champions on that summoner's account. Using the slice method that we have learned, I can target those before I run my forEach.
    const firstThreeMasteries = response.data.slice(0, 3)
    
    // ChatGBT helped me out here. I had my consts set to response.data.championID, etc.... That was returning undefined. Turns out the data is returning an array, and I needed to itterate over each object in the array the array.
    firstThreeMasteries.forEach(championMastery => {
        const champMasteryKey = championMastery.championId
        const champMasteryLevel = championMastery.championLevel
        const champMasteryPoints = championMastery.championPoints

        console.log(`key =`, champMasteryKey, `level =`, champMasteryLevel, `point =`, champMasteryPoints)
    })
}


/*-------------------------------- Champion Name Search --------------------------------*/

const arrow = document.querySelector(`.arrow`)
const dropdownMenu = document.getElementById('dropdown-menu')

// Open the dropdown menu when clicking the arrow. ChatGBT helped me with this as I knew nothing about dropdown menus.
arrow.addEventListener(`click`, function() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block'
})

// Close the dropdown menu when clicking outside of it.
document.addEventListener('click', function(event) {
    if (!arrow.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none'
        }
}) 

// Function and event listeners for champion-search input
const championSearchInput = document.querySelector('#champion-search')
const dropdownOptions = document.querySelectorAll('.dropdown-menu a')

function searchChampion() {
    const champName = championSearchInput.value
    console.log('Champ name =', champName)
}

// Run searchChampion when the enter key is presser
championSearchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchChampion()
    }
})

// Update the text and run searchChampion when one of the dropdown menu items is clicked
dropdownOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedChampion = option.textContent
            // Update champion search input value
        championSearchInput.value = selectedChampion
            // Run the searchChampion function
        searchChampion()
        dropdownMenu.style.display = 'none'
    })
})