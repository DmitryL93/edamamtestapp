import axios from 'axios'
import { ERequestMethod, EResponseStatus } from '@/enums/'
import IRequest from '@/interfaces/api/FoodApi/request/IRequest'
import ISuccessResponse from '@/interfaces/api/FoodApi/response/ISuccess'
import IErrorResponse from '@/interfaces/api/FoodApi/response/IError'
import IParser from '@/interfaces/api/FoodApi/response/parser/get/IParser'

export default class FoodApi {
  public static async request(ingr: string) {
    let result: any
    const options: IRequest = {
      method: ERequestMethod.get,
      url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
      params: { ingr },
      headers: {
        'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com',
        'X-RapidAPI-Key': '025939915dmshb61c579b10ac279p13ef11jsn1e00a45f5fcd'
      }
    }

    await axios
      .request(options)
      .then(response => {
        const successResponse: ISuccessResponse = {
          status: response.status,
          messages: [],
          data: response.data as IParser
        }

        if (response.status === EResponseStatus.ok) {
          successResponse.messages.push('данные успешно получены!')
        }

        result = successResponse
      })
      .catch(error => {
        const errorResponse: IErrorResponse = {
          status: error.response.status,
          messages: []
        }

        switch (error.response.status) {
          case EResponseStatus.badRequest:
            errorResponse.messages.push('произошла ошибка в запросе!')
            break
          case EResponseStatus.unauthorized:
            errorResponse.messages.push('доступ к запрашиваемому ресурсу требует авторизации!')
            break
          case EResponseStatus.forbidden:
            errorResponse.messages.push('доступ к запрашиваемому ресурсу запрещён!')
            break
          default:
            errorResponse.messages.push('произошла ошибка! повторите запрос через некоторое время')
            errorResponse.details = error.message
            break
        }

        result = errorResponse
      })

    return result
  }
}
