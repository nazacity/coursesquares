export const letfTime = expiredDate => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(expiredDate);
  const secondDate = new Date();

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return diffDays;
};

export const formatDate = date => {
  const monthNames = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear() + 543;

  return `${day} ${monthNames[monthIndex]} ${year.toString().substr(-2)}`;
};

export default formatDate;
