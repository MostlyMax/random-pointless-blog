<template>
	<div id="page-container">
		<div id="content-wrap" >
			<div class="primary-header">
				<img style="cursor:pointer" src="Protolemon.svg" alt="Protolemon" class="logo" @click="redirectToHome">
				<button class="mobile-nav-toggle" @click="toggleNavMenu"></button>
				<div class="nav" data-visible="false">
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

export default {
	components: { Home, What, Post },
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
		toggleNavMenu () {
			const nav = document.querySelector(".nav")
			const navToggle = document.querySelector(".mobile-nav-toggle")

			const visibility = nav.getAttribute("data-visible")

			if (visibility === "false") {
				nav.setAttribute("data-visible", true)
			}
			else if (visibility === "true") {
				nav.setAttribute("data-visible", false)
			}
		},
		hideNavMenu () {
			const nav = document.querySelector(".nav")
			const navToggle = document.querySelector(".mobile-nav-toggle")
			nav.setAttribute("data-visible", false)
		},
	},
}
</script>


<style>
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
	background-color: var(--bg-white);
	height: 100%;
	letter-spacing: 2px;
	font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#page-container {
  	position: relative;
  	overflow: scroll;
  	overflow-x: hidden;
  	min-height: 100vh;
}

#content-wrap {
  	padding-bottom: 2.5rem;    /* Footer height */
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	font-weight: bold;
	color: #0c1e3e;
	margin: 0;
}

.primary-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: var(--bg-black);
}

.nav {
	list-style: none;
	display: flex;
	padding: 0;
	margin: 0;
	margin-right: 5rem;
	gap: var(--gap, 1rem);
}

.mobile-nav-toggle {
	display: none;
}

@media (max-width: 35em) {
	.nav {
		--gap: 1em;
		margin-right: 0;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 30%;
		background: var(--bg-black);

		display: flex;
		flex-direction: column;
		padding: min(30vh, 10rem) 0;

		-webkit-transform: translate(100%, 0);
		transform: translateX(100%);
		transition: transform 350ms ease-out;
	}

	.nav[data-visible="true"] {
		-webkit-transform: translate(0%, 0);
		transform: translateX(0%);
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

.nav a {
	text-decoration: none;

	color: var(--text-white);
	background: var(--blue);
	
	padding: 12px 20px 12px 20px;
	border-radius: 10px;
	margin: 15px;
}

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
	margin-left: 3rem;
}

</style>
