export function getNowMonth() {
    const now = new Date();
    const month = now.getMonth();
    const monthNames = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ];
    return monthNames[month];
  }
  