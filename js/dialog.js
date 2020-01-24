'use strict';

(function() {
    
    $(document).ready(function () {
 
        tableau.extensions.initializeDialogAsync().then(function (openPayLoad) {
            
            $("#configSubmit").click(function () {
                
                var dbName = $("#config-dbName").val();
                
                tableau.extensions.ui.closeDialog(dbName);
            });
        });
    }); 
})();