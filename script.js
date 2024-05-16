/*-------------------------------- Obtaining PUUID from summoner name --------------------------------*/

// Function and listener for obtaining PUUID based on summoner name
const searchForm = document.querySelector('#summonerForm')
const searchInput = document.querySelector('#summonerSearch')

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

// Selected data from JSON files. Yes I enetered all of this manually (sort of, I sent ChatGBT each file individually and asked it to format it this way for me, then had to copy it). No, it wasn't a good use of time. However, the only ways that I found to link my functions to this JSON data would have involved more backend server work, and I didn't want to have someone else help me write more backend code that I didn't actually fully understand yet. Only alternative was to create a variable that had all of the data manually inputted.
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
    "31": {
        "name": "Cho'Gath",
        "title": "the Terror of the Void",
        "spells": {
            "Rupture": {
                "cooldown": [6, 6, 6, 6, 6]
            },
            "Feral Scream": {
                "cooldown": [11, 10.5, 10, 9.5, 9]
            },
            "Vorpal Spikes": {
                "cooldown": [8, 7, 6, 5, 4]
            },
            "Feast": {
                "cooldown": [80, 70, 60]
            }
        }
    },    
    "42": {
        "name": "Corki",
        "title": "the Daring Bombardier",
        "spells": {
            "PhosphorusBomb": {
                "cooldown": [8, 8, 8, 8, 8]
            },
            "CarpetBomb": {
                "cooldown": [20, 18, 16, 14, 12]
            },
            "GGun": {
                "cooldown": [16, 16, 16, 16, 16]
            },
            "MissileBarrage": {
                "cooldown": [2, 2, 2]
            }
        }
    },    
    "122": {
        "name": "Darius",
        "title": "the Hand of Noxus",
        "spells": {
            "DariusCleave": {
                "cooldown": [9, 8, 7, 6, 5]
            },
            "DariusNoxianTacticsONH": {
                "cooldown": [5, 5, 5, 5, 5]
            },
            "DariusAxeGrabCone": {
                "cooldown": [24, 21.5, 19, 16.5, 14]
            },
            "DariusExecute": {
                "cooldown": [120, 100, 80]
            }
        }
    },    
    "Diana": {
        "name": "Diana",
        "title": "Scorn of the Moon",
        "spells": {
            "DianaQ": {
                "cooldown": [8, 7.5, 7, 6.5, 6]
            },
            "DianaOrbs": {
                "cooldown": [15, 13.5, 12, 10.5, 9]
            },
            "DianaTeleport": {
                "cooldown": [22, 20, 18, 16, 14]
            },
            "DianaR": {
                "cooldown": [100, 90, 80]
            }
        }
    },
    "Draven": {
        "name": "Draven",
        "title": "the Glorious Executioner",
        "spells": {
            "DravenSpinning": {
                "cooldown": [12, 11, 10, 9, 8]
            },
            "DravenFury": {
                "cooldown": [12, 12, 12, 12, 12]
            },
            "DravenDoubleShot": {
                "cooldown": [18, 17, 16, 15, 14]
            },
            "DravenRCast": {
                "cooldown": [100, 90, 80]
            }
        }
    },    
    "DrMundo": {
        "name": "Dr. Mundo",
        "title": "the Madman of Zaun",
        "spells": {
            "DrMundoQ": {
                "cooldown": [4, 4, 4, 4, 4]
            },
            "DrMundoW": {
                "cooldown": [17, 16.5, 16, 15.5, 15]
            },
            "DrMundoE": {
                "cooldown": [9, 8.25, 7.5, 6.75, 6]
            },
            "DrMundoR": {
                "cooldown": [120, 120, 120]
            }
        }
    },    
    "Ekko": {
        "name": "Ekko",
        "title": "the Boy Who Shattered Time",
        "spells": {
            "EkkoQ": {
                "cooldown": [9, 8.5, 8, 7.5, 7]
            },
            "EkkoW": {
                "cooldown": [22, 20, 18, 16, 14]
            },
            "EkkoE": {
                "cooldown": [9, 8.5, 8, 7.5, 7]
            },
            "EkkoR": {
                "cooldown": [110, 80, 50]
            }
        }
    },    
    "Elise": {
        "name": "Elise",
        "title": "the Spider Queen",
        "spells": {
            "EliseHumanQ": {
                "cooldown": [6, 6, 6, 6, 6]
            },
            "EliseHumanW": {
                "cooldown": [12, 12, 12, 12, 12]
            },
            "EliseHumanE": {
                "cooldown": [12, 11.5, 11, 10.5, 10]
            }
        }
    },    
    "Evelynn": {
        "name": "Evelynn",
        "title": "Agony's Embrace",
        "spells": {
            "EvelynnQ": {
                "cooldown": [4, 4, 4, 4, 4]
            },
            "EvelynnW": {
                "cooldown": [15, 14, 13, 12, 11]
            },
            "EvelynnE": {
                "cooldown": [8, 8, 8, 8, 8]
            }
        }
    },    
    "Ezreal": {
        "name": "Ezreal",
        "title": "the Prodigal Explorer",
        "spells": {
            "EzrealQ": {
                "cooldown": [5.5, 5.25, 5, 4.75, 4.5]
            },
            "EzrealW": {
                "cooldown": [8, 8, 8, 8, 8]
            },
            "EzrealE": {
                "cooldown": [26, 23, 20, 17, 14]
            },
            "EzrealR": {
                "cooldown": [120, 105, 90]
            }
        }
    },    
    "Fiddlesticks": {
        "name": "Fiddlesticks",
        "title": "the Ancient Fear",
        "spells": {
            "FiddleSticksQ": {
                "cooldown": [15, 14.5, 14, 13.5, 13]
            },
            "FiddleSticksW": {
                "cooldown": [10, 9.5, 9, 8.5, 8]
            },
            "FiddleSticksE": {
                "cooldown": [10, 9, 8, 7, 6]
            },
            "FiddleSticksR": {
                "cooldown": [140, 110, 80]
            }
        }
    },    
    "Fiora": {
        "name": "Fiora",
        "title": "the Grand Duelist",
        "spells": {
            "FioraQ": {
                "cooldown": [13, 11.25, 9.5, 7.75, 6]
            },
            "FioraW": {
                "cooldown": [24, 22, 20, 18, 16]
            },
            "FioraE": {
                "cooldown": [11, 10, 9, 8, 7]
            },
            "FioraR": {
                "cooldown": [110, 90, 70]
            }
        }
    },
    "105": {
        "name": "Fizz",
        "title": "the Tidal Trickster",
        "spells": {
          "Urchin Strike": {
            "cooldown": [8, 7.5, 7, 6.5, 6]
          },
          "Seastone Trident": {
            "cooldown": [7, 6.5, 6, 5.5, 5]
          },
          "Playful / Trickster": {
            "cooldown": [16, 14, 12, 10, 8]
          },
          "Chum the Waters": {
            "cooldown": [100, 85, 70]
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
    "41": {
        "name": "Gangplank",
        "title": "the Saltwater Scourge",
        "spells": {
          "Parrrley": {
            "cooldown": [4.5, 4.5, 4.5, 4.5, 4.5]
          },
          "Remove Scurvy": {
            "cooldown": [22, 20, 18, 16, 14]
          },
          "Powder Keg": {
            "cooldown": [0, 0, 0, 0, 0]
          },
          "Cannon Barrage": {
            "cooldown": [170, 150, 130]
          }
        }
      },      
      "86": {
        "name": "Garen",
        "title": "The Might of Demacia",
        "spells": {
          "Decisive Strike": {
            "cooldown": [8, 8, 8, 8, 8]
          },
          "Courage": {
            "cooldown": [23, 21, 19, 17, 15]
          },
          "Judgment": {
            "cooldown": [9, 9, 9, 9, 9]
          },
          "Demacian Justice": {
            "cooldown": [120, 100, 80]
          }
        }
      },      
      "150": {
        "name": "Gnar",
        "title": "the Missing Link",
        "spells": {
          "Boomerang Throw / Boulder Toss": {
            "cooldown": [20, 17.5, 15, 12.5, 10]
          },
          "Hyper / Wallop": {
            "cooldown": [7, 7, 7, 7, 7]
          },
          "Hop / Crunch": {
            "cooldown": [22, 19.5, 17, 14.5, 12]
          },
          "GNAR!": {
            "cooldown": [90, 60, 30]
          }
        }
      },      
      "79": {
        "name": "Gragas",
        "title": "the Rabble Rouser",
        "spells": {
          "Barrel Roll": {
            "cooldown": [10, 9, 8, 7, 6]
          },
          "Drunken Rage": {
            "cooldown": [5, 5, 5, 5, 5]
          },
          "Body Slam": {
            "cooldown": [14, 13.5, 13, 12.5, 12]
          },
          "Explosive Cask": {
            "cooldown": [100, 85, 70]
          }
        }
      },      
      "104": {
        "name": "Graves",
        "title": "the Outlaw",
        "spells": {
          "End of the Line": {
            "cooldown": [13, 11.5, 10, 8.5, 7]
          },
          "Smoke Screen": {
            "cooldown": [26, 24, 22, 20, 18]
          },
          "Quickdraw": {
            "cooldown": [16, 15, 14, 13, 12]
          },
          "Collateral Damage": {
            "cooldown": [100, 80, 60]
          }
        }
      },      
      "887": {
        "name": "Gwen",
        "title": "The Hallowed Seamstress",
        "spells": {
          "Snip Snip!": {
            "cooldown": [6.5, 5.75, 5, 4.25, 3.5]
          },
          "Hallowed Mist": {
            "cooldown": [22, 21, 20, 19, 18]
          },
          "Skip 'n Slash": {
            "cooldown": [13, 12.5, 12, 11.5, 11]
          },
          "Needlework": {
            "cooldown": [120, 100, 80]
          }
        }
      },      
      "120": {
        "name": "Hecarim",
        "title": "the Shadow of War",
        "spells": {
          "Rampage": {
            "cooldown": [4, 4, 4, 4, 4]
          },
          "Spirit of Dread": {
            "cooldown": [16, 15.5, 15, 14.5, 14]
          },
          "Devastating Charge": {
            "cooldown": [18, 18, 18, 18, 18]
          },
          "Onslaught of Shadows": {
            "cooldown": [140, 120, 100]
          }
        }
      },      
      "74": {
        "name": "Heimerdinger",
        "title": "the Revered Inventor",
        "spells": {
          "H-28 G Evolution Turret": {
            "cooldown": [1, 1, 1, 1, 1]
          },
          "Hextech Micro-Rockets": {
            "cooldown": [11, 10, 9, 8, 7]
          },
          "CH-2 Electron Storm Grenade": {
            "cooldown": [11, 11, 11, 11, 11]
          },
          "UPGRADE!!!": {
            "cooldown": [100, 85, 70]
          }
        }
      },      
      "910": {
        "name": "Hwei",
        "title": "the Visionary",
        "spells": {
          "Subject: Disaster": {
            "cooldown": [10, 9, 8, 7, 6]
          },
          "Subject: Serenity": {
            "cooldown": [18, 17.5, 17, 16.5, 16]
          },
          "Subject: Torment": {
            "cooldown": [12, 11.5, 11, 10.5, 10]
          },
          "Spiraling Despair": {
            "cooldown": [140, 115, 80]
          }
        }
      },   
      "420": {
        "name": "Illaoi",
        "title": "the Kraken Priestess",
        "spells": {
          "Tentacle Smash": {
            "cooldown": [10, 9, 8, 7, 6]
          },
          "Harsh Lesson": {
            "cooldown": [4, 4, 4, 4, 4]
          },
          "Test of Spirit": {
            "cooldown": [16, 15, 14, 13, 12]
          },
          "Leap of Faith": {
            "cooldown": [120, 95, 70]
          }
        }
      },         
      "39": {
        "name": "Irelia",
        "title": "the Blade Dancer",
        "spells": {
          "Bladesurge": {
            "cooldown": [11, 10, 9, 8, 7]
          },
          "Defiant Dance": {
            "cooldown": [20, 18, 16, 14, 12]
          },
          "Flawless Duet": {
            "cooldown": [16, 15, 14, 13, 12]
          },
          "Vanguard's Edge": {
            "cooldown": [125, 105, 85]
          }
        }
      },   
      "427": {
        "name": "Ivern",
        "title": "the Green Father",
        "spells": {
          "Rootcaller": {
            "cooldown": [14, 13, 12, 11, 10]
          },
          "Brushmaker": {
            "cooldown": [0.5, 0.5, 0.5, 0.5, 0.5]
          },
          "Triggerseed": {
            "cooldown": [11, 10, 9, 8, 7]
          },
          "Daisy!": {
            "cooldown": [140, 130, 120]
          }
        }
      },         
      "40": {
        "name": "Janna",
        "title": "the Storm's Fury",
        "spells": {
          "HowlingGale": {
            "cooldown": [14, 14, 14, 14, 14]
          },
          "SowTheWind": {
            "cooldown": [8, 7.5, 7, 6.5, 6]
          },
          "EyeOfTheStorm": {
            "cooldown": [16, 15, 14, 13, 12]
          },
          "ReapTheWhirlwind": {
            "cooldown": [130, 115, 100]
          }
        }
      },     
      "59": {
        "name": "Jarvan IV",
        "title": "the Exemplar of Demacia",
        "spells": {
          "JarvanIVDragonStrike": {
            "cooldown": [10, 9, 8, 7, 6]
          },
          "JarvanIVGoldenAegis": {
            "cooldown": [9, 9, 9, 9, 9]
          },
          "JarvanIVDemacianStandard": {
            "cooldown": [12, 11.5, 11, 10.5, 10]
          },
          "JarvanIVCataclysm": {
            "cooldown": [120, 105, 90]
          }
        }
      },     
      "24": {
        "name": "Jax",
        "title": "Grandmaster at Arms",
        "spells": {
          "JaxQ": {
            "cooldown": [8, 7.5, 7, 6.5, 6]
          },
          "JaxW": {
            "cooldown": [7, 6, 5, 4, 3]
          },
          "JaxE": {
            "cooldown": [15, 13.5, 12, 10.5, 9]
          },
          "JaxR": {
            "cooldown": [100, 90, 80]
          }
        }
      },  
      "126": {
        "name": "Jayce",
        "title": "the Defender of Tomorrow",
        "spells": {
          "JayceToTheSkies": {
            "cooldown": [16, 14, 12, 10, 8, 6]
          },
          "JayceStaticField": {
            "cooldown": [10, 10, 10, 10, 10, 10]
          },
          "JayceThunderingBlow": {
            "cooldown": [20, 18, 16, 14, 12, 10]
          },
          "JayceStanceHtG": {
            "cooldown": [6]
          }
        }
      },    
      "202": {
        "name": "Jhin",
        "title": "the Virtuoso",
        "spells": {
          "JhinQ": {
            "cooldown": [7, 6.5, 6, 5.5, 5]
          },
          "JhinW": {
            "cooldown": [12, 12, 12, 12, 12]
          },
          "JhinE": {
            "cooldown": [2, 2, 2, 2, 2]
          },
          "JhinR": {
            "cooldown": [120, 105, 90]
          }
        }
      },    
      "222": {
        "name": "Jinx",
        "title": "the Loose Cannon",
        "spells": {
          "JinxQ": {
            "cooldown": [0.9, 0.9, 0.9, 0.9, 0.9]
          },
          "JinxW": {
            "cooldown": [8, 7, 6, 5, 4]
          },
          "JinxE": {
            "cooldown": [24, 20.5, 17, 13.5, 10]
          },
          "JinxR": {
            "cooldown": [85, 65, 45]
          }
        }
      },      
      "145": {
        "name": "Kai'Sa",
        "title": "Daughter of the Void",
        "spells": {
          "KaisaQ": {
            "cooldown": [10, 9, 8, 7, 6]
          },
          "KaisaW": {
            "cooldown": [22, 20, 18, 16, 14]
          },
          "KaisaE": {
            "cooldown": [16, 14.5, 13, 11.5, 10]
          },
          "KaisaR": {
            "cooldown": [130, 100, 70]
          }
        }
      },         
      "429": {
        "name": "Kalista",
        "title": "the Spear of Vengeance",
        "spells": {
          "KalistaMysticShot": {
            "cooldown": [8, 8, 8, 8, 8]
          },
          "KalistaW": {
            "cooldown": [30, 30, 30, 30, 30]
          },
          "KalistaExpungeWrapper": {
            "cooldown": [0, 0, 0, 0, 0]
          },
          "KalistaRx": {
            "cooldown": [150, 120, 90]
          }
        }
      },    
      "43": {
        "name": "Karma",
        "title": "the Enlightened One",
        "spells": {
          "KarmaQ": {
            "cooldown": [9, 8, 7, 6, 5]
          },
          "KarmaSpiritBind": {
            "cooldown": [12, 12, 12, 12, 12]
          },
          "KarmaSolKimShield": {
            "cooldown": [10, 9.5, 9, 8.5, 8]
          },
          "KarmaMantra": {
            "cooldown": [40, 38, 36, 34]
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


// Function for obtaining info from Riot's API. First we use the puuid that we have obtained to gain access to the summoner's champion mastery information. We make sure to only get information on their top 3 highest mastery champions. From there, we can get champion key numbers (what i was using to find champion names in the JSON files), champion mastery level and champion mastery points from the api.
const updateChampMastery = async () => {
  
  clearRightSideContent()  
  
  const apiKey = 'RGAPI-0756ec8c-c305-4be3-abef-4a175713a2d4'
  const puuid = summonerPuuid

  let masteryPage = document.querySelector(`.masteryPage`)
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
  
  // Ok I'm trying to understand this. ChatGBT helped me out, because at first I only had the if statement below. However, I was naturally getting all of the champions that this summoner has mastery of. So much data. Because of this, I needed to target just the parts of the array that I wanted, which are the 3 highest mastery champions on that summoner's account. Using the slice method that we have learned, I can target those before I run my if statement.
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
    
    // Make the displays visible
    masteryPage.style.display = `block`

    // Update the backgroundImage of each div with the correct champion photo. Style it to cover
    topRight.style.backgroundImage = `url(champion/centered/${championName1}_0.jpg)`
    topRight.style.backgroundSize = 'cover'
    middleRight.style.backgroundImage = `url(champion/centered/${championName2}_0.jpg)`
    middleRight.style.backgroundSize = 'cover'
    bottomRight.style.backgroundImage = `url(champion/centered/${championName3}_0.jpg)`
    bottomRight.style.backgroundSize = 'cover'

    // Update the text content to be the correct champion's name
    champName1.textContent = championData[champMasteryKey1].name
    champName2.textContent = championData[champMasteryKey2].name
    champName3.textContent = championData[champMasteryKey3].name

    // Update the text content to be the mastery level that the player has with that champion
    champMasteryLevel1.textContent = championMastery1.championLevel
    champMasteryLevel2.textContent = championMastery2.championLevel
    champMasteryLevel3.textContent = championMastery3.championLevel

    // Update the text content to be the mastery points that the player has with that champion
    champMasteryPoints1.textContent = championMastery1.championPoints
    champMasteryPoints2.textContent = championMastery2.championPoints
    champMasteryPoints3.textContent = championMastery3.championPoints
  }
}

// I need a function that takes me to the champion info page if I click on one of the champion portraits that were pulled up by updateChampMastery.
// const masteryPage = document.querySelector(`.masteryPage`)
let championSearchInput = document.querySelector('#championSearch')

// masteryPage.addEventListener(`click`, function(event) {
//   let champName1 = document.querySelector(`.champName1`)
//   let champName2 = document.querySelector(`.champName2`)
//   let champName3 = document.querySelector(`.champName3`)

//   if (event.target.matches(`.topRight`)) {
//     championSearchInput = champName1
//     searchChampion()
//   } else if (event.target.matches(`.middleRight`)) {
//     championSearchInput = champName2
//     searchChampion()
//   } else if (event.target.matches(`.bottomRight`)) {
//     championSearchInput = champName3
//     searchChampion()
//   }
// })

const topRight = document.querySelector(`.topRight`)
topRight.addEventListener(`click`, () => {
  let champName1 = document.querySelector(`.champName1`)
  championSearchInput.textContent = champName1
  console.log(championSearchInput)
  searchChampion()
})

/*-------------------------------------- Champion Name Search ----------------------------------------*/

// Open the dropdown menu when clicking the arrow. ChatGBT helped me with this as I knew nothing about dropdown menus. We used a nice one line ternary which commands the dropdownMenu style go away if it was visible when the arrow is clicked, or appear if it was not visible when the arrow was clicked. Also, I needed to include a listener for when someone clicks outside of the dropdownMenu area, making it dissapear.
const arrow = document.querySelector(`.arrow`)
const dropdownMenu = document.getElementById('dropdownMenu')

arrow.addEventListener(`click`, function() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block'
})

document.addEventListener('click', function(event) {
    if (!arrow.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none'
        }
}) 


// Update the text and run searchChampion when one of the dropdown menu items is clicked. Also clear the dropdown display
const dropdownOptions = document.querySelectorAll('.dropdownMenu a')

dropdownOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedChampion = option.textContent
        championSearchInput.value = selectedChampion
        
        searchChampion()
        dropdownMenu.style.display = 'none'
    })
})

// If the user types in a champion and clicks enter, run searchChampion
championSearchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchChampion()
    }
})

/*------------------------------------- Updating Champion Page -----------------------------------------*/


// I want to create a function that checks to see if the value entered into championSearch is equivalent to one of the names in our championData. If the answer is yet, I want the function to make the champion content appear, and update values for the champion name, title, spell names and spell cooldowns. I want it to use the championData to achieve this.
function searchChampion() {
  
  clearRightSideContent()  
  
  const champName = championSearchInput.value.trim()
    const championPage = document.querySelector(`.championPage`)  
    const capitalizedChampName = champName.charAt(0).toUpperCase() + champName.slice(1)
    const champPageName = document.querySelector(`.champPageName`)
    const champTitle = document.querySelector(`.champTitle`)
    const champPageHeader = document.querySelector(`.champPageHeader`)

    let qSpellImg = document.querySelector(`.qSpellImg`)
    let wSpellImg = document.querySelector(`.wSpellImg`)
    let eSpellImg = document.querySelector(`.eSpellImg`)
    let rSpellImg = document.querySelector(`.rSpellImg`)

    const spellName1 = document.querySelector(`.spellName1`)
    const spellName2 = document.querySelector(`.spellName2`)
    const spellName3 = document.querySelector(`.spellName3`)
    const spellName4 = document.querySelector(`.spellName4`)

    const spell1Cooldown = document.querySelector(`.spell1Cooldown`)
    const spell2Cooldown = document.querySelector(`.spell2Cooldown`)
    const spell3Cooldown = document.querySelector(`.spell3Cooldown`)
    const spell4Cooldown = document.querySelector(`.spell4Cooldown`)

    // Checking to see if the championSearchInput.value matches a champion inside of our championData. I had to look up a way of doing this. I found that you can make a variable equivalent to the items in an object. Then, we can make another variable that is a boolean. this boolean checks if the "name" inside of one of the items in our object of championData is equivalent to the search value that the user inputted. I also learned that I need to set both to lowercase so that they are not case sensitive.
    const championKeys = Object.keys(championData)
    const champion = championKeys.find(keyNumber=> {
        return championData[keyNumber].name.toLowerCase() === champName.toLowerCase()
    })

    // If champion is returned as true, make the championPage content visible, and update the variables.
    if (champion) {

        championPage.style.display = `block`

        champPageHeader.style.backgroundImage = `url(champion/splash/${capitalizedChampName}_0.jpg)`
        champPageHeader.style.backgroundSize = `cover`

        champPageName.textContent = championData[champion].name
        champTitle.textContent = `"${championData[champion].title}"`

        qSpellImg.src = `spell/${capitalizedChampName}Q.png`
        qSpellImg.alt = `${capitalizedChampName} Q`
        wSpellImg.src = `spell/${capitalizedChampName}W.png`
        wSpellImg.alt = `${capitalizedChampName} W`
        eSpellImg.src = `spell/${capitalizedChampName}E.png`
        eSpellImg.alt = `${capitalizedChampName} E`
        rSpellImg.src = `spell/${capitalizedChampName}R.png`
        rSpellImg.alt = `${capitalizedChampName} R`

        spellName1.textContent = Object.keys(championData[champion].spells)[0]
        spellName2.textContent = Object.keys(championData[champion].spells)[1]
        spellName3.textContent = Object.keys(championData[champion].spells)[2]
        spellName4.textContent = Object.keys(championData[champion].spells)[3]

        // This stumped me for a long time. I need to access the object of spellName1 in order to get the array of the cooldown inside of it. Eventually I found that you can use object.keys inside of the spells object, just like I did above. I didnt like the commas inbetween the cooldown numbers, so I made it a '/' instead.
        spell1Cooldown.textContent = championData[champion].spells[Object.keys(championData[champion].spells)[0]].cooldown.join(' / ')
        spell2Cooldown.textContent = championData[champion].spells[Object.keys(championData[champion].spells)[1]].cooldown.join(' / ')
        spell3Cooldown.textContent = championData[champion].spells[Object.keys(championData[champion].spells)[2]].cooldown.join(' / ')
        spell4Cooldown.textContent = championData[champion].spells[Object.keys(championData[champion].spells)[3]].cooldown.join(' / ')

    }
    else {
        console.log(`champion not found`)
    }
}

/*------------------------------------- Clearing the content on the right side before running the functions  -----------------------------------------*/

function clearRightSideContent() {
  let championPage = document.querySelector(`.championPage`)
  let masteryPage = document.querySelector(`.masteryPage`)
  championPage.style.display = `none`
  masteryPage.style.display = `none`
}