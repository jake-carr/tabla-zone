import "./PlayPauseControls.css";
import { ReactComponent as PlayIcon } from "../assets/play.svg";
import { ReactComponent as PauseIcon } from "../assets/pause.svg";
import { ReactComponent as SumIcon } from "../assets/sum.svg";
import { ReactComponent as KaliIcon } from "../assets/kali.svg";
import { Taal } from "../constants/taals";

interface IStartStopButtonProps {
  isPlaying: boolean;
  togglePlay: () => void;
  taal: Taal;
  currentBeatZeroIndexed: number;
}

const PlayPauseControls = ({
  isPlaying,
  togglePlay,
  taal,
  currentBeatZeroIndexed,
}: IStartStopButtonProps) => (
  <div className="start-stop-container">
    <span className="current-sum-kali">
      {currentBeatZeroIndexed === taal.sum && <SumIcon />}
      {currentBeatZeroIndexed === taal.kali && <KaliIcon />}
    </span>
    <button
      aria-label={isPlaying ? "Stop metronome" : "Start metronome"}
      className={`start-stop-button ${isPlaying ? "stop" : "start"}`}
      onClick={togglePlay}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
    <span className="current-beat">
      {currentBeatZeroIndexed + 1}
    </span>
  </div>
);
export default PlayPauseControls;
