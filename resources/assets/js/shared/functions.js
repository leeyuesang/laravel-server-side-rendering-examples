export function getFormattedDateStr(date) {
    let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    let minute = date.getMinutes();
    let hour = date.getHours();
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return `${year}-${monthIndex+1}-${day} ${hour}:${minute}`;
    // return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
