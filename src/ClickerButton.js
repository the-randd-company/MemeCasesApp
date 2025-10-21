import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const ClickerButton = ({ 
  onPress, 
  earnAmount = 1, 
  clickerPower = 1, 
  prestigeMultiplier = 1,
  autoClickPower = 0,
  onAutoClick,
}) => {
  const [plusOneEffects, setPlusOneEffects] = useState([]);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const lastPressTime = useRef(0);
  const effectCount = useRef(0);
  const MAX_EFFECTS = 8;

  // Calculate total click value with prestige multiplier
  const totalClickValue = Math.floor(clickerPower * prestigeMultiplier);

  const animatePlusOne = (isAutoClick = false, multiplier = 1) => {
    if (effectCount.current >= MAX_EFFECTS) {
      return;
    }

    const id = Date.now() + Math.random();
    effectCount.current++;

    const screenWidth = 350;
    const buttonHeight = 50;
    
    const randomX = Math.random() * (screenWidth - 30);
    const randomY = Math.random() * (buttonHeight - 20);
    
    const newEffect = {
      id,
      x: randomX,
      y: randomY,
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(0),
      isAutoClick,
      multiplier,
    };

    setPlusOneEffects(prev => [...prev.slice(-MAX_EFFECTS + 1), newEffect]);

    Animated.parallel([
      Animated.timing(newEffect.opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(newEffect.translateY, {
        toValue: -40,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(newEffect.opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setPlusOneEffects(prev => prev.filter(effect => effect.id !== id));
        effectCount.current--;
      });
    });
  };

  // Auto clicker functionality
  useEffect(() => {
    if (autoClickPower <= 0 || !onAutoClick) return;

    const handleAutoClick = () => {
      const autoClickMultiplier = autoClickPower;
      const totalAutoEarnings = totalClickValue * autoClickMultiplier;

      animatePlusOne(true, autoClickMultiplier);
      onAutoClick(totalAutoEarnings);
    };

    const intervalId = setInterval(handleAutoClick, 10000);
    return () => clearInterval(intervalId);
  }, [autoClickPower, totalClickValue, onAutoClick]);

  const handlePress = () => {
    const now = Date.now();
    
    if (now - lastPressTime.current < 50) {
      onPress(totalClickValue);
      return;
    }
    lastPressTime.current = now;

    buttonScale.setValue(0.92);
    Animated.spring(buttonScale, {
      toValue: 1,
      tension: 200,
      friction: 3,
      useNativeDriver: true,
    }).start();

    if (Math.random() > 0.3 || plusOneEffects.length < 3) {
      animatePlusOne(false, 1);
    }

    onPress(totalClickValue);
  };

  useEffect(() => {
    return () => {
      setPlusOneEffects([]);
      effectCount.current = 0;
    };
  }, []);

  return (
    <View style={styles.clickerWrapper}>
      {plusOneEffects.map((effect) => (
        <Animated.Text
          key={effect.id}
          style={[
            styles.plusOne,
            effect.isAutoClick && styles.autoClickPlusOne,
            effect.multiplier > 1 && styles.multiplierPlusOne,
            {
              position: 'absolute',
              left: effect.x,
              top: effect.y,
              opacity: effect.opacity,
              transform: [
                { translateY: effect.translateY },
              ],
            },
          ]}>
          {effect.multiplier > 1 ? `+${totalClickValue * effect.multiplier}` : `+${totalClickValue}`}
          {effect.multiplier > 1 && <Text style={styles.multiplierIndicator}> ({effect.multiplier}x)</Text>}
        </Animated.Text>
      ))}
      
      <TouchableOpacity
        style={styles.clickerButton}
        onPress={handlePress}
        activeOpacity={0.7}
        delayPressIn={0}
        delayPressOut={0}
      >
        <Animated.View
          style={[
            styles.clickerButtonInner,
            {
              transform: [{ scale: buttonScale }],
            },
          ]}
        >
          <Text style={styles.clickerLabel}>
            💸 Tap for +${totalClickValue}!
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  clickerWrapper: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 0,
    marginTop: 0,
    width: '100%',
    minHeight: 50,
  },
  clickerButton: {
    flex: 1,
    width: '100%',
    backgroundColor: '#10b981',
    borderRadius: 0,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
    margin: 0,
  },
  clickerButtonInner: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 50,
  },
  clickerLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  autoClickInfo: {
    fontSize: 14,
    color: '#fbbf24',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  multiplierText: {
    fontSize: 16,
    color: '#fbbf24',
    fontWeight: '600',
  },
  plusOne: {
    fontSize: 24,
    color: '#10b981',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 2 },
    elevation: 5,
    zIndex: 1000,
  },
  autoClickPlusOne: {
    color: '#60a5fa',
  },
  multiplierPlusOne: {
    fontSize: 20,
    color: '#fbbf24',
  },
  multiplierIndicator: {
    fontSize: 16,
    color: '#fbbf24',
  },
});

export default ClickerButton;