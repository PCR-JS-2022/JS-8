/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */

function addMeetInfo(message) {
  return message.match(
    /(0[123456789]|[12]\d|3[01]).(0[123456789]|1[012]).(\d{4}) ([01]\d|2[0123]):([012345]\d)/g);
}

function addCompanyInfo(message) {
  let result = message.match(/(ИП|ООО|ОАО|АО|ЗАО) ".+"/g);
  return result? result[0] : null;
}

function addAutoInfo(message) {
  let result = message.match(
    /[АВЕКМНОРСТУХABEKMHOPCTYX](\d{3})([АВЕКМНОРСТУХABEKMHOPCTYX]{2})\s(\d{2,3})/g);
    return result? result[0] : null;
}

function addPayInfo(message) {
  let result = message.match(/((\d{1,3},)*(\d{1,3})+(\.)*(\d{2})*) р\./g);
  return result? parseFloat(result[0].replace(/,/g, '')) : null;
}

function getUsefulInfo(letters) {
  letters.forEach( letter => {
    if (!Array.isArray(letters)){
      throw new Error('Ошибка ввода');
    }
    if (/встреча/i.exec(letter.topic)){
      letter.usefulInfo = addMeetInfo(letter.message);
    }
    if (/компания/i.exec(letter.topic)){
      letter.usefulInfo = addCompanyInfo(letter.message);
    }
    if (/автомобиль/i.exec(letter.topic)){
      letter.usefulInfo = addAutoInfo(letter.message);
    }
    if (/оплата/i.exec(letter.topic)){
      letter.usefulInfo = addPayInfo(letter.message);
    }
  })
}

module.exports = {
  getUsefulInfo,
};

