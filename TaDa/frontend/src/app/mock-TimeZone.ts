import { Time, TimeZone } from "./Classes/TimeZone";


export const mockTimeZone: TimeZone[] = [
{
    month: 10,
    date: 27,
    day: 6,
    start: { hour: 11, minute: 0},
    end: { hour: 15, minute: 0},
},

{
    month: 10,
    date: 27,
    day: 6,
    start: { hour: 19, minute: 0},
    end: { hour: 21, minute: 3},
},

{
    month: 10,
    date: 28,
    day: 0,
    start: { hour: 8, minute: 0},
    end: { hour: 10, minute: 3},
},

{
    month: 10,
    date: 30,
    day: 2,
    start: { hour: 18, minute: 4},
    end: { hour: 20, minute: 3},
},

{
    month: 10,
    date: 31,
    day: 3,
    start: { hour: 18, minute: 4},
    end: { hour: 20, minute: 0},
},

]

export const mockTime: Time[] = [
    { hour: 10, minute: 1},
    { hour: 10, minute: 2},
    { hour: 11, minute: 3},
    { hour: 11, minute: 4},
    { hour: 13, minute: 0},
    { hour: 13, minute: 3},
    { hour: 14, minute: 0},
    { hour: 16, minute: 3},
]