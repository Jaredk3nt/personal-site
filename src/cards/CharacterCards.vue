<template>
    <div class="card-sheet">
        <div class="profile">
            <h1>{{name}}</h1>
            <p>{{description}}</p>
        </div>
        <card-layout :cards="characterCards"></card-layout>
    </div>
</template>
<script>
import Card from '../Card.vue';
import CardLayout from './CardLayout.vue';
const cardFile = require("../../static/cards.json");
const charFile = require("../../static/characters.json");
export default {
    name: 'character-cards',
    props: ['name'],
    components: { Card, CardLayout },
    data: function() {
        return {
            description: charFile[this.name].description,
            cards: charFile[this.name].cards, // cards is a list of card ID & count
            cardList: cardFile.cardList
        }
    },
    computed: {
        characterCards: function() {
            let charCards = [];
            for(let c of this.cards) {
                charCards.push({ cardObj: this.getCard(c.id), count: c.count });
            }
            return charCards;
        }
    },
    methods: {
        getCard: function(id) {
            // Brute force currently since there is no ordering inherently, will be better if in real DB
            for(let c of this.cardList) {
                if(c.id === id) {
                    return c;
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../globals';

    .card-sheet {
        font-family: sans-serif;
        .profile {
            width: 100%;
            height: auto;
            padding: .5em 2em 1em;
            color: $white;
            background-color: $dark-grey;
            margin-bottom: .5em;
            h1 {
                font-weight: 700;
                margin: .5em 0em;
            }
            p {
                margin: .5em 0em;
            }
        }
    }
</style>

