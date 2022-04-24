import IResponse from '@/interfaces/api/FoodApi/response/IResponse'
import IParser from '@/interfaces/api/FoodApi/response/parser/get/IParser'

export default interface ISuccess extends IResponse {
  data: IParser
}
