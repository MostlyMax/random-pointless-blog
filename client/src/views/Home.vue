<template>
<div class="home-page">
    <h1>Featured Posts</h1>
    <PostList :posts="posts"/>
</div>
</template>

<script>
import PostList from '../components/PostList.vue'
import { ref } from 'vue'
import axios from 'axios'

export default {
    name: 'Home',
    components: { PostList },
    setup() {
        const posts = ref([])
        const error = ref(null)
        const date_options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };

        const loadPosts = async () => {
            try {
                // { params: { amount: 25 } }
                // const response = await axios.get('/api/blog/featured/')
                const response = await axios.get('http://localhost:8000/api/blog/featured/')

                if (!(response.status === 200)) { throw Error("Unable to load data")}

                posts.value = response.data
            }
            catch(err) {
                error.value = err.message
                console.log(error.value)
            }
        }
        
        if (!posts.value.length) { loadPosts() }

        return { posts, loadPosts }
    },
}
</script>

<style>
.home-page {
    font-size: min(4vw, 16px);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.home-page h1 {
    font-weight: 900;
}

@media (max-width: 35em) {
    .home-page {
        justify-content: flex-start;
    }
}



</style>
