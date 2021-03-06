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
    <div v-if="this.isImportingCollection" class="modal-container">
        <div class="pack-modal">
            <div class="button-container">
                <button class="pack-modal-button add-button" v-on:click="importCollection()">Import Collection</button>
                <button class="pack-modal-button" v-on:click="() => this.isImportingCollection = false">close</button>
            </div>
            <div class="dropzone-area" drag-over="handleDragOver" @dragenter="hovering = true" @dragleave="hovering = false" :class="{'hovered': hovering}">
                <div class="dropzone-text">
                    <span class="dropzone-title">Drop json here or click to select</span>
                    <span>{{importData != null ? "File loaded" : "No file" }}</span>
                </div>
                <input type="file" @change="onImportCollectionFileChange" />
            </div>
        </div>
    </div>
    <div class="collection-grid">
        <card-side-bar v-on:addCard="(c) => addCard(c)"></card-side-bar>

        <div class="collection-container">
            <div class="card-filter">
                <div class="filter-container">
                    <div class="filters">
                        <filter-buttons v-on:filter="(x) => this.filter.rarity = x"
                            :filters="['simple', 'special', 'heroic', 'legendary', 'mythic']">
                        </filter-buttons>
                        <hr/><!-- <div class="spacer"></div> -->
                        <filter-buttons v-on:filter="(t) => this.filter.type = t"
                            :filters="types.map( (t) => t.name )">
                        </filter-buttons>
                    </div>
                    <div class="clear-filters" @click="() => filter = { 'rarity': '', 'type': ''}">
                        <div class="clear-button">Clear Filters</div>
                    </div>
                </div>
                <div class="non-filter-container">
                    <div class="search-container">
                        <input type="text" placeholder="Search" v-model="searchQuery" v-on:keydown.enter.prevent="prevent">
                    </div>
                    <div class="non-filter-buttons">
                        <button class="pack-button" v-on:click="() => openingPack = true">Open a Pack</button>
                        <div class="controls">
                            <button class="control-button" v-on:click="() => isImportingCollection = true">Import</button>
                            <button class="control-button" v-on:click="() => JSON.stringify(exportCollection())">Export</button>
                            <button class="control-button danger" v-on:click="() => clearCollection()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-collection">
                <card :cardObj="c.cardObj" :count="c.count" v-for="(c, index) in cardCollection"
                    :key="c.name" @click="removeCard(c.cardObj.id)"></card>
                <div class="empty-message" v-if="collection.length === 0">Your collection is empty!</div>
                <div class="empty-message" v-if="cardCollection.length === 0 && collection.length > 0">No cards</div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Card from './Card.vue';
import FilterButtons from './cards/FilterButtons.vue';
import CardSideBar from './cards/CardSideBar.vue';

const cardFile = require("../static/cards.json");
const typeFile = require("../static/types.json");
const packSize = 5;
const rt = [0.70, 0.90, 0.99];

export default {
    name: "collection",
    components : { Card, FilterButtons, CardSideBar },
    data: function() {
        return {
            searchQuery: "",
            collection: JSON.parse(localStorage.getItem('collection')) || [],
            openingPack: false,
            isImportingCollection: false,
            importData: null,
            hovering: false,
            isExportingCollection: false,
            filter: { rarity: "", type: "" }
        };
    },
    computed : {
        cardCollection: function() {
            let cards = this.getFilteredCards();
            let re = new RegExp(this.searchQuery.toLowerCase());
            cards = cards.filter( (card) => {
                return card.cardObj.name.toLowerCase().search(re) !== -1 || card.cardObj.description.toLowerCase().search(re) !== -1;
            });
            return cards;
        },
        pack: function() {
            let cards = [];
            if(this.openingPack) {
                cards = this.openPack();
            }
            return cards;
        },
        types: function() {
            return typeFile.types;
        }
    },
    methods : {
        getRarity: function(rarity) {
            if(rarity === "") {
                return cardFile.cardList;
            }
            return cardFile.cardList.filter( (c) => c.rarity === rarity);
        },
        getType: function(id) {
            for(let t of this.types) {
                if(t.id === id) {
                    return t;
                }
            }
        },
        getFilteredCards: function(set) {
            return this.collection.filter( (card) => {
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
        addCard: function(card) {
            for(let x of this.collection) {
                if(x.name === card.name) {
                    x.count++;
                    localStorage.setItem('collection', JSON.stringify(this.collection));
                    return;
                }
            }
            this.collection.push({ name: card.name, cardObj: card, count: 1});
            localStorage.setItem('collection', JSON.stringify(this.collection));
        },
        removeCard: function(id) {
            for(let i = 0; i < this.collection.length; i++) {
                let card = this.collection[i];
                if(card.cardObj.id === id) {
                     if(card.count > 1) {
                        card.count--;
                    } else {
                        this.collection.splice(i, 1);
                    }
                }
            }
            localStorage.setItem('collection', JSON.stringify(this.collection));
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
        },
        clearCollection: function() {
            this.collection = [];
            localStorage.setItem('collection', JSON.stringify(this.collection));
        },
        importCollection: function() {
            this.collection = this.importData;
            this.isImportingCollection = false;
        },
        exportCollection: function() {
            console.log("HERE EXPORT");
            let collectionJsonData = JSON.stringify(this.collection);
            let a = document.createElement('a');
            a.id = 'exportCollectionAref';
            a.href = 'data:atttachment/json,' + encodeURIComponent(collectionJsonData);
            a.target = '_blank';
            a.download = 'card_collection_export.json';
            document.body.appendChild(a);
            a.click();
            document.getElementById('exportCollectionAref').remove()
        },
        onImportCollectionFileChange: function(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;

            let reader = new FileReader();
            let page = this;
            reader.onload = (e) => {
                page.importData = JSON.parse(e.target.result);
            };
            reader.readAsText(files[0]);
        }
    },
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
    .dropzone-area {
        width: 80%;
        height: 200px;
        position: relative;
        border: 2px dashed $dark-grey;
        display: block;
        &.hovered {
            border: 2px dashed $heroic;
            .dropzone-title {
                color: $heroic;
            }
        }
    }
    .dropzone-area input {
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .dropzone-text {
        position: absolute;
        top: 50%;
        text-align: center;
        transform: translate(0, -50%);
        width: 100%;
        span {
            display: block;
            line-height: 1.9;
        }
    }
    .dropzone-title {
        font-size: 13px;
        color: $dark-grey;
        letter-spacing: 0.4px;
    }
    .collection-grid {
        display: grid;
        width: 100%;
        grid-template-columns: 18em auto;

        @media screen and (max-width: 1024px) {
            grid-template-columns: 16.5em auto;
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
            padding: 3em 1em;
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
            background-color: #dedede;
            padding: 1.5em 1em;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            @media screen and (max-width: 1024px) {
                display: block;
            }
            .filter-container {
                display: flex;
                flex-direction: row;

                .filters {
                    width: 20.75em;
                    display: inline-block;
                }
                .clear-filters {
                    display: inline-block;
                    width: 4em;
                    color: $white;
                    padding: .2em;
                    text-align: center;

                    &:hover {
                        cursor: pointer;
                    }
                    .clear-button {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background-color: $dark-grey;
                        height: 100%;
                    }

                    @media screen and (max-width: 1024px) {
                        vertical-align: top;
                    }
                }
            }
            .non-filter-container {
                flex: 1;

                .search-container {
                    width: 100%;
                    box-sizing: border-box;
                    padding: .5em;

                    @media screen and (max-width: 1024px) {
                        margin: .5em 0em;
                        width: auto;
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
                .non-filter-buttons {
                    .pack-button {
                        @extend .button;
                        background-color: $gold;
                        color: $white;
                        font-weight: 500;
                        padding: 1em;
                        height: 3em;
                        width: 10em;
                        margin: 0em 1em;
                        box-sizing: border-box;
                        display: inline-block;

                        @media screen and (max-width: 720px) {
                            width: 100%;
                            height: 5em;
                        }            
                    }
                    .controls {
                        float: right;
                        margin-right: .55em;

                        .control-button {
                            @extend .button;
                            display: block;
                            margin: .5em 0em;
                            display: inline-block;

                            @media screen and (max-width: 1024px){
                                display: inline-block;
                            }
                        }
                        .danger {
                            background-color: $red;
                            color: $white;
                        }
                    }
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
    .empty-message {
        color: $dark-grey;
        font-weight: 700;
        font-size: 1.6rem;
        text-align: center;
        margin-top: 5em;
    }
    hr {
        width: 95%;
        border-style: solid;
        border-color: lighten($dark-grey, 50%);
        margin-top: .25em; margin-bottom: .25em;
    }
</style>


