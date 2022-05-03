const MEETING = 'встреча';
const COMPANY = 'компания';
const CAR = 'автомобиль';
const PAYMENT = 'оплата';

const keywords = [MEETING, COMPANY, CAR, PAYMENT];
const keywordsRegex = {
  [MEETING]: /[0-3][0-9].[0-1][0-9].[0-9]{4}\s[0-2][0-9]:[0-5][0-9]/g,
  [COMPANY]: /(ИП|ООО|ООО|ОАО|АО|ЗАО)\s".+"/,
  [CAR]: /[АВЕКМНОРСТУХA-Z][0-9]{3}[АВЕКМНОРСТУХA-Z]{2}\s[0-9]{2,3}\b/,
  [PAYMENT]: /[\s,]{1}[0-9]{1,3}(?:,?[0-9]{3})*(\.[0-9]{2})?\sр\./
}

const test = '[\s]{0,1}[0-9]{1,3}(?:,?[0-9]{3})*(?:[,0-9][0-9]{1,3}\.[0-9]{2})\sр\.'

/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  if (!Array.isArray(letters)) {
    return null;
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
        usefulInfo = getMoney(letter.message);
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
  if (!match || match.length === 0) {
    return null;
  }

  return match[0];
}

/**
 * @param {string} text
 * @return {string | null}
 */
 function getMoney(text) {
  const match = text.match(keywordsRegex[PAYMENT]);
  if (!match || match.length === 0) {
    return null;
  }

  const fixingRegex = /[0-9]{1,3}(?:,?[0-9]{3})*(\.[0-9]{2})?/;

  return match[0].match(fixingRegex)[0];
}

/**
 * @param {string} text
 * @param {RegExp} regex
 * @return {string | null}
 */
 function getCarNumber(text) {
  let match = text.match(keywordsRegex[CAR]);
  if (!match || !match[0]) {
    return null;
  }

  return match[0];
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