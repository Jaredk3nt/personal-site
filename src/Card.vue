<template>
<div class="card-wrapper" @click="$emit('click', cardObj.id)">
    <div class="card-container" :class="{'small': small}">
        <div class="rarity-banner">
            <div class="banner-content" :class="cardObj.rarity">
                <h3>#{{ cardObj.id }}</h3>
            </div>
        </div>
        <div class="card-content">
            <h1>{{ cardObj.name.toUpperCase() }}</h1>
            <p v-for="s in splitDescription" :key="s">{{s}}</p>
        </div>
    </div>
    <div v-if="count != undefined && count > 0" class="counter-icon"><p>{{count}}</p></div>
</div>
</template>
<script>
export default {
    name : "card",
    props : {
        cardObj: { type: Object, required: true },
        small: { type: Boolean },
        count: { type: Number }
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

    $card-height: 19.75em;
    $card-width: 13.5em;
    $card-content-padding: 7.25em;

    $title-text: 1.2rem;
    $description-text: .85rem;

    .card-container {
        background-color: $eggshell;
        width: $card-width;
        height: $card-height;
        border-radius: $round;
        padding: .75em;
        margin: .5em;
        display: inline-block;
        position: relative;
        vertical-align: top;
        box-shadow: 2px 4px 10px rgba(0,0,0, 0.2);
        transition: transform .2s ease;
        font-family: sans-serif;
        z-index: 100;

        &:hover {
            transform: translateY(-5px);
            cursor: pointer;
        }

        @media screen and (max-width: 720px) {
            
        }

        &.small {
            width: $card-width - 1em;
            height: $card-height - 1.5em;

            @media screen and (max-width: 720px) {
                width: $card-width;
                height: $card-height;
            }

            .rarity-banner {
                left: $card-width - (2.5em + .75em + 1em); top: -.75em;

                @media screen and (max-width: 720px) {
                    left: $card-width - (2.5em + .75em); top: -.75em;
                }
            }
            .card-content {
                padding: ($card-content-padding - 1em) 1em 1em;

                @media screen and (max-width: 720px) {
                    padding: $card-content-padding 1em 1em;
                }

                h1 {
                    font-size: $title-text - .1rem;
                    @media screen and (max-width: 720px) {
                        font-size: $title-text;
                    }
                }
                p {
                    font-size: $description-text - .1rem;
                    @media screen and (max-width: 720px) {
                        font-size: $description-text;
                    }
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
                    font-size: .8rem;
                    margin-top: 2em;
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

    .card-wrapper {
        width: auto;
        display: inline-block;
        position: relative;
        margin: .5em;

        @media screen and (max-width: 1024px) {
            margin: 0em;
        }

        &:hover > .counter-icon {
            transform: translateY(-5px);
        }

        .counter-icon {
            position: absolute;
            height: 3em; width: 3em;
            border-radius: 50%;
            margin-left: 13.5em;
            background: $special;
            text-align: center;
            top: 19.75em;
            transition: transform .2s ease;
            z-index: 9999;
            
            p {
                font-family: sans-serif;
                color: $white;
                margin-top: .95em;
                font-weight: 700;
            }
        }
    }
    
</style>

