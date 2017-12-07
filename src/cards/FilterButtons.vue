<template>
    <div class="filter-buttons">
        <button v-for="f in filters" :key="f" 
            @click="$emit('filter', f)"
            :class="f" class="button">
                {{ (f.length > 0) ? f : 'none' }}
        </button>
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
</style>


