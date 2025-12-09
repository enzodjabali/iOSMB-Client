import { createStore } from 'vuex'
import axios from 'axios'

// Helper functions for localStorage persistence
const getLocalStorage = (key: string, defaultValue: unknown) => {
  const value = localStorage.getItem(key)
  if (value === null) return defaultValue
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

const setLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export default createStore({
  state: {
    password: getLocalStorage('password', '') as string,
    ipAddress: getLocalStorage('ipAddress', '') as string,
    fallbackIpAddress: getLocalStorage('fallbackIpAddress', '') as string,
    port: getLocalStorage('port', 8180) as number,
    ssl: getLocalStorage('ssl', true) as boolean,
    subjectLine: getLocalStorage('subjectLine', false) as boolean,
    transcode: getLocalStorage('transcode', true) as boolean,
    systemSound: getLocalStorage('systemSound', false) as boolean,
    launchOnStartup: false as boolean, // Not applicable for web
    minimize: true as boolean, // Not applicable for web
    macstyle: false as boolean, // Not applicable for web
    acceleration: true as boolean, // Not applicable for web
    messagesCache: [] as object[],
    enableTunnel: getLocalStorage('enableTunnel', false) as boolean,
    cacheMessages: getLocalStorage('cacheMessages', false) as boolean,
    mutedChats: getLocalStorage('mutedChats', []) as string[],
    notifSound: getLocalStorage('notifSound', '/sounds/receivedText.mp3') as string,
    emojiSet: getLocalStorage('emojiSet', 'Twitter') as string,
    privacyMode: getLocalStorage('privacyMode', false) as boolean,
    isTyping: [] as boolean[],
    isTypingTimer: [] as NodeJS.Timeout[],
  },
  mutations: {
    setPassword(state, password) {
      state['password'] = password
      setLocalStorage('password', password)
      axios.defaults.headers.common['Authorization'] = password
    },
    setIPAddress(state, ip) {
      state['ipAddress'] = ip
      setLocalStorage('ipAddress', ip)
    },
    setFallbackIPAddress(state, ip) {
      state['fallbackIpAddress'] = ip
      setLocalStorage('fallbackIpAddress', ip)
    },
    setPort(state, port) {
      state['port'] = port
      setLocalStorage('port', port)
    },
    setSSL(state, ssl) {
      state['ssl'] = ssl
      setLocalStorage('ssl', ssl)
    },
    setSubjectLine(state, subjectLine) {
      state['subjectLine'] = subjectLine
      setLocalStorage('subjectLine', subjectLine)
    },
    setTranscode(state, transcode) {
      state['transcode'] = transcode
      setLocalStorage('transcode', transcode)
    },
    setSystemSound(state, systemSound) {
      state['systemSound'] = systemSound
      setLocalStorage('systemSound', systemSound)
    },
    setStartup(state, launchOnStartup) {
      // Not applicable for web - kept for compatibility
      state['launchOnStartup'] = launchOnStartup
    },
    setMinimize(state, minimize) {
      // Not applicable for web - kept for compatibility
      state['minimize'] = minimize
    },
    setMacStyle(state, macstyle) {
      // Not applicable for web - kept for compatibility
      state['macstyle'] = macstyle
    },
    setAcceleration(state, acceleration) {
      // Not applicable for web - kept for compatibility
      state['acceleration'] = acceleration
    },
    setTunnel(state, enableTunnel) {
      state['enableTunnel'] = enableTunnel
      setLocalStorage('enableTunnel', enableTunnel)
    },
    setNotifSound(state, notifSound) {
      state['notifSound'] = notifSound
      setLocalStorage('notifSound', notifSound)
    },
    setEmojiSet(state, emojiSet) {
      state['emojiSet'] = emojiSet
      setLocalStorage('emojiSet', emojiSet)
    },
    setPrivacyMode(state, privacyMode) {
      state['privacyMode'] = privacyMode
      setLocalStorage('privacyMode', privacyMode)
    },
    setCacheMessages(state, cacheMessages) {
      state['cacheMessages'] = cacheMessages
      setLocalStorage('cacheMessages', cacheMessages)
    },
    addMessages(state, messages) {
      if (!state['messagesCache'][messages.id]) state['messagesCache'][messages.id] = []
      state['messagesCache'][messages.id] = messages.data
    },
    muteChat(state, chatId) {
      if (state.mutedChats.includes(chatId)) return
      state.mutedChats.push(chatId)
      setLocalStorage('mutedChats', state.mutedChats)
    },
    unmuteChat(state, chatId) {
      if (!state.mutedChats.includes(chatId)) return
      const index = state.mutedChats.indexOf(chatId)
      if (index > -1) {
        state.mutedChats.splice(index, 1)
      }
      setLocalStorage('mutedChats', state.mutedChats)
    },
    resetMessages(state) {
      state['messagesCache'] = []
    },
    setTyping(state, data) {
      state['isTyping'][data.chatId] = data.isTyping

      if (!data.isTyping) return
      if (state['isTypingTimer'][data.chatId]) clearTimeout(state['isTypingTimer'][data.chatId])

      state['isTypingTimer'][data.chatId] = setTimeout(() => {
        state['isTyping'][data.chatId] = false
      }, 60000)
    },
  },
  getters: {
    baseURI: state => {
      const scheme = state['ssl'] ? 'wss' : 'ws'
      return scheme + '://' + state['ipAddress'] + ':' + state['port'] + '?auth=' + state['password']
    },
    httpURI: state => {
      const scheme = state['ssl'] ? 'https' : 'http'
      return scheme + '://' + state['ipAddress'] + ':' + state['port']
    },
  },
  actions: {},
  modules: {},
})
