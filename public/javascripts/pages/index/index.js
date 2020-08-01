function Page() {

}

$.extend(Page.prototype, {
	init: function() {
		this.createRegisterBox();
	},
	createRegisterBox: function() {
		var registerContainer = $(".js-register");
		this.Register = new Register(registerContainer, 1);
	}
})