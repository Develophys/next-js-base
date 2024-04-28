import { USER_TYPE } from "@/enums"


export interface IUser {
  id?: string
  name: string
  email: string
  cpf: string
  password: string
  type: USER_TYPE

  // profiles ?: string[]
}

// export interface IUserView extends IUser {
//   profiles?: IProfile[]
//   courses?: any
// }