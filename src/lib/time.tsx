import moment, { Moment } from "moment";
import "moment/locale/vi";

export const fromNow = (time: Date) => {
  moment.locale("vi");
  const momentDate: Moment = moment(time);
  const now = moment();
  const timeDifference = moment.duration(momentDate.diff(now));
  const timeDifferenceInWords = timeDifference.locale("vi").humanize();
  return timeDifferenceInWords;
};
