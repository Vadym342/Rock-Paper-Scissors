import { axiosConfig } from "../api/axios.config";
import { GuestDataType, UpdateGuestDataType } from "../types/guest.types";

export const GuestService = {
  async createOneGuest(guestData: GuestDataType): Promise<string> {
    const guest = await axiosConfig.post<string>("guest", guestData);

    return guest.data;
  },

  async getOneGuest(id: string) {
    const { data } = await axiosConfig.get(`guest/${id}`);
    if (data) {
      return data;
    }
  },

  async getAllGuests() {
    const { data } = await axiosConfig.get("guest");
    if (data) {
      return data;
    }
  },
  async updateGuest(id: string, GuestData: UpdateGuestDataType) {
    const { data } = await axiosConfig.patch(`guest/${id}`, GuestData);
    if (data) {
      return data;
    }
  },
  async deleteGuest(id: string) {
    const { data } = await axiosConfig.delete(`guest/${id}`);
    if (data) {
      return data;
    }
  },
};
