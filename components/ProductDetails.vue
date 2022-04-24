<template lang="pug">
Modal(
  :state="state"
  @close="$emit('close')"
)
  .product-details
    table.product-details__table
      tbody
        tr(v-for="(details, key) in productDetails.food" :key="key")
          td(v-if="key === 'category' || key === 'label' || key === 'categoryLabel'") {{ key }}
          td(v-if="key === 'category' || key === 'label' || key === 'categoryLabel'") {{ details }}
        tr(v-for="(nutrient, key) in productNutrients" :key="key")
          td {{ key }}
          td {{ nutrient }}
    button.product-details__button(@click="$emit('close')") close
</template>

<script lang="ts">
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api'
import Modal from '@/components/ui/Modal.vue'

export default defineComponent({
  components: {
    Modal
  },
  props: {
    state: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup() {
    const store = useStore()
    const productDetails = computed(() => store.getters.getDetailProduct)
    const productNutrients = computed(() => {
      const productDetailsCopy = { ...productDetails.value.food }

      if ('nutrients' in productDetailsCopy) {
        return productDetailsCopy.nutrients
      }

      return {}
    })

    return {
      productDetails,
      productNutrients
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/';
.product-details {
  @include flex(center, center, column, 1vw);

  &__table {
    @extend %table;
  }

  &__button {
    @extend %button;
  }
}
</style>
