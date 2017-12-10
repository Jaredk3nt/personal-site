<template>
    <div v-if="cards.length > 0" class="cards" v-bind:class="uniqueClass">
        <h1>{{title}}</h1>
        <card v-for="c in cards" :card-obj="c.cardObj" :count="c.count" :key="c.id"></card>
    </div>
</template>

<script>
import Card from '../Card.vue';
export default {
    name: 'card-list',
    props: ['cards', 'uniqueClass', 'title'],
    components: { Card }
}
</script>

<style lang="scss">
    @import '../globals';

    h1 {
        margin: .75em 0em .25em .5em;
    }

    .simple-cards {
        color: darken($simple, 30%);
    }
    .special-cards {
        color: $special;
    }
    .heroic-cards {
        color: $heroic;
    }
    .legendary-cards {
        color: $legendary;
    }
    .mythic-cards {
        color: $mythic;
    }
    
</style>
