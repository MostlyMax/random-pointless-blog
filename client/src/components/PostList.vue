<template>
    <div class="post-list">
        <div v-for="post in posts" :key="post.id">
            <SinglePost :post="post" />
        </div>
    </div>

</template>

<script>
import SinglePost from './SinglePost.vue'

export default {
    components: { SinglePost },
    props: ['posts'],
}
</script>

<style>
.post-list {
    margin: auto;
    width: 70%;
}

@media (max-width: 35em) {
    .post-list {
        margin: auto;
        width: 100%;
    }
}
</style>