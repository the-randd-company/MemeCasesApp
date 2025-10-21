import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, Modal } from 'react-native';
import { getInventory, setInventory, getUpgrades } from '../DataStorage';

const InventoryItem = ({ item, onPress, onLongPress, selected, selectionMode, fadeAnim, onImageLoad }) => {
  let source;
  if (typeof item.imageSrc === 'number') {
    source = item.imageSrc;
  } else {
    source = { uri: item.imageSrc };
  }
  return (
    <Animated.View style={[styles.itemCard, { borderColor: selected ? '#f59e0b' : item.rarityColor, opacity: fadeAnim }]}>   
      <TouchableOpacity
        style={[styles.itemImageContainer, { backgroundColor: item.rarityColor, opacity: selectionMode && !selected ? 0.4 : 1 }]}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={320}
        activeOpacity={0.8}
      >
        <Image 
          source={source}
          style={styles.itemImage}
          resizeMode="contain"
          onLoad={onImageLoad}
        />
        {selectionMode && selected && (
          <View style={styles.selectedOverlay}><Text style={styles.selectedText}>✓</Text></View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const InventoryScene = ({ onEarnMoney }) => {
  const [inventory, setInventoryState] = useState([]);
  const [sortBy, setSortBy] = useState('none');
  const [filterRarity, setFilterRarity] = useState('all');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showRarityMenu, setShowRarityMenu] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [itemLoaded, setItemLoaded] = useState({});
  // For animation
  const fadeAnimMap = React.useRef({});

  useEffect(() => { 
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const items = await getInventory();
    setInventoryState(items);
  };

  const saveInventory = async (items) => {
    setInventoryState(items);
    await setInventory(items);
  };

  const getFilteredAndSortedInventory = () => {
    let items = [...inventory];
    if (filterRarity !== 'all') {
      items = items.filter(item => item.rarity === filterRarity);
    }
    switch (sortBy) {
      case 'value-asc':
        items.sort((a, b) => (a.value || 0) - (b.value || 0));
        break;
      case 'value-desc':
        items.sort((a, b) => (b.value || 0) - (a.value || 0));
        break;
      case 'name-asc':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        items.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    return items;
  };

  const filteredInventory = getFilteredAndSortedInventory();

  // Multiselect logic
  const toggleSelectMode = () => {
    setSelectMode(!selectMode); setSelected([]); setModalItem(null);
  };
  const handleSelect = (idx) => {
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]);
  };
  const handleSelectAll = () => {
    if (selected.length === filteredInventory.length) {
      setSelected([]);
    } else {
      setSelected(filteredInventory.map((_,i) => i));
    }
  };
  const deleteSelected = async () => {
    const toDelete = selected.map(i => filteredInventory[i]);
    const baseEarned = toDelete.reduce((sum, item) => sum + (item.value || 0), 0);
    const earnedWithMultiplier = Math.floor(baseEarned);
    const newInventory = inventory.filter(invItem => !toDelete.some(selItem=>selItem.acquiredAt===invItem.acquiredAt));
    await saveInventory(newInventory);
    setSelected([]); setSelectMode(false);
    if (onEarnMoney && earnedWithMultiplier > 0) onEarnMoney(earnedWithMultiplier);
  };
  const deleteModalItem = async () => {
    if (!modalItem) return;
    const baseEarned = modalItem.value || 0;
    const earnedWithMultiplier = Math.floor(baseEarned);
    const newInventory = inventory.filter(invItem => invItem.acquiredAt!==modalItem.acquiredAt);
    await saveInventory(newInventory);
    setModalItem(null);
    if (onEarnMoney && earnedWithMultiplier > 0) onEarnMoney(earnedWithMultiplier);
  };
  // Animated fade-in for all items, but only after image load
  const makeFadeAnim = (idx) => {
    if (!fadeAnimMap.current[idx]) fadeAnimMap.current[idx] = new Animated.Value(0);
    return fadeAnimMap.current[idx];
  };
  const onCardImageLoad = (idx) => {
    setItemLoaded(s => ({ ...s, [idx]: true }));
    Animated.timing(fadeAnimMap.current[idx], {
      toValue: 1,
      duration: 160,
      useNativeDriver: true,
    }).start();
  };

  // Compute live value sum with multiplier
  const selectedBaseValue = selectMode
    ? selected
        .map(i => filteredInventory[i])
        .reduce((sum, item) => sum + (item?.value || 0), 0)
    : 0;
  const selectedValue = Math.floor(selectedBaseValue);

  return (
    <View style={styles.container}>
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.dropdownButton, selectMode && {backgroundColor: '#f59e0b'}]}
          onPress={toggleSelectMode}
          activeOpacity={0.7}
        >
          <Text style={{color: selectMode ? '#fff' : '#f59e0b', fontWeight:'bold'}}>
            {selectMode ? 'Cancel' : 'Select'}
          </Text>
        </TouchableOpacity>
        {selectMode && (
          <TouchableOpacity style={styles.dropdownButton} onPress={handleSelectAll} activeOpacity={0.7}>
            <Text style={{color:'#fff'}}>Select All</Text>
          </TouchableOpacity>
        )}
        {selectMode && (
          <TouchableOpacity style={[styles.dropdownButton, {backgroundColor:'#10b981'}]} onPress={deleteSelected} activeOpacity={0.8}>
            <Text style={{color:'#fff'}}>
              Sell: ${selectedValue}
            </Text>
          </TouchableOpacity>
        )}
        {!selectMode && (
          <>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => {
                  setShowSortMenu(!showSortMenu);
                  setShowRarityMenu(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.dropdownIcon}>⬆️⬇️</Text>
                <Text style={styles.dropdownText}>Sort</Text>
              </TouchableOpacity>
              
              {showSortMenu && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      setSortBy('value-asc');
                      setShowSortMenu(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>Value ⬆️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      setSortBy('value-desc');
                      setShowSortMenu(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>Value ⬇️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      setSortBy('name-asc');
                      setShowSortMenu(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>Name A-Z</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      setSortBy('name-desc');
                      setShowSortMenu(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>Name Z-A</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      setSortBy('none');
                      setShowSortMenu(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>None</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Rarity Filter Dropdown */}
            <View style={styles.dropdownContainer}>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => {
                  setShowRarityMenu(!showRarityMenu);
                  setShowSortMenu(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.dropdownIcon}>✨</Text>
                <Text style={styles.dropdownText}>Rarity</Text>
              </TouchableOpacity>
              
              {showRarityMenu && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      setFilterRarity('all');
                      setShowRarityMenu(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      setFilterRarity('Common');
                      setShowRarityMenu(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>Common</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      setFilterRarity('Rare');
                      setShowRarityMenu(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>Rare</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      setFilterRarity('Epic');
                      setShowRarityMenu(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>Epic</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      setFilterRarity('Legendary');
                      setShowRarityMenu(false);
                    }}
                  >
                    <Text style={styles.menuItemText}>Legendary</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text style={styles.itemCount}>{filteredInventory.length} items</Text>
          </>
        )}
      </View>
      {/* Inventory Grid */}
      {filteredInventory.length > 0 ? (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.inventoryGrid}>
          {filteredInventory.map((item, idx) => (
            <InventoryItem
              key={item.acquiredAt || idx}
              item={item}
              selected={selectMode && selected.includes(idx)}
              selectionMode={selectMode}
              onPress={()=>{
                if (selectMode) handleSelect(idx);
                else setModalItem(item);
              }}
              onLongPress={()=>setSelectMode(true)}
              fadeAnim={makeFadeAnim(idx)}
              onImageLoad={()=>onCardImageLoad(idx)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyText}>No items found</Text>
        </View>
      )}

      {/* Modal for single item view */}
      <Modal visible={!!modalItem} transparent animationType="fade" onRequestClose={()=>setModalItem(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {modalItem && <>
              <Image
                source={typeof modalItem.imageSrc==='number' ? modalItem.imageSrc : {uri: modalItem.imageSrc}}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <Text style={styles.modalTitle}>{modalItem.name}</Text>
              <Text style={styles.modalMeta}>Rarity: <Text style={{color:modalItem.rarityColor}}>{modalItem.rarity}</Text></Text>
              {modalItem.value!=null && (
                <Text style={styles.modalMeta}>
                  Value: ${Math.floor(modalItem.value || 0)}
                </Text>
              )}
              <TouchableOpacity style={styles.modalDelete} onPress={deleteModalItem} activeOpacity={0.8}>
                <Text style={{color:'#fff'}}>
                  Sell Item For ${Math.floor(modalItem.value || 0)}
                </Text>
              </TouchableOpacity>
            </>}
            <TouchableOpacity style={styles.modalClose} onPress={()=>setModalItem(null)} activeOpacity={0.7}><Text style={{color:'#f59e0b'}}>Close</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
    gap: 12,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    gap: 6,
  },
  dropdownIcon: {
    fontSize: 16,
  },
  dropdownText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 42,
    left: 0,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1001,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  menuItemText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  itemCount: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 'auto',
  },
  scrollView: {
    flex: 1,
  },
  inventoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  itemCard: {
    width: '18%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 8,
    borderWidth: 3,
    overflow: 'hidden',
  },
  itemImageContainer: {
    width: '100%',
    height: '100%',
  },
  itemImage: {
    width: '125%',
    height: '125%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  modalMeta: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  multiplierText: {
    color: '#fbbf24',
    fontWeight: '600',
  },
  modalDelete: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  modalClose: {
    marginTop: 15,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 40,
    color: '#f59e0b',
    fontWeight: 'bold',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  iconEmoji: {
    fontSize: 22,
    marginBottom: 0,
  },
  filterBarSpacer: {
    marginLeft: 'auto',
  },
});

export default InventoryScene;