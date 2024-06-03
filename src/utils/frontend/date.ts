import dayjs, { Dayjs } from "dayjs";

const getGreet = (date: Dayjs): string => {
  const hour = Number(date.format("H"));
  const day = date.day();

  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 18; // 24hr time to split the evening
  const splitNight = 22; // 24hr time to split the night

  const isMorning = 5 <= hour && hour < splitAfternoon;
  const isAfternoon = splitAfternoon <= hour && hour < splitEvening;
  const isEvening = splitEvening <= hour && hour < splitNight;
  const isNight = hour >= splitNight || hour < 5;

  const isFridayAfternoon = day === 5 && (isAfternoon || isEvening);
  const isSaturdayMorning = day === 6 && isMorning;

  if (isFridayAfternoon || isSaturdayMorning) {
    return "Have a good weekend";
  } else if (isMorning) {
    return "Good morning";
  } else if (isAfternoon) {
    return "Good afternoon";
  } else if (isEvening) {
    return "Good evening";
  }

  return "Good night";
};

// Define the plugin
const greetPlugin = (
  option: any,
  dayjsClass: any,
  dayjsFactory: typeof dayjs
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
