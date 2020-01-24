'use strict';

(function() {
    
    $(document).ready(function () {
        // The only difference between an extension in a dashboard and an extension
        // running in a popup is that the popup extension must use the method
        // initializeDialogAsync instead of initializeAsync for initialization.
        // This has no affect on the development of the extension but is used internally.
        tableau.extensions.initializeDialogAsync().then(function (openPayLoad) {
            
            $("#configSubmit").click(function () {
                
                var dbName = $("#config-dbName").val();
                
                tableau.extensions.ui.closeDialog(dbName);
            });
        });
    }); 

});