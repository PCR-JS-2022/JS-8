/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
 function getUsefulInfo(letters) {
  return letters.map((letter) => {
    let usefulInfo = null;
    const dateFormat =
      /(0[1-9]|[1-2]\d|3[0-1]).(0[1-9]|1[012]).\d{4} ([01]\d|2[0-3]):[0-5]\d/g;
    const companyFormat = /(ИП|ООО|ОАО|АО|ЗАО) ".+"/g;
    const autoFormat = /[A-ZАВЕКМНОРСТУХ]\d{3}[A-ZАВЕКМНОРСТУХ]{2} \d{2,3}/g;
    const payFormat = /(\d{1,3})(,\d{1,3})(.\d{2})* р./g;

    if (letter.topic.match(/встреча/iu)) {
      usefulInfo = letter.message.match(dateFormat)
        ? letter.message.match(dateFormat)
        : null;
    }
    if (letter.topic.match(/компания/i)) {
      usefulInfo = letter.message.match(companyFormat)
        ? letter.message.match(companyFormat)[0]
        : null;
    }
    if (letter.topic.match(/автомобиль/i)) {
      usefulInfo = letter.message.match(autoFormat)
        ? letter.message.match(autoFormat)[0]
        : null;
    }
    if (letter.topic.match(/оплата/i)) {
      let payMatch = letter.message.match(payFormat);
      if (payMatch) {
        usefulInfo = Number(
          letter.message.match(payFormat)[0].slice(0, -3).replaceAll(",", "")
        );
      }
    }

    return { ...letter, usefulInfo };
  });
}

module.exports = {
  getUsefulInfo,
};