<template>
    <div id="CardPage">
        <!-- <transition name="pack-open"> -->
            <div v-if="this.openingPack" class="modal-container">
                    <div class="pack-modal">
                        <div class="button-container">
                            <button class="close-button" v-on:click="() => this.openingPack = false">close</button>
                        </div>
                        <div>
                            <div v-if="this.showPack">
                                <card v-for="x in openPack()" :cardObj="x" :small="true" :key="x.id"></card>
                            </div>
                        </div>
                    </div>
            </div>
        <!-- </transition> -->
        <div class="function-bar">
            <div class="sort-container">
                <h3>Filter by:</h3>
                <div>
                    <button class="rarity-button simple" v-on:click="setRarity('simple')">Simple</button>
                    <button class="rarity-button special" v-on:click="setRarity('special')">Special</button>
                    <button class="rarity-button heroic" v-on:click="setRarity('heroic')">heroic</button>
                    <button class="rarity-button legendary" v-on:click="setRarity('legendary')">Legendary</button>
                    <button class="rarity-button mythic" v-on:click="setRarity('mythic')">Mythic</button>
                    <button class="rarity-button familiar" v-on:click="setRarity('familiars')">Familiars</button>
                    <button class="rarity-button" v-on:click="setRarity('')">None</button>
                </div>
            </div>
            <div class="search-container">
                <form>
                    <input type="text" placeholder="Search" v-model="searchQuery">
                    <!-- <button type="button" class="search-button heroic">Search</button> -->
                </form>
            </div>
            <div class="random-container">
                <h3>Cast Random: <strong>{{ randomCard }}</strong></h3>
                <div>
                    <button class="rarity-button simple" v-on:click="setRandomCard('simple')">Simple</button>
                    <button class="rarity-button special" v-on:click="setRandomCard('special')">Special</button>
                    <button class="rarity-button heroic" v-on:click="setRandomCard('heroic')">Heroic</button>
                    <button class="rarity-button legendary" v-on:click="setRandomCard('legendary')">Legendary</button>
                    <button class="rarity-button mythic" v-on:click="setRandomCard('mythic')">Mythic</button>
                </div>
            </div>
            <div class="pack-container">
                <button class="pack-button" v-on:click="openPack">Open a Pack</button>
            </div>
        </div>
        <card v-for="c in cards" :cardObj="c" :key="c.name"></card>
    </div>
</template>

<script>
import Card from './Card.vue';
const cardFile = require("../static/cards.json");
const packSize = 5;
const rt = [0.70, 0.90, 0.99];

export default {
    name: 'card-page',
    data () {
        return { 
            rarity: "",
            openingPack: false,
            showPack: false,
            searchQuery: "",
            randomCard: ""
        }
    },
    methods : {
        setRarity: function(rarity) {
            this.rarity = rarity;
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
            this.showPack = true;
            return cards;
        },
        getRarity: function(rarity) {
            if(rarity === "") {
                return cardFile.cardList;
            } else if (rarity === "familiars") {
                return cardFile.familiars;
            }
            return cardFile.cardList.filter( (c) => c.rarity === rarity);
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
            this.randomCard = this.getRandomCard(rarity).name;
        }
    },
    computed : {
        cards : function() {
            let cl = this.getRarity(this.rarity);
            let re = new RegExp(this.searchQuery.toLowerCase());
            cl = cl.filter( (card) => card.name.toLowerCase().search(re) !== -1 || card.description.toLowerCase().search(re) !== -1);
            return cl;
        },
    },
    components : { Card }
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
    .sort-container {
        display: inline-block;
        margin-left: 3em;
        margin-bottom: .75em;

        @media screen and (max-width: 720px) {
            width: 100%;
            padding: 0em 1em;
            margin-left: 0em;
            box-sizing: border-box;
        }

        .rarity-button {
            @extend .button;
            padding: .5em;
            margin: .2em;
        }
        h3 {
            margin: 1em 0em;
        }
    }
    .random-container {
        @extend .sort-container;
        margin-left: 4em;
        width: 22em;
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

        @media screen and (max-width: 720px) {
            width: 100%;
            margin-left: 0em;
            padding: 0em 1em;
            box-sizing: border-box;
        }
        
        input {
            padding: .75em;
            height: 3em;
            box-sizing: border-box;
            border: none;
            border-radius: 4px;
            width: 20em;

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
        margin: 2em 0em;
        border-radius: 4px;

        @media screen and (max-width: 720px) {
            margin: 1em;
            overflow-x: hidden;
            height: 100%;
        }
    }
    .pack-open-enter-active, .pack-open-leave-active {
        transition: all 1s;
    }
    .pack-open-enter, .pack-open-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }
</style>
