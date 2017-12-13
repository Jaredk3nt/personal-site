<template>
    <div class="card-layout">
        <card-list title="Simple" :cards="simple" uniqueClass="simple-cards"></card-list>
        <card-list title="Special" :cards="special" uniqueClass="special-cards"></card-list>
        <card-list title="Heroic" :cards="heroic" uniqueClass="heroic-cards"></card-list>
        <card-list title="Legendary" :cards="legendary" uniqueClass="legendary-cards"></card-list>
        <card-list title="Mythic" :cards="mythic" uniqueClass="mythic-cards"></card-list>
    </div>
</template>
<script>
import Card from '../Card.vue';
import CardList from './CardList.vue';

export default {
    name: 'card-layout',
    props: ['cards'],
    components: { Card, CardList },
    computed: {
        simple: function() {
            return this.getCardsOfRarity('simple');
        },
        special: function() {
            return this.getCardsOfRarity('special');
        },
        heroic: function() {
            return this.getCardsOfRarity('heroic');
        },
        legendary: function() {
            return this.getCardsOfRarity('legendary');
        },
        mythic: function() {
            return this.getCardsOfRarity('mythic');
        },
    },
    methods: {
        getCardsOfRarity(rarity) {
            let list = [];
            for(let c of this.cards) {
                if(c.cardObj.rarity === rarity) {
                    list.push(c);
                }
            }
            return list;
        }
    }
}
</script>

<style lang="scss">
    @import '../globals';
    .card-layout {
        padding-left: 1em;
    }
</style>

