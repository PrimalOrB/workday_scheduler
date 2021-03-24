# Work Day Scheduler

## Purpose

A daily calendar for your work day, allowing you to save and delete tasks for hourly blocks of time. Your data is persisted in local storage

## Image
![image](https://user-images.githubusercontent.com/69044956/112237020-2868e980-8c18-11eb-9206-90b1e1cb1d48.png)

## Built With

- HTML
- jQuery
- Bootstrap CSS
- CSS
- [Moment.js](https://momentjs.com/)

## Website
https://primalorb.github.io/workday_scheduler/

## Application Flow
* Pull data from localStorage
  * If data does not exist, create placeholder array entry for current date
 
* Load Current Date
  * Each time block can be clicked on to enter text
  * You can then save, or delete any time event.
  * Saves/Delete process updates the localStorage data
  
* Forawrd / Back Date
  * If you have open text fields, an error is thrown
  * If data does not exist, create placeholder array entry for new date page
 
* Conditional Formatting
  * Line items will update to past / current / future status by changing color
  * Time is referenced using Moment.js
  * Formatting is refreshed automatically every 20 minutes, so you can leave this window open all the time and still have up to date formatting
