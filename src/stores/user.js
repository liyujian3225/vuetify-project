import { defineStore } from 'pinia';
import { setItem, getItem, removeItem } from "@/utils/storage";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getItem("token") || "",
    }
  },
  getters: {

  },
  actions: {
    setToken(token) {
      this.token = token;
      setItem("token", token)
    },
  },
})
