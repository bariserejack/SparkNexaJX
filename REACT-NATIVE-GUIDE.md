# React Native Starter Code

This folder will contain React Native code when you're ready to build the app.

## Setup Instructions (Future)

```bash
# Install Expo CLI
npm install -g expo-cli

# Create React Native project
npx create-expo-app SparkNexaJX-Mobile

# Navigate to project
cd SparkNexaJX-Mobile

# Install dependencies
npm install

# Start development
expo start
```

## Project Structure

```
SparkNexaJX-Mobile/
├── app.json                 # Expo config
├── App.js                   # Main app component
├── package.json            # Dependencies
├── screens/
│   ├── HomeScreen.js
│   ├── ProgramsScreen.js
│   ├── GalleryScreen.js
│   ├── ContactScreen.js
│   └── ProfileScreen.js
├── components/
│   ├── Navigation.js
│   ├── ProgramCard.js
│   ├── Header.js
│   └── Footer.js
├── services/
│   ├── api.js             # API calls
│   ├── auth.js            # Authentication
│   └── storage.js         # Local storage
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
└── styles/
    └── theme.js           # Colors, fonts, spacing
```

## Sample Screen Code (HomeScreen.js)

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { API_BASE_URL } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/programs?featured=true`);
      const data = await response.json();
      setFeatured(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Image 
          source={require('../assets/images/hero.jpg')} 
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Igniting Youth Potential</Text>
          <TouchableOpacity 
            style={styles.heroButton}
            onPress={() => navigation.navigate('Programs')}
          >
            <Text style={styles.heroButtonText}>Explore Programs</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Programs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Programs</Text>
        {featured.map(program => (
          <TouchableOpacity 
            key={program.id}
            style={styles.programCard}
            onPress={() => navigation.navigate('ProgramDetails', { program })}
          >
            <Image source={{ uri: program.image }} style={styles.programImage} />
            <View style={styles.programInfo}>
              <Text style={styles.programName}>{program.name}</Text>
              <Text style={styles.programDesc}>{program.description}</Text>
              <Text style={styles.programPrice}>{program.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Call to Action */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Start?</Text>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Contact')}
        >
          <Text style={styles.ctaButtonText}>Get Started Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    height: 300,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  heroButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  heroButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  programCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  programImage: {
    width: '100%',
    height: 200,
  },
  programInfo: {
    padding: 15,
    backgroundColor: '#fff',
  },
  programName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  programDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  programPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  ctaSection: {
    padding: 30,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  ctaButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

## Navigation Setup (App.js)

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import ProgramsScreen from './screens/ProgramsScreen';
import GalleryScreen from './screens/GalleryScreen';
import ContactScreen from './screens/ContactScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#6366f1' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerTitle: 'SparkNexaJX' }}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Programs') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Gallery') {
            iconName = focused ? 'images' : 'images-outline';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'call' : 'call-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Programs" 
        component={ProgramsScreen}
        options={{ title: 'Programs' }}
      />
      <Tab.Screen 
        name="Gallery" 
        component={GalleryScreen}
        options={{ title: 'Gallery' }}
      />
      <Tab.Screen 
        name="Contact" 
        component={ContactScreen}
        options={{ title: 'Contact' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
```

## Dependencies (package.json)

```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "expo-status-bar": "~1.11.1",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "@react-navigation/native-stack": "^6.9.0",
    "react-native-screens": "~3.27.0",
    "react-native-safe-area-context": "4.8.2",
    "expo-splash-screen": "~0.26.4",
    "expo-font": "~11.10.3",
    "axios": "^1.6.0",
    "@react-native-async-storage/async-storage": "^1.21.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  }
}
```

## When to Start React Native

Start React Native when:
- ✅ PWA is live and getting users
- ✅ You have feedback on what features users want
- ✅ You have $200-500 budget for tools
- ✅ You want better iOS functionality
- ✅ You want offline features

## Quick Timeline

- Week 1-2: Setup & Environment
- Week 3-4: Core screens (Home, Programs, Gallery)
- Week 5: Features & API Integration
- Week 6: Testing & Bug fixes
- Week 7: Submit to app stores
- Week 8+: Monitor & Update

This is optional! PWA is fully functional and can be your long-term solution.
