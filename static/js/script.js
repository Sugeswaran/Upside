$(document).ready(function(){
	
		 $("#pass1_id").blur(function(){
			 var e=$("#pass_id").val();
			var	s=$("#pass1_id").val();
			if(e===s) {
				alert("equal");
			} else {
				alert("Not Equal");
			}
	
		});
});
