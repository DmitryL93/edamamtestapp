import { Commit } from 'vuex'
import FoodApi from '@/composables/FoodApi'
import { EResponseStatus } from '@/enums/'
import IHints from '@/interfaces/api/FoodApi/response/parser/get/IHints'
import IFood from '@/interfaces/api/FoodApi/response/parser/get/IFood'

export const state = () => ({
  appVersion: '1.0.0' as string,
  appLoading: false as boolean,
  appCrashed: false as boolean,
  productsList: [] as Array<IHints>,
  productsListTitle: '' as string,
  productsListCurrentPage: 1 as number,
  productsListPageSize: 5 as number,
  filterSubmitted: false as boolean,
  filteredProductsList: [] as Array<IHints>,
  detailProduct: {} as IFood
})

export const getters = {
  getAppVersion(state: any): string {
    return state.version
  },
  getAppLoading(state: any): boolean {
    return state.appLoading
  },
  getAppCrashed(state: any): boolean {
    return state.appCrashed
  },
  getProductsList(state: any): Array<IHints> {
    return state.productsList
  },
  getProductsListTitle(state: any): string {
    return state.productsListTitle
  },
  getProductsListPageSize(state: any): number {
    return state.productsListPageSize
  },
  getProductsListCurrentPage(state: any): number {
    return state.productsListCurrentPage
  },
  getFilterSubmitted(state: any): boolean {
    return state.filterSubmitted
  },
  getFilteredProductsList(state: any): Array<IHints> {
    return state.filteredProductsList
  },
  getDetailProduct(state: any): IFood {
    return state.detailProduct
  }
}

export const mutations = {
  setAppLoading(state: any, flag: boolean): void {
    state.appLoading = flag
  },
  setAppCrashed(state: any, flag: boolean): void {
    state.appCrashed = flag
  },
  setProductsList(state: any, productsList: Array<IHints>): void {
    state.productsList = productsList
  },
  setProductsListTitle(state: any, productsListTitle: string) {
    state.productsListTitle = productsListTitle
  },
  setProductsListCurrentPage(state: any, page: number): void {
    state.productsListCurrentPage = page
  },
  setFilterSubmitted(state: any, flag: boolean): void {
    state.filterSubmitted = flag
  },
  setFilteredProductsList(state: any, filteredProductsList: Array<IHints>): void {
    state.filteredProductsList = filteredProductsList
  },
  setDetailProduct(state: any, detailProduct: IFood): void {
    state.detailProduct = detailProduct
  }
}

export const actions = {
  async requestFoodApiProductsList({ commit }: { commit: Commit }, ingr: string) {
    const response = await FoodApi.request(ingr)

    if (response.status === EResponseStatus.ok) {
      commit('setProductsList', response.data.hints)
      commit('setProductsListTitle', response.data?.parsed[0]?.food?.label || '')
    } else {
      commit('setAppCrashed', true)
    }
  }
}
