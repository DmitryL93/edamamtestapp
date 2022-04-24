import IFood from '@/interfaces/api/FoodApi/response/parser/get/IFood'

export default interface IHints {
  food: IFood
  measures: Array<{
    label: string
    uri: string
  }>
}
