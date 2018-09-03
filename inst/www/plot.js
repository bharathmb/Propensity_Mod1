$(document).ready(function(){
  	
		
  
  $("#submitbutton").on("click", function(){
    
	alert("inside script....");
    //arguments
    //read the value for 'filename'
	var filename = $("#uploadFile").val();
	dvname=$("#dvname").val()
    
    if(!filename){
      alert("No file selected.");
      return;
    }

	
	if(!dvname){
      alert("Please provide DV name.");
      return;
    }
	
	    //var nfield = parseInt($("#nfield").val());
        //var distfield = $("#distfield").val();
        
        //create the plot area on the plotdiv element
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

