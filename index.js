/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters
 */
function getUsefulInfo(letters) {
    return letters.map(letter => {
        let usefulInfo = null;
        if(letter.topic.match(/встреча/iu)) {
            const date = /(0[1-9]|[1-2]\d|3[0-1])\.(0[1-9]|1[012])\.\d{4} ([01]\d|2[0-3]):[0-5]\d/g;
            usefulInfo = letter.message.match(date);
        }
        if(letter.topic.match(/компания/i)) {
            const company = /(ИП|ООО|ОАО|АО|ЗАО) ".+"/g;
            usefulInfo = letter.message.match(company)[0];
        }
        if(letter.topic.match(/автомобиль/i)) {
            let auto = /[A-ZА-Я]\d{3}[A-ZА-Я]{2} \d{2,3}/g;
            usefulInfo = letter.message.match(auto)[0];
        }
        if(letter.topic.match(/оплата/i)) {
            let payment = /(\d{1,3})(,\d{1,3})*(.\d{2})* р./g;
            usefulInfo = Number(
                letter.message
                .match(payment)[0]
                .slice(0, -3)
                .replaceAll(',', '')
            );
        }
        return {
            topic: letter.topic,
            message: letter.message,
            usefulInfo
        }
    })
}

module.exports = {
    getUsefulInfo,
};