/**
 * Created by XR on 2016/12/29.
 * Time: 17:43
 */
$(function(){
    //获取所传参数ID
    var GetQueryString=function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return (r[2]); return null;
    };
    var id=GetQueryString('id');
    //表单回显
    if(id){
        $('#page-title').html("修改新闻")
        $.post('/api/material/detail',{id:id},function(data){
            $('#materialId').val(data[0].id);
            $('#title').val(data[0].title);
            $('#pimg').attr('src',data[0].img_url);
            $('#link_url').val(data[0].link_url);
            $.each($('#type option'),function(i,value){
                if($(value).val()==data[0].type){
                    value.selected=true;
                    $('.selectpicker').selectpicker('refresh');
                }
            });
            $.each($('#flag input'),function(i, value){
                if($(value).val()==data[0].flag){
                    value.checked='checked';
                }
            });
            //单选样式
            $('input').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%' // optional
            });
            $('#description').val(data[0].description)
        });
    }
  /*图片上传*/
    $('.fileupload').change(function(event) {
        /* Act on the event */
        var  nowImg='';
        if( $('#pimg').attr('src')){
            nowImg=$('#pimg').attr('src');
        }
        if ($('.fileupload').val().length) {
            var fileName = $('.fileupload').val();
            var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
            if (extension == ".jpg" || extension == ".png"|| extension==".jpeg" || extension=='.gif') {
                var data = new FormData();
                data.append('nowImg',nowImg);
                data.append('upload', $('#fileToUpload')[0].files[0]);
                console.log($('#fileToUpload')[0].files[0])
                $.ajax({
                    url: '/api/material/upload/picture',
                    type: 'POST',
                    data: data,
                    cache: false,
                    contentType: false, //不可缺参数
                    processData: false, //不可缺参数
                    success: function(data) {
                       var  imgurl=data.url.substring(6);
                        $('#pimg').attr('src',imgurl);
                        $('#up-img').html('重新上传')

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
    //单选样式
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
    //初始化select样式组件
    $('.selectpicker').selectpicker({
        'selectedText': 'cat',
        style: 'btn-success,'
    });
    //预览上传图片
    $('#pimg').on('click',function(){
        var url=$(this).attr('src');
        var img = new Image();
        img.src=url;
        var showWidth;
        var showHight;
        var imgWidth= img.width;
        var imgHight= img.height;
        var height=$(window).height();
        var width=$(window).width();
        if(imgWidth/imgHight>width/height){
            showWidth=width*0.8;
            showHight='auto'
        }
        else {
            showHight=height*0.8;
            showWidth='auto'
        }
        if(url){
            $('#img-preview img').css({'width':showWidth,'height':showHight,'margin-top':height*0.1});
            $("#img-preview").css('display','block').find('img').attr('src',url);
        }
        else {
           layer.msg('需要上传一张图片才能预览哦~')
        }
    });
    //点击关闭预览
    $("#img-preview").on('click', function () {
        $(this).css('display','none')
    });
    //提交表单数据
    $('#material-submit').on('click',function(){
        var postData=$('#material-form').serializeArray();
        postData.push({name:'img_url',value:$('#pimg').attr('src')})
        $.post('/api/material/save',postData,function(data){
            if(data.status){
                layer.confirm('保存成功，去往素材列表页，还是继续添加素材？', {
                    btn: ['去往列表页','继续添加素材'], //按钮
                    shade: false //不显示遮罩
                }, function(){
                    location.href='/admin/material/manage'
                }, function(){
                    location.href='/admin/material/form'
                });
            }
            else {
                layer.msg('保存失败')
            }
        })
    })

});