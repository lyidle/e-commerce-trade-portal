<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input placeholder="请输入你的手机号" v-model="phone" name="phone" v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }" />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input placeholder="请输入验证码" v-model="code" name="code" v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }" />
        <button style="width: 100px;height: 38px;" @click="getCode">获取验证码</button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input placeholder="请输入验证码" v-model="password" name="password"
          v-validate="{ required: true, regex: /^[a-zA-Z0-9]{10,20}$/ }" :class="{ invalid: errors.has('password') }" />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input placeholder="请输入验证码" v-model="rePassword" name="rePassword" v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('rePassword') }" />
        <span class="error-msg">{{ errors.first("rePassword") }}</span>
      </div>
      <div class="controls">
        <input placeholder="请输入验证码" type="checkbox" v-model="agree" name="agree"
          v-validate="{ required: true, 'agree': true }" :class="{ invalid: errors.has('agree') }" />
        <span class="error-msg">{{ errors.first("agree") }}</span>
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      rePassword: '',
      agree: false,
      codeDisabled: false,
      codeTip: '获取验证码'
    }
  },
  methods: {
    // 获取验证码
    async getCode() {
      const reg = /^1\d{10}$/
      if (reg.test(this.phone)) {
        if (!this.codeDisabled) {
          // 初始化信息
          let t = 1000
          let timer = null
          this.codeDisabled = true
          let num = 10
          let value = this.codeTip
          this.codeTip = num
          try {
            await this.$store.dispatch('user/getCode', this.phone)
            // 将组件的code属性值变为仓库中验证码
            this.code = this.$store.state.user.code
          } catch (error) {
            alert(error.message)
          }
          console.log(11);
          timer = await setInterval(() => {
            // 倒计时
            this.codeTip = --num
            if (num < 1) {
              // 结束复原
              this.codeDisabled = false
              this.codeTip = value
              clearTimeout(timer)
            }
          }, t);
        }
      } else
        alert('请输入正确的手机号');
    },
    // 用户注册
    async userRegister() {
      const success = await this.$validator.validateAll(); //全部表单验证
      if (success) {
        const { phone, code, password, rePassword, agree } = this
        if (phone && code && password === rePassword && agree) {
          try {
            await this.$store.dispatch('user/userRegister', { phone, code, password })
            this.$router.push('/login')
          } catch (error) {
            alert(error.message)
          }
        }
      } else
        alert('请输入正确的信息');
    }
  },
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>