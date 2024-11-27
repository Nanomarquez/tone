"use client";
import { useState } from "react";

const MelodyControls = ({ onGenerate }: { onGenerate: Function }) => {
  const [bpm, setBpm] = useState(120);
  const [mode, setMode] = useState("mixolidio");
  const [chords, setChords] = useState<string[]>([]);
  const [duration, setDuration] = useState(4);

  const handleAddChord = (chord: string) => {
    setChords((prevChords) => [...prevChords, chord]);
  };

  const handleGenerate = () => {
    onGenerate({ bpm, mode, chords, duration });
  };

  const chordOptions = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
    "Cm",
    "C#m",
    "Dm",
    "D#m",
    "Em",
    "F#m",
    "Fm",
    "G#m",
    "Gm",
    "Am",
    "A#m",
    "Bm",
    "Caug",
    "Daug",
    "Eaug",
    "Cmaug",
    "C#aug",
    "Dmaug",
    "D#aug",
    "Emaug",
    "F#aug",
    "Faug",
    "G#aug",
    "Gaug",
    "Aaug",
    "A#aug",
    "Baug",
    "Cdim",
    "Cmdim",
    "C#dim",
    "Ddim",
    "D#dim",
    "Edim",
    "Fdim",
    "F#dim",
    "Gdim",
    "G#dim",
    "Adim",
    "A#dim",
    "Bdim",
    "Caug7",
    "C#aug7",
    "Daug7",
    "D#aug7",
    "Eaug7",
    "Faug7",
    "F#aug7",
    "Gaug7",
    "G#aug7",
    "Aaug7",
    "A#aug7",
    "Baug7",
    "Cdim7",
    "C#dim7",
    "Ddim7",
    "D#dim7",
    "Edim7",
    "Fdim7",
    "F#dim7",
    "Gdim7",
    "G#dim7",
    "Adim7",
    "A#dim7",
    "Bdim7",
  ]; // Aquí puedes agregar más acordes según sea necesario

  return (
    <div className="p-4 bg-gray-100 rounded-lg text-black">
      <h2 className="text-xl font-bold mb-4">Filtros de melodía</h2>
      <label>BPM:</label>
      <input
        type="number"
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
        className="block mb-2"
      />
      <label>Modo:</label>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="block mb-2"
      >
        <option value="mixolidio">Mixolídio</option>
        <option value="dorico">Dorico</option>
        <option value="jonico">Jónico</option>
        <option value="lidio">Lidio</option>
        <option value="eolico">Eolico</option>
        <option value="frigio">Frigio</option>
        <option value="locrio">Locrio</option>
      </select>
      <label>Acordes (selecciona varios):</label>
      <div className="mb-2">
        {chordOptions.map((chord) => (
          <button
            key={chord}
            onClick={() => handleAddChord(chord)}
            className="bg-blue-500 text-white px-4 py-2 m-1 rounded"
          >
            {chord}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={chords.join(", ")}
        readOnly
        className="block mb-2 p-2 border"
      />
      <button onClick={() => setChords([])} className="block mb-2">
        Clear
      </button>
      <label>Duración (en compases):</label>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        className="block mb-4"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generar
      </button>
    </div>
  );
};

export default MelodyControls;
