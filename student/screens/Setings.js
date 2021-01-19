import React from "react";
import { Text ,View,StyleSheet} from "react-native";
import { Footer, FooterTab, Button as But}  from "native-base";
import * as Icon from "@expo/vector-icons";
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Octicons'
import Icon4 from 'react-native-vector-icons/Ionicons'
 class Setings extends React.Component { 

	
	//tab bar items
	render() {
	const {navigation}=this.props;
	return (
    <HideWithKeyboard>
		<Footer>

        <FooterTab style={{
          
          backgroundColor:"#220066",
    
         
        }} >
  
        
                
               

              <But style={{...this.props.style1}} onPress={() => this.props.navigation.navigate("NotesSharing")} >
                <Icon1  size={20} name="open-book" color="#eee6ff"/>
                <Text style={styles.color1}>Notes</Text>
              </But>
              <But style={{...this.props.style2}}  onPress={() => navigation.navigate("choosehostel")} >
              <Icon1 size={20} name="home" color="#eee6ff"/>
              <Text style={styles.color1}>Hostels</Text>
            </But>
            <But style={{...this.props.style3}}  onPress={() => navigation.navigate("carp")} >
            <Icon.FontAwesome5  size={20} name="car" color="#eee6ff"/>
            <Text style={styles.color1}>Carpool</Text>
          </But>
          <But style={{...this.props.style4}}  onPress={() => navigation.navigate("ChooseTutor")} >
          <Icon3  size={20} name="user-edit" color="#eee6ff"/>
          <Text style={styles.color1}>Tutor</Text>
        </But>
        <But  style={{...this.props.style5}} onPress={() => navigation.navigate("discuss")} >
        <Icon2  size={20} name="comment-discussion" color="#eee6ff"/>
        <Text style={styles.color1}>Discuss</Text>
      </But>
     
  
  

        </FooterTab>
      </Footer>
      </HideWithKeyboard> 
      
	);
}
}
export default Setings;
const styles=StyleSheet.create({
  color1:{
    color:"#eee6ff"
  }
})