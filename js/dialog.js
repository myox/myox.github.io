'use strict';

(function() {
    
    $(document).ready(function () {
 
        tableau.extensions.initializeDialogAsync().then(function (openPayLoad) {
            
            $("#configSubmit").click(function () {
                
                var input = $("#config-dbName").val();
                
                tableau.extensions.settings.set('dbName', input);
                
                tableau.extensions.settings.saveAsync().then(function() {
                    tableau.extensions.ui.closeDialog(input);
                    $('#inactive').hide();

                }, function(err) { 
                    console.log('Error on saveAsync: ' + err.message)
                });
            });
        });
    }); 
})();