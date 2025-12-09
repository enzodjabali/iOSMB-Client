import { reactive, computed } from 'vue'
import type { Router } from 'vue-router'

type Nullable<T> = T | null

let router: Nullable<Router> = null

export const state = reactive({
  status: 0,
  win: null as any,
  maximized: false,
  updateReady: false,
  newUpdate: false,
  connected: false
})

export function closeWindow(): void {
  // Web version: close tab/window if allowed
  window.close()
}

export function minimizeWindow(): void {
  // Web version: no-op (browsers don't allow minimizing)
  console.log('Minimize not supported in web version')
}

export function maximizeWindow(): void {
  // Web version: no-op (browsers don't allow window control)
  console.log('Maximize not supported in web version')
}

export function restart(): void {
  // Web version: reload the page
  window.location.reload()
}

export function setConnected(isConnected: boolean): void {
  state.connected = isConnected
}

export const statusColor = computed(() => {
  if (state.connected) {
    return 'rgb(50, 215, 75)'
  }
  return 'rgb(255, 69, 58)'
})

export const statusText = computed(() => {
  if (state.connected) {
    return 'Connected'
  }
  return 'Disconnected'
})

export function initWindow(r: Router): void {
  router = r
  console.log('Web version: window initialized')
}

export const process = {
  platform: 'web'
}

export const win = computed(() => state.win)

export default function () {
  return {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restart,
    setConnected,
    statusColor,
    statusText,
    win,
    process,
    state
  }
}
