import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const CaseDrop = ({ dropImage }) => {
  let source;
  if (typeof dropImage.imageSrc === 'number') {
    source = dropImage.imageSrc;
  } else {
    source = { uri: dropImage.imageSrc };
  }
  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: dropImage.rarityColor,
          borderColor: dropImage.rarityColor,
        }
      ]}
    >
      <Image 
        source={source}
        style={styles.dropImage}
        resizeMode="contain"
        onError={(error) => console.log('Image loading error:', error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 4,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropImage: {
    width: '100%',
    height: '100%',
  },
});

export default CaseDrop;