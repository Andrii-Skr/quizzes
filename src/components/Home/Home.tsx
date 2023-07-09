import { getCategories } from "../../service/quizzes";
import { useNavigate } from "react-router-dom";
import { store } from "../../store/store";
import { useQuery } from "react-query";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery("trivia_categories", getCategories, {
    staleTime: Infinity,
  });

  if (isLoading) {
    return <h3 className="preload">loading ...</h3>;
  }
  if (isError) {
    return <h3 className="preload">Error ):</h3>;
  }
  if (!data) {
    return <h3 className="preload">No data</h3>;
  }

  return (
    <div>
      <div className="hometitle">
        <h1>Choose Category</h1>
        <button
          onClick={() => {
            const i = data[Math.floor(Math.random() * 10)];

            navigate(`play/${i.name}/${i.id}`);
            store.resetStat();
          }}
        >
          I'm lucky
        </button>
      </div>
      <div className="category">
        {data.slice(0, 10).map((e) => {
          return (
            <button
              dangerouslySetInnerHTML={{ __html: e.name }}
              key={e.id}
              onClick={() => {
                navigate(`play/${e.name}/${e.id}`);
                store.resetStat();
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
