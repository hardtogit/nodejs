/**
 * Created by XR on 2017/1/6.
 * Time: 9:59
 */
/* ajax 请求更新数据 */
function sendAjax(page,size,callBack,formData){
    $.post('/api/post/list?page='+page+'&size='+size,formData,function(data){
        var  result={result:data.data};
        var html=template('news-template',result);
        $('#news-data').empty().append(html);
        if(callBack){
            return  callBack(data.totalPage);
        }
    })
}
$(function(){
    sendAjax(1,10,function(totalPage){
        $("#ui-page").paging({pageSize:10,totalPage:totalPage});
        $("#news-data .detail")[0].click()
    });

    $('#search-submit').on('click',function(){
        var searchData=$('#search-form').serialize();
        sendAjax(1,10,function(totalPage){
            $("#ui-page").empty().paging({pageSize:10,totalPage:totalPage});
        },searchData);
    });
    //查看新闻详情
    $('#news-data').on('click','.detail',function(){
        var id=$(this).attr('data');
        $.post('/api/post/detail',{id:id},function(data){
            var html=template('detail-template',data[0]);
            $('.blog-single-post').empty().append(html)
        })
    })

});