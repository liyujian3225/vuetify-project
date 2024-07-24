<template>
  <div class="fill-height overflow-hidden login-container">
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>
    <v-card
      class="mx-auto pa-12"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <div class="text-subtitle-1 text-medium-emphasis">用户名</div>
        <v-text-field
          v-model="mobile"
          :readonly="loading"
          :rules="[required]"
          density="compact"
          placeholder="请输入用户名"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          密码
          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            忘记密码?</a>
        </div>
        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="请输入密码"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-checkbox
          v-model="autoLogin"
          label="记住密码?"
          density="compact"
        ></v-checkbox>

        <v-card
          class="mb-3"
          color="surface-variant"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            请您注意，课程仅供您个人使用。若您将账号共享至他人使用，您的账号会在无警告的前提下永久禁用。
          </v-card-text>
        </v-card>

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          登录
        </v-btn>
      </v-form>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          联系客服 <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import {login} from "@/api/login";
import {setCookie, getCookie, clearCookie} from '@/utils/rememberPassword';
import { useUserStore } from "@/stores/user";

const form = ref(false);
const loading = ref(false);
const visible = ref(false);
const mobile = ref('liyujian');
const password = ref('123456');
const autoLogin = ref(false);

const required = (v) => {
  return !!v || '请输入'
}

const onSubmit = () => {
  if (!form.value) return
  loading.value = true
  const params = {
    mobile: mobile.value,
    password: password.value
  }
  login(params).then(res => {
    loading.value = false;
    const { success, content, message } = res;

    if(success) {
      //记住密码控制逻辑
      if(autoLogin.value === '1') {
        setCookie(mobile.value, password.value, 7)
      }else {
        clearCookie()
      }
      //设置token、水印名称
      const { name, token, id } = content;
      const userStore = useUserStore();
      userStore.setToken(token);
      //调整到课程详情页面
      const router = useRouter();

      console.log(useRouter())

      router.push({ name: "courseList" })
    }else {
      if(message === "手机号不存在或密码错误") {}
      if(message === "登陆设备以达到上限，请联系管理员清除不常用设备") {};
    }
  })
}
</script>
<style lang="scss" scoped>
  div.login-container {
    background: url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr');
    background-size: 100% 100%;
  }
</style>
