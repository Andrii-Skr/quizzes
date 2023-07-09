import { useEffect, useState } from "react";
import { statGlobalType, statType, store } from "../../store/store";
import Chart from "../Chart";
import "./Finish.css";

const Finish = () => {
  const [stat, setStat] = useState<statType>({
    averageTime: 0,
    correct: 0,
    wrong: 0,
  });
  const [statGlobal, setStatGlobal] = useState<statGlobalType>({
    averageTime: 0,
    quizzesPlayd: 0,
    correct: 0,
    wrong: 0,
  });

  useEffect(() => {
    setStat(store.getStat());
    setStatGlobal(store.getStatGlobal());
  }, []);
  return (
    <div>
      <div className="finishtitle">
        <h1>Current session</h1>
        <span>{`Correct answers ${stat.correct}  `}</span>
        <span>{`Wrong answers ${stat.wrong}`}</span>
        <span>{`Average answer time ${stat.averageTime}`}</span>
      </div>
      <div className="chart">
        <div>
          <Chart statsData={stat} />
        </div>
      </div>
      <div className="stattitle">
        <div>
          <h1>Statistics for all time</h1>
          <button
            onClick={() => {
              setStatGlobal({
                averageTime: 0,
                quizzesPlayd: 0,
                correct: 0,
                wrong: 0,
              });
              store.resetStatGlobal();
            }}
          >
            Reset stats
          </button>
        </div>
        <span>{`Quizzes done ${statGlobal.quizzesPlayd}`}</span>
        <span>{`Correct answers ${statGlobal.correct}  `}</span>
        <span>{`Wrong answers ${statGlobal.wrong}`}</span>
        <span>{`Average answer time ${statGlobal.averageTime}`}</span>
      </div>
      <div className="chart">
        <div>
          <Chart statsData={statGlobal} />
        </div>
      </div>
    </div>
  );
};

export default Finish;
