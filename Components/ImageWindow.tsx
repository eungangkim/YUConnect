import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Button, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

function ImageWindow({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          typeof images[currentIndex] === 'string'
            ? { uri: images[currentIndex] }
            : images[currentIndex]
        }
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.buttons}>
        <Button title="Prev" onPress={prevImage} />
        <Button title="Next" onPress={nextImage} />
      </View>
    </View>
  );
 
  
}

const styles = StyleSheet.create({
  container: {
    width,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2,
  },
  image: { width: width * 0.8, height: height * 0.4, borderRadius: 10 },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
    width: '60%',
    justifyContent: 'space-between',
  },
});

export default ImageWindow;
