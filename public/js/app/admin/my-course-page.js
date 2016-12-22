$(function(){
	    $("#course-list").on("click",".delete",function(){
		layer.confirm('要删除该记录？', {
			btn: ['确认','取消'], //按钮
			shade: false //不显示遮罩
		}, function(){
	           layer.msg('删除成功', {icon:1});
		}, function(){
			layer.msg('取消删除', {icon:9});
		});

	});
	
	
	
	
})
