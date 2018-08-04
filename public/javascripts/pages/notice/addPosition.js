function AddPosition(container) {
  this.container = container;
  this.init();
}

AddPosition.BtnTemp = `
  <button type="button" class="btn btn-info" data-toggle="modal" data-target=".js-addpos-modal">增加</button>
`;

AddPosition.ModelTem = `
  <div class="modal fade js-addpos-modal" tabindex="-1" role="dialog" aria-labelledby="addPosLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="addPosLabel">新增通知</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="addPos-company">公司名称</label>
            <input type="text" class="form-control js-company" id="addPos-company" placeholder="请输入公司名">
          </div>
          <div class="form-group">
            <label for="addPos-position">公司职位</label>
            <input type="text" class="form-control js-position" id="addPos-position" placeholder="请输入职位">
          </div>
          <div class="form-group">
            <label for="addPos-salary">薪资范围</label>
            <select class="form-control js-salary">
              <option>10k-15k</option>
              <option>15-20k</option>
              <option>25k-30k</option>
              <option>30k\+</option>
            </select>
          </div>
          <div class="form-group">
            <label for="addPos-address">办公地点</label>
            <input type="text" class="form-control js-address" id="addPos-address" placeholder="请输入地点">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary js-submit">提交</button>
        </div>
        <div class="alert alert-success hide js-succ-notice" role="alert">添加成功</div>
        <div class="alert alert-danger  hide js-error-notice" role="alert">添加失败</div>
      </div>
    </div>
  </div>
`;

$.extend(AddPosition.prototype, {
  init: function() {
    this.createDom();
    this.bindEvents();
  },
  createDom: function() {
    this.btn = $(AddPosition.BtnTemp);
    this.modal = $(AddPosition.ModelTem);
    this.succNoticeElem = this.modal.find(".js-succ-notice");
    this.container.append(this.btn);
    this.container.append(this.modal);
  },
  bindEvents: function() {
    var submitBtn = this.modal.find(".js-submit");
    submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
  },
  handleSubmitBtnClick: function() {
    var company = this.modal.find(".js-company").val(),
        position = this.modal.find(".js-position").val(),
        salary = this.modal.find(".js-salary").val(),
        adress = this.modal.find(".js-address").val();
    
    $.ajax({
      type: "POST",
      url: "/api/addPosition",
      data: {
        company: company,
        position: position,
        salary: salary,
        adress: adress
      },
      success: $.proxy(this.handleAddPositionSucc, this)
    })
  },
  handleAddPositionSucc: function(res) {
    if (res && res.ret && res.data && res.data.inserted) {
      this.succNoticeElem.removeClass("hide");
      setTimeout($.proxy(this.handleDelay, this), 2000);
    }
  },
  handleDelay: function() {
    this.succNoticeElem.addClass("hide");
    this.modal.modal("hide");
  }
})