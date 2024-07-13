import moment from "moment";

const formatVNDate = (date: Date): string => {
  moment.locale("vi");
  const formattedDate = moment(date).format("[Ngày] D/M/YYYY");

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export default formatVNDate;
