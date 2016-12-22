$(function(){
	  var URL = window.UEDITOR_HOME_URL ="js/lib/ueditor/";
    window.UEDITOR_CONFIG = {

        //为编辑器实例添加一个路径，这个不能被注释
        UEDITOR_HOME_URL: URL
        , serverUrl:URL + "jsp/controller.jsp"
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
        ,zIndex : 999
        ,elementPathEnabled : false
        ,maximumWords:8000
        ,wordCountMsg:'已输入 <span style="color:red; font-weight: 700;font-size: 13px; ">{#count}</span> 个字符，剩余 {#leave}'
    };
    var ue = UE.getEditor('editor');
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})



