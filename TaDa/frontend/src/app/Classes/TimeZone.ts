export class TimeZone {
    start: Time;
    end: Time;
}

// if -1 comes, it means whatever;
export class Time {
    month: number; // 1 to 12
    date: number; // 1 to 31
    day: number; // 0 to 6 => use array
    hour: number; // 0 to 23
    minute: number; // 0 to 5 => use array
}
