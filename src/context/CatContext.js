import React, { createContext, useContext, useState, useEffect } from 'react';

const CatContext = createContext();

const TAREAS_DIARIAS = [
  { id: 'd1', nombre: 'Barrer y trapear', icono: '🏠', hecha: false },
  { id: 'd2', nombre: 'Hacer desayuno', icono: '🍳', hecha: false },
  { id: 'd3', nombre: 'Tomar desayuno', icono: '☕', hecha: false },
  { id: 'd4', nombre: 'Baño', icono: '🚿', hecha: false },
  { id: 'd5', nombre: 'Bañarse', icono: '🛁', hecha: false },
  { id: 'd6', nombre: 'Tender camas / ordenar', icono: '🛏️', hecha: false },
  { id: 'd7', nombre: 'Tomar once', icono: '🍵', hecha: false },
  { id: 'd8', nombre: 'Sacar basura', icono: '🗑️', hecha: false },
  { id: 'd9', nombre: 'Limpiar polvo', icono: '✨', hecha: false },
];

const TAREAS_SEMANALES = [
  { id: 's1', nombre: 'Lavar ropa', icono: '👕', hecha: false },
  { id: 's2', nombre: 'Planchar', icono: '👔', hecha: false },
  { id: 's3', nombre: 'Limpiar cocina', icono: '🍳', hecha: false },
  { id: 's4', nombre: 'Lavar loza', icono: '🍽️', hecha: false },
  { id: 's5', nombre: 'Limpiar refrigerador', icono: '🧊', hecha: false },
  { id: 's6', nombre: 'Cambiar sábanas', icono: '🛏️', hecha: false },
  { id: 's7', nombre: 'Ordenar armarios', icono: '🚪', hecha: false },
];

const TAREAS_MENSUALES = [
  { id: 'm1', nombre: 'Limpiar ventanas', icono: '🪟', hecha: false },
  { id: 'm2', nombre: 'Aspirar', icono: '🛋️', hecha: false },
  { id: 'm3', nombre: 'Revisar despensa', icono: '🥫', hecha: false },
  { id: 'm4', nombre: 'Limpiar lámparas', icono: '💡', hecha: false },
];

const TAREAS_ANUALES = [
  { id: 'a1', nombre: 'Limpieza profunda', icono: '🧹', hecha: false },
  { id: 'a2', nombre: 'Revisar pintura/paredes', icono: '🖌️', hecha: false },
  { id: 'a3', nombre: 'Ordenar y donar', icono: '📦', hecha: false },
];

export function CatProvider({ children }) {
  const [tareasDiaria, setTareasDiaria] = useState(TAREAS_DIARIAS);
  const [tareasSemanal, setTareasSemanal] = useState(TAREAS_SEMANALES);
  const [tareasMensual, setTareasMensual] = useState(TAREAS_MENSUALES);
  const [tareasAnual, setTareasAnual] = useState(TAREAS_ANUALES);
  const [hambre, setHambre] = useState(70);
  const [felicidad, setFelicidad] = useState(70);

  const tareas = tareasDiaria;
  const tareasHechas = tareasDiaria.filter((t) => t.hecha).length;
  const totalTareas = tareasDiaria.length;
  const progresoAseo = totalTareas ? (tareasHechas / totalTareas) * 100 : 0;

  useEffect(() => {
    const bonus = Math.min(20, Math.floor(progresoAseo / 5));
    setFelicidad((prev) => Math.min(100, prev + bonus * 0.1));
  }, [tareasHechas]);

  const marcarTarea = (tipo, id) => {
    const setters = {
      diaria: setTareasDiaria,
      semanal: setTareasSemanal,
      mensual: setTareasMensual,
      anual: setTareasAnual,
    };
    const setter = setters[tipo];
    if (!setter) return;
    setter((prev) =>
      prev.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t))
    );
  };

  const alimentar = () => setHambre((prev) => Math.min(100, prev + 25));
  const jugar = () => setFelicidad((prev) => Math.min(100, prev + 15));

  useEffect(() => {
    const interval = setInterval(() => {
      setHambre((prev) => Math.max(0, prev - 0.5));
      setFelicidad((prev) => Math.max(0, prev - 0.3));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const reiniciarDia = () => setTareasDiaria(TAREAS_DIARIAS.map((t) => ({ ...t, hecha: false })));
  const reiniciarSemana = () => setTareasSemanal(TAREAS_SEMANALES.map((t) => ({ ...t, hecha: false })));
  const reiniciarMes = () => setTareasMensual(TAREAS_MENSUALES.map((t) => ({ ...t, hecha: false })));
  const reiniciarAño = () => setTareasAnual(TAREAS_ANUALES.map((t) => ({ ...t, hecha: false })));

  const value = {
    tareas,
    tareasDiaria,
    tareasSemanal,
    tareasMensual,
    tareasAnual,
    marcarTarea,
    reiniciarDia,
    reiniciarSemana,
    reiniciarMes,
    reiniciarAño,
    hambre,
    felicidad,
    alimentar,
    jugar,
    progresoAseo,
    tareasHechas,
    totalTareas,
  };

  return <CatContext.Provider value={value}>{children}</CatContext.Provider>;
}

export function useCat() {
  const ctx = useContext(CatContext);
  if (!ctx) throw new Error('useCat must be used within CatProvider');
  return ctx;
}
