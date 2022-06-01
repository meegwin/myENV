import Navbar from "./components/Navbar";
import "./App.scss";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faPlus,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";
import {
  select,
  json,
  scaleTime,
  extent,
  axisBottom,
  scaleLinear,
  area,
  curveBasis,
  line,
  curveCardinal,
} from "d3";
import moment from "moment";
function App() {
  const minuteOfHalfDay = 720;
  const svgRef = useRef();
  const chartContainerRef = useRef();
  const [sunCoor, setSunCoor] = useState({
    x: window.innerWidth / 2,
    y: 0,
  });
  const [displayMoon, setDisplayMoon] = useState("c");
  const [currentTime, setCurrentTime] = useState({
    time: "6:00 am",
    day: 1,
  });

  useEffect(() => {
    const margin = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
    const widthScreen = window.innerWidth;
    const tideColor = "#C1E5F7";
    const w = (window.innerWidth / 2) * 11;
    const h = 372 - margin.top - margin.bottom;

    let rectPostition = 0;

    const calcRectPostition = (index) => {
      if (index < 1) return 0;
      rectPostition = rectPostition + window.innerWidth / 2;
      return rectPostition;
    };
    const resetRectPos = () => {
      rectPostition = 0;
    };
    const convertDateToTime = (date) => {
      return date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    };

    const svg = select(svgRef.current)
      .attr("height", h)
      .attr("width", w + margin.left + margin.right)
      .style("overflow", "visible");

    json("/tides.json").then((data) => {
      const filteredData = data.map((item) => ({
        ...item,
        hour: new Date(item.hour),
      }));
      const x = scaleTime()
        .domain(
          extent(filteredData, (d) => {
            return d.hour;
          })
        )
        .range([0, w]);
      svg
        .append("g")
        .attr("transform", `translate(0, ${h})`)
        .call(axisBottom(x))
        .selectAll(".domain, .tick line")
        .remove();

      const y = scaleLinear().domain([0, 2]).range([h, 0]);
      svg
        .append("path")
        .datum(filteredData)
        .attr("fill", tideColor)
        .attr("stroke", tideColor)
        .attr("stroke-width", 1, 5)
        .attr(
          "d",
          area()
            .x((d) => {
              return x(d.hour);
            })
            .y0(y(0))
            .y1((d) => y(d.tide))
            .curve(curveBasis)
        );

      svg
        .selectAll("rect")
        .data(filteredData)
        .join("rect")
        .attr("width", 80)
        .attr("height", 50)
        .attr("fill", "#e4e4e4")
        .attr("x", (d, i) => {
          if (!i) return 0;
          return calcRectPostition(i) - 40;
        })
        .attr("y", 150);

      resetRectPos();

      svg
        .append("g")
        .attr("data-testid", "rectLabel")
        .selectAll("text")
        .data(filteredData)
        .join("text")
        .attr("fill", "black")
        .attr("font-size", 12)
        .attr("x", (d, i) => {
          if (!i) return 15;
          return calcRectPostition(i) - 5;
        })
        .attr("y", 170)
        .attr("font-size", 12)
        .text((d) => {
          return d.tide;
        });
      resetRectPos();
      svg
        .append("g")
        .attr("id", "rectTimeLabel")
        .selectAll("text")
        .data(filteredData)
        .join("text")
        .attr("fill", "black")
        .attr("font-size", 12)
        .attr("x", (d, i) => {
          if (!i) return 10;
          return calcRectPostition(i) - 25;
        })
        .attr("y", 185)
        .attr("font-size", 12)
        .text((d) => {
          return convertDateToTime(d.hour);
        });
      resetRectPos();
      svg
        .append("g")
        .selectAll("rect")
        .data(filteredData)
        .join("rect")
        .attr("fill", "black")
        .attr("opacity", 0.2)
        .attr("x", (d, i) => {
          if (!i) return 0;
          return calcRectPostition(i);
        })
        .attr("y", 0)
        .attr("width", (d, i) => {
          const time = convertDateToTime(d.hour);
          if (!i) return window.innerWidth / 2;
          return time === "6:00 PM" ? window.innerWidth : 0;
        })
        .attr("height", window.innerHeight);

      resetRectPos();

      const daylightData = filteredData.filter((i) =>
        ["6:00 AM", "12:00 PM", "6:00 PM"].includes(convertDateToTime(i.hour))
      );

      const ySun = scaleLinear().domain([0, 2]).range([h, 0]);

      svg
        .append("path")
        .datum(daylightData)
        .attr("stroke", "#FE8516")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr(
          "d",
          line()
            .x((d, i) => {
              return x(new Date(d.hour));
            })
            .y((d, i) => {
              return ySun(d.sun);
            })
            .curve(curveCardinal)
        );
    });

    const isNightTime = (date) => {
      const convertedDate = moment(date, "hh:mm a");
      const sixPm = moment("06:00 pm", "hh:mm a");
      const sixAm = moment("06:00 am", "hh:mm a");
      return convertedDate.isAfter(sixPm) || convertedDate.isBefore(sixAm)
        ? true
        : false;
    };

    const onScroll = () => {
      const oneMinute = widthScreen / minuteOfHalfDay;
      const convertedTime = moment
        .utc()
        .startOf("day")
        .add(chartContainerRef.current.scrollLeft / oneMinute, "minutes")
        .add(6, "hours")
        .format("hh:mm a");
      const day =
        (chartContainerRef.current.scrollLeft + widthScreen / 2) /
        (widthScreen * 2);

      setSunCoor({
        x: chartContainerRef.current.scrollLeft + widthScreen / 2,
        y: 200,
      });
      setDisplayMoon(isNightTime(convertedTime));
      setCurrentTime({
        day: parseInt(day) + 1,
        time: convertedTime,
      });
    };
    const currentContainerRef = chartContainerRef.current;

    chartContainerRef.current.addEventListener("scroll", onScroll);
    return () => currentContainerRef.removeEventListener("scroll", onScroll);
  }, []);

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
                <div className="Weather__Info__PSI">312</div>
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
      </div>
      <div className="Home__Screen__Bottom">
        <div ref={chartContainerRef} className="Chart__Wave__Container">
          <svg ref={svgRef}>
            <img
              className="Chart__Wave__Sun"
              src={`./sun.svg`}
              alt="sun"
              x={sunCoor.x}
              y={`200`}
              style={{ display: displayMoon ? "none" : "block" }}
            />
          </svg>
          <div className="Chart__Wave__Kim"></div>
          <p className="Chart__Wave__Time">{currentTime.time}</p>
          <p className="Chart__Wave__Day">Day {currentTime.day}</p>
          <p
            className="Chart__Wave__Moon"
            style={{ display: displayMoon ? "block" : "none" }}
          >
            🌑
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
