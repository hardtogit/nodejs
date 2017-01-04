/**
 * Created by XR on 2017/1/4.
 * Time: 16:06
 */
/* ajax 请求更新数据 */
function sendAjax(page,size,callBack,formData){
    $.post('/api/material/list?page='+page+'&size='+size,formData,function(data){
        var  result={result:data.data};
        var html=template('list-template',result);
        $('#list-data').empty().append(html);

        if(callBack){
            return  callBack(data.totalPage);
        }
    })
}
$(function(){
    sendAjax(1,20,function(totalPage){
        $("#ui-page").paging({pageSize:1,totalPage:totalPage});
    });

    $('#search-submit').on('click',function(){
        var searchData=$('#search-form').serialize();
        sendAjax(1,20,function(totalPage){
            $("#ui-page").empty().paging({pageSize:1,totalPage:totalPage});
        },searchData);
    });
    /*删除数据*/
    $('#list-data').on('click','.material-del',function(){
        var $this=$(this);
        var id=$this.attr('data');
        layer.confirm('要删除该记录？', {
            btn: ['确认','取消'], //按钮
            shade: false //不显示遮罩
        }, function(){
            var posting = $.post("/api/post/delete", {id:id},function(data){
                if(data.status){
                    layer.msg('删除成功', {icon:9});
                    $this.parents("tr").remove();
                }
                else {
                    layer.msg('无权限或出现错误，请联系管理员', {icon:9});
                }
            });
        }, function(){
        });
    });

});