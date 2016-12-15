/**
 * Created by Shinelon on 2016/12/15.
 */
    $(function(){
        $('#submit').on('click',function(){
            if($('#username').val()==''){
               alert('用户名不能为空');
                return
            }
            else if($('#password').val()==''){
                alert('密码不能为空');
                return
            }
            var postData={};
            postData.username=$('#username').val();
            postData.password=hex_sha1($('#password').val())//使用sha1加密
            $.post('/api/user/login',postData,function(data){
                console.log(data)
            })
         });


    })
