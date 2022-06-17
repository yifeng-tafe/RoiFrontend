import * as React from 'react';
import { Image, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';

// Import styling and components
import { TextParagraph, TextH1, TextH2, TextH3, TextListItem } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import Colours from '../constants/Colours';
import { MyButton } from '../components/MyButton';

export default function HelpScreen(props) {

  // State management

  // Create state variable for the font size (defualt to the value set in the Settings.js file)
  // const [variableName, setVariableName] = React.useState("default")
  const[fontSizeModifier, setFontSizeModifier] = React.useState(Settings.fontSizeModifier)

  // changeFontSize(-0.1)
  function changeFontSize(sizeModifier){

    //TODO: validate the font size (e.. not negative)
    
    // Update the global settings value
    Settings.fontSizeModifier += sizeModifier

    // Update the state variable to re-render the screen (update the UI)
    setFontSizeModifier(Settings.fontSizeModifier)
  }
  
  
  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>

        <View>
          
          <TextH1 style={{marginTop:0}}>Help topics</TextH1>

          <TextH2>Change settings</TextH2>

          <TextParagraph>Here are some basic settings to chage to make the app more comfortable</TextParagraph>
          
          <TextH3>Font size</TextH3>

          <View style={Styles.helpButtonContainer}>
            <MyButton
              text="- Smaller"
              type="default"     // default*|major|minor
              size="medium"      // small|medium*|large
              onPress={() => {changeFontSize(-0.1)}}
              buttonStyle={Styles.helpButton}
            />
            <MyButton
              text="+ Bigger"
              type="default"    // default*|major|minor
              size="medium"      // small|medium*|large
              onPress={() => {changeFontSize(+0.1)}}
              buttonStyle={Styles.helpButton}
            />
          </View>
          
          <TextH2>Sample content</TextH2>

          <TextParagraph>Here is some sample content for a help topic (or just any set of static text for the screen).</TextParagraph>

          <TextH2>Main tab navigation</TextH2>

          <TextParagraph>The main navigation bar is at the bottom of the app, and shows the major screens /functions.</TextParagraph>
          
          <TextParagraph>Each tab links to an important screen.</TextParagraph>

          <TextH3>Actions</TextH3>

          <TextListItem>Home - the landing page of the app.</TextListItem>
          <TextListItem>View People - list all the people.</TextListItem>
          <TextListItem>Add Person - add a new person.</TextListItem>
          <TextListItem>Help - view this help content.</TextListItem>

          <TextH2>Home Screen</TextH2>

          <TextParagraph>This is the landing page of the app, and provides some useful shortcuts.</TextParagraph>
          
          <TextH3>Actions</TextH3>

          <TextListItem>View People - list all the people.</TextListItem>
          <TextListItem>Help - view this help content.</TextListItem>

          <TextH2>Wanna go home?</TextH2>

          <Pressable onPress={() => props.navigation.replace('Root')}>
            <TextParagraph style={{marginVertical: 10, color: Colours.tabLabelSelected}}>Click here to go home...</TextParagraph>
          </Pressable>

          <TextH2>Need more help?</TextH2>

          <TextParagraph>If you are needing more help with using the app, please get in contact with our support staff.</TextParagraph>

          <TextH3>Contact information:</TextH3>

          <TextListItem>Email: help@roi.com.au</TextListItem>
          <TextListItem>Phone: 1300 ROI ROI</TextListItem>
          <TextListItem>Mail: seriously???</TextListItem>
          
        </View>
        <View style={Styles.helpLogoContainer}>
          <Image
            // Condition ? true : false
            source={require("../assets/images/roi-logo.jpg") 
              
            } 
            style={Styles.helpLogo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}