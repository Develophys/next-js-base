import { genSaltSync } from "bcrypt";

export const SALT = genSaltSync(10);
