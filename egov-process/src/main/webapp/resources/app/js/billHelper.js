jQuery('#btnsearch').click(function(e) {
		
		callAjaxSearch();
	});
	
	function getFormData($form){
		console.log("hellp");
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
 
function callAjaxSearch() {
	drillDowntableContainer = jQuery("#resultTable");		
	console.log("hellp"+drillDowntableContainer);
	jQuery('.report-section').removeClass('display-hide');
		reportdatatable = drillDowntableContainer
			.dataTable({
				ajax : {
					url : "/egov-process/bill/ajaxsearch/"+$('#mode').val(),      
					type: "POST",
					"data":  getFormData(jQuery('form'))
				},
				"fnRowCallback": function (row, data, index) {
						$(row).on('click', function() {
				console.log(data.id);
				window.open('/egov-process/bill/'+ $('#mode').val() +'/'+data.id,'','width=800, height=600');
			});
				 },
				"sPaginationType" : "bootstrap",
				"bDestroy" : true,
				"sDom" : "<'row'<'col-xs-12 hidden col-right'f>r>t<'row'<'col-xs-3'i><'col-xs-3 col-right'l><'col-xs-3 col-right'<'export-data'T>><'col-xs-3 text-right'p>>",
				"aLengthMenu" : [ [ 10, 25, 50, -1 ], [ 10, 25, 50, "All" ] ],
				"oTableTools" : {
					"sSwfPath" : "../../../../../../egov-process/resources/global/swf/copy_csv_xls_pdf.swf",
					"aButtons" : [ "xls", "pdf", "print" ]
				},
				aaSorting: [],				
				columns : [ { 
"data" : "fund", "sClass" : "text-left"} ,{ 
"data" : "department", "sClass" : "text-left"} ,{ 
"data" : "billNumber", "sClass" : "text-left"} ,{ 
"data" : "billDate", "sClass" : "text-left"} ,{ 
"data" : "billAmount", "sClass" : "text-right"} ,{ 
"data" : "billType", "sClass" : "text-left"}]				
			});
			}	$("#addrow").click(function(event) {
		addRow();
	});

function addRow()
{
	var rowCount = $('#result tr').length;
	var content = $('#resultrow0').html();
	resultContent = content.replace(/0/g, rowCount - 1);
	// $(resultContent).find("input").val("");
	$(resultContent).find("select").val("true");
	$(resultContent).find("input[type='text']").val("");
	$('#result > tbody:last').append("<tr>" + resultContent + "</tr>");
	$('#result tr:last').find("input").val("");	
	patternvalidation();
}
//enable this to implement delete function . use the appropriate id and url
