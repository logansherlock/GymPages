export function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const month = date.toLocaleString("en-US", { month: "numeric" }); // "Apr"
    const day = date.getDate();
    // const daySuffix =
    //   day % 10 === 1 && day !== 11
    //     ? "st"
    //     : day % 10 === 2 && day !== 12
    //     ? "nd"
    //     : day % 10 === 3 && day !== 13
    //     ? "rd"
    //     : "th";

    const year = date.getFullYear() % 100;

    let hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    return `${month}/${day}/${year} - ${hour}:${minute} ${ampm}`;
  }