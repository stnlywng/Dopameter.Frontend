import React, { useState } from "react";
import { motion } from "framer-motion";
import "./TeeterTotter.module.css";

const TeeterTotter = () => {
  const [pleasureGremlins, setPleasureGremlins] = useState<number>(0);
  const [painGremlins, setPainGremlins] = useState<number>(0);

  // Calculate tilt based on the difference in number of gremlins
  const totalGremlins = pleasureGremlins + painGremlins;
  const tilt = totalGremlins === 0 ? 0 : (pleasureGremlins - painGremlins) * 10;

  // Add gremlins to either side
  const addGremlinToPleasure = () => setPleasureGremlins(pleasureGremlins + 1);
  const addGremlinToPain = () => setPainGremlins(painGremlins + 1);

  return (
    <div className="teeter-totter-container">
      {/* Teeter-Totter */}
      <motion.div
        className="teeter-totter"
        style={{ transformOrigin: "center" }}
        animate={{ rotate: tilt }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        {/* Pleasure Side */}
        <div className="side pleasure-side">
          {Array.from({ length: pleasureGremlins }).map((_, index) => (
            <motion.img
              key={`pleasure-gremlin-${index}`}
              src="/src/assets/Gremlin.png"
              alt="Pleasure Gremlin"
              className="gremlin"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            />
          ))}
        </div>

        {/* Pain Side */}
        <div className="side pain-side">
          {Array.from({ length: painGremlins }).map((_, index) => (
            <motion.img
              key={`pain-gremlin-${index}`}
              src="/src/assets/Good Cat.png"
              alt="Pain Gremlin"
              className="gremlin"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Buttons */}
      <div className="buttons-container">
        <button onClick={addGremlinToPleasure}>Add to Pleasure Side</button>
        <button onClick={addGremlinToPain}>Add to Pain Side</button>
      </div>
    </div>
  );
};

export default TeeterTotter;
