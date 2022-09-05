const calculatePercentage = (items) => {
  let count = 0;
  if (items !== []) {
    items.map((item) => {
      if (item.complete === true) {
        count++;
      }
    });
  }
  if (count) {
    const result = (count / items.length) * 100;
    return `${result}%`;
  } else {
    return "0%";
  }
};

export default calculatePercentage;
