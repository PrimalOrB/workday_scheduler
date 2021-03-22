    // Initialize with empty array
var eventData = [];
    // If localStorage key exists, set existing data to eventData
if( localStorage.getItem( 'workday-scheduler' ) ) {
    eventData = JSON.parse( localStorage.getItem( 'workday-scheduler') )
} ;

    // global display date
var displayDate, 
    offset = 0

    // Initial date
function setInitialDate() {
    var current = moment()
    return current
};

    // Genetate Nav 
function generateNav( date ) {
            // generate nav with back, current date, forward
         var backDiv = $( '<div>' )
         .addClass( 'backBtn d-flex justify-content-end col-sm-auto' )
         .attr( 'data-action', '-1' )
         .html( '<i class="fas fa-chevron-left"></i>' );
     var dateDiv = $( '<div>' )
         .addClass( 'dateID col-2')
         .text( date );   
     var fwdDiv = $( '<div>' )
         .addClass( 'fwdBtn d-flex justify-content-start col-sm-auto')
         .attr( 'data-action', '1' )
         .html( '<i class="fas fa-chevron-right"></i>' );
            // container for the nav items
     var navDiv = $( '<div>' )
         .addClass( 'navDiv row d-flex justify-content-center align-items-center' )
         .append( backDiv )
         .append( dateDiv )
         .append( fwdDiv );
            // add to bottom of jumbotron
     $( '.jumbotron' )
         .remove( navDiv )
         .append( navDiv );
}

    // Generate HTML Elements
function generateHTML( date ) {
        // set initial date displayed
    displayDate = date.format( 'MM/DD/YYYY' );

    $( '.dateID' )
        .text( displayDate );

        // list for time entries
    var list = $( '<ul> ')
        .addClass( 'times-list');
   
        // get each date event for the date to display
    var displayEvents = getEntries( displayDate );
        // if selected date does not exist, create a new "dummy" date to add to the array, and reload entries
    if( !displayEvents.length ) {
        newEmptyDate( displayDate )
        displayEvents = getEntries( displayDate )
    };

        // separate the events into their own variable
    var dateEvents = displayEvents[0].events;

        // for each event entry, create li item
    $.each( dateEvents, function( a, b) {
            // moment time set from storage entry
        var momentTime = date.clone().set({'hour': a, 'minute': 0, 'second': 0})

            // check difference from now to listing time
        var difference = moment( momentTime ).diff( setInitialDate() , 'hours')

            // colourSetting variable based on value of difference
        var colourSetting
        if( difference < 0 ) {
            colourSetting = 'past'
        } else if (difference === 0) {
            colourSetting = 'present'
        } else {
            colourSetting = 'future'
        }

            // time
        var timeText = $( '<p>' )
            .text( momentTime.format('h a') );
        var time = $( '<div>' )
            .addClass( 'hour d-flex justify-content-center align-items-center col-1' )
            .append( timeText );

            // event
        var eventText = $( '<p>' )
            .text( b );
        var event = $( '<div>' )
            .addClass( `description py-2 px-2 col ${colourSetting}` )
            .append( eventText );  
        
            // save / delete buttons
        var saveBton = $( '<div>' )
            .addClass( 'action px-2 py-2' )   
            .attr( 'data-action', 'save' ) 
            .html( '<i class="fas fa-save"></i>' );
        var deleteBtn = $( '<div>' )
            .addClass( 'action px-2 py-2' )
            .attr( 'data-action', 'delete' ) 
            .html( '<i class="fas fa-trash-alt"></i>' );
        var btnDiv = $( '<div>' )
            .addClass( 'btnDiv d-flex justify-content-around align-items-center col-1' )
            .append( saveBton )
            .append( deleteBtn );
   
            // row
        var li = $( '<li>' )
            .addClass( 'row' )
            .attr( 'data-id', a )
            .append( time )
            .append( event )
            .append( btnDiv );

            // append row to list    
        list.append( li );   
    })    

        // add list to container
    $( '.container' )
        .html( '' )
        .append( list );
}

    // Change dates
function changeDate() {
        // set date as initial date, plus or minus offset value in days
    displayDate = moment( setInitialDate() ).add( offset, 'd');
    generateHTML( displayDate );
}

    // Edit entry
$( '.container' ).on( 'click', '.description', function() {
        // get current text
    var text = $(this)
        .text()
        .trim();
        // create textarea and add existing text
    var textInput = $( '<textarea>' )
        .addClass('form-control')
        .val(text)
        // set html of area as textInput
    $(this).html(textInput) 
        // focus on new textInput
    textInput.trigger('focus'); 
})

    // Save entry
$( '.container' ).on( 'click', '.action[data-action="save"]', function() {
        // get data ID of line corresponding to time
    var lineID = $(this)
        .closest( 'li' )
        .data( 'id' );
        // get text element
    var textInput = $(this)
        .closest( 'li' )
        .find( '.form-control');
        // get text value
    var textVal = textInput.val().trim();
        // create new p element and set text
    var p = $( '<p>' )
        .text( textVal )
        // replace textarea with p element
    textInput.replaceWith(p)

        // find index of date in events array
    var dateIndex = eventData.findIndex(x => x.date === displayDate);
        // set current text to event listing
    eventData[dateIndex].events[lineID] = textVal;

        // stringify and set to localstorage
    var eventsStorage = JSON.stringify( eventData )
    localStorage.setItem( 'workday-scheduler', eventsStorage)
} )

    // Get entries by date 
function getEntries( date ) {
    var output = $.grep( eventData, function( obj ) {
        var dateData = obj.date == date
        return dateData
    })
    return output
};

    // listen to date forward / back buttons
$( '.jumbotron' ).on( 'click', '.backBtn, .fwdBtn', function () {
    var value = $(this).data('action') 
    offset = offset + value
    changeDate( offset )
});

    // create new array entry
function newEmptyDate( input) {
    var blank = {date: input,     events: {
        9: '',
        10: '',
        11: '',
        12: '',
        13: '',
        14: '',
        15: '',
        16: '',
        17: '',
        }
    }
        // push new object to array
    eventData.push( blank )
        // stringify and set to storage
    var eventsStorage = JSON.stringify( eventData )
    localStorage.setItem( 'workday-scheduler', eventsStorage)
};

    // run generate
generateNav( setInitialDate() )
generateHTML( setInitialDate() )

    // hover effects for save/delete button
$( 'li' )
    .find( '.action' )
    .hover( function() {
            // find button action
        var action = $(this)
            .data('action')
            // depending whether save or delete, choose background color
        if( action === 'save' ) {
                action = 'bg-success'
            } else if ( action === 'delete' ) {
                action = 'bg-danger'
            }
            // find button upper div and set background
        $(this)
            .closest( '.btnDiv')
            .addClass( action )
    }, function() {
            // remove hover classes from div hover
        $( this )
            .closest( '.btnDiv')
            .removeClass( 'bg-success bg-danger' ) 
    });    