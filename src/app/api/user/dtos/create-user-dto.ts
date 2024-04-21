import { USER_TYPE } from "@/enums"

export interface UserCreateDto {
  id?: string
  name: string
  email: string
  cpf: string
  password: string
  type: USER_TYPE
}