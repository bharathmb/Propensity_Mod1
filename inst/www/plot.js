$(document).ready(function(){
  	
		
  
  $("#submitbutton").on("click", function(){
    
	alert("inside plot script....");

	
	    //var nfield = parseInt($("#nfield").val());
        //var distfield = $("#distfield").val();
        
        //create the plot area on the plotdiv element
	  alert("plotting");
        var req = $("#plotdiv").rplot("randomplot")

        //if R returns an error, alert the error message
        req.fail(function(){
          alert("Server error: " + req.responseText);
        });
        
        //after request complete, re-enable the button 
        req.always(function(){
          $("#submitbutton").removeAttr("disabled")
        });

  });


  });

