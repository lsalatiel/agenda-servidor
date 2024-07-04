export function convertToISO8601(dateStr, timeStr) {
    // Parse date components
    const [year, day, month] = dateStr.split('-'); // Adjust for yyyy-dd-mm to yyyy-mm-dd

    // Parse time components
    const [hours, minutes] = timeStr.split(':');

    // Create ISO 8601 formatted datetime string
    const isoDate = `${year}-${month}-${day}T${hours}:${minutes}:00Z`;

    return isoDate;
}

export function incrementHour(time) {
    // Parse the time string into hours and minutes
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);

    // Increment the hour
    hours += 1;

    // Handle overflow beyond 24 hours (assuming a 24-hour format)
    if (hours >= 24) {
        hours -= 24; // Reset to 0 or continue based on your application logic
    }

    // Format the new time
    const newTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    return newTime;
}
