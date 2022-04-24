<template lang="pug">
nav.pagination(v-if="state")
  .pagination__button-wrap
    button.pagination__button(
      @click="$emit('firstPage')"
    )
      | &laquo;
    button(
      v-for="(_, i) in totalPages"
      v-if="(i + 1) === (currentPage - 1) || (i + 1) === currentPage || (i + 1) === (currentPage + 1)"
      :page="i + 1"
      :class="(i + 1) === currentPage ? 'pagination__button pagination__button--active' : 'pagination__button'"
      @click="$emit('selectPage', $event)"
    ) {{ i + 1 }}
    button.pagination__button(
      @click="$emit('lastPage')"
    )
      | &raquo;
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    state: {
      type: Boolean,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['firstPage', 'selectPage', 'lastPage']
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/';
.pagination {
  &__button {
    &-wrap {
      @include flex(center, center, row, 0.15vw);
      @include space(margin, bottom, 1vw);
    }

    @extend %button;
    @include space(padding, all, 0.5vw);
    @include size(border-width, 0.15vw);
    border-color: map-get($color, disabled-nav);
    border-radius: 0;
    background-color: transparent;
    color: map-get($color, primary-nav);

    &--active {
      border-color: map-get($color, primary-nav);
      background-color: map-get($color, primary-nav);
      color: #fff;

      svg {
        fill: #fff;
      }
    }

    &:hover {
      border-color: map-get($color, primary-nav);
      background-color: map-get($color, primary-nav);
      color: #fff;

      svg {
        fill: #fff;
      }
    }
  }

  &__info {
    @include flex(center, center, row, 2vw);

    @media (max-width: map-get($breakpoints, mobile)) {
      @include flex(center, center, column, 1vw);
    }
  }
}
</style>
