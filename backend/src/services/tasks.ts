
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

// Transforms metadata dict to Metadata type and remvoes empty events
function cleanMetadata(rawMetadata: ICSData): Metadata {
  return new Metadata(rawMetadata);
}

// Transforms event dicts to Event type and removes empty events
function cleanRawEvents(rawEvents: ICSData[]): Event[] {
  return rawEvents.filter((e) => Object.keys(e).length > 0).map((e) => new Event(e));
}

// Function that defines what to sort the events by for typescript sort
function sortEventsByParams(first: Event, second: Event) {
  // Sorts by eventStart descending by timestamp
  if (second.eventStart !== first.eventStart) {
    return (second.eventStart - first.eventStart);
  }
  // Sorts by eventEnd descending by timestamo
  if (second.eventEnd !== second.eventEnd) {
    return (second.eventEnd - first.eventEnd);
  }
  // Sorts by title ascending
  return first.title.localeCompare(second.title); 
}

// This is the actual function you call to sort events
function sortEvents(events: Event[]): Event[] {
  events.sort((first, second) => 
    sortEventsByParams(first, second)); 
  return events;
}

// Binary sort to find the specific timestamp
function binarySearch(list: Event[], threshold: number, index: number) {
  if (list.length <= 1) {
    return index;
  }
  const middleIndex = Math.floor(list.length / 2);
  if (threshold <= list[middleIndex].eventStart) {
    return binarySearch(
      list=list.slice(middleIndex, list.length),
      threshold=threshold,
      index=index + middleIndex
    )
  } else {
    return binarySearch(
      list=list.slice(0, middleIndex),
      threshold=threshold,
      index=index
    )
  }
}

// Filters events so that we only get the ones before a certain timestamp
function getRelevantEvents(sortedEvents: Event[], threshold: number): Event[] {
  let relevant_index = binarySearch(sortedEvents, threshold, 0);
  return sortedEvents.slice(0, relevant_index);
}

// Main function that can be called by route
export async function parseICSFromUrl(
  user_id: string,
  threshold: number
): Promise<[Metadata, Event[]]> {
  const url = `https://ufl.instructure.com/feeds/calendars/${user_id}.ics`;
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
// async function exampleUsage() {
//   const exampleUserID = "user_OS48BY4iVXJ5mjhHSw8bHLq4tVRM0XfluCwIrrbV";
//   console.log(await parseICSFromUrl(exampleUserID, 1763006340001));
// }

// node --inspect src/services/tasks.ts
// exampleUsage()