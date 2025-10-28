
// Defines dictionary type
type ICSData = Record<string, string>;

// Defines basic schema for event class
class Event {
  uid: string;
  eventCreated: number;
  eventStart: number;
  eventEnd: number;
  title: string;

  constructor(data: ICSData) {
    this.uid = this.parseData(data, "UID");
    this.eventCreated = this.parseDatetime(this.parseData(data, "DTSTAMP"));
    this.eventStart = this.parseDatetime(this.parseData(data, "DTSTART"));
    this.eventEnd = this.parseDatetime(this.parseData(data, "DTEND"));
    this.title = this.parseData(data, "SUMMARY");
  }

  private parseData(data: ICSData, key: string): string {
    if (key in data) {
      return data[key];
    }
    return "";
  }

  private parseDatetime(dateStr: string): number {
    if (dateStr !== "") {
      // Format: YYYYMMDDTHHMMSSZ
      const year = Number(dateStr.slice(0, 4));
      const month = Number(dateStr.slice(4, 6));
      const day = Number(dateStr.slice(6, 8));
      const hour = Number(dateStr.slice(9, 11));
      const minute = Number(dateStr.slice(11, 13));
      const second = Number(dateStr.slice(13, 15));
      return Date.UTC(year, month, day, hour, minute, second);
    }
    return 0;
  }

  isGreaterThan(other: Event): boolean {
    return this.eventStart > other.eventStart;
  }

  isLessThan(other: Event): boolean {
    return this.eventStart < other.eventStart;
  }

  isEqual(other: Event): boolean {
    return this.uid === other.uid;
  }
}

// Defines basic schema for metadata
class Metadata {
  calScale?: string;
  description?: string;
  name?: string;

  constructor(data: ICSData) {
    this.calScale = this.parseData(data, "CALSCALE");
    this.description = this.parseData(data, "X-WR-CALDESC");
    this.name = this.parseData(data, "X-WR-CALNAME");
  }

  private parseData(data: ICSData, key: string): string {
    if (key in data) {
      return data[key];
    }
    return "";
  }
}

// Fetch and process ICS data
async function getRawICSContent(url: string): Promise<[string, string]> {
  const res = await fetch(url);
  const text = (await res.text()).trim();

  const startPhrase = "BEGIN:VCALENDAR";
  const endPhrase = "END:VCALENDAR";

  const resStripped = text.slice(startPhrase.length).trim();
  const calendarRaw = resStripped.slice(0, resStripped.indexOf("BEGIN:"));
  const eventsRaw = resStripped.slice(
    resStripped.indexOf("BEGIN:"),
    resStripped.indexOf(endPhrase)
  );

  return [calendarRaw, eventsRaw];
}

// Checks each line for a semicolon and key
function checkLine(line: string): number {
  let index = -1;
  let notFound = true;

  while (notFound && index < line.length - 1) {
    index++;
    if (line[index] === ":") notFound = false;
  }

  if (line.slice(0, index) !== line.slice(0, index).toUpperCase()) {
    return -1;
  }

  return index;
}

// Splits ICS content and converts elements to dictionaries
function splitICSContent(rawText: string): ICSData[] {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0); // Cleans line

  const events: ICSData[] = [];
  let lineNum = 0;

  while (lineNum < lines.length) {
    const event: ICSData = {};
    let prevKey = "";

    while (lines[lineNum]?.slice(0, 3) !== "END" && lineNum < lines.length) {
      const index = checkLine(lines[lineNum]);
      if (index > 0) {
        const key = lines[lineNum].slice(0, index);
        const value = lines[lineNum].slice(index + 1);
        event[key] = value;
        prevKey = key;
      } else {
        event[prevKey] += lines[lineNum];
      }
      lineNum++;
    }

    if (Object.keys(event).length > 0) { // Object.keys get list of string keys
      events.push(event);
    }
    lineNum++;
  }
  return events;
}

// Converts metadata text into dictionary
function splitMetadata(rawText: string): ICSData {
  const lines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const metadata: ICSData = {};

  for (const line of lines) {
    const index = checkLine(line);
    if (index > 0) {
      const key = line.slice(0, index);
      const value = line.slice(index + 1);
      metadata[key] = value;
    }
  }

  return metadata;
}

// Returns the metadata object from the dictionary
function cleanMetadata(rawMetadata: ICSData): Metadata {
  return new Metadata(rawMetadata);
}

// Returns the events object from the dictionary
function cleanRawEvents(rawEvents: ICSData[]): Event[] {
  return rawEvents.filter((e) => Object.keys(e).length > 0).map((e) => new Event(e));
}

// Sort events using comparison operators in event file
function sortEvents(events: Event[]): Event[] {
  // Bubble sort
  for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < events.length - 1; j++) {
      if (events[j + 1].isGreaterThan(events[j])) {
        const temp = events[j];
        events[j] = events[j + 1];
        events[j + 1] = temp;
      }
    }
  }
  return events;
}

// Filters events so that we only get the ones before a certain timestamp
function getRelevantEvents(
  sortedEvents: Event[],
  threshold: number
): Event[] {
  const relevantEvents: Event[] = [];
  let index = 0;

  while (index < sortedEvents.length && sortedEvents[index].eventStart > threshold) {
    relevantEvents.push(sortedEvents[index]);
    index++;
  }

  return relevantEvents;
}

// Main function that can be called by route
export async function getICSFromUrl(
  url: string,
  threshold: number
): Promise<[Metadata, Event[]]> {
  const [calendarRaw, eventsRaw] = await getRawICSContent(url);
  const rawSplitCalendar = splitMetadata(calendarRaw);
  const rawSplitEvents = splitICSContent(eventsRaw);
  const cleanedMetadata = cleanMetadata(rawSplitCalendar);
  const cleanedEvents = cleanRawEvents(rawSplitEvents);
  const sortedEvents = sortEvents(cleanedEvents);
  const relevantEvents = getRelevantEvents(sortedEvents, threshold);
  return [cleanedMetadata, relevantEvents];
}

// Example usage
export async function exampleUsage() {
  console.log("Test");
  const exampleUrl = "https://ufl.instructure.com/feeds/calendars/user_OS48BY4iVXJ5mjhHSw8bHLq4tVRM0XfluCwIrrbV.ics";
  if (exampleUrl) {
    const currentDate: Date = new Date();
    const [metadata, events] = await getICSFromUrl(exampleUrl, currentDate.getTime());
    console.log(metadata);
    console.log(events.map((e) => e.title));
  }
}

