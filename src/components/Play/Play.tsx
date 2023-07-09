import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryQuestions } from "../../service/quizzes";
import { store } from "../../store/store";
import { useQuery } from "react-query";
import "./Play.css";

const Play = () => {
  const { category, id } = useParams();
  const [index, setIndex] = useState(0);
  const [currentTime] = useState(Date.now());
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(
    ["results", id],
    () => getCategoryQuestions(Number(id)),
    { staleTime: Infinity }
  );
  const [questionsCount, setQuestionsCount] = useState<number>(0);

  useEffect(() => {
    if (!data) return;
    setQuestionsCount(data.length);
  }, [data]);

  if (isLoading) {
    return <h3 className="preload">loading ...</h3>;
  }

  if (isError) {
    return <h3 className="preload">Error ):</h3>;
  }
  if (!data) {
    return <h3 className="preload">No data</h3>;
  }

  let answers: string[] = [];

  const ques = data[index];
  if (ques) {
    answers = [...ques.incorrect_answers];
    answers.splice(Math.floor(Math.random() * 3), 0, ques.correct_answer);
  }

  return (
    <div className="playtitle">
      <span>
        <p>Category: {category}</p>
        <p>Questions left {questionsCount}</p>
      </span>
      {ques && <h2 dangerouslySetInnerHTML={{ __html: `${ques.question}` }}></h2>}
      <div className="questions">
        {answers.map((a) => (
          <button
            key={a}
            dangerouslySetInnerHTML={{ __html: a }}
            onClick={() => {
              if (a === ques.correct_answer) {
                store.incrementCorrect();
              } else {
                store.incrementWrong();
              }
              if (index < data.length - 1) {
                setIndex(index + 1);
                setQuestionsCount(questionsCount - 1);
              } else {
                if (data.length) {
                  const averageTime = (Date.now() - currentTime) / data.length / 1000;
                  store.setAverageTime(Math.round(averageTime * 1000) / 1000);
                }
                store.incrementQuizzes();
                // store.setChart();
                navigate("/finish");
              }
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Play;
