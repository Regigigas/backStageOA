function UpdatePosition(container) {
  this.container = container;
  this.id = '';
  this.init();
}

UpdatePosition.ModelTem = `
  <div class="modal fade js-updatepos-modal" tabindex="-1" role="dialog" aria-labelledby="updatePositionLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="updatePosLabel">新增通知</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="updatePos-company">公司名称</label>
            <input type="text" class="form-control js-company" id="updatePos-company" placeholder="请输入公司名">
          </div>
          <div class="form-group">
            <label for="updatePos-position">公司职位</label>
            <input type="text" class="form-control js-position" id="updatePos-position" placeholder="请输入职位">
          </div>
          <div class="form-group">
            <label for="updatePos-salary">薪资范围</label>
            <select class="form-control js-salary">
              <option>10k-15k</option>
              <option>15-20k</option>
              <option>25k-30k</option>
              <option>30k\+</option>
            </select>
          </div>
          <div class="form-group">
            <label for="updatePos-address">办公地点</label>
            <input type="text" class="form-control js-address" id="updatePos-address" placeholder="请输入地点">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary js-submit">提交</button>
        </div>
        <div class="alert alert-success hide js-succ-notice" role="alert">修改成功</div>
        <div class="alert alert-danger  hide js-error-notice" role="alert">修改失败</div>
      </div>
    </div>
  </div>
`;

$.extend(UpdatePosition.prototype, {
  init: function() {
    this.createDom();
    this.bindEvents();
  },
  createDom: function() {
    this.element = $(UpdatePosition.ModelTem);
    this.succNoticeElem = this.element.find(".js-succ-notice");
    this.companyElem = this.element.find(".js-company");
    this.positionElem = this.element.find(".js-position");
    this.salaryElem = this.element.find(".js-salary");
    this.addressElem = this.element.find(".js-address");
    this.container.append(this.element);
  },
  showItem: function(id) {
    this.element.modal("show");
    this.getPositionInfo(id);
  },
  getPositionInfo: function(id) {
    $.ajax({
      url: "/api/getPosition",
      data: {
        id: id
      },
      success: $.proxy(this.handleGetPositionInfoSucc, this)
    })
  },
  handleGetPositionInfoSucc: function(res) {
    if (res && res.data && res.data.info) {
      var info = res.data.info;
      this.companyElem.val(info.company);
      this.positionElem.val(info.position);
      this.salaryElem.val(info.salary);
      this.addressElem.val(info.address);
      this.id = info._id;
    }
    console.log(res);
  },
  bindEvents: function() {
    var submitBtn = this.element.find(".js-submit");
    submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
  },
  handleSubmitBtnClick: function() {
    var company  = this.companyElem.val(),
        position = this.positionElem.val(),
        salary   = this.salaryElem.val(),
        address  = this.addressElem.val();
        
    // var formData = new FormData();
    // formData.append('company', company);
    // formData.append('position', position);
    // formData.append('salary', salary);
    // formData.append('address', address);
    // formData.append('id', this.id);

    $.ajax({
      url: "/api/updatePosition",
      type: "POST",
      data: {
        company: company,
        position: position,
        salary: salary,
        address: address,
        id: this.id
      },
      success: $.proxy(this.handleUpdatePositionSucc, this)
    })
  },
  handleUpdatePositionSucc: function (res) {
    if (res && res.data && res.data.update) {
      this.succNoticeElem.removeClass("hide");
      setTimeout($.proxy(this.handleDelay, this), 2000);
      $(this).trigger("change");
    }
  },
  handleDelay: function () {
    this.succNoticeElem.addClass("hide");
    this.element.modal("hide");
  }
})