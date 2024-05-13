/*-------------------------------- Summoner Name Code --------------------------------*/

// Function and listener for obtaining PUUID based on summoner name
const searchForm = document.querySelector('#summonerForm')
const searchInput = document.querySelector('#summoner-search')

const submitSummoner = async (event) => {
    event.preventDefault()

    const summonerName = searchInput.value

    try {
        const response = await fetch(`http://127.0.0.1:3000/summoner?name=${summonerName}`)
        const data = await response.json()

        console.log('Summoner PUUID:', data.puuid)
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
    })
})