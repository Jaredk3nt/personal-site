<template>
    <div class="popup" v-bind:class="type" v-if="visible" >
        <div class="close"  v-on:click="visible = false">&#xd7;</div>
        <h1>{{ title }}</h1>
        <p>{{ body }}</p>
    </div>
</template>
<script>
export default {
    name: 'Popup',
    props: [
        'title', 'body', 'type'
    ],
    data: function() {
        return { 
            visible: true
        }
    },
}
</script>
<style lang="scss">
@import '../main.scss';
.popup {
    padding: .5em 2em .5em .5em;
    border-radius: 5px;
    position: fixed;
    top: 0px;
    right: 0px;
    margin: .5em;
    z-index: 1000;
    background-color: lighten($yellow, 10%);
    font-family: $sans-serif;
    color: #fff;
    max-width: 20%;

    @media only screen and (max-width : $screen-small) {
        display: none;
    }

    .close {
        right: 10px;
        top: 0px;
        position: absolute;
        color: #fff;
        padding: 5px;

        &:hover {
            cursor: pointer;
            color: $dark-blue;
        }
    }
    h1 {
        margin: .1em 0em;
        line-height: 1;
    }
    p {
        margin: .1em 0em;
        font-size: .9rem;
    }
}
</style>


