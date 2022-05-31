<template>
	<div id="page-container">
		<div id="content-wrap">
			<div id="nav-bar">
				<img style="cursor:pointer" src="Protolemon.svg" alt="Protolemon" class="logo" @click="redirectToHome">
				<div id="nav">
					<router-link :to="{ path: '/' }">Home</router-link>
					<router-link :to="{ name: 'What' }">What???</router-link>
					<router-link :to="{ name: 'Post' }">Post</router-link>
				</div>
			</div>
			<router-view/>
		</div>
		<div id="footer">
			<p> Protolemon © 2020. All Rights Reserved.</p>
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
	}
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

#nav-bar {
	padding: 0;
	display: flex;
	align-items: center;
	background: var(--bg-black);
	margin: 0;
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
	margin: 10px 10px 10px 5%;
}

#nav {
	margin-left: auto;
	margin-right: 10%;
	padding: 20px;
}

#nav a {
	text-decoration: none;

	color: var(--text-white);
	background: var(--blue);
	
	padding: 12px 20px 12px 20px;
	border-radius: 10px;
	margin: 15px;
}

#nav a.router-link-exact-active,
#nav a:hover {
	color: var(--bg-black);
	background-color: var(--cyan);
}

</style>
