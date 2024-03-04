import { axiosConfig } from "../api/axios.config";
import {
  LoginUserDatatype,
  UserDataType,
  UserSystemDataType,
} from "../types/user.types";

export const AuthService = {
  async registration(userData: UserDataType): Promise<number> {
    const data = await axiosConfig.post<number>("user", userData);

    return data.status;
  },
  async login(userData: LoginUserDatatype): Promise<UserSystemDataType> {
    const { data } = await axiosConfig.post<UserSystemDataType>(
      "auth/login",
      userData
    );
    return data;
  },
  async isAuthorizedUser(): Promise<UserSystemDataType | undefined> {
    const { data } = await axiosConfig.get<UserSystemDataType | undefined>(
      "auth/profile"
    );
    if (data) {
      return data;
    }
  },
};
