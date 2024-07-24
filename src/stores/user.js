import { defineStore } from 'pinia';
import { setItem, getItem, removeItem } from "@/utils/storage";
import router from '../router'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getItem("authorization") || "",
      userInfo: getItem("userInfo") || {},
    }
  },
  getters: {

  },
  actions: {
    logout() {
      this.$patch({
        token: '',
        userInfo: {},
      });
      removeItem("authorization");
      removeItem("userInfo");
      router.push({ name: 'home' })
    },
    setToken(token) {
      this.token = token;
      setItem("authorization", 'Bearer ' + token)
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      setItem("userInfo", userInfo)
    },
    setAvatarUrl(avatarUrl) {
      this.userInfo = {
        ...this.userInfo,
        avatarPath: avatarUrl,
      };
      setItem("userInfo", userInfo)
    }
  },
})
