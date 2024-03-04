import { axiosConfig } from "../api/axios.config";
import { UpdateUserDataType } from "../types/user.types";

export const UserService = {
  async getOneUser(id: string) {
    const { data } = await axiosConfig.get(`user/${id}`);
    if (data) {
      return data;
    }
  },
  async getAllUsers() {
    const { data } = await axiosConfig.get("user");
    if (data) {
      return data;
    }
  },
  async updateUser(id: string, userData: UpdateUserDataType) {
    const { data } = await axiosConfig.patch(`user/${id}`, userData);
    if (data) {
      return data;
    }
  },
  async deleteUser(id: string) {
    const { data } = await axiosConfig.delete(`user/${id}`);
    if (data) {
      return data;
    }
  },
};
