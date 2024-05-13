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

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitSummoner(event)
    }
})
searchForm.addEventListener('submit', submitSummoner)


// Listener to initiate the dropdown menu when the arrow is clicked

const arrow = document.querySelector(`.arrow`)
const dropdownMenu = document.getElementById('dropdown-menu')

// Open the dropdown menu when clicking the arrow
arrow.addEventListener(`click`, function() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block'
})

// Close the dropdown menu when clicking outside of it
document.addEventListener('click', function(event) {
    if (!arrow.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none'
        }
}) 