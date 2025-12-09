<template>
  <div>
    <login v-if="!isAuthenticated" @authenticated="handleAuthenticated" />
    <home v-else @logout="handleLogout" />
  </div>
</template>

<script>
import Home from '@/views/Home'
import Login from '@/components/Login.vue'

export default {
  name: 'App',
  components: {
    Home,
    Login,
  },
  data() {
    return {
      isAuthenticated: false,
    }
  },
  mounted() {
    // Check if user is already authenticated (check both localStorage and sessionStorage)
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' || 
                           sessionStorage.getItem('isAuthenticated') === 'true'
  },
  methods: {
    handleAuthenticated() {
      this.isAuthenticated = true
    },
    handleLogout() {
      this.isAuthenticated = false
      localStorage.removeItem('isAuthenticated')
      sessionStorage.removeItem('isAuthenticated')
    }
  }
}
</script>
