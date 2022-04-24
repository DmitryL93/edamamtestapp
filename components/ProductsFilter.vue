<template lang="pug">
aside.products-filter
  form.products-filter__form(@submit.prevent="applyFilter")
    .products-filter__title Nutrients filter
    .products-filter__input-group
      label.products-filter__label(
        :class="filledInputsGroup === 'ENERC_KCAL' || filledInputsGroup === 'default' ? '' : 'products-filter__label--disabled'"
      ) ENERC_KCAL
      input.products-filter__input(
        type="number"
        placeholder="from"
        step="0.01"
        range="from"
        group-name="ENERC_KCAL"
        @input="defineFilledInputGroup($event)"
        :class="filledInputsGroup === 'ENERC_KCAL' || filledInputsGroup === 'default' ? '' : 'products-filter__input--disabled'"
        :disabled="filledInputsGroup === 'ENERC_KCAL' || filledInputsGroup === 'default' ? false : true"
        v-model="filter.ENERC_KCAL.from"
      )
      input.products-filter__input(
        type="number"
        placeholder="to"
        step="0.01"
        range="to"
        group-name="ENERC_KCAL"
        @input="defineFilledInputGroup($event)"
        :class="filledInputsGroup === 'ENERC_KCAL' || filledInputsGroup === 'default' ? '' : 'products-filter__input--disabled'"
        :disabled="filledInputsGroup === 'ENERC_KCAL' || filledInputsGroup === 'default' ? false : true"
        v-model="filter.ENERC_KCAL.to"
      )
    .products-filter__input-group
      label.products-filter__label(
        :class="filledInputsGroup === 'PROCNT' || filledInputsGroup === 'default' ? '' : 'products-filter__label--disabled'"
      ) PROCNT
      input.products-filter__input(
        type="number"
        placeholder="from"
        step="0.01"
        range="from"
        group-name="PROCNT"
        @input="defineFilledInputGroup($event)"
        :class="filledInputsGroup === 'PROCNT' || filledInputsGroup === 'default' ? '' : 'products-filter__input--disabled'"
        :disabled="filledInputsGroup === 'PROCNT' || filledInputsGroup === 'default' ? false : true"
        v-model="filter.PROCNT.from"
      )
      input.products-filter__input(
        type="number"
        placeholder="to"
        step="0.01"
        range="to"
        group-name="PROCNT"
        @input="defineFilledInputGroup($event)"
        :class="filledInputsGroup === 'PROCNT' || filledInputsGroup === 'default' ? '' : 'products-filter__input--disabled'"
        :disabled="filledInputsGroup === 'PROCNT' || filledInputsGroup === 'default' ? false : true"
        v-model="filter.PROCNT.to"
      )
    .products-filter__input-group
      label.products-filter__label(
        :class="filledInputsGroup === 'FAT' || filledInputsGroup === 'default' ? '' : 'products-filter__label--disabled'"
      ) FAT
      input.products-filter__input(
        type="number"
        placeholder="from"
        step="0.01"
        range="from"
        group-name="FAT"
        @input="defineFilledInputGroup($event)"
        :class="filledInputsGroup === 'FAT' || filledInputsGroup === 'default' ? '' : 'products-filter__input--disabled'"
        :disabled="filledInputsGroup === 'FAT' || filledInputsGroup === 'default' ? false : true"
        v-model="filter.FAT.from"
      )
      input.products-filter__input(
        type="number"
        placeholder="to"
        step="0.01"
        range="to"
        group-name="FAT"
        @input="defineFilledInputGroup($event)"
        :class="filledInputsGroup === 'FAT' || filledInputsGroup === 'default' ? '' : 'products-filter__input--disabled'"
        :disabled="filledInputsGroup === 'FAT' || filledInputsGroup === 'default' ? false : true"
        v-model="filter.FAT.to"
      )
    .products-filter__input-group
      label.products-filter__label(
        :class="filledInputsGroup === 'CHOCDF' || filledInputsGroup === 'default' ? '' : 'products-filter__label--disabled'"
      ) CHOCDF
      input.products-filter__input(
        type="number"
        placeholder="from"
        step="0.01"
        range="from"
        group-name="CHOCDF"
        @input="defineFilledInputGroup($event)"
        :class="filledInputsGroup === 'CHOCDF' || filledInputsGroup === 'default' ? '' : 'products-filter__input--disabled'"
        :disabled="filledInputsGroup === 'CHOCDF' || filledInputsGroup === 'default' ? false : true"
        v-model="filter.CHOCDF.from"
      )
      input.products-filter__input(
        type="number"
        placeholder="to"
        step="0.01"
        range="to"
        group-name="CHOCDF"
        @input="defineFilledInputGroup($event)"
        :class="filledInputsGroup === 'CHOCDF' || filledInputsGroup === 'default' ? '' : 'products-filter__input--disabled'"
        :disabled="filledInputsGroup === 'CHOCDF' || filledInputsGroup === 'default' ? false : true"
        v-model="filter.CHOCDF.to"
      )
    .products-filter__input-group
      label.products-filter__label(
        :class="filledInputsGroup === 'FIBTG' || filledInputsGroup === 'default' ? '' : 'products-filter__label--disabled'"
      ) FIBTG
      input.products-filter__input(
        type="number"
        placeholder="from"
        step="0.01"
        range="from"
        group-name="FIBTG"
        @input="defineFilledInputGroup($event)"
        :class="filledInputsGroup === 'FIBTG' || filledInputsGroup === 'default' ? '' : 'products-filter__input--disabled'"
        :disabled="filledInputsGroup === 'FIBTG' || filledInputsGroup === 'default' ? false : true"
        v-model="filter.FIBTG.from"
      )
      input.products-filter__input(
        type="number"
        placeholder="to"
        step="0.01"
        range="to"
        group-name="FIBTG"
        @input="defineFilledInputGroup($event)"
        :class="filledInputsGroup === 'FIBTG' || filledInputsGroup === 'default' ? '' : 'products-filter__input--disabled'"
        :disabled="filledInputsGroup === 'FIBTG' || filledInputsGroup === 'default' ? false : true"
        v-model="filter.FIBTG.to"
      )
    .products-filter__error(v-if="errorFlag") {{ errorMessage }}
    .products-filter__button-group
      button.products-filter__button(type="submit") apply
      button.products-filter__button(type="button" @click="resetFilter") reset
</template>

<script lang="ts">
import {
  defineComponent,
  ComputedRef,
  computed,
  Ref,
  ref,
  useStore,
  watch
} from '@nuxtjs/composition-api'
import IHints from '@/interfaces/api/FoodApi/response/parser/get/IHints'
import IFilter from '@/interfaces/components/IFilter'

export default defineComponent({
  setup() {
    const store = useStore()
    const appLoading: ComputedRef<boolean> = computed(() => store.getters.getAppLoading)
    const productList: ComputedRef<IHints[]> = computed(() => store.getters.getProductsList)
    const filter: Ref<IFilter> = ref({
      ENERC_KCAL: {
        from: null,
        to: null
      },
      PROCNT: {
        from: null,
        to: null
      },
      FAT: {
        from: null,
        to: null
      },
      CHOCDF: {
        from: null,
        to: null
      },
      FIBTG: {
        from: null,
        to: null
      }
    })
    const filledInputsGroup: Ref<string> = ref('default')
    const errorFlag: Ref<boolean> = ref(false)
    const errorMessage: Ref<string> = ref('')

    const defineFilledInputGroup = (event: any) => {
      if (event.target.getAttribute('range') === 'from') {
        if (!event.target.value && event.target.nextElementSibling.value) {
          filledInputsGroup.value = event.target.getAttribute('group-name')
        } else if (event.target.value && !event.target.nextElementSibling.value) {
          filledInputsGroup.value = event.target.getAttribute('group-name')
        } else if (!event.target.value && !event.target.nextElementSibling.value) {
          filledInputsGroup.value = 'default'
        }
      } else if (event.target.getAttribute('range') === 'to') {
        if (!event.target.value && event.target.previousElementSibling.value) {
          filledInputsGroup.value = event.target.getAttribute('group-name')
        } else if (event.target.value && !event.target.previousElementSibling.value) {
          filledInputsGroup.value = event.target.getAttribute('group-name')
        } else if (!event.target.value && !event.target.previousElementSibling.value) {
          filledInputsGroup.value = 'default'
        }
      }
    }

    const validateFilter = (): boolean => {
      const filterCopy: any = { ...filter.value }

      for (const key in filterCopy) {
        if (filterCopy[key]) {
          return true
        }
      }

      return false
    }

    const applyFilter = () => {
      const productsListCopy: any = [...productList.value]
      const filterCopy: any = { ...filter.value }
      const filteredProductsList: IHints[] = []

      if (validateFilter()) {
        errorFlag.value = false
        errorMessage.value = ''
        store.commit('setFilterSubmitted', true)

        for (let i = 0; i < productsListCopy.length; i++) {
          for (const nutrientKey in productsListCopy[i].food.nutrients) {
            for (const filterKey in filterCopy) {
              for (const _ in filterCopy[filterKey]) {
                if (nutrientKey === filterKey) {
                  if (filterCopy[filterKey].from && filterCopy[filterKey].to) {
                    if (
                      parseFloat(productsListCopy[i].food.nutrients[nutrientKey]) >=
                        parseFloat(filterCopy[filterKey].from) &&
                      parseFloat(productsListCopy[i].food.nutrients[nutrientKey]) <=
                        parseFloat(filterCopy[filterKey].to)
                    ) {
                      filteredProductsList.push(productsListCopy[i])
                    }
                  } else if (filterCopy[filterKey].from && !filterCopy[filterKey].to) {
                    if (
                      parseFloat(productsListCopy[i].food.nutrients[nutrientKey]) >=
                      parseFloat(filterCopy[filterKey].from)
                    ) {
                      filteredProductsList.push(productsListCopy[i])
                    }
                  } else if (!filterCopy[filterKey].from && filterCopy[filterKey].to) {
                    if (
                      parseFloat(productsListCopy[i].food.nutrients[nutrientKey]) <=
                      parseFloat(filterCopy[filterKey].to)
                    ) {
                      filteredProductsList.push(productsListCopy[i])
                    }
                  }
                }
              }
            }
          }
        }

        store.commit('setFilteredProductsList', [...new Set(filteredProductsList)])
        store.commit('setProductsListCurrentPage', 1)
      } else {
        errorFlag.value = true
        errorMessage.value = 'fill at least one input'
      }
    }

    const resetFilter = () => {
      filter.value = {
        ENERC_KCAL: {
          from: null,
          to: null
        },
        PROCNT: {
          from: null,
          to: null
        },
        FAT: {
          from: null,
          to: null
        },
        CHOCDF: {
          from: null,
          to: null
        },
        FIBTG: {
          from: null,
          to: null
        }
      }

      filledInputsGroup.value = 'default'
      store.commit('setFilterSubmitted', false)
      store.commit('setFilteredProductsList', [])
    }

    watch(appLoading, currentValue => {
      if (currentValue) {
        resetFilter()
      }
    })

    return {
      filledInputsGroup,
      defineFilledInputGroup,
      filter,
      errorFlag,
      errorMessage,
      applyFilter,
      resetFilter
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/';

.products-filter {
  &__form {
    @extend %card;
    @include flex(center, center, column, 1vw);
  }

  &__title {
    @extend %title;
    text-align: center;
  }

  &__input-group {
    @include flex(center, flex-start, column, 0.5vw);
    align-self: flex-start;

    @media (max-width: map-get($breakpoints, tablet)) {
      align-self: center;
    }
  }

  &__label {
    &--disabled {
      opacity: 0.35;
    }
  }

  &__input {
    @extend %input;

    &--disabled {
      @extend %input--disabled;
      opacity: 0.35;
    }
  }

  &__error {
    color: map-get($color, error-nav);
    text-align: center;
  }

  &__button-group {
    @include flex(center, center, row, 1vw);
  }

  &__button {
    @extend %button;
  }
}
</style>
