import greetPlugin from "@/utils/frontend/date";
import dayjs from "dayjs";

const Greeting = ({ className }: { className: string }) => {
  dayjs.extend(greetPlugin);
  return <span className={className}>{dayjs().greet()}</span>;
};

export default Greeting;
