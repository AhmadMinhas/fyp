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
  title:"My Folder",
    headerRight: (

      <TouchableOpacity style={{    backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
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
            Manage your posts here!
          </Text>
         
        </Block>


        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
        
          <Block flex={false} style={styles.categories}>
           
              <TouchableOpacity onPress={() => navigation.navigate("notesposted")}>
              
              <Card center middle shadow color="#4400aa" style={styles.category} >
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",}}>
              <Icon1 style={styles.icon}
              name="open-book"
              size={35}
              color="#eee6ff"
              />
              <Text h4 style={styles.text} >
              MY NOTES
            </Text>
         </View>
                </Card>
               
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("myhostelads")}>
              
              <Card center middle shadow color="#4400aa" style={styles.category} >
             
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",}}>
              <Icon1 style={styles.icon}
              name="home"
               size={35}
              color="#eee6ff"
              />
                  <Text  h4 style={styles.text} >
                    MY HOSTEL'S POST
                  </Text>
               </View>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("mytutorpost")}>
              
              <Card center middle shadow color="#4400aa" style={styles.category} >
           
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",}}>
              <Icon3 style={styles.icon}
              name="user-edit"
               size={35}
              color="#eee6ff"
              />
                  <Text h4 style={styles.text} >
                    My TUTOR'S POST
                  </Text>
               </View>
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
    minWidth: (width - theme.sizes.padding * 2.7 - theme.sizes.base) / 0.94,
    maxWidth: (width - theme.sizes.padding * 2.7 - theme.sizes.base) / 0.94,
    maxHeight: (width - theme.sizes.padding * 0.1 - theme.sizes.base) / 0.9
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
