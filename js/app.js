$(document).ready(function() {

    tableau.extensions.initializeAsync().then(function() {
        
        var sheet = tableau.extensions.dashboardContent.dashboard.name
        
        $("#submitBtn").click(function(){
            var text = $("#bodyTxt").val();
            var url = 'https://script.google.com/a/my.shu.ac.uk/macros/s/AKfycbxWglAuwM3dkF2rFDc4zDXcHUuXyn3EgtVvaar1kSnKG4qalkGf/exec';

            $.post(url,{data: text, data2: sheet});
            
        }); 
    }, function(err) {
            alert("Error while Initializing: " + err.toString());
        });
});
