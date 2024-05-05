import { USER_TYPE } from "@/enums"

export interface UserCreateDto {
  id?: string
  name: string
  email: string
  cpfCnpj: string
  password: string
  type: USER_TYPE
}