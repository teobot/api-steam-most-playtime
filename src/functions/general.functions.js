
// Get the number of seconds between 2 dates.
const getSecondsBetweenDates = (date1, date2) => {
    return Math.abs(date2 - date1) / 1000;
};


// exports all functions
module.exports = {
    getSecondsBetweenDates
};