$(document).ready(function(){	
  
  $("#show_perf").on("click", function(){
    
	alert("inside Ensemble Model....");
	    $("#show_perf").attr("disabled", "disabled");  
	
	//Check which model is selected
	var dvname=$("#dvname").val()
	
	var isChecked = $('#select-1').prop('checked');

		
    //perform the request
    var req = ocpu.call("modelling_module", {
      "DV" : dvname, "model_selection" :  "select-1"
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

