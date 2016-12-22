$(function(){
	$('.office-select').on('click',function(){
		$("#office-select-modal").modal('toggle')
	})
	
	var id='';
	var office='';
	var data=[{'text':'中油瑞飞','parent':'#','id':'1','icon':'fa fa-home'},{'text':'财务部','parent':'1','id':'10','icon':'fa fa-home'}];
			var to = false
	$('#search-staff').keyup(function() {
		if (to) {
			clearTimeout(to);
		}
		to = setTimeout(function() {
			var v = $.trim($('#search-staff').val());
			$('#office-select-modal-content').jstree(true).search(v);
		}, 250);
	});
		
		$('#office-select-modal-content').jstree(
			{'plugins' : [ "search" ],
				'core' : {
                    "multiple" : true,
                    'data' : data
                }}).on("open_node.jstree-ocl", function(event, data) {
		$(this).jstree("open_all");
	});
	$('#office-select-modal-content').on('changed.jstree', function(e, data) {
		
		office=data.node.text;
		id=data.node.id;
		
	})

	$('#sure').on('click',function(){
		$('#office-name').val(office)
		alert(id)
		$("#office-select-modal").modal('toggle')
	})
	
	
})
