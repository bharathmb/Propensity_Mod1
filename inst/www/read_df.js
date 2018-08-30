//init this script when the page has loaded
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
      });
    }).fail(function(){
      alert("Server error: " + req.responseText);
    });        
  }
  
  $("#submitbutton").on("click", function(){
    
	 
        //disable the button to prevent multiple clicks
        $("#submitbutton").attr("disabled", "disabled");
        
        //create the plot area on the plotdiv element
        var req = $("#plotdiv").rplot("bostonhist", {
          variable : $("#variable").val(),
    
    uploadcsv(filename);        
  });
  
  function addOption(selectbox,text,value )
	{
		var optn = document.createElement("OPTION");
		optn.text = text;
		optn.value = value;
		selectbox.options.add(optn);
	}
	
	$("#addOption_list").on("click",function (){
	var req = ocpu.rpc("imp_var_list",{
		target.var.name : "diabeties"
		},function(output)
		{
		var vars=Object.values(output);
		alert("imp_var_list equals: " + output);
		});
		req.fail(function(){
		alert("R returned an error: " + req.responseText);
		});
	for (var i=0; i < vars.length;++i){
	addOption(document.drop_list.DropList, vars[i], vars[i]);
	}
});