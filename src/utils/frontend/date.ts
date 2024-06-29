import dayjs, { Dayjs } from "dayjs";

const getGreet = (date: Dayjs): string => {
  const hour = Number(date.format("H"));
  const day = date.day();

  const splitMorningEnd = 12; // 12 PM is the end of morning
  const splitAfternoonEnd = 15; // 3 PM is the end of afternoon
  const splitEveningEnd = 19; // 7 PM is the end of evening

  const isMorning = 3 <= hour && hour < splitMorningEnd;
  const isAfternoon = splitMorningEnd <= hour && hour < splitAfternoonEnd;
  const isEvening = splitAfternoonEnd <= hour && hour < splitEveningEnd;
  const isNight = hour >= splitEveningEnd || hour < 3;

  const isFridayAfternoon = day === 5 && (isAfternoon || isEvening);
  const isSaturdayMorning = day === 6 && isMorning;

  if (isFridayAfternoon || isSaturdayMorning) {
    return "Have a good weekend";
  } else if (isMorning) {
    return "Good morning";
  } else if (isAfternoon) {
    return "Good afternoon";
  } else if (isNight) {
    return "Good night";
  }
  return "Good evening";
};

// Define the plugin
const greetPlugin = (
  option: any,
  dayjsClass: any,
  dayjsFactory: typeof dayjs,
) => {
  // Extend dayjs instance methods
  dayjsClass.prototype.greet = function (): string {
    return getGreet(this);
  };

  // Extend dayjs static methods
  dayjsFactory.greet = (): string => {
    return getGreet(dayjs());
  };
};

export default greetPlugin;

declare module "dayjs" {
  interface Dayjs {
    greet(): string;
  }

  export function greet(): string;
}
