import Navbar from "./components/Navbar";
import "./App.scss";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faPlus,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";
import { svg } from "d3";
import { select } from "d3";
import { scaleLinear } from "d3";
import { max } from "d3";
import { scaleBand } from "d3";
import { scaleTime } from "d3";

function App() {
  const [data] = useState([
    [
      {
        tide: 0.7,
        hour: "2020-05-18T00:00:00+07:00",
        sun: 0,
      },
      {
        tide: 1,
        hour: "2020-05-18T06:00:00+07:00",
        sun: 0.001,
      },
      {
        tide: 0.2,
        hour: "2020-05-18T12:00:00+07:00",
        sun: 2,
      },
      {
        tide: 1,
        hour: "2020-05-18T18:00:00+07:00",
        sun: 0,
      },
      {
        tide: 0.3,
        hour: "2020-05-19T00:00:00+07:00",
        sun: 0,
      },
      {
        tide: 0.4,
        hour: "2020-05-19T06:00:00+07:00",
        sun: 0.001,
      },
      {
        tide: 0.2,
        hour: "2020-05-19T12:00:00+07:00",
        sun: 2,
      },
      {
        tide: 1,
        hour: "2020-05-19T18:00:00+07:00",
        sun: 0,
      },
      {
        tide: 0.2,
        hour: "2020-05-20T00:00:00+07:00",
        sun: 0,
      },
      {
        tide: 1,
        hour: "2020-05-20T06:00:00+07:00",
        sun: 0.001,
      },
      {
        tide: 0.05,
        hour: "2020-05-20T12:00:00+07:00",
        sun: 2,
      },
      {
        tide: 1,
        hour: "2020-05-20T18:00:00+07:00",
        sun: 0,
      },
    ],
  ]);
  const svgRef = useRef();
  useEffect(() => {
    const w = 1200;
    const h = 700;
    const svg = select(svgRef.current)
      .attr("height", h)
      .attr("width", w)
      .style("background", "#d3d3d3");

    const xScale = scaleTime()
      .domain([
        new Date("2020-05-18T00:00:00+07:00").getHours(),
        new Date("2020-05-20T18:00:00+07:00").getHours(),
      ])
      .range([0, w]);
    const yScale = scaleLinear().domain([0, 2]).range([h, 0]);

    const generateScaledLine = d3
      .line()
      .context(null)
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    svg
      .selectAll(".line")
      .data(data)
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black");
    // console.log(xScale.domain());
    // const svg = select("#tideWaveChart");
    // const width = +svg.attr("width");
    // const height = +svg.attr("height");

    // const render = (data) => {
    //   const xScale = scaleLinear()
    //     .domain([0, max(data, (d) => d.tide)])
    //     .range([0, width]);
    //   const yScale = scaleBand()
    //     .domain(data.map((d) => d.hour))
    //     .range([0, height]);
    //   svg
    //     .selectAll("rect")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //     .attr("y", (d) => yScale(d.hour))
    //     .attr("width", (d) => xScale(d.tide))
    //     .attr("height", yScale.bandwidth());
    // };

    // d3.json("/tides.json").then((data) => {
    //   render(data);
    // });
  }, [data]);
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="Home__Screen">
        <div className="Home__Screen__Top">
          <div className="Weather">
            <div className="Weather__Info">
              <img
                className="Weather__center__info--cloud"
                src="https://openweathermap.org/img/wn/04d@2x.png"
                alt="moon"
              />
              <div>
                <h1>Clouds</h1>
                <div className="d-flex align-items-center flex-row justify-content-between">
                  <p>
                    <FontAwesomeIcon icon={faTemperatureHigh} />
                    123C
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faDroplet} />
                    12
                  </p>
                </div>
              </div>
            </div>
            <div className="Weather__Info__Detail">
              <div className="Weather__Info__Detail__Column">
                <div>PSI</div>
                <div className="Weather__Info__PSI">273.2</div>
                <div>Good</div>
              </div>
              <div className="Weather__Info__Detail__Column">
                <div>Rain</div>
                <div>89</div>
                <div>mm</div>
              </div>
              <div className="Weather__Info__Detail__Column">
                <div>DENGUE</div>
                <div className="Weather__Info__Dengue"></div>
              </div>
              <div className="Weather__Info__Detail__Column">
                <div className="mb-2">
                  <FontAwesomeIcon icon={faPlus} size="xl" color="#000" />
                </div>
                <div>Add</div>
              </div>
            </div>
          </div>
        </div>
        <div className="Home__Screen__Bottom">
          <div className="Chart__Wave__Container">
            <svg ref={svgRef}></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
