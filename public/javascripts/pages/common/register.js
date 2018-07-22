function Register(container, modelContainer) {
  this.container = container;
  this.modelContainer = modelContainer;
  this.init();
}

var registerBtnTem = `
  <li>
    <a href="javascript:;" data-toggle="modal" data-target=".js-registerModal">
      注册
    </a>
  </li>
`;

Register.modelTem = `
  <div class="modal fade js-registerModal" tabindex="-1" role="dialog" aria-labelledby="registerLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="registerLabel">注册</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="reg-userName">用户名</label>
            <input type="email" class="form-control js-user" id="reg-userName" placeholder="请输入用户名">
          </div>
          <div class="form-group">
            <label for="reg-password">密码</label>
            <input type="password" class="form-control js-pass" id="reg-password" placeholder="请输入密码">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary js-submit">提交</button>
        </div>
        <div class="alert alert-success hide js-succ-notice" role="alert">注册成功</div>
        <div class="alert alert-danger  hide js-error-notice" role="alert">用户已存在</div>
      </div>
    </div>
  </div>
`;

$.extend(Register.prototype, {
  init: function() {
    this.createBtn();
    this.createModel();
    this.bindEvents();
  },
  createBtn: function() {
    this.btn = $(registerBtnTem);
    this.container.append(this.btn);
  },
  createModel: function() {
    this.element = $(Register.modelTem);
    this.succNoticeEle = this.element.find(".js-succ-notice");
    this.errorNoticeEle = this.element.find(".js-error-notice");
    this.modelContainer.append(this.element);
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
      success: $.proxy(this.handleRegisterSucc, this)
    })
  },
  handleRegisterSucc: function(res) {
    if (res.ret && res.data && res.data.register) {
      this.succNoticeEle.removeClass("hide");
      setTimeout($.proxy(this.handleModeFade, this), 2000);
    } else {
      this.errorNoticeEle.removeClass("hide");
      setTimeout($.proxy(this.handleErrorFade, this), 2000);
    }
  },
  handleModeFade: function() {
    this.succNoticeEle.addClass("hide");
    this.element.modal("hide");
  },
  handleErrorFade: function() {
    this.errorNoticeEle.addClass("hide");
  }
})