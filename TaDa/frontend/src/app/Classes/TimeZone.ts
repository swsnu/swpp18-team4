export class TimeZone {
    // month, date should not be null
    month: number; // 1 to 12
    date: number; // 1 to 31
    day: number; // 0 to 6 => use array

    // if time is undefined, can be null
    start: Time;
    end: Time;
}

export class Time {
    hour: number; // 0 to 23
    minute: number; // 0 to 5 => use array
}
