import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";

// Import helper code
import Settings from '../constants/Settings';
import { RoiGetPeople, RoiDeletePerson, RoiAddPerson, RoiGetDepartments, RoiUpdatePerson, RoiGetPerson } from '../utils/Api';
import { PopupOk, PopupOkCancel } from "../utils/Popup";

// Import styling and components
import { TextParagraph, TextH1 } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';


export default function ViewPeopleScreen(props) {

  // State - data for this componet

  // Data array, default to empty array
  const [people, setPeople] = React.useState([])
  
  // Set "effect" to retrieve and store data - only run on mount/unmount (loaded/unloaded)
  // "effectful" code is something that triggers a UI re-render
  React.useEffect(refreshPersonList, [])


  // Refresh the person list data - call the API
  function refreshPersonList(){

    // Display flash message when therr's a connection issue
    displayConnectionMessage()
    
    // Cancel if no people to display
    if (!people) return

    // Get data from the API
    RoiGetPeople()
      // Success
      .then(data => {
        // Store results in state variable
        setPeople(data)
      })
      // Error
      .catch(error =>{
        PopupOk("API Error", "Could not get people from the server")
      })

    // Store results in state variable
    setPeople(people)

  }

  function showAddPerson() {
    props.navigation.replace("Root", {screen: "AddPerson"})

  }

  function showViewPerson(person) {

    // Navigate to ViewPerson and pass through the person's ID as a param
    props.navigation.navigate("ViewPerson", {id: person.id})
  }

  function showEditPerson(person) {

    // Navigate to EditPerson and pass through the person's ID as a param
    props.navigation.navigate("EditPerson", {id: person.id})
  }

  
  /**
   * Delete a person from the database.
   * @param {Person} person The person to delete. 
   */
  function deletePerson(person){

    // Check if person should be deleted (confirm with user)
    PopupOkCancel(

      // Title and message
      "Delete person?",
      `Are you sure you want to delete ${person.name}?`,
      
      // Ok - delete the person
      () => {
        
        // Delete the person using the API
        RoiDeletePerson(person.id)
          .then(data => {
            // Show confirmation that the person has bee deleted
            PopupOk("Person deleted", `${person.name} has been deleted.`)
            // Refresh the person list
            refreshPersonList()
        
        })
          .catch(error => {

            // Diplay error to user
            PopupOk("Error", error)
          })

        },  
      // Cancel - do nothing
      () => {}

      )
  }

  // Diplay flash message banner if offline
  function displayConnectionMessage(){

    // Get network connection status
    NetInfo.fetch().then(status => {

      // Check if not connected to the Internet
      if(!status.isConnected){

        // Display the flash message
        showMessage({
          message: "No internet connection",
          description: "You will only see cached data until you \nhave an active internet connection again.",
          type: "warning",
          duration: 4000,
          floating: true,
          icon: "warning",
          autoHide: true,

        })
      }
    })
  }
  
  // Display all people data
  function displayPeople(){

    // Cancel if no people to display
    if(!people) return

    // Loop through each item and turn into appropriate output and tehn return the result
    return people.map(p => {

      // Create an output view for each item
      return( 
        <View key={p.id} style={Styles.personListItem}>
          <View style={Styles.personListItemDetails}>
            <TextParagraph style={Styles.personListItemName}>{p.name}</TextParagraph>
            <TextParagraph style={Styles.personListItemText}>{p.department?.name ?? "---"}</TextParagraph>
            <TextParagraph style={Styles.personListItemText}>{p.phone}</TextParagraph>
          </View>
          <View style={Styles.personListItemButtons}>
            {/* buttons */}
            <MyButton 
              text = "Info"
              type="major"  // default*|major|minor
              size="small"  // small|medium*|large
              onPress={() => {showViewPerson(p)}}
              buttonStyle={Styles.personListItemButton}
              textStyle={Styles.personListItemButtonText}
              />
            <MyButton 
              text = "Edit"
              type="default"  // default*|major|minor
              size="small"  // small|medium*|large
              onPress={() => {showEditPerson(p)}}
              buttonStyle={Styles.personListItemButton}
              textStyle={Styles.personListItemButtonText}
              />
            <MyButton 
              text = "Delete"
              type="minor"  // default*|major|minor
              size="small"  // small|medium*|large
              onPress={() => {deletePerson(p)}}
              buttonStyle={Styles.personListItemButton}
              textStyle={Styles.personListItemButtonText}
            />
          </View>
          
        </View>
      )
    })
  
  }
  
  // Main output of the screen component
  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <View style={Styles.personButtonContainer}>
        <MyButton 
          text = "+Add new person"
          type="major"  // default*|major|minor
          size="small"  // small|medium*|large
          onPress={showAddPerson}
        />
        <MyButton 
        text = "Refresh"
        type="defualt"  // default*|major|minor
        size="small"  // small|medium*|large
        onPress={refreshPersonList}
        />
      </View>

      <ScrollView styel={Styles.container} contentContainerStyle={Styles.contentContainer}>
        
      <TextH1 style={{marginTop:0}}>Listing all people</TextH1>
        <View stype={Styles.personList}>
          {displayPeople()}

        </View>
      </ScrollView>


    </SafeAreaView>
  )
}