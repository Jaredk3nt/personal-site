<template>
<div>
    <div v-if="this.openingPack" class="modal-container">
        <div class="pack-modal">
            <div class="button-container">
                <button class="pack-modal-button add-button" v-on:click="addPack()">Add Cards</button>
                <button class="pack-modal-button" v-on:click="() => this.openingPack = false">close</button>
            </div>
            <div>
                <card v-for="x in pack" :cardObj="x" :small="true" :key="x.id"></card>
            </div>
        </div>
    </div>
    <div class="collection-grid">
        <div class="card-search-container">
            <div class="card-filter">
                <h3>Search/Filter</h3>
                <hr/>
                <div class="search-container">
                    <input type="text" placeholder="Search" v-model="searchQuery" v-on:keydown.enter.prevent="prevent">
                </div>
                <filter-buttons v-on:filter="(x) => this.rarity = x"
                    :filters="['simple', 'special', 'heroic', 'legendary', 'mythic', '']">
                </filter-buttons>
            </div>
            <div class="card-list-container">
                <card :cardObj="c" v-for="(c, index) in cards" 
                        :key="c.name" @click="addCard(c)"></card>
            </div>
        </div>
        <div class="collection-container">
            <div class="card-filter">
                <filter-buttons v-on:filter="(x) => this.collectionRarity = x"
                    :filters="['simple', 'special', 'heroic', 'legendary', 'mythic', '']">
                </filter-buttons>
               
                <div class="search-container">
                    <input type="text" placeholder="Search" v-model="collectionSearchQuery" v-on:keydown.enter.prevent="prevent">
                </div>
                 <button class="pack-button" v-on:click="() => openingPack = true">Open a Pack</button>
            </div>
            <div class="card-collection">
                <card :cardObj="c.obj" :count="c.count" v-for="(c, index) in cardCollection" 
                    :key="c.name" @click="removeCard(c.obj.id)"></card>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Card from './Card.vue';
import FilterButtons from './cards/FilterButtons.vue';
const cardFile = require("../static/cards.json");
const packSize = 5;
const rt = [0.70, 0.90, 0.99];

export default {
    name: "collection",
    data: function() {
        return {
            rarity: "",
            collectionRarity: "",
            searchQuery: "",
            collection: [],
            collectionSearchQuery: "",
            openingPack: false,
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
            let cards = this.getCollectionRarity(this.collectionRarity, this.collection);
            let re = new RegExp(this.collectionSearchQuery.toLowerCase());
            cards = cards.filter( (card) => {
                return card.obj.name.toLowerCase().search(re) !== -1 || card.obj.description.toLowerCase().search(re) !== -1;
            })
            return cards;
        },
        pack: function() {
            let cards = [];
            if(this.openingPack) {
                cards = this.openPack();
            }
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
        getCollectionRarity: function(rarity, cards) {
            if(rarity === "") {
                return cards;
            }
            return cards.filter( (c) => c.obj.rarity === rarity);
        },
        addCard: function(card) {
            console.log(card);
            for(let x of this.collection) {
                if(x.name === card.name) {
                    x.count++;
                    return;
                }
            }
            this.collection.push({ name: card.name, obj: card, count: 1});
        },
        removeCard: function(id) {
            for(let i = 0; i < this.collection.length; i++) {
                let card = this.collection[i];
                if(card.obj.id === id) {
                     if(card.count > 1) {
                        card.count--;
                    } else {
                        this.collection.splice(i, 1);
                    }
                }
            }
        },
        openPack: function() {
            let cards = [];
            this.openingPack = true;
            // get each card in pack
            for(let i = 0; i < packSize; i++) {
                let r = Math.random();
                let rarity = "";
                if(r <= rt[0]) {    // get simple
                    rarity = "simple";
                } else if(r > rt[0] && r < rt[1]) { // get special
                    rarity = "special";
                } else if(r > rt[1] && r < rt[2]) {  // get heroic
                    rarity = "heroic";
                } else {    // get legendary
                    rarity = "legendary";
                }
                let card = this.getRandomCard(rarity, cards);
                cards.push(card);
            }
            return cards;
        },
        getRandomCard: function(rarity, exclude = undefined) {
            let cl = this.getRarity(rarity);
            if(exclude) {
                cl = cl.filter( (x) => !exclude.includes(x));
            }
            let card = cl[Math.round(Math.random() * (cl.length - 1))];
            return card;
        },
        addPack: function() {
            for(let card of this.pack) {
                this.addCard(card);
            }
            this.openingPack = false;
        },
        prevent: function(e) {
            if(e) {
                e.preventDefault();
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
        grid-template-columns: 20em auto;

        @media screen and (max-width: 1024px) {
            grid-template-columns: 18em auto;
        }
    }
    .container {
        display: inline-block;
        height: 100vh;

        overflow-x: hidden;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
    }
    .card-search-container {
        @extend .container;
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
    .collection-container {
        @extend .container;
        height: 100vh;
        flex-grow: 1;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;

        .card-filter {
            width: 100%;
            background-color: #eee;
            padding: 1em;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            @media screen and (max-width: 1024px) {
                flex-direction: column;
            }

            .search-container {
                width: 22em;
                box-sizing: border-box;

                @media screen and (max-width: 1024px) {
                    margin: 1em 0em;
                }

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
                display: inline-block;
                .rarity-button {
                    @extend .button;
                }
            }
        }
        .card-collection {
            padding: 1em;
            overflow-y: scroll;
            overflow-x: hidden;
            height: 100%;
        }
    }
    .pack-button {
        @extend .button;
        background-color: #D3B326;
        color: $white;
        font-weight: 500;
        padding: 1em;
        height: 3em;
        box-sizing: border-box;

        @media screen and (max-width: 720px) {
            width: 100%;
            height: 5em;
        }            
    }
    .add-button {
        background-color: $special;
        color: $white;
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
        display: flex;
        background-color: #eee;
        padding: .5em;
        margin: 0em 3em;
        box-sizing: border-box;
        height: auto;
        border-radius: 4px;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: 1024px) {
            margin: 1em;
            overflow-x: hidden;
            height: 100%;
            width: auto;
        }
        .button-container {
            height: 3em;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;

            .pack-modal-button {
                @extend .button;
                padding: .75em 1em;
                margin-right: 1em;
            }
        }
    }
</style>


