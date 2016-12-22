$(function(){
	 // sidebar toggle
    $('#sidebar .sub-menu > a').click(function () {
        var last = $('.sub-menu.open', $('#sidebar'));
        last.removeClass("active");
        $('.arrow', last).removeClass("active");
        $('.sub', last).slideUp(200);
        var sub = $(this).next();
        if (sub.is(":visible")) {
            $('.arrow', $(this)).removeClass("active");
            $(this).parent().removeClass("active");
            sub.slideUp(200);
        } else {
            $('.arrow', $(this)).addClass("active");
            $(this).parent().addClass("active");
            sub.slideDown(200);
        }
        var o = ($(this).offset());
        diff = 200 - o.top;
    });

      var path = document.location.href;
//      // ******************顶部导航栏******************
//      path = path.substr(path.indexOf($CONFIG.base_url) + 1);
//      if (path.indexOf("sum", 0) >= 0) {
//          $('li:has([href*="sum"])').addClass('active').siblings().removeClass('active');
//      } else if (path.indexOf("search", 0) >= 0) {
//          $('li:has([href*="search"])').addClass('active').siblings().removeClass('active');
//      } else if (path.indexOf("supplier", 0) >= 0) {
//          $('li:has([href*="supplier"])').addClass('active').siblings().removeClass('active');
//      } else if (path.indexOf("exceed", 0) >= 0) {
//          $('li:has([href*="exceed"])').addClass('active').siblings().removeClass('active');
//      }

        // ******************侧边栏选中效果******************
        var sidePath=window.location.href;
        $("#sidebar>ul>li>ul.sub>li a").each(function(){
            var url=$(this).attr("href");
            if(sidePath.indexOf(url)!=-1){//长在前短在后
                $(this).parent().addClass('active').siblings().removeClass('active');
                $(this).parents(".sub-menu").addClass("active");
            }
        });
  
})
   

