import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const onboardingData = [
  {
    id: '1',
    title: 'Welcome to MyApp',
    description: 'Discover amazing features and stay connected with us.',
    image: require('../assets/key.png'), // Replace with your image paths
  },
  {
    id: '2',
    title: 'Stay Organized',
    description: 'Manage your tasks efficiently and keep track of everything.',
    image: require('../assets/login.png'),
  },
  {
    id: '3',
    title: 'Get Started',
    description: 'Let’s get you started with a quick setup.',
    image: require('../assets/mobile-password-forgot.png'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Login'); // Navigate to Login or your desired screen
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login'); // Skip to Login or your desired screen
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={onboardingData}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const currentIndex = Math.floor(contentOffsetX / e.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(currentIndex);
        }}
      />

      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>
            {currentIndex < onboardingData.length - 1 ? 'Next' : 'Get Started'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View key={index} style={[styles.dot, currentIndex === index ? styles.activeDot : styles.inactiveDot]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  slide: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: '#1e90ff',
    fontSize: 16,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#1e90ff',
  },
  inactiveDot: {
    backgroundColor: '#ddd',
  },
});

export default OnboardingScreen;
