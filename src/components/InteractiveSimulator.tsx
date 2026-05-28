import { useState, useEffect, useRef } from 'react';
import { Scenario, Extinguisher, GameState } from '../types';
import { SCENARIOS, EXTINGUISHERS } from '../data';
import { ShieldAlert, RotateCcw, Play, CheckCircle2, Award, Printer, ChevronRight, HelpCircle } from 'lucide-react';

interface InteractiveSimulatorProps {
  customScenarios: Scenario[];
  selectedScenarioId: string;
}

export default function InteractiveSimulator({ customScenarios, selectedScenarioId }: InteractiveSimulatorProps) {
  // Combine native and user-generated scenarios
  const allScenarios = [...SCENARIOS, ...customScenarios];
  
  // Set default scenario
  const [activeScenarioId, setActiveScenarioId] = useState(SCENARIOS[0].id);

  // Sync with prop from scenarios section
  useEffect(() => {
    if (selectedScenarioId) {
      setActiveScenarioId(selectedScenarioId);
      // Reset simulator when scenario shifts
      handleReset();
    }
  }, [selectedScenarioId]);

  const activeScenario = allScenarios.find(s => s.id === activeScenarioId) || SCENARIOS[0];

  const [selectedExtinguisherId, setSelectedExtinguisherId] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>({
    scenarioId: activeScenarioId,
    extinguisherId: '',
    step: 'intro',
    pasaSteps: {
      pinPulled: false,
      aimedBase: false,
      squeezedLever: false,
      sweptSide: false,
    },
    hasInspectedExtinguisher: false,
    fireIntensity: 100,
    secondsLeft: 15,
    score: 0,
    feedbackMessage: ''
  });

  // State for printable certificate
  const [userName, setUserName] = useState('');
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const [sweepValue, setSweepValue] = useState(50); // 0 to 100
  const [sweepCount, setSweepCount] = useState(0);
  const [previousSweepPos, setPreviousSweepPos] = useState(50);

  // Simulation timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedExtinguisherId('');
    setSweepValue(50);
    setSweepCount(0);
    setCertificateGenerated(false);
    setGameState({
      scenarioId: activeScenarioId,
      extinguisherId: '',
      step: 'intro',
      pasaSteps: {
        pinPulled: false,
        aimedBase: false,
        squeezedLever: false,
        sweptSide: false,
      },
      hasInspectedExtinguisher: false,
      fireIntensity: 100,
      secondsLeft: 15,
      score: 0,
      feedbackMessage: ''
    });
  };

  // Change scenario
  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    handleReset();
  };

  const handleSelectExtinguisher = (extId: string) => {
    setSelectedExtinguisherId(extId);
  };

  // Step 1: Start inspection
  const handleStartInspection = () => {
    if (!selectedExtinguisherId) return;
    setGameState(prev => ({
      ...prev,
      extinguisherId: selectedExtinguisherId,
      step: 'inspect',
      feedbackMessage: 'Inspecciona el extintor. Asegúrate de verificar su manómetro para corroborar la carga.'
    }));
  };

  // Confirm inspection (click manometer)
  const handleCompleteInspection = () => {
    setGameState(prev => ({
      ...prev,
      hasInspectedExtinguisher: true,
      step: 'pasa',
      feedbackMessage: '¡Excelente! Extintor presurizado (aguja en zona verde). Ahora, sigue el protocolo PASA para extinguir el brote.'
    }));
  };

  // Pull metal safety pin
  const handlePullPin = () => {
    setGameState(prev => {
      const nextSteps = { ...prev.pasaSteps, pinPulled: true };
      return {
        ...prev,
        pasaSteps: nextSteps,
        feedbackMessage: 'Pasador extraído correctamente. Ahora, apunta la manguera difusora a la base del fuego.'
      };
    });
  };

  // Aim at fire (Base vs Top)
  const handleAim = (isBase: boolean) => {
    if (isBase) {
      setGameState(prev => {
        const nextSteps = { ...prev.pasaSteps, aimedBase: true };
        return {
          ...prev,
          pasaSteps: nextSteps,
          feedbackMessage: 'Manguera alineada a la base de las llamas. ¡Perfecto! Presiona el gatillo para liberar el agente.'
        };
      });
    } else {
      // Aimed top - penalty / feedback
      setGameState(prev => ({
        ...prev,
        feedbackMessage: '⚠️ ADVERTENCIA: Apuntar a la punta de las llamas no sofoca la reacción de combustión en la madera o circuito. Apunta a la BASE.'
      }));
    }
  };

  // Start Extinguisher Agent Discharge Spray
  const startDischarge = () => {
    if (!gameState.pasaSteps.pinPulled || !gameState.pasaSteps.aimedBase) {
      setGameState(prev => ({
        ...prev,
        feedbackMessage: '⚠️ ALERTA: Debes jalar el pasador y apuntar a la base primero antes de presionar el gatillo.'
      }));
      return;
    }

    // Set squeezed state
    setGameState(prev => {
      const nextSteps = { ...prev.pasaSteps, squeezedLever: true };
      return {
        ...prev,
        pasaSteps: nextSteps,
        step: 'attack',
        feedbackMessage: '¡Descargando! Ahora, realiza un barrido de lado a lado arrastrando el control flotante.'
      };
    });

    // Start timer counter
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setGameState(prev => {
          if (prev.secondsLeft <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            return handleGameOver(prev, true); // Timeout
          }
          return {
            ...prev,
            secondsLeft: prev.secondsLeft - 1
          };
        });
      }, 1000);
    }
  };

  // Track sweep movement (horizontal side-to-side slider or drag)
  const handleSweepChange = (val: number) => {
    setSweepValue(val);
    const distance = Math.abs(val - previousSweepPos);
    if (distance > 15) {
      setSweepCount(c => c + 1);
      setPreviousSweepPos(val);

      // Decelerate intensity of the fire only if spraying and holding aim
      if (gameState.pasaSteps.squeezedLever) {
        setGameState(prev => {
          // Dynamic safety matching check!
          const selectedExt = EXTINGUISHERS.find(e => e.id === prev.extinguisherId);
          const isCorrectAgent = selectedExt?.type === activeScenario.recommendedExtinguisher;

          if (!isCorrectAgent) {
            // Instant disaster failure!
            clearInterval(timerRef.current!);
            timerRef.current = null;
            return handleCriticalFailure(prev);
          }

          const nextIntensity = Math.max(0, prev.fireIntensity - 8);
          const nextSteps = { ...prev.pasaSteps, sweptSide: true };
          
          if (nextIntensity <= 0) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            return handleGameWin(prev, nextSteps);
          }

          return {
            ...prev,
            pasaSteps: nextSteps,
            fireIntensity: nextIntensity,
            feedbackMessage: `¡Buen ritmo! Desplazando llamas... Flujo térmico residual: ${nextIntensity}%`
          };
        });
      }
    }
  };

  const handleCriticalFailure = (prev: GameState): GameState => {
    let message = '';
    if (prev.extinguisherId === 'Agua' && activeScenario.fireClass === 'C') {
      message = '⚠️ ACCIDENTE FATAL: El agua es un conductor dieléctrico de alto nivel. Sufres electrocución fulminante de más de 220V al impactar el computador encendido. Por ley (DS594), en fuegos con energía activa se prohíbe el agua.';
    } else if (prev.extinguisherId === 'Agua' && activeScenario.fireClass === 'K') {
      message = '💥 EXPLOSIÓN FÍSICA: Verter agua líquida sobre aceite hirviendo a 360°C produce una violenta evaporación masiva. El vapor en expansión catapulta el aceite flameante por todo el recinto, causándote quemaduras del 90% del cuerpo.';
    } else if (prev.extinguisherId === 'PQS' && activeScenario.id === 'servidores') {
      message = '⚠️ DAÑO COLATERAL SEVERO: Apagaste el fuego, pero el polvo químico corrosivo penetró los racks, dañando permanentemente toda la infraestructura e integridad de los servidores no accidentados de la empresa logrando pérdidas millonarias irreparables. Debiste usar CO2.';
    } else if (prev.extinguisherId === 'Agua' && activeScenario.fireClass === 'B') {
      message = '🔥 PROPAGACIÓN INMEDIATA: El agua hierve instantáneamente bajo el combustible líquido o flota sobre este, esparciendo gasolina encendida por toda la superficie de la bodega y bloqueando tu ruta de evacuación.';
    } else {
      message = `❌ AGENTE INCOMPATIBLE: El extintor de ${prev.extinguisherId} no corresponde para contrarrestar este tipo de peligro (${activeScenario.fireClass}). Esto permitió la propagación tóxica libre fuera de control.`;
    }

    return {
      ...prev,
      step: 'failure',
      feedbackMessage: message
    };
  };

  const handleGameOver = (prev: GameState, isTimeout: boolean): GameState => {
    return {
      ...prev,
      step: 'failure',
      feedbackMessage: '❌ TIEMPO EXPIRADO: El gas extintor se agotó o el humo inhabilitó tus capacidades. En 15 segundos un fuego mal contenido activa el colapso de oxígeno comprometiendo tu salud.'
    };
  };

  const handleGameWin = (prev: GameState, checkedSteps: any): GameState => {
    // Scoring engine calculation
    let finalScore = 100;
    if (!prev.hasInspectedExtinguisher) finalScore -= 10;
    if (prev.secondsLeft < 5) finalScore -= 10;
    
    return {
      ...prev,
      pasaSteps: checkedSteps,
      step: 'success',
      fireIntensity: 0,
      score: finalScore,
      feedbackMessage: '🎉 ¡CONTENCION EXITOSA! Has sofocado el incendio por completo en un entorno seguro de entrenamiento. Has aprobado de acuerdo a los criterios prácticos de prevención laboral DS594.'
    };
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="simulador"
      className="py-16 bg-slate-900 border-t border-slate-800 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header Title */}
        <div className="max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-wider bg-orange-600/10 px-3 py-1 rounded-full text-center">
            Capacitación Integrada Web
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-center">
            Simulador de Extintores 2D Interactivo
          </h3>
          <p className="text-slate-400 text-sm">
            Prueba tus aptitudes técnicas antes de dar el salto al visor de Realidad Virtual. Experimenta el flujo de trabajo preventivo dictado por la ley en Chile.
          </p>
        </div>

        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto text-left">
          
          {/* Controls Panel (Cols 1-4) */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                1. Selección de Entorno
              </h4>
              
              {/* Scenario dropdown list */}
              <div className="space-y-2.5">
                {allScenarios.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioChange(sc.id)}
                    className={`w-full p-3 rounded-xl border text-left transition flex justify-between items-center ${
                      activeScenarioId === sc.id
                        ? 'bg-slate-900 border-orange-500/50 text-white shadow shadow-orange-950/25'
                        : 'bg-slate-950 hover:bg-slate-900 border-slate-850 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold leading-none">{sc.title}</p>
                      <p className="text-[10px] text-slate-500 mt-1 lines-clamp-1">{sc.subtitle}</p>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">
                      Clase {sc.fireClass}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Extinguisher */}
            <div className="mt-8">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                2. Selección de Extintor
              </h4>
              <p className="text-[11px] text-slate-500 mb-3 block">Asigna el agente extintor idóneo según la combustión:</p>
              
              <div className="grid grid-cols-2 gap-2.5">
                {EXTINGUISHERS.map((ext) => (
                  <button
                    key={ext.id}
                    onClick={() => handleSelectExtinguisher(ext.id)}
                    disabled={gameState.step !== 'intro'}
                    className={`p-3 rounded-xl border text-center transition flex flex-col justify-center items-center gap-1 cursor-pointer ${
                      selectedExtinguisherId === ext.id
                        ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-orange-500/70 text-white glow-orange'
                        : 'bg-slate-950 hover:bg-slate-900 border-slate-850 text-slate-400 disabled:opacity-40'
                    }`}
                  >
                    <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold leading-none ${ext.badgeColor}`}>
                      {ext.id}
                    </span>
                    <span className="text-[10px] font-extrabold truncate w-full leading-none mt-1">
                      {ext.name.split(' (')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons list */}
            <div className="pt-6 border-t border-slate-900 mt-6">
              {gameState.step === 'intro' ? (
                <button
                  id="simulator-start-inspection"
                  onClick={handleStartInspection}
                  disabled={!selectedExtinguisherId}
                  className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-extrabold py-3 px-4 rounded-xl text-center text-sm transition transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Iniciar Entrenamiento
                </button>
              ) : (
                <button
                  id="simulator-abort"
                  onClick={handleReset}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold py-3 px-4 rounded-xl text-center text-xs transition border border-slate-800 flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reiniciar Simulación
                </button>
              )}
            </div>
          </div>

          {/* Holographic Simulation Display Unit (Cols 5-12) */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-850 p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden min-h-[480px]">
            
            {/* Holographic grid lines */}
            <div className={`absolute inset-0 pointer-events-none transition-all duration-300 ${gameState.step === 'attack' ? 'grid-lines opacity-10' : 'grid-lines-blue opacity-10'}`} />

            {/* Panel Header Status */}
            <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold tracking-widest">
                  {gameState.step === 'attack' ? 'SIMULANDO RETROALIMENTACION ACTIVA' : 'SISTEMA DE CAPACITACION COMPLIANCE'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-400">Escenario: <strong className="text-white">{activeScenario.title}</strong></span>
                <span className="text-slate-400">Tiempo: <strong className="text-orange-500 font-bold">{gameState.secondsLeft}s</strong></span>
              </div>
            </div>

            {/* Central stage box (Canvas / SVG graphics representational frame) */}
            <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-900 relative min-h-[260px] flex flex-col items-center justify-center text-center overflow-hidden">
              
              {/* STAGE: Intro Overview */}
              {gameState.step === 'intro' && (
                <div className="space-y-4 max-w-sm py-4 animate-fadeIn">
                  <div className="text-slate-500 flex justify-center">
                    <HelpCircle className="w-12 h-12 text-slate-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-300">Entrenamiento Listo</h5>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Elige un escenario para evaluar en el menú de la izquierda y luego escoge un agente de extinción. Presiona <strong className="text-orange-500">Iniciar Entrenamiento</strong> para validar tu técnica.
                    </p>
                  </div>
                </div>
              )}

              {/* STAGE: Inspection close-up check (Manometer) */}
              {gameState.step === 'inspect' && (
                <div className="space-y-6 max-w-sm py-2 text-center flex flex-col items-center animate-fadeIn">
                  <div className="text-center">
                    <h5 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-1">Chequeo Previo de Seguridad</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">Haz clic en el Manómeto para verificar que la carga de presión se encuentre en el rango OK (Zona Verde) antes de usar.</p>
                  </div>

                  {/* Visual Manometer SVG */}
                  <div
                    onClick={handleCompleteInspection}
                    className="relative w-40 h-40 bg-slate-950 rounded-full border-4 border-slate-700 flex flex-col justify-center items-center shadow-xl hover:border-emerald-500 hover:shadow-emerald-950/20 cursor-pointer group active:scale-95 transition-all duration-150"
                  >
                    {/* Gauge markings */}
                    <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-slate-800" />
                    {/* Green zone pie */}
                    <div className="absolute top-4 w-16 h-8 bg-emerald-500/30 rounded-t-full border-b border-slate-800 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-emerald-400 -mt-2">OK</span>
                    </div>
                    {/* Needle pointing at Green */}
                    <div className="w-1.5 h-12 bg-orange-500 rounded bottom-1/2 absolute origin-bottom transform rotate-[25deg] group-hover:rotate-[30deg] transition duration-300" />
                    {/* Center Pin */}
                    <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-600 relative z-10" />

                    <span className="text-[9px] absolute bottom-6 text-slate-500 uppercase font-bold tracking-widest">
                      PRESIONAR
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 italic">Haz clic en el medidor para aprobar.</p>
                </div>
              )}

              {/* STAGE: PASA checklist & Interactive spray attacking */}
              {(gameState.step === 'pasa' || gameState.step === 'attack') && (
                <div className="w-full flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                  
                  {/* Digital Canvas frame display (left) */}
                  <div className="col-span-8 w-full border border-slate-850 rounded-lg p-4 relative min-h-[220px] bg-slate-950 overflow-hidden flex flex-col justify-between">
                    
                    {/* Heat Wave dynamic glow overlay */}
                    {gameState.fireIntensity > 0 && (
                      <div
                        className="absolute inset-0 bg-red-600 pointer-events-none transition duration-75 mix-blend-color-dodge"
                        style={{ opacity: (gameState.fireIntensity / 100) * 0.12 }}
                      />
                    )}

                    {/* Room environment name banner */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] text-slate-500 uppercase font-bold">{activeScenario.title}</span>
                      <span className="text-[10px] bg-red-950/40 border border-red-900/30 px-2 rounded-full font-bold text-red-400 animate-pulse">
                        FUEGO DETECTADO
                      </span>
                    </div>

                    {/* Flames drawing visual effect container */}
                    <div className="w-full h-32 flex flex-col justify-end items-center relative py-4">
                      
                      {gameState.fireIntensity > 0 ? (
                        <div className="flex flex-col items-center justify-end relative">
                          
                          {/* Main flame element scales relative to fireIntensity */}
                          <div
                            className="bg-gradient-to-t from-red-600 via-orange-500 to-amber-400 rounded-full blur-[2px] animate-pulse transition-all duration-300"
                            style={{
                              width: `${Math.max(40, gameState.fireIntensity * 1.5)}px`,
                              height: `${Math.max(40, gameState.fireIntensity * 1.2)}px`
                            }}
                          />
                          
                          {/* Smoke cloud overlay */}
                          <div
                            className="bg-slate-700/40 blur-md rounded-full absolute -top-8 animate-bounce transition-all duration-300"
                            style={{
                              width: `${Math.max(20, gameState.fireIntensity * 1.1)}px`,
                              height: `${Math.max(20, gameState.fireIntensity * 0.8)}px`
                            }}
                          />

                          {/* Trigger point targets representing base/top */}
                          {!gameState.pasaSteps.aimedBase && (
                            <div className="absolute inset-0 flex flex-col justify-between items-center w-full h-full py-2">
                              {/* Option A: Top (penalty) */}
                              <button
                                onClick={() => handleAim(false)}
                                className="bg-red-500 border border-red-400 hover:bg-red-600 text-[9px] text-slate-950 font-extrabold px-2 py-0.5 rounded-full z-10 transition animate-bounce shadow"
                              >
                                Apuntar a la Copa
                              </button>
                              
                              {/* Option B: Base (correct) */}
                              <button
                                onClick={() => handleAim(true)}
                                className="bg-emerald-400 border border-emerald-300 hover:bg-emerald-500 text-[9px] text-slate-950 font-extrabold px-3 py-1 rounded-full z-10 transition animate-ping shadow"
                              >
                                Apuntar a la Base 🎯
                              </button>
                            </div>
                          )}

                        </div>
                      ) : (
                        <div className="text-center py-4 flex flex-col items-center gap-1.5 animate-fadeIn">
                          <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-pulse" />
                          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Fuegos Sofocados</p>
                          <p className="text-[10px] text-slate-400">Flujo de calor extinguido al 100%.</p>
                        </div>
                      )}

                      {/* Chemical Gas Particles discharge visual overlay */}
                      {gameState.pasaSteps.squeezedLever && gameState.fireIntensity > 0 && (
                        <div className="absolute inset-x-0 bottom-2 text-center pointer-events-none self-end flex justify-center animate-bounce">
                          <div className="bg-white/85 text-slate-900 border border-slate-300 rounded font-semibold px-2 py-0.5 text-[8px] uppercase tracking-wide">
                            {gameState.extinguisherId === 'CO2' ? '🌬️ Descargando Gas CO2 Frío' : '💨 Humo Polvo PQS Activado'}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Progress fire indicator bar */}
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-orange-600 to-red-600 h-full transition-all duration-300"
                        style={{ width: `${gameState.fireIntensity}%` }}
                      />
                    </div>
                  </div>

                  {/* Interactive Manual Checklist (right Column of Stage) */}
                  <div className="col-span-4 w-full flex flex-col gap-2 shadow-inner">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Protocolo PASA</h5>
                    
                    {/* Step P */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-900">
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${gameState.pasaSteps.pinPulled ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-500'}`}>P</span>
                        <span className="text-[10px] font-semibold text-slate-300">Quitar Pasador</span>
                      </div>
                      {!gameState.pasaSteps.pinPulled ? (
                        <button
                          onClick={handlePullPin}
                          className="bg-orange-600 hover:bg-orange-500 text-[10px] text-white font-bold px-2 py-1 rounded shadow"
                        >
                          Tirar Pasador
                        </button>
                      ) : (
                        <span className="text-[9px] text-emerald-400 font-bold">Hecho</span>
                      )}
                    </div>

                    {/* Step A */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-900">
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${gameState.pasaSteps.aimedBase ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-500'}`}>A</span>
                        <span className="text-[10px] font-semibold text-slate-300">Apuntar Base</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-500">
                        {gameState.pasaSteps.aimedBase ? <span className="text-emerald-400">Hecho</span> : 'Ver Stage 🎯'}
                      </span>
                    </div>

                    {/* Step S */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-900">
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${gameState.pasaSteps.squeezedLever ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-500'}`}>S</span>
                        <span className="text-[10px] font-semibold text-slate-300">Mantener Mango</span>
                      </div>
                      {!gameState.pasaSteps.squeezedLever ? (
                        <button
                          onClick={startDischarge}
                          disabled={!gameState.pasaSteps.pinPulled || !gameState.pasaSteps.aimedBase}
                          className="bg-red-600 hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-600 text-[10px] text-white font-bold px-2 py-1 rounded shadow"
                        >
                          Sujetar
                        </button>
                      ) : (
                        <span className="text-[9px] text-emerald-400 font-bold">Activo</span>
                      )}
                    </div>

                    {/* Step A - Sweep */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-900">
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${gameState.pasaSteps.sweptSide ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-500'}`}>A</span>
                        <span className="text-[10px] font-semibold text-slate-300">Barrido Abanico</span>
                      </div>
                      <span className={`text-[9px] font-bold ${sweepCount >= 5 ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {sweepCount >= 5 ? 'Cumplido' : `${sweepCount}/5 Abanicos`}
                      </span>
                    </div>

                  </div>
                </div>
              )}

              {/* STAGE: Success state */}
              {gameState.step === 'success' && (
                <div className="p-4 flex flex-col items-center gap-4 animate-fadeIn max-w-sm">
                  <div className="bg-emerald-500/15 p-3 rounded-2xl text-emerald-400">
                    <Award className="w-12 h-12" />
                  </div>
                  <div>
                    <h5 className="text-base font-extrabold text-white uppercase tracking-wider">¡Capacitación Aprobada!</h5>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Calificación: <strong className="text-white">Nota 7.0</strong> (Score: {gameState.score}/100). Sofocaste el peligro respetando el distanciamiento mínimo y la maniobra regulada.
                    </p>
                  </div>

                  {!certificateGenerated ? (
                    <div className="w-full space-y-2 mt-2">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Añade tu nombre para el Certificado:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Paula Fritz"
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg text-xs px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 text-left"
                        />
                        <button
                          onClick={() => userName.trim() && setCertificateGenerated(true)}
                          disabled={!userName.trim()}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-2 rounded-lg transition"
                        >
                          Firmar Certificado
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-emerald-400 font-bold">✓ Certificado autorizado abajo.</span>
                  )}
                </div>
              )}

              {/* STAGE: Failure state */}
              {gameState.step === 'failure' && (
                <div className="p-4 flex flex-col items-center justify-center gap-4 text-center max-w-md animate-fadeIn">
                  <div className="bg-red-500/15 p-3 rounded-2xl text-red-500">
                    <ShieldAlert className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-bold text-red-500 uppercase tracking-widest">Siniestro Fuera de Control</h5>
                    <p className="text-xs text-red-100 leading-relaxed max-w-sm">
                      {gameState.feedbackMessage}
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition shadow-lg inline-flex items-center gap-2 mt-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Intentar de Nuevo
                  </button>
                </div>
              )}

            </div>

            {/* Sweep Control Slider (Visible during Attack & Aim Stage) */}
            {gameState.step === 'attack' && gameState.fireIntensity > 0 && (
              <div className="mt-4 bg-slate-900 border border-slate-850 p-3.5 rounded-xl block relative z-10 animate-pulse">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">MANIOBRA DE ABACO: DESPLAZA DE LADO A LADO EN ABANICO</span>
                  <span className="text-[9px] bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-400 font-bold">{sweepCount >= 5 ? '✓ BARRIDO COMPACTO' : `${sweepCount}/5 MOVIMIENTOS`}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sweepValue}
                  onChange={(e) => handleSweepChange(parseInt(e.target.value))}
                  className="w-full accent-orange-500 bg-slate-800 cursor-pointer h-2.5 rounded"
                />
              </div>
            )}

            {/* Feedback message overlay strip */}
            {gameState.feedbackMessage && gameState.step !== 'failure' && gameState.step !== 'success' && (
              <div className="mt-4 p-3 bg-slate-900 border border-slate-850 rounded-xl relative z-10 animate-fadeIn text-xs text-slate-300">
                💡 {gameState.feedbackMessage}
              </div>
            )}

          </div>

        </div>

        {/* Dynamic PDF/Print SENCE Compliance Certificate (Rendered below after success + name) */}
        {gameState.step === 'success' && certificateGenerated && (
          <div className="mt-12 bg-white text-slate-950 p-6 sm:p-10 rounded-2xl max-w-3xl border-4 border-double border-slate-300 mx-auto text-left relative overflow-hidden shadow-2xl print:border-none print:shadow-none animate-fadeIn">
            
            {/* Watermark decors */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
              <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>

            {/* Certificate Header details */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-5 mb-6 gap-4">
              <div>
                <h5 className="text-[11px] font-bold tracking-widest text-slate-500 uppercase leading-none">REGISTRO DE CAPACITACIÓN LABORAL</h5>
                <h4 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none mt-1.5">VIRTUALIZAR CAPACITACIONES LIMITADA</h4>
                <p className="text-[10px] text-slate-500 leading-none mt-1">Autorización Nacional de Realidad Virtual para Seguridad en Obras y Oficinas</p>
              </div>
              <div className="bg-slate-100 px-3 py-1.5 rounded text-center border overflow-hidden shrink-0">
                <p className="text-[9px] text-slate-600 font-bold uppercase leading-none">NORMA CHILE</p>
                <p className="text-xs font-black text-slate-950 mt-1">DS594 ART 47</p>
              </div>
            </div>

            {/* Cert Body copy */}
            <div className="space-y-4">
              <h1 className="text-2xl font-black text-center text-slate-900 uppercase tracking-wide py-1 border-y border-slate-100">
                CERTIFICADO DE APROBACIÓN PRÁCTICA
              </h1>

              <p className="text-xs leading-relaxed text-slate-700 text-center max-w-2xl mx-auto pt-2">
                Se otorga el presente diploma de acreditación simulada de instrucción laboral a don/doña:
              </p>

              <p className="text-2xl font-black text-center text-slate-950 tracking-tight underline decors-orange-500 py-1.5">
                {userName}
              </p>

              <p className="text-xs leading-relaxed text-slate-755 text-justify max-w-xl mx-auto">
                Por haber completado con éxito la instrucción práctica del uso y manejo del extintor de <span className="font-extrabold text-slate-900">{gameState.extinguisherId}</span> frente al escenario crítico simulado de <span className="font-bold text-slate-900">“{activeScenario.title}”</span>, cumpliendo con la secuencia reglamentaria de remoción, chequeo barométrico, apuntamiento y dispersión uniforme abanico.
              </p>
            </div>

            {/* Specific values of testing */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-6 bg-slate-50 border rounded-xl my-6 max-w-2xl mx-auto text-xs">
              <div className="text-center">
                <span className="text-[9px] text-slate-500 block">Calificación</span>
                <strong className="text-slate-900 font-black text-sm">Nota 7.0</strong>
              </div>
              <div className="text-center border-l border-slate-200">
                <span className="text-[9px] text-slate-500 block">Porcentaje Sofocado</span>
                <strong className="text-slate-900 font-black text-sm">100%</strong>
              </div>
              <div className="text-center border-l border-slate-200">
                <span className="text-[9px] text-slate-500 block">Tiempo de Contención</span>
                <strong className="text-slate-900 font-black text-sm">{15 - gameState.secondsLeft} segundos</strong>
              </div>
              <div className="text-center border-l border-slate-200">
                <span className="text-[9px] text-slate-500 block">Aprobación Legal</span>
                <strong className="text-emerald-600 font-bold uppercase text-[10px]">Acreditada</strong>
              </div>
            </div>

            {/* Cert signatures details */}
            <div className="flex flex-col sm:flex-row justify-between items-end border-t border-slate-100 pt-5 mt-6 gap-6 relative">
              <div className="text-slate-400 text-[10px] space-y-1">
                <p>Fecha de Expedición: {new Date().toISOString().split('T')[0]}</p>
                <p>ID Registro: VR-EXT-{activeScenarioId.toUpperCase()}-{Math.floor(Math.random() * 900000 + 100000)}</p>
                <p>Autorización: SENCE / Prevención Mutuales Integradas</p>
              </div>

              {/* Autograph / QR representation */}
              <div className="flex items-center gap-4 shrink-0 sm:self-center">
                <div className="text-center">
                  <div className="w-24 h-0.5 bg-slate-350 mx-auto mb-1" />
                  <p className="text-[9px] text-slate-600 font-bold leading-none">Firma Autorizada</p>
                  <p className="text-[8px] text-slate-400 leading-none mt-1">Virtualizar VR Soluciones</p>
                </div>
                <div className="bg-slate-100 w-12 h-12 border flex items-center justify-center p-1 rounded">
                  {/* Mock QR represented box */}
                  <div className="grid grid-cols-3 gap-0.5 w-10 h-10">
                    <div className="bg-slate-950" /><div className="bg-slate-950" /><div className="bg-slate-100" />
                    <div className="bg-slate-100" /><div className="bg-slate-950" /><div className="bg-slate-950" />
                    <div className="bg-slate-950" /><div className="bg-slate-100" /><div className="bg-slate-950" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons inside certificate wrapper (will be hidden on print) */}
            <div className="mt-6 text-right print:hidden">
              <button
                onClick={handlePrint}
                className="bg-slate-950 hover:bg-slate-850 text-white font-bold text-xs px-4 py-2 rounded-lg transition inline-flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir o Descargar PDF
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
