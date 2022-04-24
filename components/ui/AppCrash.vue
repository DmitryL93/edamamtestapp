<template lang="pug">
.app-crash(v-if="appCrashed")
  .app-crash__content
    .app-crash__icon
      svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24")
        path(d="M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-1.402 16.945l-3.554-3.521-3.518 3.568-1.418-1.418 3.507-3.566-3.586-3.472 1.418-1.417 3.581 3.458 3.539-3.583 1.431 1.431-3.535 3.568 3.566 3.522-1.431 1.43z")
    .app-crash__info Application crashed!#[br]Please reload page
</template>

<script lang="ts">
import { defineComponent, ComputedRef, computed, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const appCrashed: ComputedRef<boolean> = computed(() => store.getters.getAppCrashed)

    return {
      appCrashed
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/';

.app-crash {
  @extend %modal;
  @include flex();
  background-color: #fff;
  z-index: 100;

  &__content {
    @include flex(center, center, column, 2vw);
  }

  &__icon {
    svg {
      @include size(height, 8vw);
      fill: map-get($color, error-nav);
    }
  }

  &__info {
    @extend %title;
    @include size(font, 2vw);
    text-align: center;
    color: map-get($color, error-nav);
  }
}
</style>
