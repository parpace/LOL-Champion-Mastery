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
const championData = {
    "266": {"name": "Aatrox","title": "the Darkin Blade","spells": {
          "The Darkin Blade": {
            "cooldown": [14, 12, 10, 8, 6]
          },
          "Infernal Chains": {
            "cooldown": [20, 18, 16, 14, 12]
          },
          "Umbral Dash": {
            "cooldown": [9, 8, 7, 6, 5]
          },
          "World Ender": {
            "cooldown": [120, 100, 80]
          }}},
    "103": {"name": "Ahri","title": "the Nine-Tailed Fox","spells": {
        "Orb of Deception": {
            "cooldown": [7, 7, 7, 7, 7]
        },
        "Fox-Fire": {
            "cooldown": [9, 8, 7, 6, 5]
        },
        "Charm": {
            "cooldown": [12, 12, 12, 12, 12]
        },
        "Spirit Rush": {
            "cooldown": [130, 115, 100]
        }}},
    "84": {
        "name": "Akali",
        "title": "the Rogue Assassin",
        "spells": {
            "Five Point Strike": {
                "cooldown": [1.5, 1.5, 1.5, 1.5, 1.5]
            },
            "Twilight Shroud": {
                "cooldown": [20, 20, 20, 20, 20]
            },
            "Shuriken Flip": {
                "cooldown": [16, 14.5, 13, 11.5, 10]
            },
            "Perfect Execution": {
                "cooldown": [100, 80, 60]
            }
        }
    },
    "166": {
        "name": "Akshan",
        "title": "the Rogue Sentinel",
        "spells": {
            "Avengerang": {
                "cooldown": [8, 7.25, 6.5, 5.75, 5]
            },
            "Going Rogue": {
                "cooldown": [18, 14, 10, 6, 2]
            },
            "Heroic Swing": {
                "cooldown": [18, 16.5, 15, 13.5, 12]
            },
            "Comeuppance": {
                "cooldown": [100, 85, 70]
            }
        }
    },
    "12": {
        "name": "Alistar",
        "title": "the Minotaur",
        "spells": {
            "Pulverize": {
                "cooldown": [14, 13, 12, 11, 10]
            },
            "Headbutt": {
                "cooldown": [14, 13, 12, 11, 10]
            },
            "Trample": {
                "cooldown": [12, 11.5, 11, 10.5, 10]
            },
            "Unbreakable Will": {
                "cooldown": [120, 100, 80]
            }
        }
    },
    "32": {
        "name": "Amumu",
        "title": "the Sad Mummy",
        "spells": {
            "Bandage Toss": {
                "cooldown": [3, 3, 3, 3, 3]
            },
            "Despair": {
                "cooldown": [1, 1, 1, 1, 1]
            },
            "Tantrum": {
                "cooldown": [9, 8, 7, 6, 5]
            },
            "Curse of the Sad Mummy": {
                "cooldown": [150, 125, 100]
            }
        }
    },
    "34": {
        "name": "Anivia",
        "title": "the Cryophoenix",
        "spells": {
            "Flash Frost": {
                "cooldown": [12, 11, 10, 9, 8]
            },
            "Crystallize": {
                "cooldown": [17, 17, 17, 17, 17]
            },
            "Frostbite": {
                "cooldown": [4, 4, 4, 4, 4]
            },
            "Glacial Storm": {
                "cooldown": [4, 3, 2]
            }
        }
    },
    "1": {
        "name": "Annie",
        "title": "the Dark Child",
        "spells": {
            "Disintegrate": {
                "cooldown": [4, 4, 4, 4, 4]
            },
            "Incinerate": {
                "cooldown": [8, 8, 8, 8, 8]
            },
            "Molten Shield": {
                "cooldown": [12, 11.5, 11, 10.5, 10]
            },
            "Summon: Tibbers": {
                "cooldown": [130, 115, 100]
            }
        }
    },
    "523": {
        "name": "Aphelios",
        "title": "the Weapon of the Faithful",
        "spells": {
            "Weapon Abilites": {
                "cooldown": [9, 9, 9, 9, 9, 9]
            },
            "Phase": {
                "cooldown": [0.8, 0.8, 0.8, 0.8, 0.8, 0.8]
            },
            "Weapon Queue System": {
                "cooldown": [0, 0, 0, 0, 0, 0]
            },
            "Moonlight Vigil": {
                "cooldown": [120, 110, 100]
            }
        }
    },
    "22": {
        "name": "Ashe",
        "title": "the Frost Archer",
        "spells": {
            "Ranger's Focus": {
                "cooldown": [0, 0, 0, 0, 0]
            },
            "Volley": {
                "cooldown": [18, 14.5, 11, 7.5, 4]
            },
            "Hawkshot": {
                "cooldown": [5, 5, 5, 5, 5]
            },
            "Enchanted Crystal Arrow": {
                "cooldown": [100, 80, 60]
            }
        }
    },
    "136": {
        "name": "Aurelion Sol",
        "title": "The Star Forger",
        "spells": {
            "Breath of Light": {
                "cooldown": [3, 3, 3, 3, 3]
            },
            "Astral Flight": {
                "cooldown": [0, 0, 0, 0, 0]
            },
            "Singularity": {
                "cooldown": [12, 12, 12, 12, 12]
            },
            "Falling Star / The Skies Descend": {
                "cooldown": [120, 110, 100]
            }
        }
    },    
    "268": {
        "name": "Azir",
        "title": "the Emperor of the Sands",
        "spells": {
            "Conquering Sands": {
                "cooldown": [14, 12, 10, 8, 6]
            },
            "Arise!": {
                "cooldown": [1.5, 1.5, 1.5, 1.5, 1.5]
            },
            "Shifting Sands": {
                "cooldown": [22, 20.5, 19, 17.5, 16]
            },
            "Emperor's Divide": {
                "cooldown": [120, 105, 90]
            }
        }
    },           
    "432": {
        "name": "Bard",
        "title": "the Wandering Caretaker",
        "spells": {
            "Cosmic Binding": {
                "cooldown": [11, 10, 9, 8, 7]
            },
            "Caretaker's Shrine": {
                "cooldown": [0, 0, 0, 0, 0]
            },
            "Magical Journey": {
                "cooldown": [22, 20.5, 19, 17.5, 16]
            },
            "Tempered Fate": {
                "cooldown": [110, 95, 80]
            }
        }
    },  
    "200": {
        "name": "Bel'Veth",
        "title": "the Empress of the Void",
        "spells": {
            "Void Surge": {
                "cooldown": [1, 1, 1, 1, 1]
            },
            "Above and Below": {
                "cooldown": [12, 11, 10, 9, 8]
            },
            "Royal Maelstrom": {
                "cooldown": [20, 19, 18, 17, 16]
            },
            "Endless Banquet": {
                "cooldown": [1, 1, 1]
            }
        }
    },      
    "53": {
        "name": "Blitzcrank",
        "title": "the Great Steam Golem",
        "spells": {
            "Rocket Grab": {
                "cooldown": [20, 19, 18, 17, 16]
            },
            "Overdrive": {
                "cooldown": [15, 15, 15, 15, 15]
            },
            "Power Fist": {
                "cooldown": [9, 8, 7, 6, 5]
            },
            "Static Field": {
                "cooldown": [60, 40, 20]
            }
        }
    },
    "63": {
        "name": "Brand",
        "title": "the Burning Vengeance",
        "spells": {
            "Sear": {
                "cooldown": [8, 7.5, 7, 6.5, 6]
            },
            "Pillar of Flame": {
                "cooldown": [10, 9.5, 9, 8.5, 8]
            },
            "Conflagration": {
                "cooldown": [12, 11, 10, 9, 8]
            },
            "Pyroclasm": {
                "cooldown": [110, 100, 90]
            }
        }
    },    
    "201": {
        "name": "Braum",
        "title": "the Heart of the Freljord",
        "spells": {
            "Winter's Bite": {
                "cooldown": [8, 7.5, 7, 6.5, 6]
            },
            "Stand Behind Me": {
                "cooldown": [12, 11, 10, 9, 8]
            },
            "Unbreakable": {
                "cooldown": [16, 14, 12, 10, 8]
            },
            "Glacial Fissure": {
                "cooldown": [120, 100, 80]
            }
        }
    },    
    "233": {
        "name": "Briar",
        "title": "the Restrained Hunger",
        "spells": {
            "Head Rush": {
                "cooldown": [13, 12, 11, 10, 9]
            },
            "Blood Frenzy / Snack Attack": {
                "cooldown": [14, 13, 12, 11, 10]
            },
            "Chilling Scream": {
                "cooldown": [16, 16, 16, 16, 16]
            },
            "Certain Death": {
                "cooldown": [120, 100, 80]
            }
        }
    },    
    "51": {
        "name": "Caitlyn",
        "title": "the Sheriff of Piltover",
        "spells": {
            "Piltover Peacemaker": {
                "cooldown": [10, 9, 8, 7, 6]
            },
            "Yordle Snap Trap": {
                "cooldown": [0.5, 0.5, 0.5, 0.5, 0.5]
            },
            "90 Caliber Net": {
                "cooldown": [16, 14, 12, 10, 8]
            },
            "Ace in the Hole": {
                "cooldown": [90, 90, 90]
            }
        }
    },    
    "164": {
        "name": "Camille",
        "title": "the Steel Shadow",
        "spells": {
            "Precision Protocol": {
                "cooldown": [9, 8, 7, 6, 5]
            },
            "Tactical Sweep": {
                "cooldown": [17, 15.5, 14, 12.5, 11]
            },
            "Hookshot": {
                "cooldown": [16, 15, 14, 13, 12]
            },
            "The Hextech Ultimatum": {
                "cooldown": [140, 115, 90]
            }
        }
    },    
    "69": {
        "name": "Cassiopeia",
        "title": "the Serpent's Embrace",
        "spells": {
            "Noxious Blast": {
                "cooldown": [3.5, 3.5, 3.5, 3.5, 3.5]
            },
            "Miasma": {
                "cooldown": [24, 22, 20, 18, 16]
            },
            "Twin Fang": {
                "cooldown": [0.75, 0.75, 0.75, 0.75, 0.75]
            },
            "Petrifying Gaze": {
                "cooldown": [120, 100, 80]
            }
        }
    },    
    "516": {
        "name": "Ornn",
        "title": "The Fire below the Mountain",
        "spells": {
            "Volcanic Rupture": {
                "cooldown": [9, 8.5, 8, 7.5, 7]
            },
            "Bellows Breath": {
                "cooldown": [12, 11.5, 11, 10.5, 10]
            },
            "Searing Charge": {
                "cooldown": [14, 13.5, 13, 12.5, 12]
            },
            "Call of the Forge God": {
                "cooldown": [140, 120, 100]
            }
        }
    },    
    "3": {
        "name": "Galio",
        "title": "the Colossus",
        "spells": {
            "Winds of War": {
                "cooldown": [11,10,9,8,7]
            },
            "Shield of Durand": {
                "cooldown": [18,17,16,15,14]
            },
            "Justice Punch": {
                "cooldown": [11,10,9,8,7]
            },
            "Hero's Entrance": {
                "cooldown": [180,160,140]
            }
        }
    },
    "98": {
        "name": "Shen",
        "title": "the Eye of Twilight",
        "spells": {
            "Twilight Assault": {
                "cooldown": [8,7.25,6.5,5.75,5]
            },
            "Spirit's Refuge": {
                "cooldown": [18,16.5,15,13.5,12]
            },
            "Shadow Dash": {
                "cooldown": [18,16,14,12,10]
            },
            "Stand United": {
                "cooldown": [200,180,160]
            }
        }
    }
  }

const updateChampMastery = async () => {
    const apiKey = 'RGAPI-dca6b402-8c2d-45c7-be01-22e18a0f9d02'
    const puuid = summonerPuuid

    let topRight = document.querySelector(`.topRight`)
    let middleRight = document.querySelector(`.middleRight`)
    let bottomRight = document.querySelector(`.bottomRight`)

    let champName1 = document.querySelector(`.champName1`)
    let champName2 = document.querySelector(`.champName2`)
    let champName3 = document.querySelector(`.champName3`)

    let champMasteryLevel1 = document.querySelector(`#champMasteryLevel1`)
    let champMasteryLevel2 = document.querySelector(`#champMasteryLevel2`)
    let champMasteryLevel3 = document.querySelector(`#champMasteryLevel3`)

    let champMasteryPoints1 = document.querySelector(`#champMasteryPoints1`)
    let champMasteryPoints2 = document.querySelector(`#champMasteryPoints2`)
    let champMasteryPoints3 = document.querySelector(`#champMasteryPoints3`)

    const response = await axios.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${apiKey}`)
    
    // Ok I'm trying to understand this. ChatGBT helped me out, because at first I only had the if statement below. However, I was naturally getting all of the champions that this summoner has mastery of. So much data. Because of this, I needed to target just the parts of the array that I wanted, which are the 3 highest mastery champions on that summoner's account. Using the slice method that we have learned, I can target those before I run my forEach.
    const firstThreeMasteries = response.data.slice(0, 3)
    
    if (firstThreeMasteries.length > 0) {
        const championMastery1 = firstThreeMasteries[0]
        const championMastery2 = firstThreeMasteries[1]
        const championMastery3 = firstThreeMasteries[2]

        const champMasteryKey1 = championMastery1.championId
        const champMasteryKey2 = championMastery2.championId
        const champMasteryKey3 = championMastery3.championId
        
        const championName1 = championData[champMasteryKey1].name
        const championName2 = championData[champMasteryKey2].name
        const championName3 = championData[champMasteryKey3].name
        
        topRight.style.display = `block`
        middleRight.style.display = `block`
        bottomRight.style.display = `block`

        topRight.style.backgroundImage = `url(champion/centered/${championName1}_0.jpg)`
        topRight.style.backgroundSize = 'cover'
        middleRight.style.backgroundImage = `url(champion/centered/${championName2}_0.jpg)`
        middleRight.style.backgroundSize = 'cover'
        bottomRight.style.backgroundImage = `url(champion/centered/${championName3}_0.jpg)`
        bottomRight.style.backgroundSize = 'cover'

        champName1.textContent = championData[champMasteryKey1].name
        champName2.textContent = championData[champMasteryKey2].name
        champName3.textContent = championData[champMasteryKey3].name

        champMasteryLevel1.textContent = championMastery1.championLevel
        champMasteryLevel2.textContent = championMastery2.championLevel
        champMasteryLevel3.textContent = championMastery3.championLevel

        champMasteryPoints1.textContent = championMastery1.championPoints
        champMasteryPoints2.textContent = championMastery2.championPoints
        champMasteryPoints3.textContent = championMastery3.championPoints
    }
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