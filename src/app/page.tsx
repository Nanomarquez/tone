"use client";
import React, { useState } from "react";
import MelodyControls from "@/app/components/MelodyControls";
import { generateMelody } from "@/app/lib/generateMelody";

const Home = () => {
  const [melody, setMelody] = useState<any[]>([]);

  const handleGenerate = async (filters: any) => {
    const result = await generateMelody(filters);
    setMelody(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <MelodyControls onGenerate={handleGenerate} />
      {melody.length > 0 && (
        <div className="text-black">
          <h3 className="mt-4 text-lg font-semibold">Melodía generada:</h3>
          <ul>
            {melody.map((note, index) => (
              <li key={index}>{`${note.note} @ ${note.time.toFixed(2)}s`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
