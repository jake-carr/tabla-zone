import { Taal, taals } from "../constants/taals";
import "./TaalSelector.css";

interface ITaalSelectorProps {
  selectedTaal: Taal;
  setSelectedTaal: (value: Taal) => void;
}

const TaalSelector = ({
  selectedTaal,
  setSelectedTaal,
}: ITaalSelectorProps) => {
  return (
    <div className="taal-selector">
      {taals.map((taal, index) => (
        <button
          aria-label={'Select ' + taal.name}
          key={index}
          className={`taal-button ${
            selectedTaal.name === taal.name ? "selected" : ""
          }`}
          onClick={() => setSelectedTaal(taal)}
        >
          {taal.name}
        </button>
      ))}
    </div>
  );
};

export default TaalSelector;
