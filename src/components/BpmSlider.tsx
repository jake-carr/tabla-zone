import "./BpmSlider.css";
import ReactSlider from "react-slider";

interface IBPMSliderProps {
  bpm: number;
  setBpm: (value: number) => void;
}
const BPMSlider = ({ bpm, setBpm }: IBPMSliderProps) => {
  return (
    <div className="slider-container">
      <ReactSlider
          className="horizontal-slider"
          thumbClassName="slider-thumb"
          trackClassName="slider-track"
          aria-label="BPM Slider"
          min={20}
          max={240}
          value={bpm}
          onChange={(value) => setBpm(value)}
      />
    </div>
  );
};

export default BPMSlider;
