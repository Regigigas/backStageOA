function PositionList(container) {
  this.container = container;
  this.page = 1;
  this.size = 10;
  this.init();
}

PositionList.Temp = `
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>序号</th>
          <th>公司</th>
          <th>职位</th>
          <th>薪资</th>
          <th>地点</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody class="js-tbody"></tbody>
    </table>
  </div>
`;

$.extend(PositionList.prototype, {
  init: function() {
    this.createDom();
    this.createUpdatePosition();
    this.bindEvents();
    this.getListInfo();
  },
  createDom: function() {
    this.element = $(PositionList.Temp);
    this.container.append(this.element);
  },
  createUpdatePosition: function() {
    this.updatePosition = new UpdatePosition(this.container);
    $(this.updatePosition).on("change", $.proxy(this.getListInfo, this));
  },
  getListInfo: function() {
    $.ajax({
      url: "/api/getPositionList",
      data: {
        page: this.page,
        size: this.size
      },
      success: $.proxy(this.handleGetListInfoSucc, this)
    })
  },
  handleGetListInfoSucc: function(res) {
    if (res && res.data && res.data.list) {
      this.creaItems(res.data.list);
      if (this.page > res.data.totalPage) {
        this.page = res.data.totalPage;
        this.getListInfo();
      } else {
        $(this).trigger(new $.Event("change", {
          total: res.data.totalPage
        }))
      }
    }
  },
  creaItems: function(list) {
    var itemContainer = this.element.find(".js-tbody"),
        str = "";
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      str += `
        <tr>
          <td>${ i + 1 }</td>
          <td>${ item.company }</td>
          <td>${ item.position }</td>
          <td>${ item.salary }</td>
          <td>${ item.address }</td>
          <td>
            <span class="js-update" data-id="${item._id}">修改</span>
            <span class="js-delete" data-id="${item._id}">删除</span>
          </td>
        </tr>
      `;
    }
    itemContainer.html(str);
  },
  bindEvents: function() {
    this.container.on("click", $.proxy(this.handleTableClick, this));
  },
  handleTableClick: function(e) {
    var target = $(e.target),
        isDeleteClick = target.hasClass("js-delete"),
        isUpdateClick = target.hasClass("js-update");
    if (isDeleteClick) {
      this.deleteItem(target.attr("data-id"));
    }
    if (isUpdateClick) {
      this.updatePosition.showItem(target.attr("data-id"));
    }
  },
  deleteItem: function() {
    console.log("deleteItem")
  },
  changePage: function(page) {
    this.page = page;
    this.getListInfo();
  }
})