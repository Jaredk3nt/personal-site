<template>
    <div>
        <div class="resume-download"><a href="./static/resume.pdf" download="Jared Jones Resume">Download Link</a></div>
        <div class="resume-holder">
            <pdf src="./static/resume.pdf"></pdf>
        </div>
    </div>
</template>
<script>
    import pdf from 'vue-pdf'
    export default {
        name: 'Resume',
        components: {
            pdf
        }
    }
</script>
<style lang="scss">
    @import '../main.scss';

    .resume-download {
        text-align: center;
        margin-top: 3em;
        a {
            font-family: sans-serif;
            color: $dark-blue;
        }
    }

    .resume-holder {
        width: 50%;
        margin: .25em auto;
        border: 8px solid #222;

        @media only screen and (max-width : $screen-small) {
            width: 90%;
        }
    }
</style>