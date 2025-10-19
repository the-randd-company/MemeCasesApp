import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NavButton = ({ icon, label, scene, activeScene, onPress }) => (
  <TouchableOpacity
    style={styles.navButton}
    onPress={() => onPress(scene)}
    activeOpacity={0.7}
  >
    <View style={[
      styles.iconContainer,
      activeScene === scene && styles.iconContainerActive
    ]}>
      <Text style={[
        styles.icon,
        activeScene === scene && styles.iconActive
      ]}>
        {icon}
      </Text>
    </View>
    <Text style={[
      styles.navLabel,
      activeScene === scene && styles.navLabelActive
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const BottomNavBar = ({ activeScene, onSceneChange }) => {
  return (
    <View style={styles.bottomBar}>
      <NavButton
        icon="📦"
        label="Inventory"
        scene="inventory"
        activeScene={activeScene}
        onPress={onSceneChange}
      />
      <NavButton
        icon="🔧"
        label="Upgrades"
        scene="upgrades"
        activeScene={activeScene}
        onPress={onSceneChange}
      />
      <NavButton
        icon="🎁"
        label="Cases"
        scene="cases"
        activeScene={activeScene}
        onPress={onSceneChange}
      />
      <NavButton
        icon="🔥"
        label="Rebirth"
        scene="rebirth"
        activeScene={activeScene}
        onPress={onSceneChange}
      />
      <NavButton
        icon="👤"
        label="Profile"
        scene="profile"
        activeScene={activeScene}
        onPress={onSceneChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderTopWidth: 1,
    borderTopColor: '#3a3a3a',
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 4,
  },
  iconContainerActive: {
    backgroundColor: '#f59e0b',
  },
  icon: {
    fontSize: 24,
  },
  iconActive: {
    transform: [{ scale: 1.1 }],
  },
  navLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#f59e0b',
    fontWeight: 'bold',
  },
});

export default BottomNavBar;