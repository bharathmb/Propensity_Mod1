$(document).ready(function(){	
  
  $("#show_perf").on("click", function(){
    
	alert("inside Ensemble Model....");
	    $("#show_perf").attr("disabled", "disabled");  
	
	//Check which model is selected
	var dvname=$("#dvname").val()
	
	var isChecked=""
	
	if($('#select-1').prop('checked')==true)
		{
		 isChecked="select-1"
		} else if($('#select-2').prop('checked')==true)
		{
		 isChecked="select-2"
		} else if($('#select-3').prop('checked')==true)
		{
		 isChecked="select-3"
		} else if($('#select-4').prop('checked')==true)
		{
		 isChecked="select-4"
		} else if($('#select-5').prop('checked')==true)
		{
		 isChecked="select-5"
		} else if($('#select-6').prop('checked')==true)
		{
		 isChecked="select-6"
		}
		else if($('#select-7').prop('checked')==true)
		{
		 isChecked="select-7"
		}
		
		alert(isChecked);

		
    //perform the request
    var req = ocpu.call("modelling_module", {
      "DV" : dvname, "model_selection" :  isChecked
    }, function(session){
		//get results and display
		alert("Model Done");
    });
    
    //if R returns an error, alert the error message
    req.fail(function(){
      alert("Server error: " + req.responseText);
    });
    
    //after request complete, re-enable the button 
    req.always(function(){
      $("#show_perf").removeAttr("disabled")
    });   

  });


  });

