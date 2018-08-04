function Page() {
  
}

$.extend(Page.prototype, {
  init: function() {
    this.createHeader();
    this.createAddPosition();
    this.createPositionList();
    this.createPagination();
  },
  createHeader: function() {
    var headerContainer = $(".js-header");
    this.header = new Header(headerContainer, 1);
  },
  createAddPosition: function() {
    var positionContainer = $(".js-container");
    this.addPosition = new AddPosition(positionContainer);
  },
  createPositionList: function() {
    var positionContainer = $(".js-container");
    this.positionList = new PositionList(positionContainer);
    $(this.positionList).on("change", $.proxy(this.handleListChange, this));
  },
  createPagination: function() {
    var positionContainer = $(".js-pagination");
    this.pagination = new Pagination(positionContainer);
    $(this.pagination).on("change", $.proxy(this.handlePaginationChange, this));
  },
  handleListChange: function(e) {
    this.pagination.setTotal(e.total);
  },
  handlePaginationChange: function(e) {
    this.positionList.changePage(e.page);
  }
})