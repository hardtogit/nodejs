$(function(){
    $('#name').on('blur',function(){
  		var name=$('#name').val();
  		$.get('login',function(){})	       
  		$.post('userCheck/api',{username:name},function(data){  			
  			var textContainer=$('#check-text')
  			textContainer.text(data.result.message)




    	}) 
    })
})



