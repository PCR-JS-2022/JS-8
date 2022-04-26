const assert = require('assert');
const { getUsefulInfo } = require('../index');

const letters = [
  {
    topic: 'Встреча по обсуждению котиков',
    message: `
      С другой стороны дальнейшее развитие различных форм деятельности способствует подготовки и реализации систем массового участия. Равным образом сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании системы обучения кадров, соответствует насущным потребностям.
      
      Какая то странная дата 32.13.9000 12:71
      Дата обзорной встречи назначена на 11.05.2022 22:11
      Дата встречи по итогам 13.05.2022 21:03
    `,
    usefulInfo: ['11.05.2022 22:11', '13.05.2022 21:03'],
  },
  {
    topic: 'Обанкротилась еще одна компания',
    message: `
      Идейные соображения высшего порядка, а также перспективное планирование не оставляет шанса для своевременного выполнения сверхзадачи. С учётом сложившейся международной обстановки, дальнейшее развитие различных форм деятельности требует от нас анализа кластеризации усилий. Повседневная практика показывает, что современная методология разработки предопределяет высокую востребованность распределения внутренних резервов и ресурсов.
      Таким образом ООО "Очередная компания" постигла таже участь.
    `,
    usefulInfo: 'ООО "Очередная компания"',
  },
  {
    topic: 'Вам назначен автомобиль',
    message: `
      Равным образом реализация намеченных плановых заданий позволяет оценить значение направлений прогрессивного развития. 
      По запросу Й657ОЯ 1024.
      Товарищи! сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач.
      Номер автомобиля А457ОР 102.
      Таким образом реализация намеченных плановых заданий требуют определения и уточнения соответствующий условий активизации.
    `,
    usefulInfo: 'А457ОР 102',
  },
  {
    topic: 'Требуется оплата по поручению №1337',
    message: `
      Идейные соображения высшего порядка, а также рамки и место обучения кадров представляет собой интересный эксперимент проверки соответствующий условий активизации. Сумма к оплате 1,000,000.35 р.
      Значимость этих проблем настолько очевидна, что сложившаяся структура организации играет важную роль в формировании новых предложений.
    `,
    usefulInfo: 1000000.35,
  },
];

describe('getUsefulInfo', () => {
  it('Корректно находит даты', () => {
    const newLetter = getUsefulInfo(
      letters.map((l) => ({
        topic: l.topic,
        message: l.message,
      })),
    );
    assert.deepEqual(letters[0].usefulInfo, newLetter[0].usefulInfo);
  });

  it('Корректно находит имя компании', () => {
    const newLetter = getUsefulInfo(
      letters.map((l) => ({
        topic: l.topic,
        message: l.message,
      })),
    );
    assert.deepEqual(letters[1].usefulInfo, newLetter[1].usefulInfo);
  });

  it('Корректно находит номер автомобиля', () => {
    const newLetter = getUsefulInfo(
      letters.map((l) => ({
        topic: l.topic,
        message: l.message,
      })),
    );
    assert.deepEqual(letters[2].usefulInfo, newLetter[2].usefulInfo);
  });

  it('Корректно находит сумму', () => {
    const newLetter = getUsefulInfo(
      letters.map((l) => ({
        topic: l.topic,
        message: l.message,
      })),
    );
    assert.deepEqual(letters[3].usefulInfo, newLetter[3].usefulInfo);
  });

  it('Корректно обрабатывет letters', () => {
    const newLetter = getUsefulInfo(null);
    assert.deepEqual(null, newLetter);
  });
});