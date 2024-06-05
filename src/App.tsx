import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import "./App.css";
import TaalSelector from "./components/TaalSelector";
import BolVisualizer from "./components/BolVisualizer";
import BPMSlider from "./components/BpmSlider";
import PlayPauseControls from "./components/PlayPauseControls";
import { Teental } from "./constants/taals";
import Modal from "./components/modals/Modal";
import AboutContent from "./components/modals/AboutContent";
import { Helmet } from 'react-helmet';
import { metaTags } from "./constants/seo";
import useLocalStorage from "./hooks/useLocalStorage";
import { Bol } from "./constants/bols";

const AppDefaults = {
  taal: Teental,
  bpm: 100,
};

const App = () => {
  const [selectedTaal, setSelectedTaal] = useLocalStorage('taal', AppDefaults.taal);
  const [bpm, setBpm] = useLocalStorage('bpm', AppDefaults.bpm);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const playerRefs = useRef(
    selectedTaal.sequence.map(() => new Tone.Player().toDestination())
  );

  useEffect(() => {
    // Load samples into players
    selectedTaal.sequence.forEach((bol: Bol, index: number) => {
      playerRefs.current[index].load(bol.audioPath);
    });

    // Reset metronome whenever selectedTaal changes
    if (isPlaying) {
      resetMetronome({ resetCurrentBeat: true })
      startMetronome();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTaal]);

  useEffect(() => {
    Tone.getTransport().bpm.value = bpm;

    // Reset metronome but stay at current beat when bpm changes
    if (isPlaying) {
      resetMetronome({ resetCurrentBeat: false })
      startMetronome();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpm]);

  const resetMetronome = (options: {
    resetCurrentBeat: boolean;
  }) => {
    // Stop the transport
    Tone.getTransport().stop();
    // Clear all scheduled events
    Tone.getTransport().cancel();
    
    if (options?.resetCurrentBeat) {
      // Reset the current beat
      setCurrentBeat(0);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      resetMetronome({ resetCurrentBeat: false });
      setIsPlaying(false);
    } else {
      startMetronome();
      setIsPlaying(true);
    }
  };

  const startMetronome = async () => {
    resetMetronome({ resetCurrentBeat: true });

    Tone.getTransport().scheduleRepeat((time) => {
      setCurrentBeat((prev) => (prev + 1) % selectedTaal.sequence.length);
    }, "4n");

    Tone.getTransport().start();
  };

  useEffect(() => {
    if (isPlaying) {
      // const currentBol = selectedTaal.sequence[currentBeat];
      playerRefs.current[currentBeat].start(Tone.getTransport().seconds + 0.1);
    }
  }, [currentBeat, isPlaying, selectedTaal.sequence]);

  // Spacebar play/pause
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        togglePlay();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="app">
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:image" content={metaTags.image} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="twitter:card" content={metaTags.image} />
        <meta property="twitter:url" content={metaTags.url} />
        <meta property="twitter:image" content={metaTags.image} />
        <meta property="twitter:title" content={metaTags.title} />
        <meta property="twitter:description" content={metaTags.description} />
        <link rel="icon" type="image/png" href={metaTags.image} />
        <link rel="apple-touch-icon" href={metaTags.image} />
      </Helmet>
      <div className="section section-one">
        <div className="header-section">
          <div className="header-row">
            <img
              src="tabla.png"
              alt="Tabla"
              height={43}
              style={{ paddingRight: "10px" }}
            />
            <h1>tabla.zone</h1>
          </div>
          <div
            className="about-link"
            onClick={() => setModalContent(<AboutContent />)}
          >
            about
          </div>
        </div>
      </div>
      <div className="section section-two">
        <div className="bpm-container">
          <TaalSelector
            selectedTaal={selectedTaal}
            setSelectedTaal={setSelectedTaal}
          />
          <div className="row-centered">
            <span>{bpm} bpm</span>
          </div>
          <BPMSlider bpm={bpm} setBpm={setBpm} />
        </div>
      </div>
      <div className="section section-three">
      <PlayPauseControls
        isPlaying={isPlaying}
        taal={selectedTaal}
        togglePlay={togglePlay}
        currentBeatZeroIndexed={currentBeat}
      />

      <BolVisualizer
        bolSequence={selectedTaal.sequence}
        currentBeat={currentBeat}
        bpm={bpm}
      />
      </div>

      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default App;
