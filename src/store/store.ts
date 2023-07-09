export type statGlobalType = {
  chart: { averageTime: number[]; correct: number[]; wrong: number[] };
  averageTime: number;
  quizzesPlayd: number;
  correct: number;
  wrong: number;
};

export type statType = { averageTime: number; correct: number; wrong: number };

const createStore = () => {
  let statGlobal: statGlobalType = {
    chart: { averageTime: [], correct: [], wrong: [] },
    averageTime: 0,
    quizzesPlayd: 0,
    correct: 0,
    wrong: 0,
  };
  let stat: statType = { averageTime: 0, correct: 0, wrong: 0 };
  const val = localStorage.getItem("quizzes");
  if (val !== null) {
    const quizzes = JSON.parse(val);
    statGlobal = quizzes.statGlobal;
  }
  const save = () => {
    localStorage.setItem("quizzes", JSON.stringify({ statGlobal }));
  };
  return {
    getStat: function () {
      return structuredClone(stat);
    },
    incrementCorrect: function () {
      stat = { ...stat, correct: stat.correct + 1 };
      statGlobal = { ...statGlobal, correct: statGlobal.correct + +1 };
      statGlobal.chart.correct.push(statGlobal.correct + +1);
      //statGlobal.chart.wrong.push(0);
      save();
    },
    incrementWrong: function () {
      stat = { ...stat, wrong: stat.wrong + 1 };
      statGlobal = { ...statGlobal, wrong: statGlobal.wrong + 1 };
      statGlobal.chart.wrong.push(statGlobal.wrong + 1);
      //statGlobal.chart.correct.push(0);
      save();
    },
    resetStat: function () {
      stat.correct = 0;
      stat.wrong = 0;
      stat.averageTime = 0;
    },
    resetStatGlobal: function () {
      statGlobal.correct = 0;
      statGlobal.wrong = 0;
      statGlobal.averageTime = 0;
      statGlobal.quizzesPlayd = 0;
      save();
    },

    getStatGlobal: function () {
      return structuredClone(statGlobal);
    },
    incrementQuizzes: function () {
      statGlobal = { ...statGlobal, quizzesPlayd: statGlobal.quizzesPlayd + 1 };
      save();
    },
    setAverageTime: function (atime: number) {
      stat = { ...stat, averageTime: stat.averageTime + atime };
      statGlobal.chart.averageTime.push(stat.averageTime + atime);

      if (statGlobal.averageTime === 0) {
        statGlobal = { ...statGlobal, averageTime: statGlobal.averageTime + atime };
      } else {
        statGlobal = {
          ...statGlobal,
          averageTime: Math.round(((statGlobal.averageTime + atime) / 2) * 1000) / 1000,
        };
      }
      save();
    },
  };
};

export const store = createStore();
