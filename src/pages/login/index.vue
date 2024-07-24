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
<script>
import {login} from "@/api/login";
export default {
  data: () => ({
    form: false,
    mobile: 'liyujian',
    password: '123456',
    autoLogin: false,
    loading: false,
    visible: false,
  }),
  methods: {
    onSubmit () {
      if (!this.form) return
      this.loading = true
      const params = {
        mobile: this.mobile,
        password: this.password
      }
      login(params).then(res => {
        console.log(res)
      })
    },
    required (v) {
      return !!v || '请输入'
    },
  },
}
</script>
<style lang="scss" scoped>
  div.login-container {
    background: url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr');
    background-size: 100% 100%;
  }
</style>
