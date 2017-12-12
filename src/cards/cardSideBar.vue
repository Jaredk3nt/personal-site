<template>
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
</template>

<script>
export default {
    name: "card-side-bar",
    components: {}

}
</script>

<style lang="scss">

</style>

