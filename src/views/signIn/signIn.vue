<template>
  <div class="signIn">
    <div class="signIn-topPart">
      <button class="signIn-topPart-back" @click="getBack">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-back"></use>
        </svg>
      </button>
    </div>
    <div class="signIn-logo">
      <img :src="logoImg" alt="err" />
    </div>
    <div class="signIn-logBox">
      <van-tabs v-model="active">
        <van-tab title="登录">
          <van-form @submit="onSubmitLogIn">
            <van-field
              v-model="username"
              name="手机号"
              :left-icon="require('../../assets/img/signIn/phone.png')"
              placeholder="手机号"
              :rules="[{ required: true, message: '请填写正确的手机号' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="密码"
              :left-icon="require('../../assets/img/signIn/passward.png')"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
              <van-button block type="danger">
                登录
              </van-button>
            </div>
          </van-form>
          <div class="signIn-logBox-forgetPass" @click="onClickForgetPW">
            忘记密码
          </div>
          <div class="signIn-logBox-otherWay">
            <van-divider>其他方式登录</van-divider>
            <div class="signIn-logBox-otherWay-icon">
              <div class="signIn-logBox-otherWay-icon-wechat">
                <img :src="require('../../assets/img/signIn/wechat.png')" />
              </div>
              <div class="signIn-logBox-otherWay-icon-qq">
                <img :src="require('../../assets/img/signIn/qq.png')" />
              </div>
              <div class="signIn-logBox-otherWay-icon-blog">
                <img :src="require('../../assets/img/signIn/blog.png')" />
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="注册">
          <van-form @submit="onSubmitRegister">
            <van-field
              v-model="username"
              name="手机号"
              :left-icon="require('../../assets/img/signIn/phone.png')"
              placeholder="请输入手机号"
              :rules="[{ required: true, message: '请填写正确的手机号' }]"
            />
            <van-field
              v-model="captcha"
              type="digit"
              name="验证码"
              :left-icon="require('../../assets/img/signIn/captcha.png')"
              placeholder="请输入验证码"
              :rules="[{ required: true, message: '请填写收到的验证码' }]"
            >
              <template #button>
                <van-button
                  size="small"
                  type="default"
                  :disabled="ifClick"
                  @click="onCaptchaClick(username, 10)"
                >
                  {{ clickMessage }}
                </van-button>
              </template>
            </van-field>
            <van-field
              v-model="password"
              type="password"
              name="密码"
              :left-icon="require('../../assets/img/signIn/passward.png')"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
              v-model="recommend"
              name="邀请码"
              :left-icon="require('../../assets/img/signIn/passward.png')"
              placeholder="请输入邀请码"
              :rules="[{ required: false, message: '请填写邀请码' }]"
            >
              <template #left-icon>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-my"></use>
                </svg>
              </template>
            </van-field>
            <div style="margin: 16px;">
              <van-button block type="danger">
                注册
              </van-button>
            </div>
            <div class="signIn-logBox-agree">
              点击注册即表示您已经同意 《 用户协议 》
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getBack } from "../../components/utils.js";
import { onCaptchaClick } from "../../components/onCaptchaClick.js";
import { signInJudge, registerAccount } from "../API/signIn_API.js";
import { Toast } from "vant";
import { setCookie, getCookie } from "../../components/cookie.js";

export default {
  name: "signIn",
  data() {
    return {
      active: 0,
      logoImg: require("../../assets/img/signIn/logo.png"),
      username: "",
      password: "",
      captcha: "", //验证码
      recommend: "", //邀请码
      ifClick: false, //判断是否可以发送验证码
      clickMessage: "获取验证码",
      captchaSend: ""
    };
  },
  methods: {
    getBack,
    onSubmitLogIn() {
      signInJudge(this.username, this.password).then(data => {
        if (data.message === "服务器出错") {
          Toast.fail("请检查账号与密码");
        }
        if (data.success === true) {
          this.successLogIn(data);
        }
      });
    }, //登录

    onSubmitRegister() {
      // 点击注册按钮触发
      const accountData = {
        phoneData: this.username,
        passwordData: this.password,
        referralCodeData: this.recommend,
        codeData: this.captcha
      };
      if (this.captchaSend !== this.captcha) {
        Toast.fail("验证码错误！"); //验证码判断
      } else {
        registerAccount(accountData).then(data => {
          const { msg } = data;
          if (msg !== "注册成功") {
            Toast.fail(msg);
          } else {
            Toast.success("注册成功,2s后自动登录");
            setTimeout(() => {
              this.onSubmitLogIn();
            }, 2000); //延时两秒后自动跳转
          }
        });
      }
    }, //注册

    onClickForgetPW() {
      this.$router.push("/forgetPassword");
    }, //忘记密码

    onCaptchaClick, //发送验证码

    successLogIn(data) {
      setCookie("token", data.token);
      const jump = setInterval(() => {
        if (getCookie("token") !== "未找到对应cookie") {
          this.$router.push("/successSignIn");
          clearInterval(jump);
        } else {
          Toast.loading({
            message: "请稍后...",
            forbidClick: true,
            duration: 100
          });
        }
      }, 100); //100ms判断一次，直到将token存入cookie后才会进行页面跳转
    } //登录判断，交互优化
  }
};
</script>

<style scoped lang="scss">
@import "signIn";
</style>
