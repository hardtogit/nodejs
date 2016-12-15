/**
 * Created by Shinelon on 2016/12/6.
 */
$(function(){
    //获取所传参数ID
    var GetQueryString = function(name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) return(r[2]);
        return null;
    };
    var id = GetQueryString('id');
    $.post('/api/work/detail',{id:id},function(data){
        var html=template('detail-template',data);
        $('#detail-data').empty().append(html)
    })


});