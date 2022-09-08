const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
}

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { showFormattedDate, capitalize };
