import * as React from 'react';
import { Image, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';

// Import styling and components
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';
import { TextH1, TextParagraph } from "../components/StyledText";


export default function HomeScreen(props) {

  // State management
  const [isLogoColour, setIsLogoColour] = React.useState(true)
  
  // Toggle the value of isLogoColour (true/false)
  function toggleLogo(){
    setIsLogoColour(!isLogoColour)
  }


  function showHelp() {
    props.navigation.replace('Root', {screen: 'Help'});
  }

  function showViewPeople() {
    props.navigation.replace('Root', {screen: 'People'});
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
        
        {/* Logo */}
        <View style={Styles.homeLogoContainer}>
          <Pressable onPress={toggleLogo}>
          <Image
            // Condition ? true : false
            source={isLogoColour 
              ? require("../assets/images/roi-logo.jpg") 
              : require("../assets/images/roi-logo-monochrome.jpg")
            } 
            style={Styles.homeLogo}
          />
          </Pressable>
        </View>
        {/* Heading */}

        <View style={Styles.homeHeadingContainer}>
          <Text style={Styles.homeHeading}>ROI HR Management System</Text>
        </View>
        
        
        {/* Buttons */}
        
        <View style={Styles.homeButtonContainer}>
          <MyButton
            text="View people"
            type="major"    // default*|major|minor
            size="large"      // small|medium*|large
            onPress={showViewPeople}
            buttonStyle={Styles.homeButton}
          />
          <MyButton
            text="Help"
            type="default"    // default*|major|minor
            size="large"      // small|medium*|large
            onPress={showHelp}
            buttonStyle={Styles.homeButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}