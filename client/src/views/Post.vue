<template>
<div class="post-page">
    <h1>Make an entry</h1>
    <form class="entry-form" @submit.prevent="this.handleSubmit" v-on:submit.prevent>
        <input class="form-title" v-model="title" type="text" placeholder="title" maxlength="64" required />
        <textarea class="form-text" v-model="text" type="text" placeholder="text: optional" maxlength="256" />
        <p id="form-post-date">{{ form_date }}</p>
        <button>Submit</button>
    </form>
    <div class="warning" v-if="multiple_entry_warning">Can't make more than one entry per day!</div>
    <div class="warning" v-if="error_warning">Unable to post entry</div>
    <div class="success" v-if="entry_submit_success">Your entry has been submitted to the pool!</div>
</div>
</template>

<script>
import { ref } from 'vue'
import { useReCaptcha } from 'vue-recaptcha-v3'
import axios from 'axios'

export default {
    name: 'Post',
    setup() {
        const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()

        const title = ref("")
        const text = ref("")

        const multiple_entry_warning = ref(false)
        const error_warning = ref(false)
        const entry_submit_success = ref(false)

        const date_options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date()
        const form_date = date.toLocaleDateString(undefined, date_options)
        

        const recaptcha = async () => {
            await recaptchaLoaded()
            const token = await executeRecaptcha('login')
            return token
        }

        const checkCookie = () => {
            if (document.cookie.split(';').some((item) => item.trim().startsWith('added_entry='))) { 
                entry_submit_success.value = false
                error_warning.value = false
                multiple_entry_warning.value = true

                return true
            }
            return false
        }

        const handleSubmit = async () => {
            if (checkCookie()) { return }
            const recaptcha_token = await recaptcha()

            try {
                const payload = { "recaptcha_token": recaptcha_token, "title": title.value, "body": text.value }
                const response = await axios.post('/api/blog/entries/', payload)

                if (!(response.status === 201)) { throw Error("Unable to post entry") }

                multiple_entry_warning.value = false
                error_warning.value = false
                entry_submit_success.value = true

                title.value = ""
                text.value = ""


                let date = new Date();
                date.setHours(date.getHours() + 1);
                document.cookie = "added_entry=true; expires=" + date.toUTCString()
            }
            catch(err) {
                entry_submit_success.value = false
                error_warning.value = true
                console.warn(err)
            }
        }

        return { title, text, handleSubmit, multiple_entry_warning, error_warning, entry_submit_success, form_date }
    },
}
</script>

<style>
.post-page {
    margin: auto;
}

.entry-form {
    display: flex;
    flex-direction: column;
    background: var(--bg-black);
    margin: 20px 20% 20px 20%;
    padding: 30px 0;
    border-radius: 20px;
    font: inherit;
}

@media (max-width: 35em) {
    .entry-form {
        border-radius: 5px;
        margin: 0;
        padding: 10px 0;
    }
}

.entry-form button {
    background: var(--blue);
    color: var(--text-white);

    width: 30%;
    align-self: center;
    border-radius: 10px;
    margin: 20px 0px 0px 0px;
    padding: 10px;
    border-style: none;
    font-size: min(2vh, 3vw);
    font-weight: bold;
    letter-spacing: 1px;
}

.entry-form button:hover {
    background-color: var(--cyan);
    color: var(--bg-black);
}

.form-title {
    margin: 10px 30px;
    font-weight: bold;
    padding: 10px;
    font-size: x-large;
    background-color: var(--bg-black);
    color: var(--text-white);
    border: 1px solid var(--cyan);
    border-radius: 10px;
}

.form-text {
    margin: 10px 30px;
    padding: 10px 10px 75px 10px;
    resize: none;
    background-color: var(--bg-black);
    color: var(--text-white);
    border: 1px solid var(--cyan);
    border-radius: 10px;
    font: inherit;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: lightgrey;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: lightgrey;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: lightgrey;
}

.warning {
    margin: 10px;
    padding: 10px;
    display: inline-block;
    color: white;
    background: crimson;
    border-radius: 4px;
}

.success {
    margin: 10px;
    padding: 10px;
    display: inline-block;
    color: white;
    background: green;
    border-radius: 4px;
}

#form-post-date {
    font-size: small;
    color: var(--cyan);
    align-self: flex-start;
    padding: 0px 0px 0px 10px;
    margin: 10px 30px;
}

</style>