<template>
    <div class='post'>
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
    </div>
</template>

<script>
export default {
    props: ['post'],
}
</script>

<style>
.post {
    background: #122c5a;
    color: white;
    margin: 20px 10% 20px 10%;
    padding: 5px 10px 5px 10px;
    border-radius: 10px;

    text-align: left;
    /* font-size: 18px; add if necessary */
}

.post h3 {
    padding: 0;
}
</style>