'use strict';

(function () {

    $(document).ready(function() {

        tableau.extensions.initializeAsync({'configure': configure}).then(function() {
            
            const savedDbName = tableau.extensions.settings.get('dbName')
            
            if(savedDbName) {
                $('#inactive').hide();
            } else {
                configure()
            }

            submit(savedDbName)

            }, function(err) {
                alert("Error while Initializing: " + err.toString());    
        });
    });
    
    function submit(dbName) {
        $("#submitBtn").click(function(){
            var sheet = tableau.extensions.dashboardContent.dashboard.name;
            var text = $("#bodyTxt").val();
            var url = 'https://script.google.com/a/my.shu.ac.uk/macros/s/AKfycbxWglAuwM3dkF2rFDc4zDXcHUuXyn3EgtVvaar1kSnKG4qalkGf/exec';
            
            $.post(url,{data: text, data2: sheet, data3: dbName});

            $("#bodyTxt").val('');
            
        }); 
    }

    function configure () {

        const popupUrl = 'https://myox.github.io/dialog.html';

        tableau.extensions.ui.displayDialogAsync(popupUrl).then((closePayload) => {
        
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

    //blurs modal after clicks
    $('body').on('hidden.bs.modal', '.modal', function() {
        $('.btn').blur();
    }); 

})();

