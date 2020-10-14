import React from "react";
import "./LineGraph.scss";
import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
} from "recharts";
import { getHistoricalData } from "../../api";
import "leaflet/dist/leaflet.css";
class LineGraph extends React.Component {
  state = {
    data: [],
  };
  componentDidMount = async () => {
    const res = await getHistoricalData();
    const data = Object.entries(res).map((val) => ({
      date: val[0],
      deaths: val[1].deaths,
      recovered: val[1].recovered,
      cases: val[1].cases,
    }));

    // console.log(data);
    this.setState({ data });
  };
  render() {
    const { data } = this.state;
    return (
      <ResponsiveContainer className="chart" width="100%" height={220}>
        <LineChart
          width={100}
          height={100}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cases" stroke="#8884d8" />
          <Line type="monotone" dataKey="recovered" stroke="#82ca9d" />
          <Line type="monotone" dataKey="deaths" stroke="#e63d3db3" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
export default LineGraph;
