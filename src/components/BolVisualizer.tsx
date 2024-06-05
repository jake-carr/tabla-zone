import React from "react";
import "./BolVisualizer.css";
import { Bol } from "../constants/bols";
import { getTaalNameByNumberOfBeats } from "../constants/taals";

interface BolVisualizerProps {
  bolSequence: Bol[];
  currentBeat: number;
  bpm: number;
}

const BolVisualizer: React.FC<BolVisualizerProps> = ({
  bolSequence,
  currentBeat,
  bpm,
}) => {
  const beatDuration = 60 / bpm; // duration of each beat in seconds
  const getGridClass = () => {
    return getTaalNameByNumberOfBeats(bolSequence.length).toLowerCase()
  };
  return (
    <div className={`bol-visualizer ${getGridClass()}`}>
      {bolSequence.map((bol, index) => (
        <div
          key={index}
          className={`bol ${index === currentBeat ? "active" : ""}`}
          style={
            { "--pulse-duration": `${beatDuration}s` } as React.CSSProperties
          }
        >
          <span className="bol-name">{bol.name}</span>
        </div>
      ))}
    </div>
  );
};

export default BolVisualizer;
