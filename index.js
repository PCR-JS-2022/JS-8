/**
 * @param {Array<{topic:string, message:string}>} letters
 */
function getUsefulInfo(letters) {
	return letters.map(letter => {
		const topic = letter.topic.toLowerCase();
		if (topic.includes("встреча")) {
			const date = /(3[01]|0[1-9]|[12]\d)\.(1[0-2]|0[1-9])\.\d{4} (2[0-3]|[01]\d):([0-5]\d)\b/gm;
			return { ...letter, usefulInfo: letter.message.match(date) };
		}
		if (topic.includes("компания")) {
			const company = /(ИП|ООО|ОАО|АО|ЗАО) ".+"/m;
			return { ...letter, usefulInfo: letter.message.match(company)?.[0] };
		}
		if (topic.includes("автомобиль")) {
			const carNumber = /([ABEKMHOPCTYXАВЕКМНОРСТУХ]\d{3}[ABEKMHOPCTYXАВЕКМНОРСТУХ]{2}) (\d{2,3})\b/m;
			return { ...letter, usefulInfo: letter.message.match(carNumber)?.[0] };
		}
		if (topic.includes("оплата")) {
			const sum = /((\d{1,3},)*(\d{1,3})+(\.)*(\d{2})*) р\./m;
			const matches = letter.message.match(sum);
			return {
				...letter,
				usefulInfo: matches
					? +(matches[0].replace(/( р\.)/g, '')).replace(/,/g, '')
					: null
			}
		}

		throw new Error("Invalid letter");
	})
}

module.exports = { getUsefulInfo }
