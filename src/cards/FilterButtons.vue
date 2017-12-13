<template>
    <div class="filter-buttons">
        <div class="button-wrapper" 
            v-for="f in filters" :key="f" @click="$emit('filter', f)">
            <button :class="f" class="button">
                {{ (f.length > 0) ? f : 'none' }}
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: "filter-buttons",
    props: [ 'filters' ]
}
</script>
<style lang="scss" scoped>
    @import '../globals';
    .button-wrapper {
        display: inline-block;
        width: 4.2em;
        padding: 0em .1em;
        box-sizing: border-box;

        button {
            width: 100%;
            text-align: center;
            padding: .6em .6em;
        }
    }
    .simple {
        background: $white;
    }
</style>


