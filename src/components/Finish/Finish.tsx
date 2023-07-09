import { useEffect, useState } from "react";
import { statGlobalType, statType, store } from "../../store/store";
import "./Finish.css";
import "uplot/dist/uPlot.min.css";
import Chart from "../Chart";

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
        <h1>Statistics for all time</h1>
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
