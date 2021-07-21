/// store all of the userInput textareas in a jQuery variable
var userInput = $(".userInput")

/// save the moment the webpage is opened as variable
var currentMoment = moment();
/// format the current date (ex. January 1st, 2021)
$("#currentDay").text(currentMoment.format("MMMM Do[,] YYYY"));

$(".saveBtn").on("click", function(event) {
    /// save the exact saveBtn on which the "click" event has occurred
    var currentSaveButton = $(event.target);
    /// store the number from the timeblock as an array into a variable
    var hourAsNum = currentSaveButton.closest("div").text().match(/(\d+)/);
    /// if the trimmed value of the textarea isn't null or an empty string...
    if($.trim(currentSaveButton.prev().val()) != null && $.trim(currentSaveButton.prev().val()) != "") {
        /// set a localStorage key (ex. Input9) to the the value of the textarea
        localStorage.setItem("Input" + hourAsNum[0], currentSaveButton.prev().val());
    } else {
        /// if the textarea's trimmed value is null or "", remove the key-value pair from localStorage
        localStorage.removeItem("Input" + hourAsNum[0]);
    }
})

function timeColor() {
    userInput.each(function( i ) {
        var indexedTextArea = $(this);
        /// The first four indexes are 9 AM thru 12 PM, numbers of which do not need to be editted to match 24hr time
        if (i < 4) {
            var hourIn24 = Number(indexedTextArea.prev().text().match(/(\d+)/)[0]);
        /// The rest of the indexes have hour numbers that do not follow 24hr time, so add 12 to make it 24hr time.
        } else {
            var hourIn24 = Number(indexedTextArea.prev().text().match(/(\d+)/)[0]) + 12;
        }
        /// If it is currently 9 AM, then the textarea with previous element's text == "9 AM" will be added a class of ".present".
        if (moment().format("h A") == indexedTextArea.prev().text()) {
            indexedTextArea.addClass("present");
        /// If it is currently 14 hours military time, the time blocks before 2 PM will add a class of ".past".
        } else if (Number(moment().format("H")) > (hourIn24)) {
            indexedTextArea.addClass("past");
        /// Every time block that isn't present or past will be given a class of ".future".
        } else {
            indexedTextArea.addClass("future");
        }
    })
}

function init() {
    /// loop thru each user input, assign a variable based on the current index to represent the hour of that timeblock
    userInput.each(function( i ) {
        var hourUsingI = i;
        if (i < 4) {
            hourUsingI += 9; 
        } else {
            hourUsingI -= 3;
        }
        /// create variable that match syntax of local storage keys
        var indexedInput = ("Input"+hourUsingI.toString());
        /// get the local storage item value, and set the current userInput's textarea to contain the text stored in the local a storage value
        var indexedHourFromLocalStorage = localStorage.getItem(indexedInput);
        $(this).text(indexedHourFromLocalStorage);
        }
     ) }

/// run init function to fill any textareas that had saved content in local storage
init()
/// run timeColor function to add classes to the userInput textareas according to their time relation to the current moment (past, present, future), changing their background color accordingly
timeColor()