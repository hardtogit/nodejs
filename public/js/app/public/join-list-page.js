/**
 * Created by Shinelon on 2016/12/6.
 */
$(function(){
    $.get('/api/work/list',function(data){
        var html=template('list-template',data);
        $('#list-data').empty().append(html);
        $('#list-data .detail').on('click',function(){
            var id=$(this).attr('data');
            window.location.href='/join/detail?id='+id;
        })
    })
});