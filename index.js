/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters
 */
function getUsefulInfo(letters) {
    if (!letters || !Array.isArray(letters)) {
        throw new Error("Некорректные данные");
    }

    const meetingRegExp = /встреча/gi;
    const companyRegExp = /компания/gi;
    const carRegExp = /автомобиль/gi;

    const dateRegExp =
        /(0[1-9]|[12]\d|3[0-1])[.](0[1-9]|1[0-2])[.]\d{4} ([0-1]\d|2[0-3]):[0-5]\d/g;
    const companyNameRegExp = /(ИП|ООО|ОАО|АО|ЗАО) ".+?"/g;
    const carPlateRegExp =
        /[УКЕНХВАРОСМТYKEHXBAPOCMT]\d{3}[УКЕНХВАРОСМТYKEHXBAPOCMT]{2} \d{2,3}/g;

    letters.forEach((letter) => {
        let usefulInfo;

        if (meetingRegExp.test(letter.topic)) {
            let result;
            const datesArray = [];

            while ((result = dateRegExp.exec(letter.message)) !== null) {
                datesArray.push(result[0]);
            }

            usefulInfo = datesArray;
        } else if (companyRegExp.test(letter.topic)) {
            const result = companyNameRegExp.exec(letter.message);
            usefulInfo = result ? result[0] : null;
        } else if (carRegExp.test(letter.topic)) {
            const result = carPlateRegExp.exec(letter.message);
            usefulInfo = result ? result[0] : null;
        }

        letter.usefulInfo = usefulInfo;
    });

    return letters;
}

module.exports = {
    getUsefulInfo,
};
