//init this script when the page has loaded
$(document).ready( function(){
  
  
	// function removeOptions(selectbox)
	//{
	//	var i;
	//	for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
	//	{
	//		selectbox.remove(i);
	//	}
	//}
	//using the function:

	function addOption(selectbox,text,value )
	{
		var optn = document.createElement("OPTION");
		optn.text = text;
		optn.value = value;
		selectbox.options.add(optn);
	}

	$("#addOption_list").on("click",function (){
	var vars = ["glu","age","npreg","skin","bmi"];

	for (var i=0; i < vars.length;++i){
	addOption(document.drop_list.DropList, vars[i], vars[i]);
	}
	var varsValue=document.getElementById('DropList').value;
	switch(varsValue){
		case "glu":
		break;
		case "age":
		break;
		case "npreg":
		break;
		case "skin":
		break;
		case "bmi":
		break;
		
	}
	
	});
	
	//$("#addOption_list").on("click",function (){
	////document.getElementById("DropList").innerHTML = "";
	//
	//var vars = ["glu","age","npreg","skin","bmi"];
	////removeOptions(document.getElementById("DropList"));
	//
	//for (var i=0; i < vars.length;++i){
	//addOption(document.drop_list.Variables, vars[i], vars[i]);
	//}
	//if (document.getElementById('DropList').value == "npreg") {
	//	alert("In GLU")
	//}
	//else if (document.getElementById('DropList').value == "skin"){
	//	alert("In Skin")
	//}
	//
	//
	//});
	
	$("#drop_List").on("click",function(){
		var cSelect = document.getElementById("DropList"); 
		 while (cSelect.options.length > 0) { 
		 cSelect.remove(0); 
		 } 
		 adding()
	});
	// Create mock data
	var firstDataSet = [0, 2, 4, 6, 8, 10, 12, 14];
	var secondDataSet = [0, 1, 2, 3, 4, 5, 6, 7];

	// Create chart
	var myConfig = {
	  type: 'line',
	  plot: {
		  animation:{
			effect: 4,
			method: 0,
		  speed: 500,
			sequence: 1
		  }
		},
	  scaleY: {
		values: '0:14:2'
	  },
	  series: [
		{
		  values: null
		}
	  ]
	};

	zingchart.render({
	  id: 'myChart',
	  data: myConfig
	});

	// Grab <select> element from the DOM
	var select = document.querySelector('select[name="chart-selector"]');

	// Add event listener to fire on each selection
	select.addEventListener('change', function() {
	  if (event.target.value == '0') {
		zingchart.exec('myChart', 'setseriesvalues', {
		  plotindex: 0,
		  values: firstDataSet
		});
	  } else if (event.target.value == '1') {
		zingchart.exec('myChart', 'setseriesvalues', {
		  plotindex: 0,
		  values: secondDataSet
		});
	  } else {
		alert('Please Select An Option');
	  }
	});
 
   });

