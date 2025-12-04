import { Image } from 'expo-image';
import { Platform, StyleSheet, Pressable, Dimensions, TextInput, Alert, ScrollView, Switch } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function profilesScreen() {
  const [profilePic, setProfilePic] = React.useState(null);
  const [displayName, setDisplayName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailNotif, setEmailNotif] = React.useState(false);
  const [pushNotif, setPushNotif] = React.useState(false);
  const [messageNotif, setMessageNotif] = React.useState(false);
  const [updateNotif, setUpdateNotif] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = React.useState(true);

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const handlePickImage = async () =>{
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, 
      aspect: [1,1],
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result.assets[0].uri);
  }
  };

  const handleProfilePicPress = () => {
    handlePickImage();
  };

  React.useEffect(() => {
    requestPermission();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.boldText}>
          Profile Settings
        </ThemedText>
        <Pressable onPress={() => {handleProfilePicPress()}}>
                <Image 
                  source={require('../../../frontend/assets/images/test_pfp.jpg')}
                  style = {styles.profilePic}
                  contentFit = "cover"
                />
                </Pressable>
                <ThemedText style={styles.boldText}>
                Display Name
                </ThemedText>

                <TextInput
                style={styles.input}
                placeholder="Enter your display name"
                placeholderTextColor="#000000"
                value = {displayName}
                onChangeText={setDisplayName}
                ></TextInput>
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.boldText}>
          Login Information
        </ThemedText>
        <ThemedText style={styles.subHeader}>
          Manage your email and password!
        </ThemedText>
        <ThemedText style={styles.boldText}>
          Email Address
        </ThemedText>
        <TextInput 
        style = {styles.input}
        placeholder = "Enter your email"
        placeholderTextColor="#000000"
        value = {email}
        onChangeText={setEmail}
        ></TextInput>
        <Pressable 
          style={styles.button}
          onPress = {() => { Alert.alert('Update Email', 'Email updated successfully!'); }}
        >
          <ThemedText style={styles.buttonText}>Update Email</ThemedText>
        </Pressable>

        <ThemedText style={styles.boldText}>
          Password
        </ThemedText>
        <TextInput 
        style = {styles.input}
        placeholder = "Enter new password"
        placeholderTextColor="#000000"
        value = {email}
        onChangeText={setEmail}
        ></TextInput>
        <Pressable 
          style={styles.button}
          onPress = {() => { Alert.alert('Update Password', 'Password updated successfully!'); }}
        >
          <ThemedText style={styles.buttonText}>Update Password</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.boldText}>
          Notifications
        </ThemedText>
        
        {[
          { label: 'Email Notifications', value: emailNotif, setter: setEmailNotif },
          { label: 'Push Notifications', value: pushNotif, setter: setPushNotif },
          { label: 'Message Notifications', value: messageNotif, setter: setMessageNotif },
          { label: 'Update Notifications', value: updateNotif, setter: setUpdateNotif },
        ].map(({ label, value, setter }) => (
          <ThemedView key={label} style={styles.toggleRow}>
            <ThemedText style={styles.subHeader}>{label}</ThemedText>
            <Switch value={value} onValueChange={setter} />
          </ThemedView>
        ))}

      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.boldText}>
            Audio Settings
          </ThemedText>

          <ThemedText style={styles.subHeader}>
            Volume: {Math.round(volume * 100)}%
          </ThemedText>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onValueChange={setVolume}
            minimumTrackTintColor="#858FD1"
            maximumTrackTintColor="#000000"
          />

          <ThemedView style={styles.toggleRow}>
            <ThemedText style={styles.subHeader}>Sound Effects</ThemedText>
            <Switch
              value={soundEffectsEnabled}
              onValueChange={setSoundEffectsEnabled}
            />
          </ThemedView>
        </ThemedView>

      
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subHeader : {
    fontSize: 12,
    gap: 0,
    marginLeft: 12,
  },
  stepContainer: {
    gap: 5,
    marginBottom: 5,
    borderWidth: 5,
    padding: 15,
    backgroundColor: '#B5D5DC',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
   profilePic: {
    width: windowWidth/5,
    height: windowWidth/5,
    borderRadius: (windowWidth/5) / 2,
  },
  boldText:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: 'black',
    gap: 10,
  },
  button :{
    backgroundColor: '#858FD1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',

  },
  buttonText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleRow : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#858FD1',
    borderRadius: 12,
  }
});
