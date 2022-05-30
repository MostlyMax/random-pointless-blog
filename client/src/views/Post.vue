<template>
<div class="post-page">
    <h1>Make an entry</h1>
    <form class="entry-form" @submit.prevent="this.handleSubmit" v-on:submit.prevent>
        <input class="form-title" v-model="title" type="text" placeholder="title" maxlength="64" required />
        <textarea class="form-text" v-model="text" type="text" placeholder="text: optional" maxlength="256" />
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

        return { title, text, handleSubmit, multiple_entry_warning, error_warning, entry_submit_success }
    },
}
</script>

<style>
.post-page {
    margin: auto;
    font-size: 20px;
}

.entry-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.entry-form button {
background: #0c1e3e;
    color: white;
    font-weight: bold;
    border-radius: 100px;
    margin: 5px;
    padding: 5px 30px 5px 30px;
    border-style: none;
    font: inherit;
}

.form-title {
    margin: 10px;
    width: 60%;
    padding: 10px 5px 10px 5px;
    font: inherit;
    font-size: 24px;
}

.form-text {
    margin: 10px;
    width: 60%;
    padding: 10px 5px 100px 5px;
    resize: none;
    font: inherit;
    font-size: 18px;
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

</style>