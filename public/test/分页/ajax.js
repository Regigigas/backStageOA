// url :请求路径
// callback :  该参数是一个函数，回调函数
// data :  接口的参数
function ajaxGet(url,callback,data){
	var ajax = null;
	if( window.XMLHttpRequest ){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(arguments.length == 3){//表示传递的参数有三个  
		url = url + "?" + data;
	}
	ajax.open("GET",url,true);
	ajax.onreadystatechange = function(){
		if( ajax.readyState == 4 && ajax.status == 200 ){
			if(callback){
				callback(ajax.responseText);//通过函数的调用将服务器处理的结果以参数形式传递给前端
			}	 
		}
	}
	ajax.send(); 
}

function ajaxPost(url,callback,data){
	var ajax = null;
	if( window.XMLHttpRequest ){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	ajax.open("POST",url);
	
	//设置请求头：
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			callback(ajax.responseText);
		}
	}	
	ajax.send(data);//向服务器端发送数据 用户名
}
