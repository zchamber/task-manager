// Get the current date and time using the Day.js library
const today = dayjs();

// Reference the container element that holds the time blocks
const timeBlockEl = document.querySelector('.container');

// Function to update the current date and time display
function updateCurrentTime() {
  // Update the element with id "currentDay" to display the current date and time
  $('#currentDay').text(dayjs().format('MMMM D, YYYY, hh:mm A'));
}

// Call the updateCurrentTime function to initially display the current date and time
updateCurrentTime();

// Set up an interval to update the current date and time every minute
setInterval(updateCurrentTime, 60000);

// Event listener for the save button click
$('.saveBtn').on('click', function () {
  // Get the value of the description from the sibling element with class "description"
  const textValue = $(this).siblings('.description').val();
  // Get the id attribute of the parent div element (time block)
  const timeKey = $(this).parent().attr('id');

  // Save the description text in local storage with the time block id as the key
  localStorage.setItem(timeKey, textValue);
});

// Retrieve tasks from local storage and populate the description fields
$('.time-block').each(function () {
  // Get the id attribute of the current time block
  const timeId = $(this).attr('id');

  // Set the value of the description field from local storage based on the time block id
  $(this).find('.description').val(localStorage.getItem(timeId));
});

// Function to update the colors of time blocks based on their relation to the current time
function auditTask() {
  // Get the current hour
  const currentHour = today.hour();

  // Loop through each time block
  $('.time-block').each(function () {
    // Extract the hour from the time block id
    const timeId = parseInt($(this).attr('id').split("hour")[1]);

    // Check if the time block is in the past, present, or future relative to the current hour
    if (timeId < currentHour) {
      $(this).addClass('past'); // Add the "past" class
    } else if (timeId === currentHour) {
      $(this).removeClass('past'); // Remove "past" class
      $(this).removeClass('future'); // Remove "future" class
      $(this).addClass('present'); // Add the "present" class
    } else {
      $(this).removeClass('past'); // Remove "past" class
      $(this).removeClass('present'); // Remove "present" class
      $(this).addClass('future'); // Add the "future" class
    }
  });
}

// Call the auditTask function to update time block colors
auditTask();

// Use setTimeout to reload the page every minute (refreshes the current time display)
setTimeout(function () {
  location = '';
}, 1000 * 60);