<template>
    <div id="CardPage">
        <div class="function-bar">
            <div class="sort-container">
                <h3>Filter by:</h3>
                <div class="filter-container">
                    <div class="filters">
                        <filter-buttons v-on:filter="(r) => this.filter.rarity = r"
                            :filters="['simple', 'special', 'heroic', 'legendary', 'mythic', 'familiars']">
                        </filter-buttons>
                        <hr/>
                        <filter-buttons v-on:filter="(t) => this.filter.type = t"
                            :filters="types.map( (t) => t.name )">
                        </filter-buttons>
                    </div>
                    <div class="clear-filters" @click="() => filter = { 'rarity': '', 'type': ''}">
                        <div class="clear-button">Clear</div>
                    </div>
                </div>
            </div>
            <div class="search-container">
                <h3>Search:</h3>
                <input type="text" placeholder="Search" v-model="searchQuery" v-on:keydown.enter.prevent="prevent">
            </div>
            <div class="random-container">
                <h3>Cast Random: <strong>{{ randomCard }}</strong></h3>
                <filter-buttons v-on:filter="setRandomCard"
                    :filters="['simple', 'special', 'heroic', 'legendary', 'mythic']">
                </filter-buttons>
            </div>
        </div>
        <card-layout :cards="cards"></card-layout>
    </div>
</template>

<script>
import Card from './Card.vue';
import FilterButtons from './cards/FilterButtons.vue';
import CardLayout from './cards/CardLayout.vue';

const cardFile = require("../static/cards.json");
const typeFile = require("../static/types.json");
const cardList = cardFile.cardList.map( (c) => {
    return { cardObj: c}
});
const familiars = cardFile.familiars.map( (f) => {
    return {cardObj:f};
})
const packSize = 5;
const rt = [0.70, 0.90, 0.99];

export default {
    name: 'card-page',
    components : { Card, FilterButtons, CardLayout },
    data () {
        return { 
            rarity: "",
            searchQuery: "",
            randomCard: "",
            filter: { rarity: '', type: '' }
        }
    },
    methods : {
        getFilteredCards: function() {
            return cardList.filter( (card) => {
                return Object.keys(this.filter).every( (key) => {
                    // If there is no filter for this key pass
                    if(this.filter[key] === '') {
                        return true;
                    }
                    // Ensure the card has this property
                    if(!card.cardObj.hasOwnProperty(key)) {
                        return false;
                    }
                    // Return true if property matches filter
                    if(key === 'type') {
                        return card.cardObj[key].some( (x) => {
                            console.log(this.getType(x).name === this.filter[key]);
                            return this.getType(x).name === this.filter[key];
                        });
                    }
                    return card.cardObj[key] === this.filter[key];
                });
            });
        },
        getRarity: function(rarity) {
            if(rarity === "") {
                return cardList;
            } else if (rarity === "familiars") {
                return familiars;
            }
            return cardList.filter( (c) => c.cardObj.rarity === rarity);
        },
        getRandomCard: function(rarity, exclude = undefined) {
            let cl = this.getRarity(rarity);
            if(exclude) {
                cl = cl.filter( (x) => !exclude.includes(x));
            }
            let card = cl[Math.round(Math.random() * (cl.length - 1))];
            return card;
        },
        setRandomCard: function(rarity) {
            this.randomCard = this.getRandomCard(rarity).cardObj.name;
        },
        getType: function(id) {
            for(let t of this.types) {
                if(t.id === id) {
                    return t;
                }
            }
        }
    },
    computed : {
        cards : function() {
            let cl = this.getFilteredCards(); // Filtered cardSet
            let re = new RegExp(this.searchQuery.toLowerCase()); // Regex of search; exact match
            cl = cl.filter( (card) => {
                // Search within the name
                const name = card.cardObj.name.toLowerCase().search(re) !== -1;
                // Search within the description
                const description = card.cardObj.description.toLowerCase().search(re) !== -1;
                // Search within the types
                const type = card.cardObj.type
                    .map( (t) => this.getType(t).name )
                        .some( (t) => t.search(re) !== -1 );
                return name || description || type;
            });
            //sort by name
            cl.sort( (a, b) => {
                var nameA = a.cardObj.name.toLowerCase(); // ignore upper and lowercase
                var nameB = b.cardObj.name.toLowerCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
            })
            return cl;
        },
        types: function() {
            return typeFile.types;
        }
    },
    
}
</script>

<style lang="scss">
    @import 'globals';
    body {
        background: #eee;
        font-family: sans-serif;
        -webkit-overflow-scrolling: touch;
    }
    
    .button-container {
        height: 3em;
        width: 100%;
    }
    .close-button {
        @extend .button;
        float: right;
        padding: .75em;
        margin-right: 1em;
    }
    .function-bar {
        background-color: $dark-grey;
        padding-bottom: .5em;
    }
    .sort-container {
        display: inline-block;
        margin-left: 2.5em;
        margin-bottom: .75em;

        @media screen and (max-width: 720px) {
            width: 100%;
            padding: 0em 1em;
            margin-left: 0em;
            box-sizing: border-box;
        }
        h3 {
            margin: .75em 0em .5em;
            color: $white;
        }
        .filter-container {
            display: flex;
            flex-direction: row;

            .filters {
                width: 24.8em;
                display: inline-block;
            }
            .clear-filters {
                display: inline-block;
                width: 4em;
                color: $white;
                padding: .2em;
                &:hover {
                    cursor: pointer;
                }
                .clear-button {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background-color: $red;
                    height: 100%;
                }
            }
        }
    }
    .random-container {
        @extend .sort-container;
        margin-left: 4em;
        width: 22em;
        vertical-align: top;

        @media screen and (max-width: 720px) {
            margin-left: 0em;
        }
        h3 {
            strong {
                color: #D3B326;
            }
        }
    }
    .search-container {
        display: inline-block;
        margin-left: 2.5em;
        vertical-align: top;

        @media screen and (max-width: 720px) {
            width: 100%;
            margin-left: 0em;
            padding: 0em 1em;
            box-sizing: border-box;
        }
        h3 {
            margin: .75em 0em .5em;
            color: $white;
        }
        input {
            padding: .75em;
            height: 3em;
            box-sizing: border-box;
            border: none;
            border-radius: 4px;
            width: 28em;

            @media screen and (max-width: 720px) {
                width: 100%;
            }

            &:focus {
                outline: none;
            }
        }
    }
    .pack-container {
        display: inline-block;
        margin-left: 6em;
        margin-top: 1.5em;
        vertical-align: top;

        @media screen and (max-width: 720px) {
            float: none;
            padding: 0em 1em;
            box-sizing: border-box;
            width: 100%;
            margin-left: 0em;
        }

        .pack-button {
            @extend .button;
            background-color: #D3B326;
            color: $white;
            font-weight: 500;
            padding: 2em 1em;

            @media screen and (max-width: 720px) {
                width: 100%;
            }            
        }
    }
    .modal-container {
        z-index: 99990;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        left: 0px;
        top: 0px;
    }
    .pack-modal {
        z-index: 99999;
        background-color: #eee;
        padding: 1em;
        box-sizing: border-box;
        height: 28em;
        margin: 1em 0em;
        border-radius: 4px;

        @media screen and (max-width: 720px) {
            margin: 1em;
            overflow-x: hidden;
            height: 100%;
        }
    }

    hr {
        width: 95%;
        border-style: solid;
        border-color: darken($white, 25%);
        margin-top: .25em; margin-bottom: .25em;
    }
</style>
