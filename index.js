const MEETING = 'Встреча';
const COMPANY = 'компания';
const CAR = 'автомобиль';
const PAYMENT = 'оплата';

const keywords = [MEETING, COMPANY, CAR, PAYMENT];
const keywordsRegex = {
  [MEETING]: /[0-3][1-9].[0-1][1-9]\s[0-2][0-9]:[0][0-9]/,
  [COMPANY]: /(ИП|ООО|ООО|ОАО|АО|ЗАО)\s"[ЁёА-я\s]+"/,
  [CAR]: /[\s.,][a-zA-ZЁёА-я][0-9]{3}[a-zA-ZЁёА-я]{2}\s[0-9]{2,3}[\s,.]/,
  [PAYMENT]: //
}

/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  if (!Array.isArray(letters)) {
    throw new TypeError('letters must be an array');
  }

  for (const letter of letters) {
    let usefulInfo = null;
    const regex = topicContainskeyword(letter.topic);
    if () {
      usefulInfo = [];
      const index = letter.message.search(/[]/);
    }
  }
}

/**
 * @param {string} topic
 * @return {RegExp | null}
 */
function topicContainskeyword(topic) {
  for (const keyword of keywords) {
    if (topic.includes(keyword)) {
      return true;
    }
  }

  return null;
}

module.exports = {
  getUsefulInfo,
};

