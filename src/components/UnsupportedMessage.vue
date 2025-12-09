<template>
  <div style="white-space: pre-wrap;padding: 6px 10px;margin-top:2px;">
    <div v-if="text && text.trim() !== ''" v-html="$filters.nativeEmoji(text)" v-linkified></div>
    <div v-else style="text-align:center;">
      <div style="font-weight:500;font-size:14px;">
        Unsupported Type
      </div>
      <div style="font-size:11px;margin-top:4px;">
        This message cannot be fully displayed by iOSMB Client.
      </div>
      <feather type="frown" style="height:24px;margin-top: 5px;" stroke="rgb(255,255,255)" size="16"></feather>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnsupportedMessage',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
