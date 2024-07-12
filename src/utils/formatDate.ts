const formatDate = (date: string) => {
  const newDate = new Date(date);

  const formattedDate = `${String(newDate.getDate()).padStart(2, "0")}/${String(
    newDate.getMonth() + 1
  ).padStart(2, "0")}/${newDate.getFullYear()}`;

  return formattedDate;
};

export default formatDate;
