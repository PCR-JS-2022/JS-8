/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {

    if (!Array.isArray(letters) || !letters) {
        throw new Error("Невалидные данные");
    }

    letters.forEach(letter => {
        if (letter.topic.match(/встреча/ig)) {
            letter.usefulInfo = letter.message.match(/(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4} ([01]\d|2[0-3]):([0-5]\d)/g);
        }
        if (letter.topic.match(/компания/ig)) {
            const match = letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО) ".+"/);
            letter.usefulInfo = match ? match[0] : match;
        }
        if (letter.topic.match(/автомобиль/ig)) {
            const matchCars = letter.message.match(/([АВЕКМНОРСТУХABEKMHOPCTYXA]\d{3}[АВЕКМНОРСТУХABEKMHOPCTYXA]{2}) (\d{2,3})/i);
            letter.usefulInfo = matchCars ? matchCars[0] : matchCars;
        }
        if (letter.topic.match(/оплата/ig)) {
            const match = letter.message.match(/(0|[1-9]\d*|[1-9]\d{0,2}(,\d{3})+)\.?(\d{2})? [pр]\./);
            letter.usefulInfo = match ? parseFloat(match[0].replaceAll(",", "")) : match;
        }
    });
    return letters;
}

module.exports = {
    getUsefulInfo,
};