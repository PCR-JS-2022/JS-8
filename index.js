const MEETING = 'встреча';
const COMPANY = 'компания';
const CAR = 'автомобиль';
const PAYMENT = 'оплата';

const keywords = [MEETING, COMPANY, CAR, PAYMENT];
const keywordsRegex = {
  [MEETING]: /[0-3][1-9].[0-1][1-9].[0-9]{4}\s[0-2][0-9]:[0-5][0-9]/g,
  [COMPANY]: /(ИП|ООО|ООО|ОАО|АО|ЗАО)\s"[ЁёА-я\s]+"/,
  [CAR]: /[\s.,][a-zA-ZЁёА-я][0-9]{3}[a-zA-ZЁёА-я]{2}\s[0-9]{2,3}[\s,.]/,
  [PAYMENT]: /[0-9]{1,3}(?:,?[0-9]{3})*(?:\.?[0-9]{2})/
}

/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  if (!Array.isArray(letters)) {
    throw new TypeError('letters must be an array');
  }

  const newLetters = [];

  for (const letter of letters) {
    let usefulInfo = null;
    const keyword = topicContainskeyword(letter.topic.toLowerCase());
    switch (keyword) {
      case MEETING:
        usefulInfo = getMeetingDates(letter.message);
        break;
      case COMPANY:
        usefulInfo = getFirstMatchedSubstring(letter.message, keywordsRegex[COMPANY]);
        break;
      case CAR:
        usefulInfo = getCarNumber(letter.message);
        break;
      case PAYMENT:
        usefulInfo = getFirstMatchedSubstring(letter.message, keywordsRegex[PAYMENT]);
        if (usefulInfo) {
          const removeCommas = usefulInfo.replace(/,/g, '');
          usefulInfo = parseFloat(removeCommas);
        }
        break;
    }

    const newLetter = {...letter, usefulInfo};
    newLetters.push(newLetter);
  }

  return newLetters;
}

/**
 * @param {string} topic
 * @return {string | null}
 */
function topicContainskeyword(topic) {
  for (const keyword of keywords) {
    if (topic.includes(keyword)) {
      return keyword;
    }
  }

  return null;
}

/**
 * @param {string} message
 * @return {Array<string> | null}
 */
function getMeetingDates(message) {
  const regex = keywordsRegex[MEETING];
  const matches = message.matchAll(regex);
  let next = matches.next();
  if (next?.done) {
    return null;
  }

  const result = [];
  while (!next.done) {
    const date = next.value[0];
    if (isDateValid(date)) {
      result.push(date);
    }
    
    next = matches.next();
  }

  return result;
}

/**
 * @param {string} text
 * @param {RegExp} regex
 * @return {string | null}
 */
function getFirstMatchedSubstring(text, regex) {
  const match = text.match(regex);
  if (!match) {
    return null;
  }
  
  return match[0] || null;
}

/**
 * @param {string} text
 * @param {RegExp} regex
 * @return {string | null}
 */
 function getCarNumber(text) {
  const match = text.match(keywordsRegex[CAR]);
  if (!match[0]) {
    return null;
  }

  const fixingRegex = /[a-zA-ZЁёА-я][0-9]{3}[a-zA-ZЁёА-я]{2}\s[0-9]{2,3}/;

  return match[0].match(fixingRegex)[0] || null;
}

/**
 * @param {string} meetingDate
 * @return {boolean}
 */
function isDateValid(meetingDate) {
  const [date, time] = meetingDate.split(' ');
  const [day, month] = date.split('.').map(el => parseInt(el));
  if (day <= 0 || day > 31) { return false; }
  if (month <= 0 || month > 12) { return false; }
  if (day <= 0 || day > 31) { return false; }

  const [hour, minute] = time.split(':').map(el => parseInt(el));
  if (hour > 23 || minute > 59) { return false; }

  return true;
}

module.exports = {
  getUsefulInfo,
};