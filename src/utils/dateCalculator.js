import { formatDistanceToNow } from "date-fns";

const convertDate = (date) => {
  return formatDistanceToNow(new Date(date));
};

export default convertDate;
