/**
 * Created by XR on 2017/1/5.
 * Time: 10:15
 */
$(function(){
    //加载首页BANNER
    $.post('/api/material/list',{type:0,flag:0},function(data){
        data={result:data.data};
        var html=template('list-template',data);
        $('#list-data').empty().append(html);
        //初始化轮播
        $('.carousel').carousel({
            interval: 5000
        })
    });
    //加载首页新闻
    $.post('/api/post/list?page=1&size=4',{flag:0},function(data){
        var  result={result:data.data};
        var html=template('news-template',result);
        $('#news-data').empty().append(html);
    });
    //banner样式调整

});