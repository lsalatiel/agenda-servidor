export const convertToISO8601 = (date, time) => {
    const [year, day, month] = date.split("-");
    const localDateTime = new Date(`${year}-${month}-${day}T${time}:00`);
    const isoString = localDateTime.toISOString();
    return isoString;
};

export function formatDateTime(isoString) {
    const date = new Date(isoString);

    // Format the date as dd/mm/yyyy
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    // Format the time without seconds
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;

    return { formattedDate, formattedTime };
}

export function incrementHour(time) {
    // Parse the time string into hours and minutes
    const [hoursStr, minutesStr] = time.split(":");
    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);

    // Increment the hour
    hours += 1;

    // Handle overflow beyond 24 hours (assuming a 24-hour format)
    if (hours >= 24) {
        hours -= 24; // Reset to 0 or continue based on your application logic
    }

    // Format the new time
    const newTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    return newTime;
}
