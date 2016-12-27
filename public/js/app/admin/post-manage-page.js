$(function(){
    //render data
    $('#search-submit').on('click',function(){
        loadData()
    });
    function loadData(){
        var searchData=$('#search-form').serialize();
        $.post('/api/post/list',searchData,function(data){
            data={result:data};
            var html=template('list-template',data);
            $('#list-data').empty().append(html);
        });
    }
    loadData();
    $('#list-data').on('click','.post-del',function(){
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


    })


});
