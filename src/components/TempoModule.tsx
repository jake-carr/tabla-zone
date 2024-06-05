import React, { useState, useEffect } from 'react';
import './TempoModule.css';

interface TempoModuleProps {
    bpm: number;
    setBpm: (bpm: number) => void;
    isPlaying: boolean;
    cycleLength: number; // Number of beats per cycle (e.g., 16 for Teental, 7 for Rupak Taal)
}

const TempoModule: React.FC<TempoModuleProps> = ({ bpm, setBpm, isPlaying, cycleLength }) => {
    const [increment, setIncrement] = useState<number>(0);
    const [cycles, setCycles] = useState<number>(0);
    const [currentCycle, setCurrentCycle] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        let bpmInterval: number | null = null;
        let timerInterval: number | null = null;
        let cycleInterval: number | null = null;

        if (isPlaying) {
            timerInterval = window.setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);

            cycleInterval = window.setInterval(() => {
                setCurrentCycle(prevCycle => {
                    const newCycle = prevCycle + 1;
                    if (newCycle >= cycleLength) {
                        const prevCycles = cycles;
                        setCycles(prevCycles => prevCycles + 1);
                        if ((prevCycles + 1) % cycles === 0 && increment > 0) {
                            // @ts-expect-error
                            setBpm(prevBpm => prevBpm + increment);
                        }
                        return 0; // Reset the cycle
                    }
                    return newCycle;
                });
            }, (60 / bpm) * 1000); // Interval based on current BPM
        } else {
            if (timerInterval !== null) clearInterval(timerInterval);
            if (cycleInterval !== null) clearInterval(cycleInterval);
            setElapsedTime(0);
            setCurrentCycle(0);
            setCycles(0);
        }

        return () => {
            if (timerInterval !== null) clearInterval(timerInterval);
            if (cycleInterval !== null) clearInterval(cycleInterval);
        };
    }, [isPlaying, bpm, increment, cycles, cycleLength, setBpm]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="tempo-module">
            <p>
                Optional: Increase the tempo by
                <input
                    type="number"
                    value={increment}
                    onChange={e => setIncrement(Number(e.target.value))}
                    min="0"
                /> bpm every
                <input
                    type="number"
                    value={cycles}
                    onChange={e => setCycles(Number(e.target.value))}
                    min="0"
                    max="100"
                /> cycles.
            </p>
            <p>Elapsed Time: {formatTime(elapsedTime)}</p>
            <p>Current Cycle: {currentCycle + 1} / {cycleLength}</p>
        </div>
    );
};

export default TempoModule;
