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

## Storage Data Structure
![Image](https://user-images.githubusercontent.com/69044956/111890518-6f5ca200-89c0-11eb-96f2-2085df9fca20.png)
  * There is a separate object created for each data entry
  * Events are sub-objects, referencing their 24h value as the entry key
