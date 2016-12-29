/**
 * Created by XR on 2016/12/29.
 * Time: 17:43
 */
$(function(){
    $('.fileupload').change(function(event) {
        /* Act on the event */
        if ($('.fileupload').val().length) {
            var fileName = $('.fileupload').val();
            var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
            if (extension == ".jpg" || extension == ".png"|| extension==".jpeg" || extension=='.gif') {
                var data = new FormData();
                data.append('upload', $('#fileToUpload')[0].files[0]);
                $.ajax({
                    url: '/api/material/upload/picture',
                    type: 'POST',
                    data: data,
                    cache: false,
                    contentType: false, //不可缺参数
                    processData: false, //不可缺参数
                    success: function(data) {
                       var  imgurl=data.msg.substring(6)
                        $('#pimg').attr('src',imgurl)
                    },
                    error: function() {
                        console.log('error');
                    }
                });
            }
            else {
                layer.msg('亲！请选择正确的图片格式哦')
            }
        }
    });
});