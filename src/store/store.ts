export type statGlobalType = {
  averageTime: number;
  quizzesPlayd: number;
  correct: number;
  wrong: number;
};

export type statType = { averageTime: number; correct: number; wrong: number };

const createStore = () => {
  let statGlobal: statGlobalType = {
    averageTime: 0,
    quizzesPlayd: 0,
    correct: 0,
    wrong: 0,
  };
  let stat: statType = { averageTime: 0, correct: 0, wrong: 0 };
  const val = localStorage.getItem("quizzes");
  if (val !== null) {
    const quizzes = JSON.parse(val) as {statGlobal:statGlobalType};
    statGlobal = quizzes.statGlobal ;
  }
  const save = () => {
    localStorage.setItem("quizzes", JSON.stringify({ statGlobal }));
  };
  return {
    getStat: function () {
      return structuredClone(stat) as statType;
    },
    incrementCorrect: function () {
      stat = { ...stat, correct: stat.correct + 1 };
      statGlobal = { ...statGlobal, correct: statGlobal.correct + +1 };
      save();
    },
    incrementWrong: function () {
      stat = { ...stat, wrong: stat.wrong + 1 };
      statGlobal = { ...statGlobal, wrong: statGlobal.wrong + 1 };
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
      return structuredClone(statGlobal) as statGlobalType;
    },
    incrementQuizzes: function () {
      statGlobal = { ...statGlobal, quizzesPlayd: statGlobal.quizzesPlayd + 1 };
      save();
    },
    setAverageTime: function (atime: number) {
      stat = { ...stat, averageTime: stat.averageTime + atime };

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
