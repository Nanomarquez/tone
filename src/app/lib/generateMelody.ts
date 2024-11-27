import * as Tone from 'tone'

export const generateMelody = async ({ bpm, mode, chords, duration }: any) => {
  Tone.Transport.bpm.value = bpm;
  const synth = new Tone.Synth({
    oscillator: { type: "sine" }, // Usar una onda suave como "sine" o "triangle"
    envelope: {
      attack: 0.7,  // Un ataque rápido como el de las cuerdas de una guitarra
      decay: 1,    // El tiempo que tarda en decaer
      sustain: 0.6,  // La parte donde el sonido se mantiene después del decay
      release: 1,  // El tiempo que tarda en apagarse
    },
  }).toDestination();
  
  // Agregar efectos como reverb y chorus para emular mejor la guitarra
  const reverb = new Tone.Reverb(5).toDestination(); // Reverb para dar profundidad
  synth.connect(reverb);
  
  const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination(); // Chorus para simular la modulación de una guitarra
  synth.connect(chorus);

  const filter = new Tone.Filter(1000, "peaking").toDestination();
synth.connect(filter);

  // Modos con octava
  const modes = {
    mixolidio: ["C4", "D4", "E4", "F4", "G4", "A4", "A#4"],
    dorico: ["C4", "D4", "D#4", "F4", "G4", "A4", "A#4"],
    jonico: ["C4", "D4", "E4", "F4", "G4", "A4", "B4"],
    lidio: ["C4", "D4", "E4", "F#4", "G4", "A4", "B4"],
    eolico: ["C4", "D4", "D#4", "F4", "G4", "A#4", "A4"],
    frigio: ["C4", "C#4", "D#4", "F4", "G4", "A4", "B4"],
    locrio: ["C4", "C#4", "D#4", "F4", "F#4", "A4", "B4"],
  };

  const majorChords :  { [key: string]: string[] } = {
    C: ["C4", "E4", "G4"],
    "C#": ["C#4", "F4", "G#4"],
    D: ["D4", "F#4", "A4"],
    "D#": ["D#4", "G4", "A#4"],
    E: ["E4", "G#4", "B4"],
    F: ["F4", "A4", "C5"],
    "F#": ["F#4", "A#4", "C#5"],
    G: ["G4", "B4", "D5"],
    "G#": ["G#4", "C5", "D#5"],
    A: ["A4", "C#5", "E5"],
    "A#": ["A#4", "D5", "F5"],
    B: ["B4", "D#5", "F#5"],
  };

  const minorChords = {
    Cm: ["C4", "D#4", "G4"],
    "C#m": ["C#4", "E4", "G#4"],
    Dm: ["D4", "F4", "A4"],
    "D#m": ["D#4", "F#4", "A#4"],
    Em: ["E4", "G4", "B4"],
    Fm: ["F4", "G#4", "C5"],
    "F#m": ["F#4", "A4", "C#5"],
    Gm: ["G4", "A#4", "D5"],
    "G#m": ["G#4", "B4", "D#5"],
    Am: ["A4", "C5", "E5"],
    "A#m": ["A#4", "C#5", "F5"],
    Bm: ["B4", "D5", "F#5"],
  };

  const augmentedChords = {
    Caug: ["C4", "E4", "G#4"],
    "C#aug": ["C#4", "F4", "A4"],
    Daug: ["D4", "F#4", "A#4"],
    "D#aug": ["D#4", "G4", "B4"],
    Eaug: ["E4", "G#4", "C5"],
    Faug: ["F4", "A4", "C#5"],
    "F#aug": ["F#4", "A#4", "D5"],
    Gaug: ["G4", "B4", "D#5"],
    "G#aug": ["G#4", "C5", "E5"],
    Aaug: ["A4", "C#5", "F5"],
    "A#aug": ["A#4", "D5", "F#5"],
    Baug: ["B4", "D#5", "G5"],
  };

  const diminishedChords = {
    Cdim: ["C4", "D#4", "F#4"],
    "C#dim": ["C#4", "E4", "G4"],
    Ddim: ["D4", "F4", "G#4"],
    "D#dim": ["D#4", "F#4", "A4"],
    Edim: ["E4", "G4", "A#4"],
    Fdim: ["F4", "G#4", "B4"],
    "F#dim": ["F#4", "A4", "C5"],
    Gdim: ["G4", "A#4", "C#5"],
    "G#dim": ["G#4", "B4", "D5"],
    Adim: ["A4", "C5", "D#5"],
    "A#dim": ["A#4", "C#5", "E5"],
    Bdim: ["B4", "D5", "F5"],
  };

  const chordNotes: { [key: string]: string[] } = {
    ...majorChords,
    ...minorChords,
    ...augmentedChords,
    ...diminishedChords,
  };

  const modeNotes = modes[mode];
  const melody: any[] = [];
  const timeStep = 60 / bpm;
  let previousTime = Tone.now(); // Initialize previous time

  // Generar melodía basada en los acordes
  for (let i = 0; i < duration * 4; i++) {
    const currentChord = chords[i % chords.length]; // Ciclar entre los acordes
    const availableNotes = chordNotes[currentChord]?.filter((note) =>
      modeNotes.includes(note)
    ) || [];
    
    // Si no hay notas disponibles en el acorde, usar las notas del modo
    let note = availableNotes.length > 0
      ? availableNotes[Math.floor(Math.random() * availableNotes.length)]
      : modeNotes[Math.floor(Math.random() * modeNotes.length)];
    
    if (Math.random() < 0.2) {
      const randomIndex = Math.floor(Math.random() * modeNotes.length);
      note = modeNotes[randomIndex];
    }
  
    // Variación rítmica
    const noteDuration = ["8n", "16n", "4n"][Math.floor(Math.random() * 3)];
    
    // Ensure that each note is scheduled after the previous one
    const startTime = previousTime + timeStep;
    previousTime = startTime;
  
    // Variación dinámica
    const velocity = 0.5 + Math.random() * 0.5;
    
    melody.push({ note, time: startTime });
    
    // Reproducir la nota
    synth.triggerAttackRelease(note, noteDuration, startTime, velocity);
  }

  return melody;
};
