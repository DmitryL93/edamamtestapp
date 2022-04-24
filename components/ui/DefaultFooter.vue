<template lang="pug">
footer.default-footer
  .default-header__wrap
    .default-footer__copyright ©Copyright all rights reserved
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {}
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/';

.default-footer {
  @include space(padding, top, 1vw);
  @include space(padding, bottom, 1vw);
  background-color: map-get($color, primary-nav);

  &__wrap {
    @extend %container;
  }

  &__copyright {
    color: #fff;
    text-align: center;
  }
}
</style>
