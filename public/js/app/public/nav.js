/**
 * Created by XR on 2017/1/6.
 * Time: 18:22
 */
    //移动设备上导航栏的影藏与显示
$(function(){
    $('.mainmenu .logo-wrapper .fa').on('click',function(){
        var $this=$(this);
        if($('#nav-ul').css('display')=='block'){
            $('#nav-ul').slideUp("slow",function(){
            });
        }
        else {
            $('#nav-ul').slideDown("slow",function(){
            });
        }
    })
});
