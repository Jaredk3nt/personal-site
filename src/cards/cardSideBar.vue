<template>
    <div class="card-search-container">
        <div class="card-filter">
            <h3>Search/Filter</h3>
            <hr/>
            <div class="search-container">
                <input type="text" placeholder="Search" v-model="searchQuery" v-on:keydown.enter.prevent="prevent">
            </div>
            <filter-buttons v-on:filter="(x) => this.filter.rarity = x"
                :filters="['simple', 'special', 'heroic', 'legendary', 'mythic', '']">
            </filter-buttons>
        </div>
        <div class="card-list-container">
            <card :cardObj="c" v-for="(c, index) in cards" 
                    :key="c.name" @click="$emit('addCard', c)"></card>
        </div>
    </div>
</template>

<script>
import FilterButtons from './FilterButtons.vue';
import Card from '../Card.vue';

const cardFile = require('../../static/cards.json');
const typeFile = require('../../static/types.json');

export default {
    name: "card-side-bar",
    components: { FilterButtons, Card },
    data: function() {
        return {
            filter: { rarity: "", type: "" },
            searchQuery: ""
        }
    },
    computed: {
        types: function() {
            return typeFile.types;
        },
        cards: function() {
            let cards = this.getFilteredCards();
            let re = new RegExp(this.searchQuery.toLowerCase()); // Regex of search; exact match
            cards = cards.filter( (card) => {
                // Search within the name
                const name = card.name.toLowerCase().search(re) !== -1;
                // Search within the description
                const description = card.description.toLowerCase().search(re) !== -1;
                // Search within the types
                const type = card.type
                    .map( (t) => this.getType(t).name )
                        .some( (t) => t.search(re) !== -1 );
                return name || description || type;
            });
            cards.sort( (a,b) => {
                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;   // names must be equal
            });
            return cards;
        }
    },
    methods: {
        getFilteredCards: function() {
            return cardFile.cardList.filter( (card) => {
                return Object.keys(this.filter).every( (key) => {
                    // If there is no filter for this key pass
                    if(this.filter[key] === '') {
                        return true;
                    }
                    // Ensure the card has this property
                    if(!card.hasOwnProperty(key)) {
                        return false;
                    }
                    // Return true if property matches filter
                    if(key === 'type') {
                        return card[key].some( (x) => {
                            console.log(this.getType(x).name === this.filter[key]);
                            return this.getType(x).name === this.filter[key];
                        });
                    }
                    return card[key] === this.filter[key];
                });
            });
        },
        getType: function(id) {
            for(let t of this.types) {
                if(t.id === id) {
                    return t;
                }
            }
        }
    },
}
</script>

<style lang="scss">
@import '../globals';
.card-search-container {
    display: inline-block;
    height: 100vh;

    overflow-x: hidden;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    width:100%;
    padding-bottom: 10em;

    .card-list-container {
        width: 100%;
        background-color: $dark-grey;
        height: 100%;
        padding: .65em;
        overflow-y: scroll;
        overflow-x: hidden;
        box-sizing: border-box;

        @media screen and (max-width: 1024px) {
            padding: .25em;
        }
    }
    .card-filter {
        width: 100%;
        top: 0px; left: 0px;
        background-color: $dark-grey;
        z-index: 9999;
        padding: 1em;
        box-sizing: border-box;
        border-bottom: solid 2px #eee;

        h3 {
            color: $white;
            font-family: sans-serif;
            font-weight: 700;
            margin: 0em 0em .35em 0em;
        }

        .search-container {
            display: inline-block;
            width: 100%;
            margin-left: 0em;
            box-sizing: border-box;

            input {
                padding: .75em;
                height: 3em;
                box-sizing: border-box;
                border: none;
                border-radius: 4px;
                width: 100%;

                &:focus {
                    outline: none;
                }
            }
        }
        .filter-buttons {
            margin-top: .5em;
            .rarity-button {
                @extend .button;
            }
        }
    }
}
</style>

