import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";


dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

export function dateToFormat(date: string) {
  return dayjs().to(dayjs(date));
}