import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const InAppPurchaseShop = () => {
  const packages = [
    { id: 1, name: 'Starter Pack', coins: 1000, price: '$0.99', icon: '💰' },
    { id: 2, name: 'Value Pack', coins: 5000, price: '$4.99', icon: '💎', badge: 'Popular' },
    { id: 3, name: 'Mega Pack', coins: 15000, price: '$9.99', icon: '💸' },
    { id: 4, name: 'Ultimate Pack', coins: 50000, price: '$19.99', icon: '👑', badge: 'Best Value' },
  ];

  const handlePurchase = (pkg) => {
    console.log('Purchase requested:', pkg);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💳 Shop</Text>
        <Text style={styles.headerSubtitle}>Purchase coins to boost your progress</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {packages.map((pkg) => (
          <View key={pkg.id} style={styles.packageCard}>
            {pkg.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{pkg.badge}</Text>
              </View>
            )}
            
            <View style={styles.packageHeader}>
              <Text style={styles.packageIcon}>{pkg.icon}</Text>
              <View style={styles.packageInfo}>
                <Text style={styles.packageName}>{pkg.name}</Text>
                <Text style={styles.packageCoins}>${pkg.coins.toLocaleString()} Coins</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.purchaseButton}
              onPress={() => handlePurchase(pkg)}
              activeOpacity={0.7}
            >
              <Text style={styles.purchaseButtonText}>{pkg.price}</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ About Purchases</Text>
          <Text style={styles.infoText}>
            • Coins are added to your balance instantly{'\n'}
            • All purchases are one-time payments{'\n'}
            • No subscriptions or hidden fees{'\n'}
            • Secure payment processing
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  packageCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#3a3a3a',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: 20,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  packageIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  packageInfo: {
    flex: 1,
  },
  packageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  packageCoins: {
    fontSize: 16,
    color: '#f59e0b',
    fontWeight: '600',
  },
  purchaseButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  purchaseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  infoSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 22,
  },
  bottomSpacer: {
    height: 40,
  },
});

export default InAppPurchaseShop;
