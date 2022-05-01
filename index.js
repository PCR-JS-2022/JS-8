/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters
 */
function getUsefulInfo(letters) {
  return letters.map(letter => {
    let usefulInfo = null;

    if (letter.topic.match(/встреча/iu)) {
      const matches = letter.message.matchAll(/(?:^|[\s"(`{\['])((?:0[1-9]|[12]\d|3[01])\.(?:0[1-9]|1[0-2])\.\d{4} (?:[01]\d|2[0-3]):[0-5]\d)(?:$|[\s!`";:)}\]'.,])/g);
      if (matches) {
        const matchesArr = Array.from(matches);
        if (matchesArr.length) {
          usefulInfo = matchesArr.map(match => match[1]);
        }
      }
    }

    if (letter.topic.match(/компания/iu)) {
      const matches = letter.message.match(/(?:^|[\s(`{\['])((?:ИП|ООО|ОАО|АО|ЗАО) "[А-Яа-яЁё" ]+")(?:$|[\s!`;:)}\]'.,])/u);
      if (matches) {
        usefulInfo = matches[1];
      }
    }

    if (letter.topic.match(/автомобиль/iu)) {
      const matches = letter.message.match(/(?:^|[\s"(`{\['])([АВЕКМНОРСТУХA-Z]\d{3}(?<!000)[АВЕКМНОРСТУХA-Z]{2} [1-9]\d{1,2})(?:$|[\s!`";:)}\]'.,])/u);
      if (matches) {
        usefulInfo = matches[1];
      }
    }

    if (letter.topic.match(/оплата/iu)) {
      const matches = letter.message.match(/(?:^|[\s"(`{\[']|\D\.)((?:[1-9]\d{0,2}(?:,\d{3})*|0|[1-9]\d*)(?:\.\d{2})?) р\.(?:$|[\s!`";:)}\]',])/u);
      if (matches) {
        usefulInfo = Number(matches[1].replaceAll(',', ''));
      }
    }

    return { ...letter, usefulInfo };
  });
}

module.exports = {
  getUsefulInfo,
};
