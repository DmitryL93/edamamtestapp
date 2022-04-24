<template lang="pug">
transition(name="fade" mode="out-in")
  .modal(v-if="state")
    .modal__content
      button.modal__x(@click="$emit('close')")
        svg(@click="$emit('close')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24")
          path(@click="$emit('close')" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z")
      slot
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    state: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close']
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/';

.modal {
  @extend %modal;
  overflow: auto;

  &__content {
    @extend %card;
    position: relative;
    margin: 0 auto;
    @include space(margin, top, 3vw);
    @include space(margin, bottom, 3vw);
    width: 40vw;

    @media (max-width: map-get($breakpoints, tablet)) {
      width: 90%;
    }
  }

  &__x {
    background: transparent;
    border: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: -1vw;
    right: -1vw;
    cursor: pointer;

    @media (max-width: map-get($breakpoints, tablet)) {
      display: none;
    }

    svg {
      @include size(height, 1vw);
      fill: rgba(255, 255, 255, 0.6);
      transition: $transition;

      @media (max-width: map-get($breakpoints, tablet)) {
        top: calc(-1vw * $tablet-ratio);
        right: calc(-1vw * $tablet-ratio);
      }

      @media (max-width: map-get($breakpoints, mobile)) {
        top: calc(-1vw * $mobile-ratio);
        right: calc(-1vw * $mobile-ratio);
      }

      &:hover {
        fill: rgba(255, 255, 255, 0.8);
        transition: $transition;
      }
    }
  }
}
</style>
