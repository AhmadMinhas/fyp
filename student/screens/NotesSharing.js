import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,TouchableOpacity,Dimensions
} from "react-native";

import { Button, Block, Text,Divider } from "../components";
import { theme } from "../constants";
import Setings from "./Setings"
import * as Icon from "@expo/vector-icons";
const width = Dimensions.get('window').width;
class notessharing extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
      title:"Notes Sharing",
        headerRight: (
    
          <TouchableOpacity style={{	backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };

  state = {
    selectedcat: "BBA",
    selectedcat1: "1",
    Department: [
      {
        loc: "BBA"
      },
      {
       loc:"Computer Science"
      },
      {
        loc: "Architecture"
      },
      {
        loc: "Physics"
      },
      {
        loc: "Mathematics"
      },
    ],
    Semester:[
      {
        loc: "1"
      },
      {
       loc:"2"
      },
      {
        loc: "3"
      },
      {
        loc: "4"
      },
      {
        loc: "5"
      },
      {
        loc: "6"
      },
      {
        loc: "7"
      },
      {
        loc: "8"
      }

    ]
  };

  async onValueChangeCat(value) {
    this.setState({ selectedcat: value });
  }

  async onValueChangeCat1(value) {
    this.setState({ selectedcat1: value });
  }

  render() {
    const { navigation } = this.props;


    return (
      <Block style={styles.Container}>
     
 <Block center >
        <View style={styles.alternativeLayoutButtonContainer}>
          <Text h1 bold style={{ marginTop:"3%", 
          borderRadius: 0,
          borderWidth: 0, 
          marginLeft:width/6,
         justifyContent:"center",
        
          borderBottomColor: theme.colors.bluish,
          borderBottomWidth: StyleSheet.hairlineWidth}}>
            Get your Notes now!
          </Text>
         
          <TouchableOpacity style={{
     marginLeft:width/15 ,marginTop:"2%"}}  onPress={() => navigation.navigate("postnotes")} >
            <Icon.AntDesign  size={40} name="addfile" color="blue"/>
          </TouchableOpacity>
          </View>
            </Block>
         

            <ScrollView>
           
              <Block margin={[0, 40]}>

               <Block center row margin={[0, 0]} style={{marginTop:100}}>
              <Block justifyContent="space-between" row >
                <Text style={{color:"gray" }} >
                  Semester
                </Text>
                <View >
               
                 <View style={{
                 
                  backgroundColor: '#e6f5ff',
                 height:30,
                  width: 80,
                }}>
                  <Picker
                    itemStyle={styles.pickerItem}
                    mode="dropdown"
                    selectedValue={this.state.selectedcat1}
                    onValueChange={this.onValueChangeCat1.bind(this)}
                  >
                    {this.state. Semester.map((loca1, i) => (
                      <Picker.Item key={i}
                         color="#000066"
                        backgroundColor="#e6f5ff"
                        label={loca1.loc}
                        value={loca1.loc}
                        index={i} />
                    ))}
                  </Picker>
                </View>
              </View>
              </Block>
             
            </Block>

                <Block center row margin={[20, 0]} >
                  <Block justifyContent="space-between" row >
                    <Text  style={{ color:"gray" }}>
                     Department
                    </Text>
                    <View >
            <View style={{
              
              backgroundColor: '#e6f5ff',
             height:30,
              width: 100,
            }} >
              <Picker
              mode="dropdown"
              selectedValue={this.state.selectedcat}
              onValueChange={this.onValueChangeCat.bind(this)}
              >
                {this.state.Department.map((loca, index) => (
                  <Picker.Item key={index} style={{fontSize:12}}
                    color="#000066"
                    label={loca.loc}
                    value={loca.loc}
                    index={index}
                  />
                ))}
            </Picker>
              </View>
            </View>
          
                  </Block>
                </Block>
    
                
                
              </Block>    
            </ScrollView>
        
        <Block center bottom flex={0.9} margin={[40, theme.sizes.padding * 1]}>
          <Button style={styles.button} gradient onPress={() => navigation.navigate("downloadingnotes", {department : this.state.selectedcat, semester : this.state.selectedcat1})}>
            <Text center semibold white>
             Get Notes
            </Text>
          </Button>
        </Block>
        <Setings navigation={this.props.navigation} style1={{backgroundColor:"blue"}}/>
      </Block>
      
    );
  }
}



export default notessharing;

const styles = StyleSheet.create({
    button:
    {
      width:90
    },
    buttonh:
    {
      width:390
    },
pickerItem: {
      height: 30
    },
    Container:{
         backgroundColor:"#e6f5ff"
    },
alternativeLayoutButtonContainer: {
      flexDirection: 'row',  width:"auto"
    
     },
    text:{
      justifyContent: "center"
    }

  });