import moment from "moment";

const formatVNDate = (date: Date): string => {
  moment.locale("vi");
  const formattedDate = moment(date).format("D/M/YYYY HH:mm");

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export default formatVNDate;
