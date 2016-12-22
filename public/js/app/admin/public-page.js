$(function(){
	$.get('../../html/t_header.html',function(data){
		$('#header').html(data)
	})
		$.get('../../html/t_side.html',function(data){
		$('#side').html(data)
	})
})
