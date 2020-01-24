$(document).ready(function() {

    tableau.extensions.initializeAsync({'configure': configure}).then(function() {
        
        
    function configure () {
        // This uses the window.location.origin property to retrieve the scheme, hostname, and
        // port where the parent extension is currently running, so this string doesn't have
        // to be updated if the extension is deployed to a new location.
        const popupUrl = "https://myox.github.io/dialog.html";

        /**
         * This is the API call that actually displays the popup exten  sion to the user.  The
         * popup is always a modal dialog.  The only required parameter is the URL of the popup,
         * which must be the same domain, port, and scheme as the parent extension.
         *
         * The developer can optionally control the initial size of the extension by passing in
         * an object with height and width properties.  The developer can also pass a string as the
         * 'initial' payload to the popup extension.  This payload is made available immediately to
         * the popup extension.  In this example, the value '5' is passed, which will serve as the
         * default interval of refresh.
         */
        tableau.extensions.ui.displayDialogAsync(popupUrl, { height: 500, width: 500 }).then((closePayload) => {
        // The promise is resolved when the dialog has been expectedly closed, meaning that
        // the popup extension has called tableau.extensions.ui.closeDialog.
            $('#inactive').hide();
            $('#active').show();

            // The close payload is returned from the popup extension via the closeDialog method.
            var dashboard = closePayload;
            var sheet = tableau.extensions.dashboardContent.dashboard.name
        
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
                alert("Error during configuration: " + error.toString());
            }
        });
    }
    //initialisation error
    }, function(err) {
                alert("Error while Initializing: " + err.toString());
            });
        
});
