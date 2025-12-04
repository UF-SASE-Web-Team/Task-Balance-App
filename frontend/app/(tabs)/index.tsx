import { Image } from 'expo-image';
import { Text, Animated, Dimensions, View, Platform, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import React, { useState, Component } from 'react';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFrameSize } from '@react-navigation/elements';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// variables
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const distanceBetweenAssignmentButtons = 10;

// dummy variables
const assignmentDataClass1 = [
  {
    id: '1',
    title: 'assignment1',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: true,
  },
  {
    id: '2',
    title: 'assignment2',
    date: 'due date',
    info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    completed: true,
  },
  {
    id: '3',
    title: 'assignment3',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: true,
  },
  {
    id: '4',
    title: 'assignment4',
    date: 'due date',
    info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    completed: false,
  },
  {
    id: '5',
    title: 'assignment5',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '6',
    title: 'assignment6',
    date: 'due date',
    info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    completed: false,
  },
  { id: '7',
    title: 'assignment7',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '8',
    title: 'assignment8',
    date: 'due date',
    info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    completed: false,
  },
  {
    id: '9',
    title: 'assignment9',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '10',
    title: 'assignment10',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  { id: '11',
    title: 'assignment11',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '12',
    title: 'assignment12',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '13',
    title: 'assignment13',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '14',
    title: 'assignment14',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '15',
    title: 'assignment15',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '16',
    title: 'assignment16',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '17',
    title: 'assignment17',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '18',
    title: 'assignment18',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '19',
    title: 'assignment19',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  },
  {
    id: '20',
    title: 'assignment20',
    date: 'due date',
    info: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
    completed: false,
  }
]

export default function HomeScreen() {
  

  // variable lets us access dataset
  const [data, setData] = useState(assignmentDataClass1);
  // find earliest incompleted assignment
  const earliestIncompletedAssignmentID = data.find(item => !item.completed)?.id;

  // see if there's a selected assignment for info box or not
  const [selectedAssignment, setSelectedAssignment] = useState<typeof assignmentDataClass1[0] | null>(null);
  // info box visibility state
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  // TRYING TO MAKE THE ANIMATION WORK!!!! IT IS NOT WORKING!!!! :,(
  const circleOffset = React.useRef(new Animated.Value(0)).current;

  // open and close assignment info box functions
  const openAssignmentInfo = (item: any) => {
    setSelectedAssignment(item);
    setIsInfoVisible(true);

  };

  const closeAssignmentInfo = () => {
    setIsInfoVisible(false);
    setSelectedAssignment(null);
  };

  return (
    // step container for whole screen
    <SafeAreaView style={styles.stepContainer}>

      {/* # top menu bar  */}
      <View style={[styles.topBar, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
        {/* # PFP - REPLACE WITH SOME WAY TO DO THIS FROM A PIC THE USER UPLOADED */}
        <Image 
          source={require('../../../frontend/assets/images/test_pfp.jpg')}
          style = {styles.profilePic}
        />

        <ThemedText>
          Profile Bar - add classes selector here
        </ThemedText>

      </View>

      {/* # adds the field circle (green) */}
      <Animated.View style={[styles.fieldCircle, {transform: [{translateY: circleOffset }], zIndex:3}]}>

        <FlatList
          data = {assignmentDataClass1} // our data
          keyExtractor={(item)=>item.id} // gives each assignment a key
          getItemLayout = {(data, index) => ({ 
            length: windowHeight * 0.1 + distanceBetweenAssignmentButtons*2,
            offset: (windowHeight * 0.1 + distanceBetweenAssignmentButtons*2) * index,
            index,
          })} // uhh prereq for using initalScrollIndex. i think it basically lists out what the layout of the buttons is supposed to be beforehand (prerender) so it can auto scroll to a specific point
          initialScrollIndex={data.findIndex(item => item.id === earliestIncompletedAssignmentID)} // set inital scroll to earliest incompleted assignment
          contentContainerStyle = {styles.scrollAssignments} // style
          showsVerticalScrollIndicator={false} // hide scroll bar
          snapToInterval={(windowHeight * 0.1 + distanceBetweenAssignmentButtons*2)}
          decelerationRate="fast"
          snapToAlignment='start' // trying to make it snap in groups of three, with the next assignment just barely visible
          inverted // makes sure first assignment is at the bottom

          // render the flatlist buttons
          renderItem={({item, index})=> {
            const isEarliestIncomplete = item.id === earliestIncompletedAssignmentID

            return (
              <Pressable onPress={() => openAssignmentInfo(item)}
              style={[
                styles.assignmentButton,
                index % 2 === 0 ? styles.leftAlignButton : styles.rightAlignButton, // staggers buttons left and right
              ]}
            >
              
              {item.id === earliestIncompletedAssignmentID && (
                <Image 
                  source={require('../../../frontend/assets/images/player.png')}
                  style = {{width: (windowWidth/3), height: (windowWidth/3), position: 'absolute', marginBottom: (windowWidth/7),}}
                  />
              )} {/* IF button is the earliest incompleted assignment, but lil player icon on it */}

              <Text numberOfLines={2} style={[styles.buttonTitle, { fontWeight: "bold"}, ]}>
                {item.title}
              </Text>
              <Text style={styles.buttonDate}>
                {item.date}
              </Text>
              
            </Pressable>
            );
          }}
        />
      </Animated.View> {/* trying to animate this :sob: */}

          {/* Assignment info box that pops up. ONLY visible when isInfoVisable (button clicked) */}
      {isInfoVisible && (
      <View style={styles.infoBox}>
        <Pressable style={styles.closeButton} onPress={closeAssignmentInfo}>
          <FontAwesome6 size={24} name="window-close" color="gray"/>
        </Pressable>

        <ScrollView>
          <Text style={styles.infoTitle}>{selectedAssignment?.title}</Text>
          <Text style={styles.infoDate}>{selectedAssignment?.date}</Text>
          <Text style={styles.infoText}>{selectedAssignment?.info}</Text>
        </ScrollView>
      </View>
    )}

      <View style={styles.standInForProgressBar}>
        <ThemedText>
          stand in for progress bar
        </ThemedText>
      </View>

    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  standInForProgressBar: {
    width: windowWidth*0.95,
    height: windowHeight * 0.055,
    backgroundColor: '#ffffffff',
    top: windowHeight * 0.688,
    alignSelf: 'center',
    borderBottomWidth: 10,
    borderColor: '#AEDF0D',
    zIndex: 4,
  },

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
    top: (windowHeight / 2.3),
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
    marginVertical: distanceBetweenAssignmentButtons,
    elevation: 8,
  },

  buttonTitle:{
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: (windowHeight*0.01),
  },

  buttonDate:{
    textAlign: 'center',
    fontSize: 15,
  },

  leftAlignButton: {
    alignSelf: 'flex-start',
    marginLeft: windowWidth * 0.4,
  },

  rightAlignButton: {
    alignSelf: 'flex-end',
    marginRight: windowWidth * 0.4,
  },

  // snap interval: windowHeight * 0.1 + 40 (button height + marginVertical*2)

  // control padding, alignment of the scrollable assignment buttons
  scrollAssignments: {
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 430,
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
  },

  // this group manages the assignment info box that pops up
  infoBox: {
    position: 'absolute',
    top: windowHeight*0.17,
    width: windowWidth*0.95,
    height: windowHeight*0.5,
    backgroundColor: 'white',
    padding: 20,
    zIndex: 1,
    elevation: 10,
    alignSelf: 'center',
    borderRadius: 20,
  },

  // exit button
  closeButton:{
    borderRadius: (windowWidth*0.02),
    alignSelf: 'flex-end',
    marginRight: (windowWidth*0.05),
    position: 'absolute',
    padding: (windowWidth*0.02),
    margin: (windowWidth*0.02),
    backgroundColor: 'lightgray',
    top: (windowHeight*0.015),
    alignContent: 'center',
    zIndex: 2,
  },

  // various text settings
  infoTitle: {
    fontSize:20,
    fontWeight: 'bold',
  },

  infoDate: {
    fontSize:14,
    fontWeight: 'bold',
  },

  infoText: {
    marginTop: 10,
    fontSize:14,
  },
});
