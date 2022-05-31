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
    background: var(--bg-black);
    color: var(--text-white);
    margin: 20px 0 20px 0;
    padding: 30px;
    border-radius: 20px;

    text-align: left;
    /* font-size: 18px; add if necessary */
}

.post h3 {
    padding: 0;
    margin: 10px;
    font-weight: bold;
}

.post p {
    padding: 10px;
    margin: 0px 0px 10px;
}

#post-date {
    font-size: small;
    color: var(--cyan);
}
</style>