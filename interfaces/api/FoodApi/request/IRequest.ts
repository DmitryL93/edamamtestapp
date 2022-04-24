import { ERequestMethod } from '@/enums/'

export default interface IRequest {
  method: ERequestMethod
  url: string
  params: { ingr: string }
  headers: {
    [key: string]: string
  }
}
