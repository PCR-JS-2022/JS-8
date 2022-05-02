/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  letters.forEach(letter => {
    if (/встреча/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/(?<!\d)((0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](((20)[0-9]{2})|(2100))\s(([01]?[0-9]|2[0-3]):[0-5][0-9]$))/mi);
    } else if (/компания/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО)\s\".+?"/mi) ? letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО)\s\".+?"/mi)[0].toString() : null;
    } else if (/автомобиль/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/([A-ZА-ЯЁ]\d{3}[A-ZА-ЯЁ]{2}\s([0-9]{2,3}))+(?!\d)/gmi) ? letter.message.match(/([A-ZА-ЯЁ]\d{3}[A-ZА-ЯЁ]{2}\s([0-9]{2,3}))+(?!\d)/mi)[0] : null;
    } else if (/оплата/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/([\d\.,\s-]+[\d\.]+)/mi) ? parseFloat(letter.message.match(/([\d\.,\s-]+[\d\.]+)/mi)[0].trim().replace(/,/g, '')) : null;
    } else {
      letter.usefulInfo = null;
    }
  });

  return letters;
}

module.exports = {
  getUsefulInfo,
};

