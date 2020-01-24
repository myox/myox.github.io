'use strict';

(function () {

    $(document).ready(function() {

        tableau.extensions.initializeAsync({'configure': configure}).then(function() {
        
            configure();
            
            // }, function(err) {
            //         alert("Error while Initializing: " + err.toString());
            //     });
        });
    });
            

    function configure () {

        const popupUrl = 'https://myox.github.io/dialog.html';

        tableau.extensions.ui.displayDialogAsync(popupUrl).then((closePayload) => {
        
            $('#inactive').hide();
            //doesn't work because doesn't display when put live!
            // $('#active').css("display", "block")

            var dashboard = closePayload;
            var sheet = tableau.extensions.dashboardContent.dashboard.name;
        
            $("#submitBtn").click(function(){
                var text = $("#bodyTxt").val();
                var url = 'https://script.google.com/a/my.shu.ac.uk/macros/s/AKfycbxWglAuwM3dkF2rFDc4zDXcHUuXyn3EgtVvaar1kSnKG4qalkGf/exec';

                $.post(url,{data: text, data2: sheet, data3: dashboard});

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

