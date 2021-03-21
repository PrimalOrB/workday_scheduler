// Sample Data Array

var eventData = [
    {date: 'today',     events: {
        9: 't9',
        10: '',
        11: '',
        12: 't12',
        13: '',
        14: '',
        15: 't15',
        16: '',
        17: '',
        }
    },
    {date: 'tomorrow',     events: {
        9: '',
        10: 't10',
        11: '',
        12: '',
        13: 't13',
        14: '',
        15: '',
        16: 't16',
        17: '',
        }
    }
]

// Generate HTML Elements
function generateHTML() {
        // date to display
    var displayDate = 'today'

        // generate nav with back, current date, forward
    var backDiv = $( '<div>' )
        .addClass( 'd-flex justify-content-end col-1' )
        .html( '<i class="fas fa-chevron-left"></i>' );
    var dateDiv = $( '<div>' )
        .addClass( 'col-1')
        .text( displayDate );   
    var fwdDiv = $( '<div>' )
        .addClass( 'd-flex justify-content-start col-1')
        .html( '<i class="fas fa-chevron-right"></i>' );
        // container for the nav items
    var navDiv = $( '<div>' )
        .addClass( 'row d-flex justify-content-center align-items-center' )
        .append( backDiv )
        .append( dateDiv )
        .append( fwdDiv );
        // add to bottom of jumbotron
    $( '.jumbotron' )
        .append( navDiv )    

        // list for time entries
    var list = $( '<ul> ')
        .addClass( 'times-list')
   
        // get each date event for the date to display
    var displayEvents = $.grep( eventData, function( obj ) {
        var dateData = obj.date == displayDate
        return dateData
    })
        // separate the events into their own variable
    var dateEvents = displayEvents[0].events

        // for each event entry, create li item
    $.each( dateEvents, function( a, b) {
        // moment time set from storage entry
        var momentTime = moment().set({'hour': a, 'minute': 0, 'second': 0}).format('h a')

        // time
        var timeText = $( '<p>' )
            .text( momentTime )
        var time = $( '<div>' )
            .addClass( 'hour d-flex justify-content-center align-items-center col-1' )
            .append( timeText );

        // event
        var eventText = $( '<p>' )
            .text( b );
        var event = $( '<div>' )
            .addClass( 'description py-2 px-2 col future' )
            .append( eventText );  
        
        // save button
        var saveBton = $( '<div>' )
            .addClass( 'saveAction px-2 py-2' )    
            .html( '<i class="fas fa-save"></i>' );
        var deleteBtn = $( '<div>' )
            .addClass( 'deleteAction px-2 py-2' )
            .html( '<i class="fas fa-trash-alt"></i>' )
        var btnDiv = $( '<div>' )
            .addClass( 'saveBtn d-flex justify-content-around align-items-center col-1' )
            .append( saveBton )
            .append( deleteBtn )
        
        // row
        var li = $( '<li>' )
            .addClass( 'row' )
            .attr( 'data-id', a )
            .append( time )
            .append( event )
            .append( btnDiv )

        // append row to list    
        list.append( li )    
    })    

        // add list to container
    $( '.container' )
    .append( list )
}

// run generate
generateHTML()