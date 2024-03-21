export function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObject.toLocaleDateString(undefined, options);
}
