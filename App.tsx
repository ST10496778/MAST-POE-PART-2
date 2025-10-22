import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Define types
type Course = 'Starters' | 'Main Dishes' | 'Desserts' | 'Beverages';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
}

// MenuItem Component 
const MenuItemComponent = ({ item, onAddToOrder }: { item: MenuItem; onAddToOrder: (item: MenuItem) => void }) => (
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
      <TouchableOpacity style={styles.addButton} onPress={() => onAddToOrder(item)}>
        <Text style={styles.addButtonText}>➕ Add to Order</Text>
      </TouchableOpacity>
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
      price: price,
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

  const handleAddAllToOrder = () => {
    if (menuItems.length === 0) {
      Alert.alert('Oops!', 'No menu items to add.');
      return;
    }
    setOrderItems([...orderItems, ...menuItems]);
    Alert.alert('Awesome!', `All ${menuItems.length} items added to your order!`);
  };

  const getTotalMenuItems = () => menuItems.length;
  const getOrderTotal = () => orderItems.reduce((total, item) => total + item.price, 0);

  // Home Screen
  const HomeScreen = () => (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🍽️</Text>
          <Text style={styles.headerTitle}>ChrisCooks</Text>
        </View>
        <Text style={styles.headerSubtitle}>Yummy Delights Await! ✨</Text>
      </View>

      <View style={styles.content}>
        {orderItems.length > 0 && (
          <View style={styles.orderSummary}>
            <Text style={styles.orderSummaryText}>
              🛒 Order: {orderItems.length} items | Total: R{getOrderTotal().toFixed(2)}
            </Text>
          </View>
        )}

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>🎯 Total Menu Items: {getTotalMenuItems()}</Text>
        </View>

        <TouchableOpacity style={styles.addAllButton} onPress={handleAddAllToOrder}>
          <Text style={styles.addAllButtonText}>🛒 Add All to Order</Text>
        </TouchableOpacity>

        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item) => (
            <MenuItemComponent key={item.id} item={item} onAddToOrder={handleAddToOrder} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setCurrentScreen('addDish')}>
          <Text style={styles.footerButtonText}>✨ Add New Dish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Add Dish Screen
  const AddDishScreen = () => (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>👨‍🍳</Text>
          <Text style={styles.headerTitle}>Add New Dish</Text>
        </View>
        <Text style={styles.headerSubtitle}>Create something magical! 🌟</Text>
      </View>

      <View style={styles.content}>
        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.inputCard}>
            <Text style={styles.label}>🍴 Dish Name</Text>
            <TextInput
              style={styles.input}
              placeholder="What's this delicious dish called?"
              placeholderTextColor="#A8A8A8"
              value={dishName}
              onChangeText={setDishName}
            />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.label}>📝 Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe how yummy it is..."
              placeholderTextColor="#A8A8A8"
              value={dishDescription}
              onChangeText={setDishDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
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
            <TextInput
              style={styles.input}
              placeholder="How much for this delight?"
              placeholderTextColor="#A8A8A8"
              value={dishPrice}
              onChangeText={setDishPrice}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.saveButton} onPress={handleAddDish}>
              <Text style={styles.saveButtonText}>💾 Save Dish</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setCurrentScreen('home')}>
              <Text style={styles.cancelButtonText}>❌ Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setCurrentScreen('home')}>
          <Text style={styles.footerButtonText}>🏠 Back to Menu</Text>
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

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FFF9F9',
  },
  screen: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FF85A2',
    padding: 25,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logo: {
    fontSize: 32,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  orderSummary: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  orderSummaryText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalContainer: {
    backgroundColor: '#A6E3E9',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  totalText: {
    color: '#2D5D7B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addAllButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  addAllButtonText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF85A2',
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 133, 162, 0.1)',
    padding: 10,
    borderRadius: 15,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,

  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F4F',
    flex: 1,
  },
  coursePill: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#FFB6C1',
  },
  coursePillText: {
    fontSize: 16,
  },
  dishDescription: {
    color: '#666',
    marginBottom: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  addButton: {
    backgroundColor: '#FF85A2',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  formContainer: {
    flex: 1,
  },
  inputCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#FF85A2',
  },
  input: {
    borderWidth: 2,
    borderColor: 'rgba(255, 133, 162, 0.3)',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#333',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  courseContainer: {
    marginTop: 5,
  },
  courseButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgba(255, 133, 162, 0.3)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  courseButtonSelected: {
    backgroundColor: '#FF85A2',
    borderColor: '#FF85A2',
  },
  courseButtonText: {
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
  },
  courseButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonGroup: {
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#FF85A2',
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FF85A2',
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FF85A2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#FF85A2',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  footerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});