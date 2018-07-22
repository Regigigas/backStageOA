function Logout(container) {
  this.container = container;
  this.init();
}

var logoutBtnTem = `
  <li>
    <a href="javascript:;">
      退出
    </a>
  </li>
`;

$.extend(Logout.prototype, {
  init: function() {
    this.createBtn();
    this.bindEvents();
  },
  createBtn: function() {
    this.btn = $(logoutBtnTem);
    this.container.append(this.btn);
  },
  bindEvents: function() {
    this.btn.on("click", $.proxy(this.handleClick, this));
  },
  handleClick: function() {
    $.ajax({
      url: "/api/logout",
      success: $.proxy(this.handleLogouSucc, this)
    })
  },
  handleLogouSucc: function(res) {
    if (res && res.ret && res.data && res.data.logout) {
      window.location.reload();
    }
  }
})