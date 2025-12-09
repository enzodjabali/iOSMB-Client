<template>
  <div
    class="expandable-image"
    :class="{
      expanded: expanded,
      nostyle: $store.state.macstyle,
    }"
    ref="this"
  >
    <template v-if="loadedImage">
      <i v-if="!expanded" class="expand-button" @click="expandImage">
        <feather type="maximize-2" stroke="#fff" size="24"></feather>
      </i>
      <i v-if="!expanded" class="download-button" @click="download">
        <feather type="download" stroke="#fff" size="24"></feather>
      </i>
    </template>
    <img v-if="convertedImageUrl" crossorigin="anonymous" :id="guid" :src="convertedImageUrl" @load="handleLoad" />
    <lazy-image v-else-if="!isConverting" crossorigin="anonymous" :id="guid" :src="url" @load="handleLoad" @error="handleError" :download="path.split('/').pop()" />
    <div v-if="isConverting" class="image-converting">
      <feather type="loader" stroke="rgb(150,150,150)" size="48" class="spin"></feather>
      <div style="margin-top: 12px; font-size: 12px; color: rgb(150,150,150);">
        Converting HEIC image...
      </div>
    </div>
  </div>
</template>

<script>
import heic2any from 'heic2any'

export default {
  props: {
    path: {
      type: String,
    },
    type: {
      type: String,
    },
    loadedData: {
      type: Function,
    },
    guid: {
      type: String,
    },
  },
  data() {
    return {
      expanded: false,
      loadedImage: false,
      imageError: false,
      isConverting: false,
      convertedImageUrl: null,
      cloned: null,
    }
  },
  computed: {
    url() {
      return (
        `${this.$store.getters.httpURI}/attachments?path=${encodeURIComponent(this.path)}&type=${encodeURIComponent(
          this.type
        )}&auth=${encodeURIComponent(this.$store.state.password)}` + (this.$store.state.transcode ? '&transcode=1' : '')
      )
    },
  },
  mounted() {
    document.addEventListener('keydown', this.closeImage)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.closeImage)
    // Clean up object URL to prevent memory leaks
    if (this.convertedImageUrl) {
      URL.revokeObjectURL(this.convertedImageUrl)
    }
  },
  methods: {
    closeImage(event) {
      event.stopPropagation()
      if (!this.cloned) return

      this.$nextTick(() => {
        this.cloned.style.opacity = 0
        this.cloned.removeEventListener('touchmove', this.freezeVp, false)
        this.cloned.removeEventListener('click', this.onExpandedImageClick)
        setTimeout(() => {
          this.cloned.remove()
          this.cloned = null
          this.expanded = false
        }, 250)
      })
    },
    expandImage() {
      this.expanded = true

      this.$nextTick(() => {
        this.cloned = this.$el.cloneNode(true)
        document.body.appendChild(this.cloned)
        $(this.cloned).addClass('expanded')
        this.cloned.addEventListener('touchmove', this.freezeVp, false)
        this.cloned.addEventListener('click', this.onExpandedImageClick)
        setTimeout(() => (this.cloned.style.opacity = 1), 10)
      })
    },
    freezeVp(e) {
      e.preventDefault()
    },
    onExpandedImageClick(e) {
      this.closeImage(e)
    },
    download() {
      const a = document.createElement('a')
      a.download = this.type
      a.href = this.url
      document.body.appendChild(a)
      a.click()
      a.remove()
    },
    handleLoad() {
      this.$nextTick(this.loadedData)
      this.loadedImage = true
      this.imageError = false
      this.isConverting = false
    },
    async handleError() {
      // Check if it might be a HEIC image
      const isHeic = this.path.toLowerCase().endsWith('.heic') || 
                     this.path.toLowerCase().endsWith('.heif') || 
                     this.type.toLowerCase().includes('heic') || 
                     this.type.toLowerCase().includes('heif')
      
      if (isHeic) {
        await this.convertHeicImage()
      } else {
        this.imageError = true
        this.loadedImage = false
        this.$nextTick(this.loadedData)
      }
    },
    async convertHeicImage() {
      try {
        this.isConverting = true
        
        // Fetch the HEIC image as a blob (without transcode param for client-side conversion)
        const urlWithoutTranscode = this.url.replace(/&transcode=1/, '')
        const response = await fetch(urlWithoutTranscode)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status}`)
        }
        
        const blob = await response.blob()
        
        // Check if it's actually a HEIC file
        if (!blob.type.includes('heic') && !blob.type.includes('heif') && blob.type !== 'application/octet-stream') {
          // If server already converted it, just use it
          this.convertedImageUrl = URL.createObjectURL(blob)
          this.isConverting = false
          return
        }
        
        // Convert HEIC to JPEG
        const convertedBlob = await heic2any({
          blob: blob,
          toType: 'image/jpeg',
          quality: 0.9
        })
        
        // Create an object URL for the converted image
        this.convertedImageUrl = URL.createObjectURL(Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob)
        this.isConverting = false
      } catch (error) {
        console.warn('HEIC conversion failed, image may not be displayable:', error.message)
        this.isConverting = false
        this.imageError = true
        this.$nextTick(this.loadedData)
      }
    },
  },
}
</script>

<style lang="scss">
.expandable-image {
  position: relative;
  transition: 0.25s opacity;

  &.nostyle {
    border-radius: 10px;
  }
}
.image-error,
.image-converting {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-align: center;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.spin {
  animation: spin 1s linear infinite;
}
body > .expandable-image.expanded {
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  opacity: 0;
  padding-bottom: 0 !important;
  cursor: default;
}
body > .expandable-image.expanded > img {
  width: auto;
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  margin: 0 auto;
}
.expand-button .feather,
.download-button .feather {
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
}
.expand-button,
.download-button {
  position: absolute;
  z-index: 999;
  right: 10px;
  top: 10px;
  padding: 0px;
  align-items: center;
  justify-content: center;
  padding: 3px;
  opacity: 0;
  transition: 0.2s opacity;
}
.download-button {
  top: auto;
  bottom: 10px;
}
.expandable-image:hover .expand-button,
.expandable-image:hover .download-button {
  opacity: 1;
  cursor: pointer;
}
.expandable-image img {
  width: 100%;
}
</style>
