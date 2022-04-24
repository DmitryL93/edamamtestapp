<template lang="pug">
div
  DefaultHeader
  Nuxt
  DefaultFooter
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DefaultHeader from '@/components/ui/DefaultHeader.vue'
import DefaultFooter from '@/components/ui/DefaultFooter.vue'

export default defineComponent({
  components: {
    DefaultHeader,
    DefaultFooter
  }
})
</script>
