<template>
    <div class='post'>
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <p id="post-date">{{ post.featured_date }}</p>
    </div>
</template>

<script>
export default {
    props: ['post'],

    created() {
        const date_options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date(this.post.featured_date)

        this.post.featured_date = date.toLocaleDateString(undefined, date_options)
    },
}
</script>

<style>
.post {
    background: #122c5a;
    color: white;
    margin: 20px 10% 20px 10%;
    padding: 5px 15px 5px 15px;
    border-radius: 10px;

    text-align: left;
    /* font-size: 18px; add if necessary */
}

.post h3 {
    padding: 0;
    margin: 5px 0px 5px 0px;
    font-weight: bold;
}

.post p {
    padding: 0;
    margin: 0px 0px 10px;
}

#post-date {
    font-size: small;
    color:cyan;
}
</style>