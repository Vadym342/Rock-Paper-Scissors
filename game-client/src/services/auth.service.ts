import { axiosConfig } from "../api/axios.config";
import { ErrorContextType } from "../types/common.types";
import {
  LoginUserDatatype,
  UserDataType,
  UserSystemDataType,
} from "../types/user.types";

export const AuthService = {
  async registration(userData: UserDataType) {
    const { data } = await axiosConfig
      .post<number | ErrorContextType>("user", userData)
      .catch((error) => {
        return error.response.data;
      });

    return data;
  },
  async login(userData: LoginUserDatatype) {
    const data = await axiosConfig
      .post<UserSystemDataType | ErrorContextType>("auth/login", userData)
      .catch((error) => {
        return error.response.data;
      });

    console.log(data);

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
