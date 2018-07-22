function Login(container, modelContainer) {
  this.container = container;
  this.modelContainer = modelContainer;
  this.init();
}

var loginBtnTem = `
  <li>
    <a href="javascript:;" data-toggle="modal" data-target=".js-loginModal">
      登录
    </a>
  </li>
`;

Login.modelTem = `
  <div class="modal fade js-loginModal" tabindex="-1" role="dialog" aria-labelledby="loginLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="loginLabel">登录</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="log-userName">用户名</label>
              <input type="email" class="form-control js-user" id="log-userName" placeholder="请输入用户名">
            </div>
            <div class="form-group">
              <label for="log-password">密码</label>
              <input type="password" class="form-control js-pass" id="log-password" placeholder="请输入密码">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-submit" data-dismiss="modal">提交</button>
        </div>
      </div>
    </div>
  </div>
`;

$.extend(Login.prototype, {
  init: function() {
    this.createBtn();
    this.createModel();
    this.bindEvents();
  },
  createBtn: function() {
    this.btn = $(loginBtnTem);
    this.container.append(this.btn);
  },
  createModel: function() {
    this.element = $(Login.modelTem);
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
      url: "/api/login",
      type: "POST",
      data: {
        userName: userName,
        password: password
      },
      success: $.proxy(this.handleLoginSucc, this)
    })
  },
  handleLoginSucc: function(res) {
    if (res && res.ret && res.data && res.data.login) {
      window.location.reload();
    }
  }
})