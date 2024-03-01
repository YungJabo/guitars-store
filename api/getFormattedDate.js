const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];
export const getFormattedDate = (dateObj) => {
  const dateStr = dateObj.toISOString();
  const [date, time] = dateStr.split("T");
  const [year, month, day] = date.split("-");
  const formattedDate = `${day} ${months[parseInt(month) - 1]} ${year}г`;
  return formattedDate;
};
