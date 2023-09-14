<script setup>
import IconGoogle from '@/components/icons/IconGoogle'
import { useAuthStore } from '@/stores/auth'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'

const SCOPES = 'https://www.googleapis.com/auth/drive.file'

let tokenClient = null
const data = reactive({
  gapiInited: false,
  gisInited: false,
})

onMounted(() => {
  gapi.load('client', async () => {
    await gapi.client.init({
      apiKey: import.meta.env.VITE_API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    })

    data.gapiInited = true
  })

  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  })

  data.gisInited = true
})

function handleAuth() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp)
    }

    auth.authenticated = true
    router.push('/')
  }

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: 'consent' })
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: '' })
  }
}

</script>

<template>
  <div class="h-screen w-full flex justify-center items-center">
    <button
      v-show="data.gapiInited && data.gisInited"
      class="border rounded-full bg-gray-100 transition-all
        duration-700 hover:shadow-lg"
      @click="handleAuth"
    >
      <icon-google class="inline" />
      <span class="ml-2 mr-4">Authenticate by Google</span>
    </button>
  </div>
</template>
