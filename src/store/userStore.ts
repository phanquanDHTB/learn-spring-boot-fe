import { create } from "zustand";
export interface IUserLogin {
    token?: string;
    userId?: number;
    userName?: string;
}

interface IUserStore {
    userInfor: IUserLogin | null;
    setUserInfor: (userInfor: IUserLogin) => void;
}
export const useUserStore = create<IUserStore>((set) => ({
    userInfor: null,
    setUserInfor: (userInfor: IUserLogin) => set(() => ({ userInfor: userInfor })),
}));
