import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * Escena de rincón de estudio acogedor (inspirado en peaceful study corner).
 * Pared, escritorio, libros, lámpara, ventana.
 */
export default function StudyCornerRoom() {
  return (
    <View style={styles.room}>
      {/* Pared y suelo */}
      <View style={styles.wall} />
      <View style={styles.floor} />

      {/* Ventana */}
      <View style={styles.window}>
        <View style={styles.windowFrame}>
          <View style={styles.windowPane} />
          <View style={styles.windowDivider} />
          <View style={styles.windowPane} />
        </View>
      </View>

      {/* Escritorio (mesa) */}
      <View style={styles.desk}>
        {/* Tapa del escritorio */}
        <View style={styles.deskTop}>
          {/* Libros apilados */}
          <View style={styles.books}>
            <View style={[styles.book, styles.book1]} />
            <View style={[styles.book, styles.book2]} />
            <View style={[styles.book, styles.book3]} />
          </View>
          {/* Laptop / base */}
          <View style={styles.laptop}>
            <View style={styles.laptopBase} />
            <View style={styles.laptopScreen} />
          </View>
          {/* Lámpara */}
          <View style={styles.lamp}>
            <View style={styles.lampBase} />
            <View style={styles.lampPole} />
            <View style={styles.lampShade} />
          </View>
        </View>
        {/* Patas del escritorio */}
        <View style={styles.deskLegs} />
      </View>

      {/* Plantita pequeña */}
      <View style={styles.plant}>
        <View style={styles.plantPot} />
        <View style={styles.plantLeaf} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  room: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e8dfd0',
  },
  wall: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: '#e8dfd0',
  },
  floor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: '#d4c4b0',
  },
  window: {
    position: 'absolute',
    top: '12%',
    right: 24,
    width: 100,
    height: 90,
  },
  windowFrame: {
    flex: 1,
    backgroundColor: '#c9b896',
    borderRadius: 4,
    padding: 6,
    flexDirection: 'row',
  },
  windowPane: {
    flex: 1,
    backgroundColor: '#87ceeb',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  windowDivider: {
    width: 4,
    backgroundColor: '#c9b896',
    borderRadius: 1,
  },
  desk: {
    position: 'absolute',
    bottom: '18%',
    left: 0,
    right: 0,
    height: 140,
  },
  deskTop: {
    flex: 1,
    backgroundColor: '#6b5344',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 16,
  },
  deskLegs: {
    position: 'absolute',
    bottom: -24,
    left: 24,
    right: 24,
    height: 12,
    backgroundColor: '#5a4a3d',
    borderRadius: 2,
  },
  books: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 8,
  },
  book: {
    width: 28,
    height: 6,
    borderRadius: 1,
    marginBottom: 2,
  },
  book1: { backgroundColor: '#8b4513', width: 32 },
  book2: { backgroundColor: '#2d5a3d', width: 30 },
  book3: { backgroundColor: '#4a6fa5', width: 26 },
  laptop: {
    alignItems: 'center',
  },
  laptopBase: {
    width: 70,
    height: 8,
    backgroundColor: '#3d3d3d',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  laptopScreen: {
    width: 64,
    height: 42,
    backgroundColor: '#2d2d2d',
    borderWidth: 2,
    borderColor: '#4a4a4a',
    borderRadius: 2,
    marginBottom: 4,
  },
  lamp: {
    alignItems: 'center',
  },
  lampBase: {
    width: 24,
    height: 6,
    backgroundColor: '#5a4a3d',
    borderRadius: 2,
  },
  lampPole: {
    width: 4,
    height: 32,
    backgroundColor: '#5a4a3d',
    marginBottom: 2,
  },
  lampShade: {
    width: 36,
    height: 20,
    backgroundColor: '#f5f0e6',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  plant: {
    position: 'absolute',
    bottom: '22%',
    left: 24,
    alignItems: 'center',
  },
  plantPot: {
    width: 24,
    height: 20,
    backgroundColor: '#8b6914',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  plantLeaf: {
    position: 'absolute',
    bottom: 18,
    width: 20,
    height: 24,
    backgroundColor: '#2d5a3d',
    borderRadius: 10,
    transform: [{ rotate: '-20deg' }],
  },
});
