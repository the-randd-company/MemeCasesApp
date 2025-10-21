// components/Profile/AchievementList.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AchievementItem = ({ icon, title, description, progress, status }) => (
  <View style={styles.achievementItem}>
    <Text style={styles.achievementIcon}>{icon}</Text>
    <View style={styles.achievementInfo}>
      <Text style={styles.achievementTitle}>{title}</Text>
      <Text style={styles.achievementDescription}>{description}</Text>
      <View style={styles.achievementProgress}>
        <View style={[styles.achievementProgressBar, progress]} />
      </View>
      <Text style={styles.achievementStatus}>{status}</Text>
    </View>
  </View>
);

export const AchievementList = ({ totalRebirths, totalValue, totalItems, caseSpeedLevel }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Achievements</Text>
      
      <View style={styles.achievementList}>
        <AchievementItem
          icon="🏆"
          title="First Prestige"
          description="Complete your first rebirth"
          progress={totalRebirths > 0 ? styles.achievementCompleted : {}}
          status={totalRebirths > 0 ? 'Completed!' : 'Not Completed'}
        />

        <AchievementItem
          icon="💰"
          title="Millionaire"
          description="Reach $1,000,000 total value"
          progress={{ width: `${Math.min(100, (totalValue / 1000000) * 100)}%` }}
          status={`$${totalValue.toLocaleString()} / $1,000,000`}
        />

        <AchievementItem
          icon="📦"
          title="Collector"
          description="Collect 100 total items"
          progress={{ width: `${Math.min(100, (totalItems / 100) * 100)}%` }}
          status={`${totalItems} / 100 items`}
        />

        <AchievementItem
          icon="⚡"
          title="Speed Demon"
          description="Reach case speed level 50"
          progress={{ width: `${Math.min(100, (caseSpeedLevel / 50) * 100)}%` }}
          status={`Level ${caseSpeedLevel} / 50`}
        />

        <AchievementItem
          icon="👑"
          title="Prestige Master"
          description="Reach 10 total prestiges"
          progress={{ width: `${Math.min(100, (totalRebirths / 10) * 100)}%` }}
          status={`${totalRebirths} / 10 prestiges`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  achievementList: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    overflow: 'hidden',
  },
  achievementItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
    width: 40,
    textAlign: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  achievementProgress: {
    height: 4,
    backgroundColor: '#3a3a3a',
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  achievementProgressBar: {
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: 2,
  },
  achievementCompleted: {
    backgroundColor: '#10b981',
    width: '100%',
  },
  achievementStatus: {
    fontSize: 10,
    color: '#888',
  },
});