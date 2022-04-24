<template lang="pug">
main.main-page
  .main-page__grid
    ProductsFilter
    ProductsList
  Loader
  AppCrash
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ProductsFilter from '@/components/ProductsFilter.vue'
import ProductsList from '@/components/ProductsList.vue'
import Loader from '@/components/ui/Loader.vue'
import AppCrash from '@/components/ui/AppCrash.vue'

export default defineComponent({
  components: {
    ProductsFilter,
    ProductsList,
    Loader,
    AppCrash
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/';

.main-page {
  @include space(margin, top, 2vw);
  @include space(margin, bottom, 2vw);

  &__grid {
    @extend %container;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 4vw;

    @media (max-width: map-get($breakpoints, tablet)) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
