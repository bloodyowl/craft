test("Craft.Browser", function() {

  ok(RegExp(Craft.Browser.toClassName(), "i").test(window.navigator.userAgent))
});