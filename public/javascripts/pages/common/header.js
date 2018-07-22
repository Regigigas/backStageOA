function Header(headerContainer) {
  this.headerContainer = headerContainer;
  this.init();
}

Header.template = `
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="javascripts:;">办公自动化</a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="active"><a href="/">个人<span class="sr-only">(current)</span></a></li>
          <li><a href="/htmls/notice.html">通知</a></li>
          <li><a href="javascripts:;">流程</a></li>
          <li><a href="javascripts:;">文档</a></li>
          <li><a href="javascripts:;">报告</a></li>
          <li><a href="javascripts:;">项目</a></li>
          <li><a href="javascripts:;">资产</a></li>
          <li><a href="javascripts:;">人事</a></li>
          <li><a href="javascripts:;">客户</a></li>
          <li><a href="javascripts:;">采购</a></li>
          <li><a href="javascripts:;">系统</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right js-right">
          
        </ul>
      </div>
    </div>
  </nav>
`;

$.extend(Header.prototype, {
  init: function() {
    this.createDom();
    this.createLoginInfo();
  },
  createDom: function() {
    this.element = $(Header.template);
    this.rightArea = this.element.find(".js-right")
    this.headerContainer.append(this.element)
  },
  createLoginInfo: function() {
    $.ajax({
      url: "/api/isLogin",
      success: $.proxy(this.handleGetLoginSucc, this)
    })
  },
  handleGetLoginSucc: function(res) {
    if (res && res.data && res.data.isLogin) {
      this.createLogout();
    } else {
      this.createLogin();
      this.createRegister();
    }
  },
  createLogin: function() {
    this.login = new Login(this.rightArea, this.element);
  },
  createRegister: function() {
    this.register = new Register(this.rightArea, this.element);
  },
  createLogout: function() {
    this.logout = new Logout(this.rightArea);
  }
})