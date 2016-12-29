$(function(){
	//单选样式
	$('input').iCheck({
		checkboxClass: 'icheckbox_square-blue',
		radioClass: 'iradio_square-blue',
		increaseArea: '20%' // optional
	});
	//获取所传参数ID
	var GetQueryString=function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null) return (r[2]); return null;
	};
	var id=GetQueryString('id');
	//表单回显
	if(id){
		$('#user-title').html("修改用户")
		$.post('/api/user/detail',{id:id},function(data){
			$('#userId').val(data[0].id);
			$('#loginName').val(data[0].login_name);
			$('#name').val(data[0].name);
			$('#password-group').css('display','none');
			$('#phone').val(data[0].phone);
			$('#email').val(data[0].email);
			$.each($('#role option'),function(i,value){
				if($(value).val()==data[0].role){
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




	//表单验证
	$('#user-form').bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			loginName: {
				message: 'The username is not valid',
				validators: {
					notEmpty: {
						message: '登录名必须填写！'
					},
					regexp: {
					    regexp: /^[a-zA-Z0-9]{6,10}$/,
					    message: '登录名只能是6~24位的数字或字母组成'
					},
					remote:{
						message: '用户名已被使用',
						url:'/api/user/userCheck'
					}
				}

			},
			name: {
				validators: {
					notEmpty: {
						message: '姓名必须填写！'
					},
				}
			},
			password: {
				validators: {
					notEmpty: {
						message: '密码必须填写！'
					},
					//stringLength: {
					//	min: 6,
					//	max: 30,
					//	message: '标题字数为6~30个字'
					//},
					regexp: {
						regexp: /^[a-zA-Z0-9]{6,10}$/,
						message: '密码只能是6~24位的数字或字母组成'
					}
				}
			},
			phone: {
			    validators: {
			        notEmpty: {
			            message: '手机号必须填写'
			        },
					regexp: {
						regexp: /^1(3|4|5|7|8)\d{9}$/,
						message: '请输入正确的11位手机话吗'
					}
			    }
			},
			email: {
				validators: {
					notEmpty: {
						message: '邮箱必须填写'
					}
				}
			}
		}
	});
	$('#user-submit').on('click',function(){
		if(!$('#user-form').data('bootstrapValidator').validate().isValid()){
		    return
		}
		var $form=$('#user-form')
		var postDate=$form.serializeArray();
		postDate[4].value=hex_sha1(postDate[4].value);//使用sha1加密
		console.log(postDate);
		$.post('/api/user/save',postDate,function(data){
			if(data.status){
				if(data.status){
					layer.confirm('保存成功，去往用户列表页，还是继续添加用户？', {
						btn: ['去往列表页','继续添加用户'], //按钮
						shade: false //不显示遮罩
					}, function(){
						location.href='/admin/user/manage'
					}, function(){
						location.href='/admin/user/form'
					});
				}
			}
			else {
				layer.msg('保存失败')
			}
		})
	});
	//jstree render
	$('.office-select').on('click',function(){
		$("#office-select-modal").modal('toggle')
	});
	var id='';
	var office='';
	$.get('/api/office/list',function(data){
		if(data.status){
			data=data.data;
			$.each(data,function(i,value){
				value.icon='fa fa-home'
			});
			var to = false;
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
			});
			$('#sure').on('click',function(){
				$('#office-name').val(office);
				$("#office-select-modal").modal('toggle')
			})


		}
	});
	//var data=[{'text':'辰海信息技术有限公司','parent':'#','id':'1','icon':'fa fa-home'},{'text':'技术部','parent':'1','id':'10','icon':'fa fa-home'}];

});
