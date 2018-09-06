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
	
		//FUNCTION CALLS TO SIGNIFICANT VARIABLE LIST & GRAPHS PLOTS
	  plot_graph();
      	  add_var_list();
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
				var req = ocpu.call("imp_var_list", {	"target.var.name" : dvname	}, 
			function(session){
				session.getObject(function(data){
				//$("#output code").text(data);	
				alert("imp_var_list ends: trying to append" );
				
				for (var i=0; i < data.length;++i)
				{
					alert("inside_for " + i);
					var x = document.getElementById("DropList");
					var option = document.createElement("option");
					option.text = data[i];
					
					x.add(option);
					
					alert("option " + i + " added")
					
					//addOption(document.DropList, data[i], data[i]);
					
				}
				document.getElementById('DropList').onchange = function () {
					//document.getElementById("message").innerHTML = "Having a Baby!!";
					var x = document.getElementById("DropList").selectedIndex;
					var y = document.getElementById("DropList").options;
					
						plot_graph_variable(y[x].text);
					
				};
				//plot_graph_variable()

				}).fail(function(){
					alert("R returned an error in var_list: " + req.responseText);
					});
				});
				
				}
				
	
		//VAR LIST CALL ENDS
		
		//Adding COde for Significant variables graph
				function plot_graph()
			{
				alert("inside Plot graph");
				
				var req = $("#plotdiv1").rplot("randomplot", {	nfield : 100, distfield : "normal"})
				
				var req = $("#plotdiv1").rplot("top_var_graph", {"target.var.name" : dvname});
				
				//if R returns an error, alert the error message
				req.fail(function(){
				alert("Server error: " + req.responseText);
				});
				
				//after request complete, re-enable the button 
				req.always(function(){
				$("#submitbutton").removeAttr("disabled")
				});
				alert("plotted");
		
			// var req = ocpu.call("top_var_graph", {
			//	"target.var.name" : dvname;
			//}, 
			//function(session){
			//	session.getObject(function(data){
			//	//$("#output code").text(data);	
			//	alert("trying to plot" );
			//	$("#plotdiv").rplot(req);
            //
			//	}).fail(function(){
			//		alert("R returned an error in graph: " + req.responseText);
			//		});
			//	});
				
			}
			//SIGNIFICANT GRAPH CALL ENDS
	
		function plot_graph_variable(data)
			{
				alert("inside variable Plot graph");
				
				//var req = $("#plotdiv").rplot("randomplot", {	nfield : 100, distfield : "normal" , title : data})
				
				var req = $("#plotdiv").rplot("variable_profiling_function", {"dv" : dvname, "var": data});
				
				//if R returns an error, alert the error message
				req.fail(function(){
				alert("Server error: " + req.responseText);
				});
				
				//after request complete, re-enable the button 
				req.always(function(){
				$("#submitbutton").removeAttr("disabled")
				});
				alert("plotted");
		
			// var req = ocpu.call("top_var_graph", {
			//	"target.var.name" : dvname;
			//}, 
			//function(session){
			//	session.getObject(function(data){
			//	//$("#output code").text(data);	
			//	alert("trying to plot" );
			//	$("#plotdiv").rplot(req);
            //
			//	}).fail(function(){
			//		alert("R returned an error in graph: " + req.responseText);
			//		});
			//	});
				
			}
		
  
  $("#submitbutton").on("click", function(){
    
	alert("inside script....");
    //arguments
    //read the value for 'filename'
	//var filename = $("#uploadFile").val();
	  var filename = $("#uploadFile")[0].files[0];
	dvname=$("#dvname").val()
    
    if(!filename){
      alert("No file selected.");
      return;
    }
	
	
	
	if(!dvname){
      alert("Please provide DV name.");
      return;
    }
  
	uploadcsv(filename); 
  });


  });

