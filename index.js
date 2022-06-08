/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters
 */
function getUsefulInfo(letters) {
    const meetingRegExp = /встреча/gi;
    const companyRegExp = /компания/gi;
    const carRegExp = /автомобиль/gi;

    const dateRegExp =
        /(0[1-9]|[12]\d|3[0-1])[.](0[1-9]|1[0-2])[.]\d{4} ([0-1]\d|2[0-3]):[0-5]\d/g;
    const companyNameRegExp = /(ИП|ООО|ОАО|АО|ЗАО) ".+?"/g;
    const carPlateRegExp = /[УКЕНХВАРОСМТYKEHXBAPOCMT]\d{3}[УКЕНХВАРОСМТУКЕНХВАРОСМТYKEHXBAPOCMT]{2} \d{2,3}/g;

    letters.forEach((letter) => {
        const usefulInfo = [];
        let result;
        if (meetingRegExp.test(letter.topic)) {
            while ((result = dateRegExp.exec(letter.message)) !== null) {
                usefulInfo.push(result[0]);
            }
        } else if (companyRegExp.test(letter.topic)) {
            while ((result = companyNameRegExp.exec(letter.message)) !== null) {
                usefulInfo.push(result[0]);
            }
        } else if (carRegExp.test(letter.topic)) {
            while ((result = carPlateRegExp.exec(letter.message)) !== null) {
                usefulInfo.push(result[0]);
            }
        }

        if (usefulInfo.length === 0) letter.usefulInfo = null;
        else if (usefulInfo.length === 1) letter.usefulInfo = usefulInfo[0];
        else letter.usefulInfo = usefulInfo;
    });

    return letters;
}

module.exports = {
    getUsefulInfo,
};
