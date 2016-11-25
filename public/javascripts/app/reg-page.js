$(function(){
	$('#reg').on('click',function(data){
         var username=$('#username').val();
         var password=$('#password').val();
         $.post('/api/user/register/user',{username:username,password:password},function(data){

         })
	})
})