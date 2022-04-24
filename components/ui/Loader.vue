<template lang="pug">
transition(name="fade")
  .loader-overlay(v-if="appLoading")
    .loader
</template>

<script lang="ts">
import { defineComponent, useStore, ComputedRef, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const appLoading: ComputedRef<boolean> = computed(() => store.getters.getAppLoading)

    return { appLoading }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/';

.loader-overlay {
  @include flex();
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}

.loader {
  @include size(width, 8vw);
  @include size(height, 8vw);
  @include size(border-width, 0.75vw);
  border-radius: 50%;
  border-style: solid;
  border-color: map-get($color, primary-nav) transparent map-get($color, primary-nav) transparent;
  animation: loader 1.5s linear infinite;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
