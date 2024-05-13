# League-of-Legends-Build-Finder

This is a project to create an application that allows you search a summoner name in order to obtain information about their highest mastery champions. Alternatively, you can use the champion search bar and be provided with information on that champion.

## 1. Search Bars
There should be 2 search bars that the user can use. One that searches for information based on a summoner name, and another based on a champion name.

### Summoner Name Search Bar
The user should be able to:
* Search by summoner name and press "enter" to search
    *After pressing enter, the user should be shown the summoner's 3 highest mastery champions, as well as their level and points with those champions.
    * They should also be given the option to obtain more information on the champions by clicking on them.
    

### Champion Search Bar
The user should be able to:
* Enter a champion by name and press "enter" to search.
    * After pressing enter, the user should be shown information about the champion.
* Click the arrow on the searchbar to see a dropdown menu of all of the champions.
    * After clicking on a champion icon, the user should be shown information about the champion.


## 2. Obtaining Summoner Information
 * Inputting a summoner name should pull on the Riot api in order to obtain the summoner's puuid.
* This puuid should be used to access Riot's champion mastery api, and should target the top 3 highest mastery champions from that summoner's account.
* Those 3 champions should display on the screen after the summoner name is inputted, along with their level and points.
* There should be an event listener attached to these 3 champions, so that you can click them to see more about the champion.

## 3. Creating Champion Information
* JSON files for the champions needs to be downloaded from Data Dragon. Data Dragon is Riot's way of centralizing League of Legends game data and assets, including champions, items, runes, summoner spells, and profile icons.
* These JSON files include a "key" number for each champion. These key numbers should be linked to the information that will be displayed for each champion.
* When a champion is selected, these things should be updated:
    * The background image should be updated to show a splash art of that champion.
    * The names of that champion's 4 abilities should be shown, along with a short description of each.
    * The cooldowns for the abilities should be shown, along with the range based on level.