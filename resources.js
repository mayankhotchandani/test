$(document).ready(function () {
  var btn = $(".nav"),
    info = $(".info");
  active = $(".active");
  info.hide();
  active.show();
  btn.click(function (e) {
    e.preventDefault();
    var index = $(this).index();
    info.hide();
    info.eq(index).show();
    $(".nav").removeClass("current");
    $(this).addClass("current");
  });
});
