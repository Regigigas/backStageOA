function Page() {

}

$.extend(Page.prototype, {
	init: function() {
		// this.createLoginBox();
	},
	createLoginBox: function() {
		var loginBoxContainer = $(".js-loginBox");
		this.loginBox = new loginBox(loginBoxContainer, 0);
	}
})