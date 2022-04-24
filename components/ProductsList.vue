<template lang="pug">
section.products-list
  h1.products-list__title(v-if="!productsList.length || !productsListToShow.length") Products not found...
  .products-list__title-wrap(v-if="productsList.length && productsListToShow.length")
    h1.products-list__title {{ productsListTitle }}
    .products-list__wrap-types
      button.products-list__wrap-type(
        wrap-type="plates"
        :class="productsWrapType === 'plates' ? 'products-list__wrap-type--active' : ''"
        @click="toggleWrapType($event)"
      )
        svg(wrap-type="plates" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50")
          g(transform="translate(-376 -117)")
            rect(wrap-type="plates" width="12" height="12" transform="translate(376 117)")
            rect(wrap-type="plates" width="12" height="12" transform="translate(376 136)")
            rect(wrap-type="plates" width="12" height="12" transform="translate(376 155)")
            rect(wrap-type="plates" width="12" height="12" transform="translate(395 117)")
            rect(wrap-type="plates" width="12" height="12" transform="translate(395 136)")
            rect(wrap-type="plates" width="12" height="12" transform="translate(395 155)")
            rect(wrap-type="plates" width="12" height="12" transform="translate(414 117)")
            rect(wrap-type="plates" width="12" height="12" transform="translate(414 136)")
            rect(wrap-type="plates" width="12" height="12" transform="translate(414 155)")
      button.products-list__wrap-type(
        wrap-type="rows"
        :class="productsWrapType === 'rows' ? 'products-list__wrap-type--active' : ''"
        @click="toggleWrapType($event)"
      )
        svg(wrap-type="rows" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50")
          g(transform="translate(-456 -117)")
            rect(wrap-type="rows" width="12" height="12" transform="translate(456 117)")
            rect(wrap-type="rows" width="12" height="12" transform="translate(456 136)")
            rect(wrap-type="rows" width="12" height="12" transform="translate(456 155)")
            rect(wrap-type="rows" width="31" height="12" transform="translate(475 117)")
            rect(wrap-type="rows" width="31" height="12" transform="translate(475 136)")
            rect(wrap-type="rows" width="31" height="12" transform="translate(475 155)")
  .products-list__wrap(
    v-if="productsList.length"
    :class="productsWrapType === 'plates' ? 'products-list__wrap--plates' : 'products-list__wrap--rows'"
  )
    .products-list__card(
      v-for="(product, index) in productsListToShow" :key="index"
      :class="productsWrapType === 'plates' ? 'products-list__card--plates' : 'products-list__card--rows'"
    )
      img.products-list__image(v-if="product.food.image" :src="product.food.image")
      svg.products-list__image-icon(v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24")
        path(d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z")
      table.products-list__table(v-if="productsWrapType === 'rows'")
        tbody
          tr(v-for="(details, key) in product.food" :key="key")
            td(v-if="key === 'category' || key === 'label' || key === 'categoryLabel'") {{ key }}
            td(v-if="key === 'category' || key === 'label' || key === 'categoryLabel'") {{ details }}
          tr(v-for="(nutrient, key) in product.food.nutrients" :key="key")
            td {{ key }}
            td {{ nutrient }}
      h4.products-list__card-title(v-if="productsWrapType === 'plates'") {{ product.food.label }}
      button.products-list__detail-button(
        v-if="productsWrapType === 'plates'"
        :product-id="product.food.foodId" @click="[toggleDetailModal(), selectDetailProduct($event)]"
      ) show details
  ProductDetails(
    :state="detailModalFlag"
    @close="toggleDetailModal"
  )
  Pagination(
    v-if="productsList.length"
    :state="paginationFlag"
    :current-page="currentPage"
    :total-pages="totalPages"
    @firstPage="selectFirstPage"
    @selectPage="selectPage($event)"
    @lastPage="selectLastPage"
  )
</template>

<script lang="ts">
import {
  defineComponent,
  Ref,
  ref,
  ComputedRef,
  computed,
  useStore,
  watch
} from '@nuxtjs/composition-api'
import ProductDetails from '@/components/ProductDetails.vue'
import Pagination from '@/components/ui/Pagination.vue'
import IHints from '@/interfaces/api/FoodApi/response/parser/get/IHints'
import { EProductsWrapType } from '@/enums/'

export default defineComponent({
  components: {
    ProductDetails,
    Pagination
  },
  setup() {
    const store = useStore()
    const appLoading: ComputedRef<boolean> = computed(() => store.getters.getAppLoading)
    const productsList: ComputedRef<IHints[]> = computed(() => store.getters.getProductsList)

    const filterSubmitted: ComputedRef<boolean> = computed(() => store.getters.getFilterSubmitted)
    const productsWrapType: Ref<EProductsWrapType> = ref(EProductsWrapType.plates)
    const filteredProductsList: ComputedRef<IHints[]> = computed(
      () => store.getters.getFilteredProductsList
    )
    const productsListToShow: ComputedRef<IHints[]> = computed(() => {
      const result = []

      if (filterSubmitted.value) {
        for (let i = 0; i < store.getters.getFilteredProductsList.length; i++) {
          if (i >= startOffset.value && i <= endOffset.value) {
            result.push(store.getters.getFilteredProductsList[i])
          }
        }
      } else {
        for (let i = 0; i < store.getters.getProductsList.length; i++) {
          if (i >= startOffset.value && i <= endOffset.value) {
            result.push(store.getters.getProductsList[i])
          }
        }
      }

      return result
    })

    const productsListTitle: ComputedRef<string> = computed(
      () => store.getters.getProductsListTitle
    )
    const paginationFlag: Ref<boolean> = ref(true)
    const currentPage: ComputedRef<number> = computed(
      () => store.getters.getProductsListCurrentPage
    )
    const totalPages: ComputedRef<number> = computed(() => {
      const pages = Math.ceil(
        filterSubmitted.value
          ? filteredProductsList.value.length / store.getters.getProductsListPageSize
          : productsList.value.length / store.getters.getProductsListPageSize
      )

      if (pages > 1) {
        paginationFlag.value = true
      } else {
        paginationFlag.value = false
        return 1
      }

      return pages
    })
    const startOffset: ComputedRef<number> = computed(
      () => endOffset.value - store.getters.getProductsListPageSize
    )
    const endOffset: ComputedRef<number> = computed(() => {
      if (filterSubmitted.value) {
        if (filteredProductsList.value.length < store.getters.getProductsListPageSize) {
          return filteredProductsList.value.length
        } else if (filteredProductsList.value.length >= store.getters.getProductsListPageSize) {
          if (
            filteredProductsList.value.length <
            store.getters.getProductsListPageSize * currentPage.value
          ) {
            return filteredProductsList.value.length
          } else {
            return store.getters.getProductsListPageSize * currentPage.value
          }
        }
      } else {
        if (productsList.value.length < store.getters.getProductsListPageSize) {
          return productsList.value.length
        } else if (productsList.value.length >= store.getters.getProductsListPageSize) {
          if (
            productsList.value.length <
            store.getters.getProductsListPageSize * currentPage.value
          ) {
            return productsList.value.length
          } else {
            return store.getters.getProductsListPageSize * currentPage.value
          }
        }

        throw new Error('invalid endOffset!')
      }

      throw new Error('invalid endOffset!')
    })
    const detailModalFlag: Ref<boolean> = ref(false)

    const selectFirstPage = (): void => {
      store.commit('setProductsListCurrentPage', 1)
    }

    const selectPage = (event: any) => {
      store.commit('setProductsListCurrentPage', parseInt(event.target.getAttribute('page')))
    }

    const selectLastPage = (): void => {
      store.commit('setProductsListCurrentPage', totalPages.value)
    }

    const toggleWrapType = (event: any): void => {
      productsWrapType.value = event.target.getAttribute('wrap-type')
    }

    const toggleDetailModal = (): void => {
      detailModalFlag.value = !detailModalFlag.value

      if (process.browser && detailModalFlag.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }

    const selectDetailProduct = (event: any): void => {
      for (let i = 0; i < productsList.value.length; i++) {
        if (productsList.value[i].food.foodId === event.target.getAttribute('product-id')) {
          store.commit('setDetailProduct', productsList.value[i])
        }
      }
    }

    watch(appLoading, currentValue => {
      if (currentValue) {
        store.commit('setProductsListCurrentPage', 1)
      }
    })

    watch(filterSubmitted, currentValue => {
      if (!currentValue) {
        store.commit('setProductsListCurrentPage', 1)
      }
    })

    return {
      productsWrapType,
      toggleWrapType,
      productsListTitle,
      productsList,
      productsListToShow,
      paginationFlag,
      currentPage,
      totalPages,
      selectFirstPage,
      selectPage,
      selectLastPage,
      detailModalFlag,
      toggleDetailModal,
      selectDetailProduct
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/';

.products-list {
  @include flex(center, center, column, 1vw);

  &__title-wrap {
    @include flex(space-between);
    width: 100%;
  }

  &__title {
    @extend %title;
    @include size(font, 2vw);
  }

  &__wrap-types {
    @include flex(flex-end, center, row, 0.5vw);
    align-self: flex-end;
  }

  &__wrap-type {
    background: transparent;
    border: none;
    margin: 0;
    padding: 0;

    svg {
      @include size(height, 1.25vw);
      fill: map-get($color, disabled-nav);
      transition: $transition;
      cursor: pointer;

      &:hover {
        fill: map-get($color, primary-nav);
        transition: $transition;
      }
    }

    &--active {
      svg {
        fill: map-get($color, primary-nav);
      }
    }
  }

  &__wrap {
    width: 100%;

    &--plates {
      @include grid(3, 1vw);
    }

    &--rows {
      @include grid(1, 1vw);
    }
  }

  &__card {
    @extend %card;

    &--plates {
      @include flex(center, center, column, 1vw);
    }

    &--rows {
      @include flex(center, center, row, 1vw);

      @media (max-width: map-get($breakpoints, tablet)) {
        @include flex(center, center, column, 1vw);
      }
    }
  }

  &__image {
    @include size(width, 15vw);
  }

  &__image-icon {
    @include size(width, 15vw);
    fill: map-get($color, primary-nav);
  }

  &__table {
    @extend %table;
    align-self: flex-start;
  }

  &__card-title {
    @extend %title;
    text-align: center;
  }

  &__info {
    align-self: flex-start;
  }

  &__detail-button {
    @extend %button;
  }
}
</style>
