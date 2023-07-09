import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { statGlobalType } from "../store/store";

const Chart = ({ statsData }: { statsData: statGlobalType }) => {
  ChartJS.register(CategoryScale);

  const options = {
    width: 100,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        //text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [""];

  const data = {
    labels,
    datasets: [
      {
        label: "Correct",
        data: [statsData.correct],
        //data: statsData.chart.correct,
        backgroundColor: "rgba(0, 128, 0, 0.5)",
      },
      {
        label: "Wrong",
        data: [statsData.wrong],
        // data: statsData.chart.wrong,
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Chart;
