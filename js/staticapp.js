'use strict';

(function () {

    $(document).ready(function() {

        tableau.extensions.initializeAsync({'configure': configure}).then(function() {
            
            const savedDbName = tableau.extensions.settings.get('dbName')
            
            if(savedDbName == undefined || savedDbName =="" || savedDbName == null) {
                configure()
            } else {
                $('#placeholder').hide();
            }
            
            submit(savedDbName)

            let extensionName = ["Panel"]; 

            tableau.extensions.dashboardContent.dashboard.objects.forEach(function(object){
                if(extensionName.includes(object.name)){
                extensionVisibilityObject[object.id] = tableau.ZoneVisibilityType.Hide;
                }else if(wikiZone.includes(object.name)){
                wikiVisibilityObject[object.id] = tableau.ZoneVisibilityType.Hide;
                extensionVisibilityObject[object.id] = tableau.ZoneVisibilityType.Hide;
                }
            });  

            tableau.extensions.dashboardContent.dashboard.setZoneVisibilityAsync(extensionVisibilityObject).then(() => {
                console.log("done");
            }).then(()=>{
                worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(ws => ws.name === "State Map");
                worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, selection)
            })

            function selection(data) {
                data.getMarksAsync().then(marks => {
                    if (marks.data[0].data.length === 1) {
                    toggleWikiVisibility(tableau.ZoneVisibilityType.Show);
                    } else {
                    toggleWikiVisibility(tableau.ZoneVisibilityType.Hide); 
                    }
                })
            }

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
            //hides placeholder when dbname is inputted in Tableau Desktop config
            $('#placeholder').hide();
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

