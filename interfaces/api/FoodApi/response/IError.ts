import IResponse from '@/interfaces/api/FoodApi/response/IResponse'

export default interface IError extends IResponse {
  details?: string
}
