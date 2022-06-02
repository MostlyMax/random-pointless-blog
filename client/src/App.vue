<template>
	<div id="app">
		<Slide right noOverlay :closeOnNavigation="true" >
			<router-link :to="{ path: '/' }" @click.native="hideNavMenu">Home</router-link>
			<router-link :to="{ name: 'What' }" @click.native="hideNavMenu">What???</router-link>
			<router-link :to="{ name: 'Post' }" @click.native="hideNavMenu">Post</router-link>
    	</Slide>
		<div id="content-wrap" >
			<div class="primary-header">
				<img style="cursor:pointer" src="Protolemon.svg" alt="Protolemon" class="logo" @click="redirectToHome">
				<div class="nav">
					<router-link :to="{ path: '/' }" @click.native="hideNavMenu">Home</router-link>
					<router-link :to="{ name: 'What' }" @click.native="hideNavMenu">What???</router-link>
					<router-link :to="{ name: 'Post' }" @click.native="hideNavMenu">Post</router-link>
				</div>
			</div>
			<router-view/>
		</div>
		<div id="footer">
			<p> Protolemon © 2022. All Rights Reserved.</p>
		</div>
	</div>
</template>

<script>
import Home from './views/Home.vue'
import What from './views/What.vue'
import Post from './views/Post.vue'
import { Slide } from 'vue3-burger-menu'

export default {
	components: { 
		Home, What, Post, Slide 
	},
	// metaInfo: {
	//   title: "Random Blog",
	//   titleTemplate: "%s | An Absolutely Pointless Experience"
	// }
	methods: {
		redirectToHome () {
			this.$router.push(
					{
						path: '/',
					}
			)
		},
	},
}
</script>


<style>
/* Root Settings */
:root {
	--yellow: #ffe45c;
	--cyan: #2ecbe9;
	--bg-white: #e8fbff;
	--text-white: white;
	--blue: #128fc8;
	--dark-blue: #00468b;
	--bg-black: #04192e;
	
}

body {
	margin: 0;
	padding: 0;
}

#app {
  	position: relative;
  	overflow: scroll;
  	overflow-x: hidden;
  	min-height: 100vh;

	margin: 0;
	background-color: var(--bg-white);
	height: 100%;
	letter-spacing: 2px;
	font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-size: min(4vw, 16px);
}

#content-wrap {
  	padding-bottom: 2.5rem;
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	font-weight: bold;
	color: #0c1e3e;
	margin: 0;
	padding: 0;
}

/* Header and Nav */
.primary-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: var(--bg-black);
}

.nav {
	list-style: none;
	display: flex;
	visibility: visible;
	padding: 0;
	margin: 0;
	margin-right: 5rem;
	gap: var(--gap, 1rem);
}

/* Burger Button */
#app .bm-burger-button {
	display: none;
	visibility: hidden;

	position: fixed;
	width: 36px;
	height: 30px;
	right: 36px;
	left: auto;
	top: 36px;
	cursor: pointer;
}

.bm-burger-bars {
	background-color: var(--bg-white);
}

.bm-menu {
	background-color: var(--bg-black); /* Black*/
	padding-top: 60px; /* Place content 60px from the top */
}

.bm-item-list {
	margin-left: 10%;
	margin-right: 10%;
	padding: 10px;
}

@media (max-width: 35em) {
	.nav {
		display: none;
		visibility: hidden;
	}

	.bm-burger-button {
		display: block;
		visibility: visible;
	}

	.mobile-nav-toggle {
		display: block;
		z-index: 99;
		position: absolute;

		background: url("assets/menu.svg");
		background-repeat: no-repeat;
		filter: invert(1);

		border: 0;
		width: 1.5rem;
		height: 1.5rem;
		top: 2rem;
		right: 1rem;
	}
}

.nav a,
.bm-item-list a {
	text-decoration: none;

	color: var(--text-white);
	background: var(--blue);
	
	padding: 12px 20px 12px 20px;
	border-radius: 10px;
	margin: 15px;
}

.bm-item-list a {
	margin: 2em 0;
}

.bm-item-list a.router-link-exact-active,
.bm-item-list a:hover, 
.nav a.router-link-exact-active,
.nav a:hover {
	color: var(--bg-black);
	background-color: var(--cyan);
}

#footer {
	padding: 0;
	display: flex;
	align-items: center;
	background: var(--bg-black);
	color: var(--text-white);
	margin: 0;
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 2.5rem;  
}

#footer p {
	font-size: x-small;
	margin: 10px;
}


.logo {
	height: 70px;
	width: 70px;
	margin: 1rem;
	margin-left: 1rem;
}

</style>
