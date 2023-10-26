export const trimData = (text: string) => {
  let length = 20;

  if (typeof window !== "undefined") {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 400) {
      length = 5;
    } else if (screenWidth <= 450) {
      length = 8;
    } else if (screenWidth <= 640) {
      length = 10;
    } else if (screenWidth <= 1024) {
      length = 15;
    } else {
      length = 25;
    }
  }

  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
};

const today = new Date();
export const dateString = `${today.getFullYear()}/${String(
  today.getMonth() + 1
).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;

export const isMemberActive = (pause_till: string | null) => {
  if (pause_till === null) {
    return true;
  }
  const compareBothDates = compareDates(pause_till, dateString);
  return compareBothDates;
};

function parseDate(dateString: string): Date {
  const dateParts = dateString.split("/").map((part) => parseInt(part, 10));

  if (dateParts[0] > 31) {
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  } else {
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  }
}

export const compareDates = (
  dateString1: string,
  dateString2: string
): number => {
  const date1 = parseDate(dateString1);
  const date2 = parseDate(dateString2);

  if (date1 > date2) {
    return 1;
  } else if (date1 < date2) {
    return -1;
  } else {
    return 0;
  }
};
