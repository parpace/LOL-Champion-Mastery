const apiKey = `RGAPI-1b12c155-b62f-499e-b5b6-3cf65bbd1685`

// const getChampion = async () => {
//     const champion = await axios.get(``)
//     console.log(champion)
// }
// getChampion()

document.addEventListener("DOMContentLoaded", function() {
    const arrow = document.querySelector(`.arrow`)

    arrow.addEventListener(`click`, function() {
        console.log(`arrow clicked`)
    })
})