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

// Course data
const courses: Course[] = ['Starters', 'Main Dishes', 'Desserts', 'Beverages'];
const courseEmojis = { 'Starters': '🍤', 'Main Dishes': '🍖', 'Desserts': '🍰', 'Beverages': '🥤' };
const courseColors = { 'Starters': '#FFB6C1', 'Main Dishes': '#FFD700', 'Desserts': '#DDA0DD', 'Beverages': '#87CEEB' };

// Menu Item Component 
const MenuItemComponent = ({ item, onAddToOrder }: { item: MenuItem; onAddToOrder: (item: MenuItem) => void }) => (
  <View style={styles.menuItem}>
    <View style={styles.dishHeader}>
      <Text style={styles.dishName}>{item.name}</Text>
      <View style={[styles.coursePill, { backgroundColor: courseColors[item.course] }]}>
        <Text style={styles.coursePillText}>{courseEmojis[item.course]}</Text>
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
    
    // DESSERTS
    {
      id: '5',
      name: 'VANILLA ICE CREAM NOUGAT',
      description: 'Homemade vanilla ice cream with caramel nougat crunch',
      course: 'Desserts',
      price: 65.00,
    },
    
    // BEVERAGES
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
    {
      id: '9',
      name: 'ICED CARAMEL LATTE',
      description: 'Espresso with caramel and cold milk',
      course: 'Beverages',
      price: 50.00,
    },
    {
      id: '10',
      name: 'MOCHA MADNESS',
      description: 'Chocolate and coffee perfection',
      course: 'Beverages',
      price: 55.00,
    }
  ]);

  const [dishName, setDishName] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course>('Starters');
  const [dishPrice, setDishPrice] = useState('');

  // Course options
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
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    const newDish: MenuItem = {
      id: Date.now().toString(),
      name: dishName.trim(),
      description: dishDescription.trim(),
      course: selectedCourse,
      price: parseFloat(dishPrice),
    };

    setMenuItems([...menuItems, newDish]);
    
    // Reset form
    setDishName('');
    setDishDescription('');
    setSelectedCourse('Starters');
    setDishPrice('');
    
    Alert.alert('Yay! 🎉', 'Dish added successfully!');
    setCurrentScreen('home');
  };

  const handleAddAllToOrder = () => {
    if (menuItems.length === 0) {
      Alert.alert('Oops!', 'No menu items to add.');
      return;
    }
    Alert.alert('Awesome! 🎊', `All ${menuItems.length} delicious items added to your order!`);
  };

  const getTotalMenuItems = () => {
    return menuItems.length;
  };

  const getItemsByCourse = (course: Course) => {
    return menuItems.filter(item => item.course === course);
  };

  // Home Screen Component
  const HomeScreen = () => (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🍽️</Text>
          <Text style={styles.headerTitle}>ChrisCooks</Text>
        </View>
        <Text style={styles.headerSubtitle}>Yummy Delights Await! ✨</Text>
      </View>

      <View style={styles.content}>
        {/* Total Items Card */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>🎯 Total Menu Items: {getTotalMenuItems()}</Text>
          <Text style={styles.totalSubtext}>So many tasty choices! 🍴</Text>
        </View>

        {/* Add All Button */}
        <TouchableOpacity 
          style={styles.addAllButton}
          onPress={handleAddAllToOrder}
        >
          <Text style={styles.addAllButtonText}>🛒 Add All to Order</Text>
        </TouchableOpacity>

        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {/* Starters Section */}
          {getItemsByCourse('Starters').length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🍤 STARTERS</Text>
              {getItemsByCourse('Starters').map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </View>
          )}

          {/* Main Dishes Section */}
          {getItemsByCourse('Main Dishes').length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🍖 MAIN DISHES</Text>
              {getItemsByCourse('Main Dishes').map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </View>
          )}

          {/* Desserts Section */}
          {getItemsByCourse('Desserts').length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🍰 DESSERTS</Text>
              {getItemsByCourse('Desserts').map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </View>
          )}

          {/* Beverages Section */}
          {getItemsByCourse('Beverages').length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🥤 BEVERAGES</Text>
              {getItemsByCourse('Beverages').map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => setCurrentScreen('addDish')}
        >
          <Text style={styles.footerButtonText}>✨ Add New Dish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Menu Item Component
  const MenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <View style={styles.dishHeader}>
        <Text style={styles.dishName}>{item.name}</Text>
        <View style={[
          styles.coursePill,
          item.course === 'Starters' && styles.starterPill,
          item.course === 'Main Dishes' && styles.mainPill,
          item.course === 'Desserts' && styles.dessertPill,
          item.course === 'Beverages' && styles.beveragePill,
        ]}>
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
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>➕ Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Add Dish Screen Component
  const AddDishScreen = () => (
    <View style={styles.screen}>
      {/* Header */}
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
              numberOfLines={3}
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
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleAddDish}
            >
              <Text style={styles.saveButtonText}>💾 Save Dish</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setCurrentScreen('home')}
            >
              <Text style={styles.cancelButtonText}>❌ Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => setCurrentScreen('home')}
        >
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
    shadowColor: '#FF85A2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
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
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
  totalContainer: {
    backgroundColor: '#A6E3E9',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  totalText: {
    color: '#2D5D7B',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalSubtext: {
    color: '#2D5D7B',
    fontSize: 14,
    opacity: 0.8,
  },
  addAllButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
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
    borderLeftWidth: 5,
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
  },
  starterPill: {
    backgroundColor: '#FFB6C1',
  },
  mainPill: {
    backgroundColor: '#FFD700',
  },
  dessertPill: {
    backgroundColor: '#DDA0DD',
  },
  beveragePill: {
    backgroundColor: '#87CEEB',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
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
    height: 100,
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
    shadowColor: '#FF85A2',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
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
    shadowColor: '#FF85A2',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
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
