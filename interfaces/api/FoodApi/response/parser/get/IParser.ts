import IFood from '@/interfaces/api/FoodApi/response/parser/get/IFood'
import IHints from '@/interfaces/api/FoodApi/response/parser/get/IHints'

export default interface IParser {
  hints: Array<IHints>
  parsed: Array<{
    food: IFood
    uri: string
  }>
  links: {
    next: {
      href: string
      title: string
    }
  }
}
