$(document).ready(function(){
	alert("Encrypted key is sended to your mail!");
		 $("#pass1_id").blur(function(){
			 var e=$("#pass_id").val();
			var	s=$("#pass1_id").val();
			if(e===s) {
				//alert("equal");
			} else {
				alert("Password's are Not Equal");
			}
	
		});
});
