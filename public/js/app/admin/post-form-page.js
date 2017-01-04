$(function(){
	  var URL = window.UEDITOR_HOME_URL ="/js/lib/ueditor/";
    window.UEDITOR_CONFIG = {
        //为编辑器实例添加一个路径，这个不能被注释
        UEDITOR_HOME_URL: URL
        , serverUrl:"/ueditor/ue"
        , toolbars: [
            ['fullscreen', 'source', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'blockquote', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'cleardoc', '|',
                'fontsize', '|', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                'link', 'unlink', 'anchor','attachment'],
            ['simpleupload', 'insertimage', 'map', '|', 'insertcode', 'pagebreak', '|',
                'horizontal', 'date', 'time', 'spechars', '|',
                'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                'preview', 'drafts']
        ]
        ,langPath:URL +"lang/"
        ,zIndex : 999
        ,elementPathEnabled : false
        ,maximumWords:8000
        ,wordCountMsg:'已输入 <span style="color:red; font-weight: 700;font-size: 13px; ">{#count}</span> 个字符，剩余 {#leave}'
    };
    var ue = UE.getEditor('editor');
	//百度编辑器配置结束

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
        $.post('/api/post/detail',{id:id},function(data){
            $('#postId').val(data[0].id);
            $('#postTitle').val(data[0].title);
            $('#editor').html(data[0].content);
            $.each($('#type option'),function(i,value){
                if($(value).val()==data[0].type){
                    value.selected=true;

                }
            });
            $.each($('#flag input'),function(i, value){
                if($(value).val()==data[0].flag){
                    value.checked=true;
                }
            })
        });
    }
    //单选样式
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });

    //表单验证
    $('#post-form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            postTitle: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '你还没有填写标题呢！'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '标题字数为6~30个字'
                    },
                    //regexp: {
                    //    regexp: /^[a-zA-Z0-9_]+$/,
                    //    message: 'The username can only consist of alphabetical, number and underscore'
                    //}
                }
            },
            //postContent: {
            //    validators: {
            //        notEmpty: {
            //            message: '发布类容不能为空'
            //        }
            //    }
            //}
        }
    });
    $('#post-submit').on('click',function(){
        var $form = $("#post-form");
        if(!$form.bootstrapValidator()){
            return;
        }
        var edContent = ue.getContent();
        if($('#postTitle').val().trim().length==0){
            layer.msg('你还没填写标题呢');
            return;
        }
        if($('#postTitle').val().trim().length<6||$('#postTitle').val().trim().length>30){
            layer.msg('标题字数为6~30个字');
            return;
        }
        if(edContent.length == 0){
            layer.msg('写点什么吧');
            return;
        }
        $("#postContent").val(edContent);
        var postData = $form.serialize();
        $.post('/api/post/save',postData,function(data){
           if(data.status){
                   layer.confirm('保存成功，去往新闻列表页，还是继续添加新闻？', {
                       btn: ['去往列表页','继续添加新闻'], //按钮
                       shade: false //不显示遮罩
                   }, function(){
                     location.href='/admin/post/manage'
                   }, function(){
                       location.href='/admin/post/form'
                   });
           }
            else {
               layer.msg('保存失败')
           }
        })
    })
});



