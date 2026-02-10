import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCat } from '../context/CatContext';
import StudyCornerRoom from '../components/StudyCornerRoom';

// Imagen de fondo: tu ilustración de escritorio pastel.
// Copia tu imagen en assets/study-bg.png y pon FONDO_LOCAL = true.
const FONDO_LOCAL = true; // Pon true cuando copies study-bg.png en assets/
const FONDO_RESPALDO =
  'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800';

// Posición de "Tareas" sobre la pizarra. Si no lo ves en el papel, cambia estos números:
// TAREAS_LEFT: más número = más a la derecha. TAREAS_TOP_EXTRA: más número = más abajo.
const TAREAS_LEFT = 199;
const TAREAS_TOP_EXTRA = 143;

function BarraMini({ valor, color, label }) {
  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{label}</Text>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${Math.max(0, Math.min(100, valor))}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.barValue}>{Math.round(valor)}%</Text>
    </View>
  );
}

export default function GatitoScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { hambre, felicidad, alimentar, jugar, progresoAseo } = useCat();
  const [errorFondo, setErrorFondo] = useState(false);
  const breathe = useRef(new Animated.Value(1)).current;
  const bob = useRef(new Animated.Value(0)).current;
  const tareasScale = useRef(new Animated.Value(1)).current;
  const alimentarScale = useRef(new Animated.Value(1)).current;
  const jugarScale = useRef(new Animated.Value(1)).current;

  const tareasPressIn = () => {
    Animated.spring(tareasScale, { toValue: 0.88, useNativeDriver: true, speed: 80 }).start();
  };
  const tareasPressOut = () => {
    Animated.spring(tareasScale, { toValue: 1, useNativeDriver: true, speed: 80 }).start();
  };
  const alimentarPressIn = () => {
    Animated.spring(alimentarScale, { toValue: 0.88, useNativeDriver: true, speed: 80 }).start();
  };
  const alimentarPressOut = () => {
    Animated.spring(alimentarScale, { toValue: 1, useNativeDriver: true, speed: 80 }).start();
  };
  const jugarPressIn = () => {
    Animated.spring(jugarScale, { toValue: 0.88, useNativeDriver: true, speed: 80 }).start();
  };
  const jugarPressOut = () => {
    Animated.spring(jugarScale, { toValue: 1, useNativeDriver: true, speed: 80 }).start();
  };

  useEffect(() => {
    const breathing = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1.06, duration: 1800, useNativeDriver: true }),
        Animated.timing(breathe, { toValue: 1, duration: 1800, useNativeDriver: true }),
      ])
    );
    const bobbing = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: -4, duration: 1400, useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ])
    );
    breathing.start();
    bobbing.start();
    return () => { breathing.stop(); bobbing.stop(); };
  }, [breathe, bob]);

  const FRASES_BURBUJA = ['¡Hola!', 'Jugemos', 'Mami limpiemos? :3', 'Buen día mamita, espero estés sintiéndote bien :3'];
  const BURBUJA_TEMAS = [
    { bg: 'rgba(90, 55, 130, 0.45)', border: 'rgba(140, 90, 180, 0.6)', text: 'rgba(220, 190, 255, 0.98)' },
    { bg: 'rgba(70, 150, 210, 0.45)', border: 'rgba(110, 180, 230, 0.6)', text: 'rgba(190, 235, 255, 0.98)' },
    { bg: 'rgba(150, 120, 200, 0.4)', border: 'rgba(180, 150, 220, 0.55)', text: 'rgba(230, 210, 255, 0.98)' },
    { bg: 'rgba(100, 160, 140, 0.45)', border: 'rgba(130, 190, 170, 0.6)', text: 'rgba(210, 245, 230, 0.98)' },
  ];
  const [fraseVisible, setFraseVisible] = useState(null);
  const [fraseIndex, setFraseIndex] = useState(0);
  const fraseIndexRef = useRef(0);
  const hideTimerRef = useRef(null);
  const showTimerRef = useRef(null);
  const bubbleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      setFraseVisible(null);
      bubbleOpacity.setValue(0);
      const idx = fraseIndexRef.current % FRASES_BURBUJA.length;
      fraseIndexRef.current = idx + 1;
      const nextPhrase = FRASES_BURBUJA[idx];
      showTimerRef.current = setTimeout(() => {
        setFraseVisible(nextPhrase);
        setFraseIndex(idx);
        Animated.timing(bubbleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 200);
      hideTimerRef.current = setTimeout(() => {
        if (showTimerRef.current) clearTimeout(showTimerRef.current);
        Animated.timing(bubbleOpacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) setFraseVisible(null);
        });
      }, 3000);
    }, 7000);
    return () => {
      clearInterval(interval);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
    };
  }, [bubbleOpacity]);

  return (
    <View style={styles.container}>
      {/* Fondo: imagen tipo "peaceful study corner" o dibujo si falla */}
      {!errorFondo ? (
        <ImageBackground
          source={FONDO_LOCAL ? require('../../assets/study-bg.png.jpeg') : { uri: FONDO_RESPALDO }}
          style={styles.fondoImagen}
          resizeMode="cover"
          onLoad={() => {}}
          onError={() => setErrorFondo(true)}
        >
          <View style={styles.fondoImagenOverlay} />
        </ImageBackground>
      ) : null}
      {errorFondo ? <StudyCornerRoom /> : null}

      {/* "Tareas" como en un papel de la pizarra: se agranda/reduce al tocar */}
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={tareasPressIn}
        onPressOut={tareasPressOut}
        onPress={() => navigation.navigate('Tareas')}
        style={[styles.papelTareas, { left: TAREAS_LEFT, top: insets.top + TAREAS_TOP_EXTRA }]}
      >
        <Animated.View style={{ transform: [{ scale: tareasScale }] }}>
          <Text style={styles.papelTareasText}>Tareas</Text>
        </Animated.View>
      </TouchableOpacity>

      {/* Gato (tu ilustración) encima del cuaderno, con movimiento */}
      <View style={styles.catOnDesk}>
        {fraseVisible ? (
          <Animated.View
            style={[
              styles.burbujaWrap,
              {
                opacity: bubbleOpacity,
                backgroundColor: BURBUJA_TEMAS[fraseIndex].bg,
                borderColor: BURBUJA_TEMAS[fraseIndex].border,
              },
            ]}
          >
            <Text style={[styles.burbujaText, { color: BURBUJA_TEMAS[fraseIndex].text }]}>{fraseVisible}</Text>
          </Animated.View>
        ) : null}
        <Animated.View style={[styles.catImageWrap, { transform: [{ scale: breathe }, { translateY: bob }] }]}>
          <Image
            source={require('../../assets/kuro-cat.png')}
            style={styles.catImage}
            resizeMode="contain"
          />
        </Animated.View>
        <Text style={styles.nombre}>Kuroneko</Text>
      </View>

      {/* Hambre y Felicidad: mismo estilo pastel que Tareas */}
      <View style={styles.statsCard}>
        <BarraMini valor={hambre} color="rgba(220, 120, 130, 0.95)" label="🍽️ Hambre" />
        <BarraMini valor={felicidad} color="rgba(120, 200, 160, 0.95)" label="💚 Felicidad" />
        {progresoAseo > 0 && (
          <Text style={styles.aseoBonus}>✨ +{Math.floor(progresoAseo / 20)} aseo</Text>
        )}
      </View>

      {/* Alimentar y Jugar: mismo estilo que botón Tareas (pastel + animación) */}
      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={alimentarPressIn}
          onPressOut={alimentarPressOut}
          onPress={alimentar}
          style={[styles.btnPapel, styles.btnComida]}
        >
          <Animated.View style={{ transform: [{ scale: alimentarScale }] }}>
            <Text style={styles.btnPapelIcon}>🍽️</Text>
            <Text style={styles.btnPapelText}>Alimentar</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={jugarPressIn}
          onPressOut={jugarPressOut}
          onPress={jugar}
          style={[styles.btnPapel, styles.btnJugar]}
        >
          <Animated.View style={{ transform: [{ scale: jugarScale }] }}>
            <Text style={styles.btnPapelIcon}>🎾</Text>
            <Text style={[styles.btnPapelText, styles.btnPapelTextJugar]}>Jugar</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Text style={styles.tip}>Completa tareas para que tu gatito esté feliz.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fondoImagen: {
    ...StyleSheet.absoluteFillObject,
  },
  fondoImagenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  papelTareas: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  papelTareasText: {
    color: 'rgba(100, 70, 130, 0.95)',
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(140, 110, 170, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  catOnDesk: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '26%',
    marginBottom: 28,
    alignItems: 'center',
    zIndex: 5,
  },
  burbujaWrap: {
    alignSelf: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  burbujaText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  catImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  catImage: {
    width: 140,
    height: 140,
    backgroundColor: 'transparent',
  },
  nombre: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 2,
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  statsCard: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(90, 55, 130, 0.45)',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(140, 90, 180, 0.6)',
  },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  barLabel: {
    color: 'rgba(220, 190, 255, 0.98)',
    width: 82,
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(140, 90, 180, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  barBg: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(70, 45, 110, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(140, 90, 180, 0.4)',
  },
  barFill: { height: '100%', borderRadius: 3 },
  barValue: {
    color: 'rgba(220, 190, 255, 0.98)',
    width: 32,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '600',
  },
  aseoBonus: {
    color: 'rgba(180, 220, 200, 0.95)',
    fontSize: 11,
    marginTop: 6,
    fontWeight: '600',
  },
  actions: {
    position: 'absolute',
    bottom: 36,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 12,
  },
  btnPapel: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  btnComida: {
    backgroundColor: 'rgba(90, 55, 130, 0.5)',
    borderColor: 'rgba(180, 120, 140, 0.7)',
  },
  btnJugar: {
    backgroundColor: 'rgba(70, 120, 100, 0.5)',
    borderColor: 'rgba(120, 180, 150, 0.7)',
  },
  btnPapelIcon: { fontSize: 24, marginBottom: 4 },
  btnPapelText: {
    color: 'rgba(220, 190, 255, 0.98)',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(140, 90, 180, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  btnPapelTextJugar: {
    color: 'rgba(200, 240, 220, 0.98)',
    textShadowColor: 'rgba(80, 120, 100, 0.5)',
  },
  tip: {
    position: 'absolute',
    bottom: 12,
    left: 20,
    right: 20,
    color: '#5a5a5a',
    fontSize: 11,
    textAlign: 'center',
  },
});
