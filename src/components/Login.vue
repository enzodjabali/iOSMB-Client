<template>
  <div class="login-container">
    <div class="login-box">
      <h2>iOSMB</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="username" 
            placeholder="Username"
            autocomplete="username"
            required
            class="ios-input"
          />
          <input 
            type="password" 
            v-model="password" 
            placeholder="Password"
            autocomplete="current-password"
            required
            class="ios-input password-input"
          />
          <button type="submit" class="submit-arrow" :disabled="loading">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <label class="remember-me">
          <input type="checkbox" v-model="rememberMe" />
          <span>Keep me signed in</span>
        </label>
      </form>
      
      <div class="version">{{ version }}</div>
    </div>
  </div>
</template>

<script>
import { config, hashPassword } from '@/config'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      loading: false,
      rememberMe: true,
      version: (process.env.VUE_APP_VERSION || 'dev').replace(/^v/, '')
    }
  },
  methods: {
    async handleLogin() {
      this.errorMessage = ''
      this.loading = true
      
      try {
        // Check username
        if (this.username !== config.webAppUsername) {
          this.errorMessage = 'Invalid username or password'
          this.loading = false
          return
        }
        
        // Hash the entered password
        const hashedPassword = await hashPassword(this.password)
        
        // Compare with stored hash
        if (hashedPassword !== config.webAppPasswordHash) {
          this.errorMessage = 'Invalid username or password'
          this.loading = false
          return
        }
        
        // Authentication successful
        if (this.rememberMe) {
          localStorage.setItem('isAuthenticated', 'true')
        } else {
          sessionStorage.setItem('isAuthenticated', 'true')
        }
        this.$emit('authenticated')
      } catch (error) {
        console.error('Login error:', error)
        this.errorMessage = 'An error occurred. Please try again.'
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #1D1D1D;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 450px;
  text-align: center;
}

h2 {
  color: white;
  margin: 0 0 40px 0;
  text-align: center;
  font-weight: 400;
  font-size: 32px;
  letter-spacing: -0.5px;
}

.input-wrapper {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  margin-bottom: 16px;
}

.ios-input {
  width: 100%;
  padding: 16px 50px 16px 20px;
  background: transparent;
  border: none;
  color: #1d1d1f;
  font-size: 17px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
}

.ios-input::placeholder {
  color: rgba(60, 60, 67, 0.6);
}

.ios-input:focus {
  outline: none;
}

.password-input {
  border-top: 1px solid rgba(60, 60, 67, 0.15);
}

.submit-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(142, 142, 147, 0.12);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: rgba(0, 0, 0, 0.5);
}

.submit-arrow:hover:not(:disabled) {
  background: rgba(142, 142, 147, 0.2);
  transform: translateY(-50%) scale(1.05);
}

.submit-arrow:active:not(:disabled) {
  transform: translateY(-50%) scale(0.95);
}

.submit-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  color: #d32f2f;
  padding: 14px 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 15px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.remember-me {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 15px;
  cursor: pointer;
  margin-top: 20px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.remember-me input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  accent-color: rgba(255, 255, 255, 0.9);
}

.remember-me span {
  user-select: none;
  font-weight: 400;
}

.version {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  margin-top: 40px;
  font-weight: 400;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
