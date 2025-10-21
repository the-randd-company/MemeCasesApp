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

export const AchievementList = ({ 
  totalPrestiges, 
  totalValue, 
  totalItems, 
  caseSpeedLevel,
  totalCasesOpened 
}) => {
  // Helper function to calculate progress
  const calculateProgress = (current, target) => {
    const progress = Math.min(100, (current / target) * 100);
    return current >= target ? styles.achievementCompleted : { width: `${progress}%` };
  };

  // Achievement definitions with prerequisites
  const achievements = [
    // Case Opening Achievements
    {
      id: 'first_case',
      icon: '📦',
      title: 'First Case',
      description: 'Open your first case',
      progress: calculateProgress(totalCasesOpened, 1),
      status: totalCasesOpened >= 1 ? 'Completed!' : `${totalCasesOpened} / 1 case`,
      show: true // Always show first achievement
    },
    {
      id: 'case_enthusiast',
      icon: '📦',
      title: 'Case Enthusiast',
      description: 'Open 10 cases',
      progress: calculateProgress(totalCasesOpened, 10),
      status: totalCasesOpened >= 10 ? 'Completed!' : `${totalCasesOpened} / 10 cases`,
      show: totalCasesOpened >= 1
    },
    {
      id: 'case_addict',
      icon: '📦',
      title: 'Case Addict',
      description: 'Open 100 cases',
      progress: calculateProgress(totalCasesOpened, 100),
      status: totalCasesOpened >= 100 ? 'Completed!' : `${totalCasesOpened} / 100 cases`,
      show: totalCasesOpened >= 10
    },
    {
      id: 'case_tycoon',
      icon: '🏭',
      title: 'Case Tycoon',
      description: 'Open 1,000 cases',
      progress: calculateProgress(totalCasesOpened, 1000),
      status: totalCasesOpened >= 1000 ? 'Completed!' : `${totalCasesOpened} / 1,000 cases`,
      show: totalCasesOpened >= 100
    },

    // Value-based Achievements
    {
      id: 'thousandaire',
      icon: '💵',
      title: 'Thousandaire',
      description: 'Reach $1,000 total value',
      progress: calculateProgress(totalValue, 1000),
      status: totalValue >= 1000 ? 'Completed!' : `$${Math.floor(totalValue).toLocaleString()} / $1,000`,
      show: true
    },
    {
      id: 'hundred_thousandaire',
      icon: '💰',
      title: 'Hundred Thousandaire',
      description: 'Reach $100,000 total value',
      progress: calculateProgress(totalValue, 100000),
      status: totalValue >= 100000 ? 'Completed!' : `$${Math.floor(totalValue).toLocaleString()} / $100,000`,
      show: totalValue >= 1000
    },
    {
      id: 'millionaire',
      icon: '💰',
      title: 'Millionaire',
      description: 'Reach $1,000,000 total value',
      progress: calculateProgress(totalValue, 1000000),
      status: totalValue >= 1000000 ? 'Completed!' : `$${Math.floor(totalValue).toLocaleString()} / $1,000,000`,
      show: totalValue >= 100000
    },
    {
      id: 'billionaire',
      icon: '💰',
      title: 'Billionaire',
      description: 'Reach $1,000,000,000 total value',
      progress: calculateProgress(totalValue, 1000000000),
      status: totalValue >= 1000000000 ? 'Completed!' : `$${Math.floor(totalValue).toLocaleString()} / $1,000,000,000`,
      show: totalValue >= 100000000
    },

    // Prestige Achievements
    {
      id: 'first_prestige',
      icon: '🌟',
      title: 'First Prestige',
      description: 'Complete your first prestige',
      progress: calculateProgress(totalPrestiges, 1),
      status: totalPrestiges >= 1 ? 'Completed!' : `${totalPrestiges} / 1 prestige`,
      show: totalValue >= 100000
    },
    {
      id: 'prestige_pro',
      icon: '🏆',
      title: 'Prestige Pro',
      description: 'Reach 5 total prestiges',
      progress: calculateProgress(totalPrestiges, 5),
      status: totalPrestiges >= 5 ? 'Completed!' : `${totalPrestiges} / 5 prestiges`,
      show: totalPrestiges >= 1
    },
    {
      id: 'prestige_master',
      icon: '👑',
      title: 'Prestige Master',
      description: 'Reach 10 total prestiges',
      progress: calculateProgress(totalPrestiges, 10),
      status: totalPrestiges >= 10 ? 'Completed!' : `${totalPrestiges} / 10 prestiges`,
      show: totalPrestiges >= 5
    },
    {
      id: 'prestige_legend',
      icon: '💫',
      title: 'Prestige Legend',
      description: 'Reach 25 total prestiges',
      progress: calculateProgress(totalPrestiges, 25),
      status: totalPrestiges >= 25 ? 'Completed!' : `${totalPrestiges} / 25 prestiges`,
      show: totalPrestiges >= 10
    },
    {
      id: 'prestige_final_boss',
      icon: '🔱',
      title: 'Prestige Final Boss',
      description: 'Reach 100 total prestiges',
      progress: calculateProgress(totalPrestiges, 25),
      status: totalPrestiges >= 25 ? 'Completed!' : `${totalPrestiges} / 100 prestiges`,
      show: totalPrestiges >= 25
    },

    // Collection Achievements
    {
      id: 'collector',
      icon: '🎯',
      title: 'Collector',
      description: 'Collect 50 total items',
      progress: calculateProgress(totalItems, 50),
      status: totalItems >= 50 ? 'Completed!' : `${totalItems} / 50 items`,
      show: totalCasesOpened >= 1
    },
    {
      id: 'hoarder',
      icon: '📚',
      title: 'Hoarder',
      description: 'Collect 250 total items',
      progress: calculateProgress(totalItems, 250),
      status: totalItems >= 250 ? 'Completed!' : `${totalItems} / 250 items`,
      show: totalItems >= 50
    },
    {
      id: 'museum_curator',
      icon: '🏛️',
      title: 'Museum Curator',
      description: 'Collect 1,000 total items',
      progress: calculateProgress(totalItems, 1000),
      status: totalItems >= 1000 ? 'Completed!' : `${totalItems} / 1,000 items`,
      show: totalItems >= 250
    },
    {
      id: 'wiki_memeia',
      icon: '🌐',
      title: 'Wiki-Memeia',
      description: 'Collect 10,000 total items',
      progress: calculateProgress(totalItems, 1000),
      status: totalItems >= 1000 ? 'Completed!' : `${totalItems} / 10,000 items`,
      show: totalItems >= 1000
    },

    // Speed Achievements
    {
      id: 'speed_apprentice',
      icon: '⚡',
      title: 'Speed Apprentice',
      description: 'Reach case speed level 10',
      progress: calculateProgress(caseSpeedLevel, 10),
      status: caseSpeedLevel >= 10 ? 'Completed!' : `Level ${caseSpeedLevel} / 10`,
      show: totalCasesOpened >= 5
    },
    {
      id: 'speed_demon',
      icon: '⚡⚡',
      title: 'Speed Demon',
      description: 'Reach case speed level 25',
      progress: calculateProgress(caseSpeedLevel, 25),
      status: caseSpeedLevel >= 25 ? 'Completed!' : `Level ${caseSpeedLevel} / 25`,
      show: caseSpeedLevel >= 10
    },
    {
      id: 'speed_god',
      icon: '⚡⚡⚡',
      title: 'Speed God',
      description: 'Reach case speed level 65',
      progress: calculateProgress(caseSpeedLevel, 65),
      status: caseSpeedLevel >= 65 ? 'Completed!' : `Level ${caseSpeedLevel} / 65`,
      show: caseSpeedLevel >= 25
    }
  ];

  // Filter to only show achievements that should be visible
  const visibleAchievements = achievements.filter(achievement => achievement.show);

  // Helper function to get current value for an achievement
  const getCurrentValueForAchievement = (achievementId) => {
    switch (achievementId) {
      case 'first_case':
      case 'case_enthusiast':
      case 'case_addict':
      case 'case_tycoon':
        return totalCasesOpened;
      case 'thousandaire':
      case 'hundred_thousandaire':
      case 'millionaire':
      case 'billionaire':
        return totalValue;
      case 'first_prestige':
      case 'prestige_pro':
      case 'prestige_master':
      case 'prestige_legend':
      case 'prestige_final_boss':
        return totalPrestiges;
      case 'collector':
      case 'hoarder':
      case 'museum_curator':
      case 'wiki_memeia':
        return totalItems;
      case 'speed_apprentice':
      case 'speed_demon':
      case 'speed_god':
        return caseSpeedLevel;
      default:
        return 0;
    }
  };

  // Helper function to get target for an achievement
  const getTargetForAchievement = (achievementId) => {
    const targets = {
      'first_case': 1,
      'case_enthusiast': 10,
      'case_addict': 100,
      'case_tycoon': 1000,
      'thousandaire': 1000,
      'hundred_thousandaire': 100000,
      'millionaire': 1000000,
      'first_prestige': 1,
      'prestige_pro': 5,
      'prestige_master': 10,
      'prestige_legend': 25,
      'collector': 50,
      'hoarder': 250,
      'museum_curator': 1000,
      'speed_apprentice': 10,
      'speed_demon': 25,
      'speed_god': 50
    };
    return targets[achievementId] || 1;
  };

  const totalUnlocked = achievements.filter(a => {
    const current = getCurrentValueForAchievement(a.id);
    const target = getTargetForAchievement(a.id);
    return current >= target;
  }).length;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Achievements</Text>
      <Text style={styles.sectionSubtitle}>
        {totalUnlocked} of {achievements.length} completed
      </Text>
      
      <View style={styles.achievementList}>
        {visibleAchievements.map((achievement) => (
          <AchievementItem
            key={achievement.id}
            icon={achievement.icon}
            title={achievement.title}
            description={achievement.description}
            progress={achievement.progress}
            status={achievement.status}
          />
        ))}
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
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#888',
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
    height: '100%',
  },
  achievementStatus: {
    fontSize: 10,
    color: '#888',
  },
});