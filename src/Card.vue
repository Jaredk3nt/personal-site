<template>
    <div class="card-container" :class="{'small': small}">
        <div class="rarity-banner" >
            <div class="banner-content" :class="cardObj.rarity">
                <h3>{{ cardObj.id }}</h3>
            </div>
        </div>
        <div class="card-content">
            <h1>{{ cardObj.name.toUpperCase() }}</h1>
            <p v-for="s in splitDescription" :key="s">{{s}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name : "card",
    props : {
        cardObj: { type: Object, required: true },
        small: { type: Boolean }
    },
    data : function() {
        return {}
    },
    computed : {
        splitDescription : function() {
            return this.cardObj.description.split("\n");
        }
    },
    methods : {
        hash: function(str) {
            let hash = 0;
            if (str.length == 0) {
                return hash;
            }
            for (let i = 0; i < str.length; i++) {
                char = str.charCodeAt(i);
                hash = ((hash<<5)-hash)+char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
        }
    }
}
</script>
<style lang="scss" scoped>
    @import 'globals';
    $round: 8px;

    $card-height: 22em;
    $card-width: 15em;
    $card-content-padding: 8.5em;

    $title-text: 1.4rem;
    $description-text: .9rem;

    .card-container {
        background-color: $eggshell;
        width: $card-width;
        height: $card-height;
        border-radius: $round;
        padding: .75em;
        margin: .5em;
        display: inline-block;
        vertical-align: top;
        box-shadow: 2px 4px 10px rgba(0,0,0, 0.2);
        transition: transform .2s ease;

        &:hover {
            transform: scale(1.05);
            cursor: default;
        }

        &.small {
            width: $card-width - 2em;
            height: $card-height - 3em;

            .rarity-banner {
                left: $card-width - (2.5em + .75em + 2em); top: -.75em;
            }
            .card-content {
                padding: ($card-content-padding - 1em) 1em 1em;
                h1 {
                    font-size: $title-text - .2rem;
                }
                p {
                    font-size: $description-text - .2rem;
                }
            }
        }

        .rarity-banner {
            position: relative;
            left: $card-width - (2.5em + .75em); top: -.75em;

            .banner-content {
                position: absolute;
                width: 2.5em;
                height: 3.5em;
                text-align: center;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, .3);

                h3 {
                    font-size: 1rem;
                    margin-top: 1.5em;
                }
            }
        }
        .card-content {
            background: url("assets/card-background-slant.jpg");
            background-size: cover;
            border-radius: $round;
            height: 100%;
            padding: $card-content-padding 1em 1em;
            box-sizing: border-box;
            color: $white;
            text-align: center;

            h1 {
                margin: 0em;
                font-size: $title-text;
                margin-bottom: .55em;
            }
            p {
                font-size: $description-text;
                margin: .6em 0em;
                color: #ededed;
            }
        }
    }
    
</style>

