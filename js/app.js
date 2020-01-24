'use strict';

(function () {

    $(document).ready(function() {

        tableau.extensions.initializeAsync({'configure': configure}).then(function() {
            
            const savedDbName = tableau.extensions.settings.get('dbName')
            
            if(savedDbName) {
            } else {
                configure();
            }

            }, function(err) {
                alert("Error while Initializing: " + err.toString());
           
        });
    });
            

    function configure () {

        const popupUrl = 'https://myox.github.io/dialog.html';

        tableau.extensions.ui.displayDialogAsync(popupUrl).then((closePayload) => {
        
            //---Removed because live extension will always initialise without configuration 
            //$('#inactive').hide();
            // $('#active').css("display", "block")

            var sheet = tableau.extensions.dashboardContent.dashboard.name;
        
            $("#submitBtn").click(function(){
                var text = $("#bodyTxt").val();
                var url = 'https://script.google.com/a/my.shu.ac.uk/macros/s/AKfycbxWglAuwM3dkF2rFDc4zDXcHUuXyn3EgtVvaar1kSnKG4qalkGf/exec';

                $.post(url,{data: text, data2: sheet, data3: savedDbName});

            }); 
        
        // configuration error 
        }).catch((error) => {
            // One expected error condition is when the popup is closed by the user (meaning the user
            // clicks the 'X' in the top right of the dialog).  This can be checked for like so:
            switch (error.errorCode) {
                case tableau.ErrorCodes.DialogClosedByUser:
                console.log('Dialog was closed by user');
                break;
                default:
                console.error(error.message);
            }
        });
    }
})();

