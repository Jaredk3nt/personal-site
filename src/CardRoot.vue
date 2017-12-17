<template>
    <div class="card-root-container">
        <nav class="side-nav">
            <router-link to="/cards" class="top-icon">
                <div class="icon-box one"></div>
                <div class="icon-box two"></div>
                <div class="icon-box three"></div>
                <div class="icon-box four"></div>
            </router-link>
             <router-link to="/cards" class="nav-item">
                <img src="./assets/card.svg" alt="" class="icon">
                <div class="nav-item-name">cards</div>
            </router-link>
            <router-link to="/cards/collection" class="nav-item">
                <img src="./assets/bookmark.svg" alt="" class="icon">
                <div class="nav-item-name">deck</div>
            </router-link>
            <router-link to="/cards/character/Ayluin" class="nav-item">
                <img src="./assets/npc.svg" alt="" class="icon">
                <div class="nav-item-name">npcs</div>
            </router-link>
        </nav>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "card-root"
}
</script>

<style lang="scss">
    @import 'globals';
    $nav-width: 3.5em;

    //icon values
    $box-width: .75em;
    $box-pad: .375em;
    $border-pad: .75em;

    .card-root-container {
        padding-left: $nav-width;

        .side-nav {
            background-color: $gold;
            position: absolute;
            top: 0; left: 0;
            height: 100vh;
            box-sizing: border-box;
            width: $nav-width;

            .top-icon {
                display: block;
                background-color: $dark-grey;
                width: 100%;
                height: $nav-width;
                box-sizing: border-box;
                padding: 1.125em;
                border-right: 1px solid lighten( $dark-grey,10%);

                .icon-box {
                    width: .75em; height: .75em;
                    //background-color: $white;
                    position: absolute;
                    border-color: $white;
                    border-style: solid;
                    border-width: 3px;
                }
                .one {
                    top: $border-pad; left: $border-pad;
                    border-left: none; border-top: none;
                }
                .two {
                    top: $border-pad; left: $border-pad + $box-width + $box-pad;
                    border-top: none; border-right: none;
                }
                .three {
                    top: $border-pad + $box-width + $box-pad; left: $border-pad;
                    border-left: none; border-bottom: none;
                }
                .four {
                    top: $border-pad + $box-width + $box-pad; left: $border-pad + $box-width + $box-pad;
                    border-bottom: none; border-right: none;
                }
            }
            .nav-item {
                display: block;
                color: $white;
                margin-top: 2em;
                text-decoration: none;
                font-size: .75rem;
                text-align: center;
                padding: .75em 0em 1.8em;
                font-weight: 600;

                &:hover {
                    background-color: lighten($gold, 10%);
                }
                &:hover > .nav-item-name {
                    display: block;
                }
                
                img {
                    width: 3em;
                }
                .nav-item-name {
                    display: none;
                    position: absolute;
                    text-align: center;
                    width: $nav-width + 1.25em;
                    left: 0px;
                }
            }
        }
    }
</style>
