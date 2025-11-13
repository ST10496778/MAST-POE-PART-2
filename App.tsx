import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// types
type Course = 'Starters' | 'Main Dishes' | 'Desserts' | 'Beverages';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
}

// MenuItem Component 
const MenuItemComponent = ({ item, onAddToOrder, onRemoveFromOrder, isInOrder }: { 
  item: MenuItem; 
  onAddToOrder: (item: MenuItem) => void;
  onRemoveFromOrder: (itemId: string) => void;
  isInOrder: boolean;
}) => (
  <View style={styles.menuItem}>
    <View style={styles.dishHeader}>
      <Text style={styles.dishName}>{item.name}</Text>
      <View style={styles.coursePill}>
        <Text style={styles.coursePillText}>
          {item.course === 'Starters' && '🍤'}
          {item.course === 'Main Dishes' && '🍖'}
          {item.course === 'Desserts' && '🍰'}
          {item.course === 'Beverages' && '🥤'}
        </Text>
      </View>
    </View>
    <Text style={styles.dishDescription}>{item.description}</Text>
    <View style={styles.itemFooter}>
      <Text style={styles.dishPrice}>R{item.price.toFixed(2)}</Text>
      <View style={styles.buttonContainer}>
        {isInOrder && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.removeButton]} 
            onPress={() => onRemoveFromOrder(item.id)}
          >
            <Text style={styles.actionButtonText}>➖ Remove</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.actionButton, styles.addButton]} 
          onPress={() => onAddToOrder(item)}
        >
          <Text style={styles.actionButtonText}>➕ Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'addDish'>('home');
  const [orderItems, setOrderItems] = useState<MenuItem[]>([]);
  
  // Pre-added dishes and drinks
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    // STARTERS
    {
      id: '1',
      name: 'CHICKEN LIVERS',
      description: 'Creamy peri-peri chicken livers served with fresh bread',
      course: 'Starters',
      price: 85.00,
    },
    
    // MAIN DISHES
    {
      id: '2',
      name: 'STEAK FILLET 300G',
      description: 'Premium 300g steak fillet with mushroom sauce and veggies',
      course: 'Main Dishes',
      price: 245.00,
    },
    {
      id: '3',
      name: 'GOURMET BURGER',
      description: 'Beef patty with caramelized onions and special sauce',
      course: 'Main Dishes',
      price: 120.00,
    },
    {
      id: '4',
      name: 'CHICKEN ALFREDO',
      description: 'Creamy Alfredo pasta with grilled chicken strips',
      course: 'Main Dishes',
      price: 135.00,
    },
    {
      id: '5',
      name: 'VANILLA ICE CREAM NOUGAT',
      description: 'Homemade vanilla ice cream with caramel nougat crunch',
      course: 'Desserts',
      price: 65.00,
    },
    {
      id: '6',
      name: 'BERRY BLAST SMOOTHIE',
      description: 'Mixed berries with yogurt and honey',
      course: 'Beverages',
      price: 45.00,
    },
    {
      id: '7',
      name: 'TROPICAL SUNSET',
      description: 'Orange, pineapple, and mango fusion',
      course: 'Beverages',
      price: 40.00,
    },
    {
      id: '8',
      name: 'SPARKLING LEMONADE',
      description: 'Fresh lemon with mint and sparkling water',
      course: 'Beverages',
      price: 35.00,
    },
  ]);

  const [dishName, setDishName] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course>('Starters');
  const [dishPrice, setDishPrice] = useState('');

  const courses: Course[] = ['Starters', 'Main Dishes', 'Desserts', 'Beverages'];

  const handleAddDish = () => {
    if (!dishName.trim()) {
      Alert.alert('Error', 'Please enter a dish name');
      return;
    }

    if (!dishDescription.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    if (!dishPrice.trim() || isNaN(parseFloat(dishPrice)) || parseFloat(dishPrice) <= 0) {
      Alert.alert('Error', 'Please enter a valid price number without any letters');
      return;
    }

    const newDish: MenuItem = {
      id: Date.now().toString(),
      name: dishName,
      description: dishDescription,
      course: selectedCourse,
      price: parseFloat(dishPrice),
    };

    setMenuItems([...menuItems, newDish]);
    setDishName('');
    setDishDescription('');
    setSelectedCourse('Starters');
    setDishPrice('');
    Alert.alert('Success!', 'Dish added successfully!');
    setCurrentScreen('home');
  };

  const handleAddToOrder = (item: MenuItem) => {
    setOrderItems([...orderItems, item]);
    Alert.alert('Added!', `${item.name} added to your order!`);
  };

  const handleRemoveFromOrder = (itemId: string) => {
    const itemIndex = orderItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      const updatedOrder = [...orderItems];
      const removedItem = updatedOrder.splice(itemIndex, 1)[0];
      setOrderItems(updatedOrder);
      Alert.alert('Removed!', `${removedItem.name} removed from your order!`);
    }
  };

  const handleRemoveAllFromOrder = () => {
    if (orderItems.length === 0) {
      Alert.alert('Oops!', 'No items in your order to remove.');
      return;
    }
    setOrderItems([]);
    Alert.alert('Cleared!', 'All items removed from your order!');
  };

  const handleAddAllToOrder = () => {
    if (menuItems.length === 0) {
      Alert.alert('Oops!', 'No menu items to add.');
      return;
    }
    setOrderItems([...orderItems, ...menuItems]);
    Alert.alert('Awesome!', `All ${menuItems.length} items added to your order!`);
  };

  const isItemInOrder = (itemId: string) => {
    return orderItems.some(item => item.id === itemId);
  };

  const getTotalMenuItems = () => menuItems.length;
  const getOrderTotal = () => orderItems.reduce((total, item) => total + item.price, 0);

  // Logo Component 
  const Logo = () => (
    <View style={styles.logoContainer}>
      <Image 
        source={require('./assets/logo-for-mast.webp')}
        style={styles.logoImage}
        resizeMode="cover"
        onError={(error) => console.log('Logo image failed to load:', error)}
      />
      <Text style={styles.headerTitle}>ChrisCooks</Text>
    </View>
  );

  // Chef Logo Component ]
  const ChefLogo = () => (
    <View style={styles.logoContainer}>
      <Image 
        source={require('./assets/logo-for-mast.webp')}
        style={styles.chefLogoImage}
        resizeMode="cover"
        onError={(error) => console.log('Chef logo image failed to load:', error)}
      />
      <Text style={styles.headerTitle}>Add New Dish</Text>
    </View>
  );

  // Home Screen
  const HomeScreen = () => (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Logo />
        <Text style={styles.headerSubtitle}>Exquisite Dining Experience</Text>
      </View>

      <View style={styles.content}>
        {orderItems.length > 0 && (
          <View style={styles.orderSummary}>
            <Text style={styles.orderSummaryText}>
              🛒 Order: {orderItems.length} items | Total: R{getOrderTotal().toFixed(2)}
            </Text>
            <TouchableOpacity 
              style={styles.removeAllButton} 
              onPress={handleRemoveAllFromOrder}
            >
              <Text style={styles.removeAllButtonText}>🗑️ Clear Order</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{getTotalMenuItems()}</Text>
            <Text style={styles.statLabel}>Menu Items</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{orderItems.length}</Text>
            <Text style={styles.statLabel}>Current Order</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>R{getOrderTotal().toFixed(0)}</Text>
            <Text style={styles.statLabel}>Order Total</Text>
          </View>
        </View>

        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.addAllButton} onPress={handleAddAllToOrder}>
            <Text style={styles.addAllButtonText}>📋 Add All to Order</Text>
          </TouchableOpacity>
          {orderItems.length > 0 && (
            <TouchableOpacity style={styles.removeAllButtonSmall} onPress={handleRemoveAllFromOrder}>
              <Text style={styles.removeAllButtonText}>🗑️ Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item) => (
            <MenuItemComponent 
              key={item.id} 
              item={item} 
              onAddToOrder={handleAddToOrder}
              onRemoveFromOrder={handleRemoveFromOrder}
              isInOrder={isItemInOrder(item.id)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setCurrentScreen('addDish')}>
          <Text style={styles.footerButtonText}>➕ Add New Dish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Add Dish Screen
  const AddDishScreen = () => (
    <View style={styles.screen}>
      <View style={styles.header}>
        <ChefLogo />
        <Text style={styles.headerSubtitle}>Craft Your Culinary Masterpiece</Text>
      </View>

      <View style={styles.content}>
        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.inputCard}>
            <Text style={styles.label}>🍴 Dish Name</Text>
            <TextInput
              style={styles.input}
              placeholder="What's this exquisite dish called?"
              placeholderTextColor="#666"
              value={dishName}
              onChangeText={setDishName}
              maxLength={50}
            />
            <Text style={styles.charCount}>{dishName.length}/50</Text>
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.label}>📝 Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the flavors and ingredients..."
              placeholderTextColor="#666"
              value={dishDescription}
              onChangeText={setDishDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={200}
            />
            <Text style={styles.charCount}>{dishDescription.length}/200</Text>
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.label}>📋 Course Type</Text>
            <View style={styles.courseContainer}>
              {courses.map((course) => (
                <TouchableOpacity
                  key={course}
                  style={[
                    styles.courseButton,
                    selectedCourse === course && styles.courseButtonSelected
                  ]}
                  onPress={() => setSelectedCourse(course)}
                >
                  <Text style={[
                    styles.courseButtonText,
                    selectedCourse === course && styles.courseButtonTextSelected
                  ]}>
                    {course}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.label}>💰 Price</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.currencySymbol}>R</Text>
              <TextInput
                style={[styles.input, styles.priceInput]}
                placeholder="0.00"
                placeholderTextColor="#666"
                value={dishPrice}
                onChangeText={setDishPrice}
                keyboardType="decimal-pad"
              />
            </View>
            {dishPrice && !isNaN(parseFloat(dishPrice)) && parseFloat(dishPrice) > 0 && (
              <Text style={styles.pricePreview}>
                Price: R{parseFloat(dishPrice).toFixed(2)}
              </Text>
            )}
          </View>

          <View style={styles.formSummary}>
            <Text style={styles.formSummaryTitle}>Dish Summary:</Text>
            <Text style={styles.formSummaryText}>
              {dishName || 'No name'} • {selectedCourse} • {dishPrice ? `R${parseFloat(dishPrice).toFixed(2)}` : 'No price'}
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[
                styles.saveButton, 
                (!dishName.trim() || !dishDescription.trim() || !dishPrice.trim()) && styles.saveButtonDisabled
              ]} 
              onPress={handleAddDish}
              disabled={!dishName.trim() || !dishDescription.trim() || !dishPrice.trim()}
            >
              <Text style={styles.saveButtonText}>💾 Save Dish</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => {
              setDishName('');
              setDishDescription('');
              setSelectedCourse('Starters');
              setDishPrice('');
              setCurrentScreen('home');
            }}>
              <Text style={styles.cancelButtonText}>✕ Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setCurrentScreen('home')}>
          <Text style={styles.footerButtonText}>← Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />
      {currentScreen === 'home' ? <HomeScreen /> : <AddDishScreen />}
    </View>
  );
}

// style sheet - Updated with Professional Black/Grey/Maroon Theme
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  screen: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0D0D0D',
    padding: 25,
    paddingTop: 50,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#800000',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#800000',
    backgroundColor: 'white',
  },
  chefLogoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#800000',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1A1A1A',
  },
  orderSummary: {
    backgroundColor: '#2D2D2D',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#404040',
  },
  orderSummaryText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2D2D2D',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#404040',
  },
  statNumber: {
    color: '#800000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#CCCCCC',
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  addAllButton: {
    backgroundColor: '#800000',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 2,
    borderWidth: 1,
    borderColor: '#A00000',
  },
  addAllButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  removeAllButton: {
    backgroundColor: '#404040',
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#666',
  },
  removeAllButtonSmall: {
    backgroundColor: '#404040',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#666',
  },
  removeAllButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#404040',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dishName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  coursePill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#404040',
    borderWidth: 1,
    borderColor: '#666',
  },
  coursePillText: {
    fontSize: 14,
  },
  dishDescription: {
    color: '#CCCCCC',
    marginBottom: 14,
    fontSize: 13,
    lineHeight: 18,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#800000',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#800000',
    borderColor: '#A00000',
  },
  removeButton: {
    backgroundColor: '#404040',
    borderColor: '#666',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 11,
  },
  formContainer: {
    flex: 1,
  },
  inputCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#404040',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    color: '#800000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    backgroundColor: '#1A1A1A',
    color: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 11,
    color: '#666',
    marginTop: 5,
  },
  courseContainer: {
    marginTop: 5,
  },
  courseButton: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
  },
  courseButtonSelected: {
    backgroundColor: '#800000',
    borderColor: '#A00000',
  },
  courseButtonText: {
    color: '#CCCCCC',
    textAlign: 'center',
    fontWeight: '500',
  },
  courseButtonTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#800000',
    marginRight: 10,
  },
  priceInput: {
    flex: 1,
  },
  pricePreview: {
    marginTop: 8,
    fontSize: 13,
    color: '#800000',
    fontWeight: '500',
  },
  formSummary: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#404040',
  },
  formSummaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#800000',
    marginBottom: 4,
  },
  formSummaryText: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  buttonGroup: {
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#800000',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#A00000',
  },
  saveButtonDisabled: {
    backgroundColor: '#4D0000',
    borderColor: '#660000',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#CCCCCC',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#0D0D0D',
    padding: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 1,
    borderTopColor: '#800000',
  },
  footerButton: {
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#404040',
  },
  footerButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});