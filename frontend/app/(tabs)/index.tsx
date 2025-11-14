import { Image } from 'expo-image';
import { Text,Dimensions, View, Platform, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFrameSize } from '@react-navigation/elements';

// variables
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// dummy variables
const DATA = [
  {
    id: '1',
    title: 'assignment1',
    date: 'due date',
  },
  {
    id: '2',
    title: 'assignment2',
    date: 'due date',
  },
  {
    id: '3',
    title: 'assignment3',
    date: 'due date',
  },
  {
    id: '4',
    title: 'assignment4',
    date: 'due date',
  },
  {
    id: '5',
    title: 'assignment5',
    date: 'due date',
  },
  {
    id: '6',
    title: 'assignment6',
    date: 'due date',
  },
  { id: '7',
    title: 'assignment7',
    date: 'due date',
  },
  {
    id: '8',
    title: 'assignment8',
    date: 'due date',
  },
  {
    id: '9',
    title: 'assignment9',
    date: 'due date',
  },
  {
    id: '10',
    title: 'assignment10',
    date: 'due date',
  },
  { id: '11',
    title: 'assignment11',
    date: 'due date',
  },
  {
    id: '12',
    title: 'assignment12',
    date: 'due date',
  }
]

export default function HomeScreen() {
  return (
    // step container for whole screen
    <SafeAreaView style={styles.stepContainer}>

      {/* # top menu bar  */}
      <View style={styles.topBar}>
        {/* # PFP - REPLACE WITH SOME WAY TO DO THIS FROM A PIC THE USER UPLOADED */}
        <Image 
          source={require('../../../frontend/assets/images/test_pfp.jpg')}
          style = {styles.profilePic}
        />
        
        <ThemedText>
          top bar menu area
        </ThemedText>
      </View>

      {/* # adds the field circle (green) */}
      <View style={styles.fieldCircle}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollAssignments}
          snapToInterval={(windowHeight * 0.1) + 40}
          decelerationRate="fast"
          >

          {Array.from({ length: 50 }).map((_, i) => (
            <View key={i} style = {styles.assignmentButton}>
              <Text>Assignment {i + 1}</Text>
              <Text>Some Due Date</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <ThemedText>
          Home screen!! yay
      </ThemedText>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    width: '100%',
    height: '100%',
    backgroundColor: '#EEFCFF',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  // manages the green circle (field) in the BG
  fieldCircle: {
    width: windowWidth*2,
    height: windowWidth*2,
    borderRadius: (windowWidth*2) / 2,
    backgroundColor: '#AEDF0D',
    top: windowHeight / 2.3,
    left: -windowWidth / 2,
    position: 'absolute',
    
    overflow: 'hidden',
    alignItems: 'center',
  },

  assignmentButton: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.1,
    borderRadius: 9999,
    backgroundColor: "#96D022",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },

  // snap interval: windowHeight * 0.1 + 40 (button height + marginVertical*2)

  // control padding, alignment of the scrollable assignment buttons
  scrollAssignments: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 500,
    width: windowWidth,
  },

  // manages the top menu bar area
  topBar: {
    width: windowWidth,
    padding: windowWidth / 20,
  },

  // manages the profile picture size and shape
  profilePic: {
    width: windowWidth/5,
    height: windowWidth/5,
    borderRadius: (windowWidth/5) / 2,
    resizeMode: 'cover',
  }
});

/*


    
*/