/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */

 function toNuM(str) {
  return parseFloat(str.replace(/ р./, '').replace(/,/g, ''));
}

function getUsefulInfo(letters) {
  if (!Array.isArray(letters)) {
    return new Error('Некорректные данные');
  }
  letters.forEach(letter => {
    if (/встреча/i.test(letter.topic)) {
      letter.usefulInfo = letter.message.match(/([0-2]\d|3[01]).(0\d|1[0-2]).(\d{4}) ([01]\d|2[0-3]):([0-5]\d)/gm);
    } else if (/компания/i.test(letter.topic)) {
      const company = letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО) (".+?")/gm);
      if (company !== null) {
        letter.usefulInfo = company[0];
      }
    } else if (/автомобиль/i.test(letter.topic)) {
      const num = letter.message.match(/([АВЕКМНОРСТУХABEKMHOPCTYX])(\d{3})([АВЕКМНОРСТУХABEKMHOPCTYX]{2}) (\d{2,3})/gm);
      if (num !== null) {
        letter.usefulInfo = num[0];
      }
    } else if (/оплата/i.test(letter.topic)) {
      const sum = letter.message.match(/(\d{1,3})(,\d{3})*(.[0-9]{1,2})? (р.)/gm);
      if (sum !== null) {
        letter.usefulInfo = toNuM(sum[0]);
      }
    }
    else {
      letter.usefulInfo = null;
    }
  });
  return letters;
}

module.exports = {
  getUsefulInfo,
};

