import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Engine } from '../lib/game/Engine';
import GameHUD from '../components/game/GameHUD';
import GameControls from '../components/game/GameControls';
import SocialToast from '../components/game/SocialToast';
import InstructionsPanel from '../components/game/InstructionsPanel';
import HitFlash from '../components/game/HitFlash';
import GameOver from '../components/game/GameOver';

export default function Game() {
  const containerRef = useRef(null);
  const engineRef = useRef(null);

  const [isListening, setIsListening] = useState(false);
  const [fichas, setFichas] = useState(100);
  const [fichasAzules, setFichasAzules] = useState(0);
  const [hp, setHp] = useState(5);
  const [lastCommand, setLastCommand] = useState('');
  const [showSocial, setShowSocial] = useState(false);
  const [hitFlash, setHitFlash] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const triggerHit = useCallback(() => {
    setHitFlash(true);
    setTimeout(() => setHitFlash(false), 400);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = new Engine(containerRef.current, {
      onFichasChange: (f) => setFichas(f),
      onFichasAzulesChange: (fa) => setFichasAzules(fa),
      onHpChange: (h) => setHp(h),
      onCommandRecognized: (cmd) => setLastCommand(cmd),
      onPlayerHit: triggerHit,
      onGameOver: () => setIsGameOver(true),
    });

    engineRef.current = engine;
    engine.start();

    return () => { engine.dispose(); };
  }, [triggerHit]);

  const toggleVoice = () => {
    if (!engineRef.current) return;
    setIsListening(engineRef.current.toggleVoiceControl());
  };

  const handleAddEnergy = () => {
    engineRef.current?.addEnergy();
  };

  const handleShare = () => {
    setShowSocial(true);
    setTimeout(() => setShowSocial(false), 3000);
  };

  const handleRestart = () => {
    if (!engineRef.current) return;
    engineRef.current.reset();
    setHp(5);
    setFichas(100);
    setFichasAzules(0);
    setIsGameOver(false);
    setLastCommand('');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background text-foreground font-inter" style={{ background: '#020617' }}>
      {/* 3D Canvas */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Red hit flash overlay */}
      <HitFlash active={hitFlash} />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between" style={{ padding: '20px' }}>
        <GameHUD fichas={fichas} fichasAzules={fichasAzules} hp={hp} />
        <div style={{ pointerEvents: 'auto' }}>
            <GameControls
            isListening={isListening}
            lastCommand={lastCommand}
            onToggleVoice={toggleVoice}
            onAddEnergy={handleAddEnergy}
            onShare={handleShare}
            />
        </div>
      </div>

      {/* Instructions */}
      <InstructionsPanel />

      {/* Social Toast */}
      <SocialToast show={showSocial} fichasAzules={fichasAzules} />

      {/* Game Over */}
      <GameOver show={isGameOver} onRestart={handleRestart} />
    </div>
  );
}
