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
        .addClass( 'backBtn d-flex justify-content-end col-sm-auto' )
        .html( '<i class="fas fa-chevron-left"></i>' );
    var dateDiv = $( '<div>' )
        .addClass( 'dateID col-2')
        .text( displayDate );   
    var fwdDiv = $( '<div>' )
        .addClass( 'fwdBtn d-flex justify-content-start col-sm-auto')
        .html( '<i class="fas fa-chevron-right"></i>' );
        // container for the nav items
    var navDiv = $( '<div>' )
        .addClass( 'navDiv row d-flex justify-content-center align-items-center' )
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
        
        // save / delete buttons
        var saveBton = $( '<div>' )
            .addClass( 'action px-2 py-2' )   
            .attr( 'data-action', 'save' ) 
            .html( '<i class="fas fa-save"></i>' );
        var deleteBtn = $( '<div>' )
            .addClass( 'action px-2 py-2' )
            .attr( 'data-action', 'delete' ) 
            .html( '<i class="fas fa-trash-alt"></i>' )
        var btnDiv = $( '<div>' )
            .addClass( 'btnDiv d-flex justify-content-around align-items-center col-1' )
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
    })      