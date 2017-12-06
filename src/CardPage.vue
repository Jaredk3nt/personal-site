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
        <div>
            <div class="sort-container">
                <h3>Sort by:</h3>
                <div>
                    <button class="rarity-button simple" v-on:click="setRarity('simple')">Simple</button>
                    <button class="rarity-button special" v-on:click="setRarity('special')">Special</button>
                    <button class="rarity-button extraordinary" v-on:click="setRarity('extraordinary')">Extraordinary</button>
                    <button class="rarity-button legendary" v-on:click="setRarity('legendary')">Legendary</button>
                    <button class="rarity-button mythic" v-on:click="setRarity('mythic')">Mythic</button>
                    <button class="rarity-button familiar" v-on:click="setRarity('familiars')">Familiars</button>
                    <button class="rarity-button" v-on:click="setRarity('')">None</button>
                </div>
            </div>
            <div class="search-container">
                <form>
                    <input type="text" placeholder="Search" v-model="searchQuery">
                    <!-- <button type="button" class="search-button extraordinary">Search</button> -->
                </form>
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
            searchQuery: ""
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
                let c = {};
                if(r <= rt[0]) {    // get simple
                    c = this.getRarity("simple");
                } else if(r > rt[0] && r < rt[1]) { // get special
                    c = this.getRarity("special");
                } else if(r > rt[1] && r < rt[2]) {  // get extraordinary
                    c = this.getRarity("extraordinary");
                } else {    // get legendary
                    c = this.getRarity("legendary");
                }
                c = c.filter( (x) => !cards.includes(x));
                let card = c[Math.round(Math.random() * (c.length - 1))];
                cards.push(card);
            }
            this.showPack = true;
            return cards;
        },
        getRarity: function(rarity) {
            if(rarity === "") {
                return cardFile.cardList;
            } else if (this.rarity === "familiars") {
                return cardFile.familiars;
            }
            return cardFile.cardList.filter( (c) => c.rarity === rarity);
        }
    },
    computed : {
        cards : function() {
            let cl = this.getRarity(this.rarity);
            let re = new RegExp(this.searchQuery.toLowerCase());
            cl = cl.filter( (card) => card.name.toLowerCase().search(re) !== -1);
            return cl;
        },
        familiars : function() {
            
        },
        pack : function() {
            return this.openPack();
        }
    },
    components : { Card }
}
</script>

<style lang="scss">
    @import 'globals';
    body {
        background: #eee;
        font-family: sans-serif;
    }
    .button {
        border: none;

        &:hover {
            cursor: pointer;
        }
        &:focus {
            outline: none;
        }
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
        margin-left: .75em;
        margin-bottom: .75em;

        .rarity-button {
            @extend .button;
            padding: .5em;
        }
    }
    .search-container {
        display: inline-block;
        margin-left: 45%;
        
        input {
            padding: .75em;
            height: 3em;
            box-sizing: border-box;
            border: none;
            border-radius: 4px 0px 0px 4px;
            width: 20em;

            &:focus {
                outline: none;
            }
        }
        .search-button {
            @extend .button;
            box-sizing: border-box;
            height: 3em;
            border-radius: 0px 4px 4px 0px;
        }
    }
    .pack-container {
        display: inline-block;
        float: right;
        margin-right: 2em;
        margin-top: 2em;
        vertical-align: baseline;

        .pack-button {
            @extend .button;
            background-color: #D3B326;
            color: $white;
            font-weight: 500;
            padding: 2em 1em;
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
    }
    .pack-open-enter-active, .pack-open-leave-active {
        transition: all 1s;
    }
    .pack-open-enter, .pack-open-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }
</style>
