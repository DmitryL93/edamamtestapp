<template lang="pug">
header.default-header
  .default-header__wrap
    .default-header__logo 
      span edamam food and grocery
    form.default-header__search-form(@submit.prevent="searchProducts")
      input.default-header__input(
        type="text"
        placeholder="search for food"
        v-model="searchResult"
      )
      button.default-header__button(
        type="submit"
        :class="!searchResult ? 'default-header__button--disabled' : ''"
        :disabled="!searchResult ? true : false"
      )
        svg.default-header__icon(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24")
          path(d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z")
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const searchResult: Ref<string> = ref('apple')

    const startApp = async () => {
      store.commit('setAppLoading', true)
      await store.dispatch('requestFoodApiProductsList', searchResult.value)
      store.commit('setAppLoading', false)
    }

    startApp()

    const searchProducts = async () => {
      store.commit('setAppLoading', true)
      await store.dispatch('requestFoodApiProductsList', searchResult.value)
      store.commit('setAppLoading', false)
    }

    return {
      searchResult,
      searchProducts
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/';

.default-header {
  @include space(padding, top, 1vw);
  @include space(padding, bottom, 1vw);
  background-color: map-get($color, primary-nav);

  &__wrap {
    @extend %container;
    @include grid(2, 1vw);
  }

  &__logo {
    @include flex(flex-start, center);

    span {
      @include size(font, 1.5vw);
      color: #fff;
      text-transform: uppercase;
      font-weight: 700;
    }

    @media (max-width: map-get($breakpoints, tablet)) {
      text-align: center;
    }
  }

  &__search-form {
    @include flex(flex-end, center, row, 1vw);

    @media (max-width: map-get($breakpoints, tablet)) {
      @include flex(center, center, row, 1vw);
    }
  }

  &__input {
    @extend %input;
  }

  &__button {
    @extend %button;
    @extend %button--active;
    @include space(padding, all, 0.62vw);
    @include space(padding, left, 1vw);
    @include space(padding, right, 1vw);

    &--disabled {
      @extend %button--disabled;
    }
  }

  &__icon {
    @include size(height, 1vw);
    fill: #fff;
  }

  &__link {
    color: #fff;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &--selected {
      text-decoration: underline;
    }
  }
}
</style>
