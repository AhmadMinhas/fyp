import React, { PropTypes, Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,View
} from "react-native";
import { NavigationEvents } from 'react-navigation';
import * as Icon from "@expo/vector-icons";
import { Divider,Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Octicons'
import Icon4 from 'react-native-vector-icons/Ionicons'
import Setings from "./Setings"

//Entypo,FontAwesome5,Octicons, AntDesign, MaterialIcons,MaterialCommunityIcons
const { width } = Dimensions.get("window");


class Home extends Component {
  static navigationOptions = ({ navigation }) => {
return{
  title:"Menu",
    headerRight: (

      <TouchableOpacity style={{  backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
      <Icon.AntDesign  size={20} name="setting" color="white"/>
    </TouchableOpacity>
    
    )
}
  };

 
 
  

  render() {
    const {navigation} = this.props;
    
   

    return (
      <Block style={styles.Container}>
          <Block flex={false}  center style={styles.header}>
          <Text style={{ color: "#37556e",  fontFamily:"alpha_echo"}} center h1>
            Learn, Earn and Socialize
          </Text>
         
        </Block>


        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
        
          <Block flex={false} row space="between" style={styles.categories}>
           
              <TouchableOpacity onPress={() => navigation.navigate("NotesSharing")}>
              
              <Card center middle shadow color="#4400aa" style={styles.category} >
             
              <Icon1 style={styles.icon}
              name="open-book"
              size={55}
              color="#eee6ff"
              />
              <Text h4 style={styles.text} >
              Notes Sharing
            </Text>
         
                </Card>
               
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("choosehostel")}>
              
              <Card center middle shadow color="#4400aa" style={styles.category} >
             

              <Icon1 style={styles.icon}
              name="home"
               size={55}
              color="#eee6ff"
              />
                  <Text  h4 style={styles.text} >
                    Hostels
                  </Text>
               
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("ChooseTutor")}>
              
              <Card center middle shadow color="#4400aa" style={styles.category} >
           

              <Icon3 style={styles.icon}
              name="user-edit"
               size={55}
              color="#eee6ff"
              />
                  <Text h4 style={styles.text} >
                    Tutors
                  </Text>
               
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("carp")}>
              <Card center middle color="#4400aa" shadow style={styles.category} >
              

              <Icon3 style={styles.icon}
              name="car"
               size={55}
              color="#eee6ff"
              />
                  <Text h4 style={styles.text} >
                    Carpooling
                  </Text>
             
                </Card>
              </TouchableOpacity>

              <TouchableOpacity  onPress={() => navigation.navigate("discuss")}>
              <Card center middle color="#4400aa" shadow style={styles.category}> 
             
              <Icon2 style={styles.icon}
              name="comment-discussion"
               size={55}
              color="#eee6ff"
              />
                  <Text h4 style={styles.text} >
                    Discussion forum
                  </Text>
       
                </Card>
                
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => navigation.navigate("MyPosts")}>
              <Card center middle color="#4400aa" shadow style={styles.category}> 
             
              <Icon3 style={styles.icon}
               name="folder"
               size={55}
              color="#eee6ff"
              />
                  <Text h4 style={styles.text} >
                    My Folder
                  </Text>
       
                </Card>
                
              </TouchableOpacity>


            </Block>

            
            
        </ScrollView>
        <Setings navigation={this.props.navigation}/>
      </Block>
      
    );
  }
}



export default Home;

const styles = StyleSheet.create({
  header: {
    marginTop:"10%",
    paddingHorizontal: theme.sizes.base ,
   
  },
  footerContainer:{
    backgroundColor:"#220066",
  },

  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },

  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3
  },
  category: {
    minWidth: (width - theme.sizes.padding * 2.7 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.7 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 0.1 - theme.sizes.base) / 2
  },
  icon:{
    justifyContent:"center",
    textAlign:"center",
    padding: 8
    

  },
  text:{
    justifyContent:"center",
    textAlign:"center",
    padding:3,
    color:"white",
    fontFamily:"OpenSans-Bold"
  },
  Container:{
    backgroundColor:"#e6e6ff"
  },
});
