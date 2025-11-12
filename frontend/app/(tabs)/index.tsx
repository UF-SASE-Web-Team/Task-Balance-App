import { Image } from 'expo-image';
import { Text,Dimensions, View, Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFrameSize } from '@react-navigation/elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.stepContainer}>
      <View style={styles.topBar}>
        # REPLACE WITH SOME WAY TO DO THIS FROM A PIC THE USER UPLOADED
        <Image 
          source={require('../../../frontend/assets/images/test_pfp.jpg')}
          style = {styles.profilePic}
        />
        
        <ThemedText>
          top bar menu area
        </ThemedText>
      </View>

      <View style={styles.fieldCircle} />

      <ThemedText>
          Home screen!!
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

  fieldCircle: {
    width: windowWidth*2,
    height: windowWidth*2,
    borderRadius: (windowWidth*2) / 2,
    backgroundColor: '#AEDF0D',
    top: windowHeight / 2.3,
    left: -windowWidth / 2,
    position: 'absolute',
    
  },

  topBar: {
    width: windowWidth,
    padding: windowWidth / 20,
  },

  profilePic: {
    width: windowWidth/5,
    height: windowWidth/5,
    borderRadius: (windowWidth/5) / 2,
    resizeMode: 'cover',
  }
});