$(document).ready(function(){
  
  function uploadcsv(filename){
	 alert("inside uploadcsv....");
    //disable the button during upload
    $("#submitbutton").attr("disabled", "disabled");        

    //perform the request
    var req = ocpu.call("read_csv", {
      file : filename
    }, function(session){
      //on success call printsummary()
      printsummary(session);
    });
    
    //if R returns an error, alert the error message
    req.fail(function(){
      alert("Server error: " + req.responseText);
    });
    
    //after request complete, re-enable the button 
    req.always(function(){
      $("#submitbutton").removeAttr("disabled")
    });        
  }    
  
  
  function printsummary(mydata){
	  alert("inside printsummary....");
    //perform the request
    var req = ocpu.call("printsummary", {
      df_full : mydata
    }, function(session){
      session.getConsole(function(output){
        $("#output code").text(output);		
     
    }).fail(function(){
      alert("Server error: " + req.responseText);
    });        
  });
  }
  
  
		//Adding code for var_list call
	
		function add_var_list()
			{
				alert("inside Add Options");
				var vars;
				var req = ocpu.call("imp_var_list", {
				"target.var.name" : "diabeties"
			}, 
			function(session){
				session.getObject(function(data){
				$("#output code").text(data);	
				// vars = $("#output").text(outtxt); 
				//for (var i=0; i < data.length;++i){
				//addOption(document.drop_list.DropList, data[i], data[i]);
				}
				)
			}
			alert("imp_var_list equals: " );
			);
				req.fail(function(){
					alert("R returned an error in var_list: " + req.responseText);
					});
				
				}
				
	
		//VAR LIST CALL ENDS
  
  $("#submitbutton").on("click", function(){
    
	alert("inside script....");
    //arguments
    //read the value for 'filename'
	var filename = $("#uploadFile").val();
    
    if(!filename){
      alert("No file selected.");
      return;
    }
    
    uploadcsv(filename);        
  });


  });

