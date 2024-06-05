import { links, openLink } from "../../constants/seo";
import "./AboutContent.css";

const mmironLink = () => openLink(links.mmiron);
const icongeekLink = () => openLink(links.icongeek);
const githubLink = () => openLink(links.github);
const mitLink = () => openLink(links.mit);

const AboutContent = () => (
  <div className="about-content">
    <h4 className="about-header">About</h4>
    <div className="about-text">Tabla.zone is a free, lightweight practice app for Indian musicians.</div>
    <h4 className="about-header">Acknowledgements</h4>
    <div className="about-text">
      Thanks to {" "}
      <span
        className="link"
        onClick={mmironLink}
      >
        mmiron
      </span>
      {" "}for the tabla samples and {" "}
      <span
        className="link"
        onClick={icongeekLink}
      >
        icongeek26
      </span>
      {" "}for the logo.
    </div>
    <h4 className="about-header">Contributing</h4>
    <div className="about-text">
      This project is on{" "}
      <span
        className="link"
        onClick={githubLink}
      >
        GitHub
      </span>
      {" "}under the{" "}
      <span
        className="link"
        onClick={mitLink}
        >
        MIT License
        </span>
      . Please feel free to fork it or open an issue.
    </div>
  </div>
);

export default AboutContent;
