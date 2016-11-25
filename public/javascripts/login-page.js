$(function(){
   $('.my-btn').on('click',function(){
   	 $.post('/login/api',function(data){
        alert(data)
        
   	 })
   })


})