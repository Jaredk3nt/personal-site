<template>
	<div class="page">
		<div class="page-body small">
			<div class="information">
				<h1>Jared Kent Jones</h1>
				<h2>Web Developer &amp; Student</h2>
				<br>
				<p>As long as I can remember I all have wanted to do was make things. My life thus far has been trying to figure out how to best achieve that goal. I've gone from wanting to be an artist, to a designer, and I have finally landed myself in nirvana with development. I am hopelessly passionate about the web because I believe it is the greatest medium for creation that has ever existed. Check out some of the stuff I have made, I hope it is as enjoyable to you as it was for me to make it!</p>
				<p>Check out all of my work on my <a href="https://github.com/Jaredk3nt">Github</a></p>
			</div>
			
			<a href="https://npmjs.com/kent-css" target="_blank" class="item kent">
				<h1>KENTcss</h1>
			</a><a href="http://dsgncoll.com" target="_blank" class="item deco">
				<h1>Design Collective</h1>
			</a><a href="http://rapidex.io" target="_blank" class="item rapidex">
				<h1>Rapidex.io</h1>
			</a><a href="http://clickerga.me" target="_blank" class="item clicker">
				<h1>clickerga.me</h1>
			</a><a href="https://gamingdb-180920.appspot.com/" target="_blank" class="item gaming">
				<h1>gamingdb</h1>
			</a><a href="https://play.google.com/store/apps/details?id=com.dev.jaredkent.cheatercheater" target="_blank" class="item cheater">
				<h1>cheatercheater</h1>
			</a>
		</div>
	</div>
</template>
<script></script>
<style lang="scss">
	@import '../main.scss';

	h1, h2, h3, h4 {
		font-family: $sans-serif;
		margin: 0em;
	}
	.information {
		margin-bottom: 2em;

		h1 {
			color: $yellow;
			font-size: 3rem;

			@media only screen and (max-width : $screen-small) {
				font-size: 2.5rem;
			}
		}
		h2 {
			color: $dark-blue;
			margin: 0em;

			@media only screen and (max-width : $screen-small) {
				font-size: 1.25rem;
			}
		}
		p {
			font-family: $serif;
			font-size: 1rem;
		}
	}

	.item {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 50%;
		height: 12rem;
		box-sizing: border-box;
		font-size: .85rem;

		@media only screen and (max-width : $screen-small) {
			width: 100%;
		}
		@mixin hover-state($background-color) {
			transition: transform .2s ease-in;
			z-index: 10;
			&:hover {
				background-color: lighten($background-color, 2%);
				transform: scale(1.05, 1.05);
				z-index: 1000;
				box-shadow: 0px 5px 20px rgba(0,0,0, 0.4);
			}
			
		}
		&.kent {
			background-color: #222;
			color: #fff;
			@include hover-state(#222);
		}
		&.deco {
			background-color: #fafafa;
			color: $grey;
			@include hover-state(#fafafa);
			&:visited {
				color: $grey;
			}
		}
		&.rapidex {
			background-color: #ee6767;
			color: #fff;
			@include hover-state(#ee6767);
		}
		&.clicker {
			background: linear-gradient(to bottom right, #2EC4B6, #20A4F3, #973FDB);
    		background: -webkit-linear-gradient(left top, #2EC4B6, #20A4F3, #973FDB);
    		transition: transform .2s ease-in;
    		color: #fff;
    		&:hover {
    			transform: scale(1.05, 1.05);
				z-index: 1000;
				box-shadow: 0px 5px 20px rgba(0,0,0, 0.4);
    		}
		}
		&.cheater {
			background-color: $yellow;
			color: #fff;
			@include hover-state($yellow);
		}
		&.gaming {
			background-color: #2de5c6;
			color: #fff;
			@include hover-state(#2de5c6);
		}
	}
</style>