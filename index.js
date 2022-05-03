/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  if (!Array.isArray(letters)) {
    throw new Error('Wrong type of letters');
  }
  letters.forEach(letter => {
    let flagCheck = checkTopic();
    switch (flagCheck) {
      case 'встреча':
        const meeting = /(0[123456789]|[12][0123456789]|3[01])\.(0[123456789]|1[012])\.[0123456789][0123456789][0123456789][0123456789] ([01][0123456789]|2[0123]):[012345][0123456789]/g;
        if (letter.message.match(meeting)) {
          letter.usefulInfo = letter.message.match(meeting);
        }
        else letter.usefulInfo = null;
        break;
      case 'компания':
        const legalForm = /(ИП|ООО|ОАО|АО|ЗАО) ".+"/g;
        if (letter.message.match(legalForm)) {
          letter.usefulInfo = letter.message.match(legalForm)[0];
        }
        else letter.usefulInfo = null;
        break;
      case 'автомобиль':
        let car = /[A-ZАВЕКМНОРСТУХ][0123456789][0123456789][0123456789][A-ZАВЕКМНОРСТУХ][A-ZАВЕКМНОРСТУХ] [0123456789]{2,3}/g;
        if (letter.message.match(car)) {
          letter.usefulInfo = letter.message.match(car)[0];
        }
        else letter.usefulInfo = null;
        break;
      case 'оплата':
        let sum = /([0123456789]{1,3})(,[0123456789]{1,3})*(\.[0123456789][0123456789])* р\./g;
        if (letter.message.match(sum)) {
          letter.usefulInfo = parseFloat(letter.message.match(sum)[0].replaceAll(',', ''));
        }
        else letter.usefulInfo = null;
        break;
    }

    function checkTopic() {
      if (letter.topic.match(/встреча/iu)) {
        return 'встреча';
      }
      if (letter.topic.match(/компания/i)) {
        return 'компания';
      }
      if (letter.topic.match(/автомобиль/i)) {
        return 'автомобиль';
      }
      if (letter.topic.match(/оплата/i)) {
        return 'оплата';
      }
      return 0;
    }
  })
  return letters;
}


module.exports = {
  getUsefulInfo,
};

