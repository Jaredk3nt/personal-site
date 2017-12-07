<template>
    <div class="collection-grid">
        <div class="card-search-container">
            <div class="card-filter">
                <div class="search-container">
                    <form>
                        <input type="text" placeholder="Search" v-model="searchQuery">
                    </form>
                </div>
                <filter-buttons v-on:filter="(x) => this.rarity = x"
                    :filters="['simple', 'special', 'heroic', 'legendary', 'mythic', 'familiars', '']">
                </filter-buttons>
            </div>
            <div class="card-list-container">
                <div class="card-wrapper" v-for="c in cards" :key="c.name" @click="addCard(c)">
                    <card :cardObj="c"></card>
                </div>
            </div>
        </div>
        <div class="collection-container">
            <div class="card-filter">
                <filter-buttons v-on:filter="(x) => this.collectionRarity = x"
                    :filters="['simple', 'special', 'heroic', 'legendary', 'mythic', '']">
                </filter-buttons>
                <div class="search-container">
                    <form>
                        <input type="text" placeholder="Search" v-model="collectionSearchQuery">
                    </form>
                </div>
            </div>
            <div class="card-collection">
                <div class="card-wrapper" v-for="(c, index) in cardCollection" :key="c.name" @click="removeCard( index)">
                    <card :cardObj="c.obj"></card>
                    <div class="counter-icon"><p>{{c.count}}</p></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Card from './Card.vue';
import FilterButtons from './cards/FilterButtons.vue';
const cardFile = require("../static/cards.json");

export default {
    name: "collection",
    data: function() {
        return {
            rarity: "",
            collectionRarity: "",
            searchQuery: "",
            collection: [],
            collectionSearchQuery: "" 
        };
    },
    computed : {
        cards: function() {
            let cl = this.getRarity(this.rarity);
            let re = new RegExp(this.searchQuery.toLowerCase());
            // Filter out by searchQuery
            cl = cl.filter( (card) => card.name.toLowerCase().search(re) !== -1 || card.description.toLowerCase().search(re) !== -1);
            // Sort cards by ID
            cl.sort( (a, b) => {
                return (a.id < b.id) ? -1 : 1;
            });
            return cl;
        },
        cardCollection: function() {
            let cards = this.getRarity(this.collectionRarity, this.collection);
            let re = new RegExp(this.collectionSearchQuery.toLowerCase());
            cards = cards.filter( (card) => {
                return card.name.toLowerCase().search(re) !== -1 || card.description.toLowerCase().search(re) !== -1;
            })
            return cards;
        }
    },
    methods : {
        setRarity: function(rarity) {
            this.rarity = rarity;
        },
        getRarity: function(rarity, cards = undefined) {
            if(cards === undefined) {
                if (rarity === "familiars") {
                    return cardFile.familiars;
                } else {
                    cards = cardFile.cardList;
                }
            }
            if(rarity === "") {
                return cards;
            }
            return cards.filter( (c) => c.rarity === rarity);
        },
        addCard: function(card) {
            for(let x of this.collection) {
                if(x.name === card.name) {
                    x.count++;
                    return;
                }
            }
            this.collection.push({ name: card.name, obj: card, count: 1});
        },
        removeCard: function(index) {
            let c = this.collection[index];
            if(c.count > 1) {
                c.count--;
            } else {
                this.collection.splice(index, 1);
            }
        }
    },
    components : { Card, FilterButtons }
}
</script>
<style lang="scss" scoped>
    @import 'globals';
    body {
        background: #eee;
        font-family: sans-serif;
        -webkit-overflow-scrolling: touch;
        font-family: sans-serif;
        height: 100%;
    }
    .collection-grid {
        display: grid;
        width: 100%;
        grid-template-columns: 22em auto;
    }
    .container {
        display: inline-block;
        height: 100vh;

        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
    }
    .card-wrapper {
        width: auto;
        display: inline-block;
        position: relative;
        margin: .5em;

        &:hover>.counter-icon {
            transform: translateY(-5px);
        }

        .counter-icon {
            position: absolute;
            height: 3em; width: 3em;
            border-radius: 50%;
            margin-left: 15em;
            background: $special;
            text-align: center;
            top: 22em;
            transition: transform .2s ease;
            
            p {
                font-family: sans-serif;
                color: $white;
                margin-top: .95em;
                font-weight: 700;
            }
        }
    }
    .card-search-container {
        @extend .container;
        width: 22em;

        .card-list-container {
            width: 100%;
            background-color: $dark-grey;
            height: 100%;
            padding: 1em 1em 1em 2em;
            overflow-y: scroll;
            box-sizing: border-box;
        }
        .card-filter {
            width: 100%;
            top: 0px; left: 0px;
            background-color: $dark-grey;
            z-index: 9999;
            padding: 1em;
            box-sizing: border-box;
            border-bottom: solid 2px #eee;

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
    .collection-container {
        @extend .container;
        height: 100vh;
        flex-grow: 1;
        overflow-y: hidden;
        padding-bottom: 10em;

        .card-filter {
            width: 100%;
            background-color: #eee;
            padding: 1em;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
           justify-content: space-between;

            .search-container {
                width: 22em;
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
                display: inline-block;
                .rarity-button {
                    @extend .button;
                }
            }
        }
        .card-collection {
            padding: 1em 1em 10em 1em;
            margin-bottom: 10em;
            overflow-y: scroll;
            height: 100%;
        }
    }
    
</style>


