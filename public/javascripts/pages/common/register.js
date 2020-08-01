function Register(registerContainer, modelContainer) {
  this.registerContainer = registerContainer;
  this.init();
}

Register.modelTem = `
  <form class="form-horizontal">
    <div class="form-group">
      <label for="inputEmail3" class="col-sm-2 control-label">账户</label>
      <div class="col-sm-10">
        <input type="text" class="form-control js-user" id="inputEmail3" placeholder="用户名">
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
      <div class="col-sm-10">
        <input type="password" class="form-control js-pass" id="inputPassword3" placeholder="密码字母开头，长度大于等于6位">
      </div>
    </div>
    <div class="form-group">
      <label for="inputEmail2" class="col-sm-2 control-label">验证码</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" id="inputEmail4">
      </div>
    </div>
    
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default js-submit">登录</button>
      </div>
    </div>
  </form>
`;

$.extend(Register.prototype, {
  init: function() {
    this.createModel();
    this.bindEvents();
  },
  createModel: function() {
    this.element = $(Register.modelTem);
    this.element.appendTo(this.registerContainer);
  },
  bindEvents: function() {
    var submitBtn = this.element.find(".js-submit");
    submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
  },
  handleSubmitBtnClick: function() {
    var userName = this.element.find(".js-user").val(),
      password = this.element.find(".js-pass").val();
    $.ajax({
      url: "/api/register",
      type: "POST",
      async: false,
      cache: false,
      data: {
        userName: userName,
        password: password
      },
      success: $.proxy(this.handleRegisterSucc, this),
    })

    return false;
  },
  handleRegisterSucc: function(res) {

  }
})