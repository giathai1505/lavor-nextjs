import moment, { Moment } from "moment";
import "moment/locale/vi";

export const fromNow = (time: Date) => {
  moment.locale("vi");
  const momentDate: Moment = moment(time);
  var now = moment();
  var timeDifference = moment.duration(momentDate.diff(now));
  var timeDifferenceInWords = timeDifference.locale("vi").humanize();
  return timeDifferenceInWords;
};
