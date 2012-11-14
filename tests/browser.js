test("Craft.Browser", function() {

  ok(RegExp(Craft.Browser.toClassName().replace(/\d/, " $&"), "i").test(window.navigator.userAgent))
});