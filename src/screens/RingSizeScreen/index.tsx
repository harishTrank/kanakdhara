import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, PanResponder} from 'react-native';

const {width} = Dimensions.get('window');

const RingSizeScreen = () => {
  const pxPerMM = 8; // <-- this MUST come from calibration screen

  const [diameterMM, setDiameterMM] = useState(8);

  const diameterPx = diameterMM * pxPerMM;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      // const mm = Math.max(10, Math.min(25, diameterMM + gesture.dx / pxPerMM));
      const rawMM = diameterMM + gesture.dx / pxPerMM;
      const mm = Math.max(8, Math.min(40, Math.round(rawMM)));
      setDiameterMM(Number(mm.toFixed(2)));
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ring Size</Text>
      <Text style={styles.subtitle}>Place your ring here</Text>

      <View style={styles.centerArea}>
        <View
          style={[
            styles.circle,
            {
              width: diameterPx,
              height: diameterPx,
              borderRadius: diameterPx / 2,
            },
          ]}
        />
      </View>

      <Text style={styles.mmText}>{diameterMM} mm</Text>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderTrack} />

        <View
          {...panResponder.panHandlers}
          style={[
            styles.sliderThumb,
            {
              left: ((diameterMM - 8) / (40 - 8)) * (width * 0.8 - 30),
            },
          ]}
        />
      </View>
    </View>
  );
};

export default RingSizeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1f24',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  subtitle: {
    color: '#aaa',
    marginTop: 8,
  },
  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderWidth: 2,
    borderColor: '#7CFC00',
  },
  mmText: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 30,
  },
  slider: {
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#8B0000',
    borderRadius: 20,
    marginBottom: 40,
  },
  sliderContainer: {
    width: width * 0.8,
    height: 40,
    justifyContent: 'center',
    marginBottom: 40,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#555',
  },
  sliderThumb: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8B0000',
    top: 5,
    elevation: 4,
  },
});
