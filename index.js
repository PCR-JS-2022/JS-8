/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters
 */
function getUsefulInfo(letters) {
  return letters.map(letter => {
    let usefulInfo = null;

    if (letter.topic.match(/встреча/iu)) {
      const matches = letter.message.matchAll(/(?:^|[\s"(`{\['])((?:0[1-9]|[12]\d|31)\.(?:0[1-9]|1[12])\.\d{4}\s(?:[01]\d|2[1-3]):[0-5]\d)(?:$|[\s!`";:)}\]'.,])/g);
      if (matches) {
        usefulInfo = Array.from(matches).map(match => match[1]);
      }
    }

    if (letter.topic.match(/компания/iu)) {
      const matches = letter.message.match(/(?:^|[\s(`{\['])([А-Я]+\s"[^A-Za-z"]+")(?:$|[\s!`;:)}\]'.,])/u);
      if (matches) {
        usefulInfo = matches[1];
      }
    }

    if (letter.topic.match(/автомобиль/iu)) {
      const matches = letter.message.match(/(?:^|[\s"(`{\['])([АВЕКМНОРСТУХA-Z]\d{3}(?<!000)[АВЕКМНОРСТУХA-Z]{2}\s[1-9]\d{1,2})(?:$|[\s!`";:)}\]'.,])/u);
      if (matches) {
        usefulInfo = matches[1];
      }
    }

    if (letter.topic.match(/оплата/iu)) {
      const matches = letter.message.match(/(?:^|[\s"(`{\['])(\d{1,3}(?:,\d{3})*(?:.\d{2})?)\sр\.(?:$|[\s!`";:)}\]',])/u);
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
