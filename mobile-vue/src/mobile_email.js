module.exports.install = function(Vue, string) {
  Vue.prototype.mobileTest = function(mobile) {
      let reg = /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
      return reg.test(mobile);

    },
    Vue.prototype.emailTest = function(email) {
      let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      return regEmail.test(email)

    }
  Vue.prototype.is_email = function(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email))
      return false;
    else
      return true;
  }
}
