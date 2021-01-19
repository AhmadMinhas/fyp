import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  TextInput,
  Keyboard, Image,
  KeyboardAvoidingView,Alert,TouchableOpacity,Dimensions


} from "react-native";
import axios from "react-native-axios"
import { Button, Block, Text,Divider,Input } from "../components";
import * as DocumentPicker from 'expo-document-picker';
import { theme } from "../constants";
import Setings from "./Setings"
import * as Icon from "@expo/vector-icons";
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
class postnotes extends Component {

 static navigationOptions = ({ navigation }) => {
    return{
		title:"Share your Notes",
        headerRight: (
    
          <TouchableOpacity style={{	backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };

  async handlenotes(){
    let user = await AsyncStorage.getItem('token');
  }
  state = {
    semester:"1",
    selectedcat: "notdefiend",
    selectedcat1:"notdefiend",
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

    ],
    Subjects: [
        {
          loc: "English"
        },
        {
         loc:"Islamiyat"
        },
        {
          loc: "OOP"
        },
        {
          loc: "FCP"
        },
        {
          loc: "Mathematics"
        },
      ],
    notes:null,
    errors: [],
    loading: false,
      error:"2",
      filemessage:"",
      file : null
  };
   
  
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    const reg=/.pdf$/
    if(reg.test(result.name)){
    
      alert("you selected "+result.name,
      
     // { text: "OK", onPress: () =>  this.setState.filemessage="you selected "+result.name }
    );
    this.setState.error="0"
    this.setState.filemessage="you selected "+result.name;
    this.setState({file : result})
    console.log(result);
    
  }
    else{ 
      this.setState.error="1"
      this.setState.filemessage="";
      alert("please select a pdf file to proceed") 
      
    
  }
    
}


  _onPressButtonpost() {
    const { notes} = this.state;
    const errors = [];
    Keyboard.dismiss();
    this.setState({ loading: true });

    if (!notes) errors.push("notes");
    this.setState({ errors, loading:false });
    if(this.setState.error==="0"){
      if (!errors.length) {
        let data = {department: this.state.selectedcat,
         subject: this.state.selectedcat1,
         semester: this.state.semester,
         description: this.state.notes ,          
          }
        var formdata = new FormData();
      
        formdata.append( 'department', this.state.selectedcat);
        formdata.append( 'subject', this.state.selectedcat1);
        formdata.append( 'semester', this.state.semester);
        formdata.append( 'description', this.state.notes);
        formdata.append('file', {
          uri: this.state.file.uri ,
         type: 'text/pdf', 
         name: this.state.file.name,
       });
       console.log(formdata)

        console.log("DATA", formdata);
       axios({
         url    : 'http://192.168.0.14:5000/auth/add_notes',
          method : 'POST',
          data   : formdata,
          headers: {
                       'Authorization': 'Bearer ' + user
                   },
                   body : formdata
               })
               .then(function (response) {
                 console.log(response);
                       return response;
              })
              .catch(function (error) {
                       console.log("error from image :");
                       throw error;
              })
        Alert.alert(
          "",
          "Notes posted",
          [
            {
              text: "OK",
              onPress: () =>  {this.setState.filemessage=" ", this.setState({ notes: "" }),this.setState({selectedcat1:"English"}),this.setState({ selectedcat: "BBA" }),this.setState({ semester: "1" });}
               
            }
            
          ],
        );
      } else {
        Alert.alert("",'Please fill in the description box');
      }
    } else {
       Alert.alert("",'please choose file');
      }
  }

 

  async onValueChangeCat(value) {
    this.setState({ selectedcat: value });
  }

  async onValueChangeCat1(value) {
    this.setState({ selectedcat1: value });
  }
  async onValueChange(value) {
    this.setState({ semester: value });
  }



  
  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrorsn = key => (errors.includes(key) ? styles.hasErrorsn : null);
    return (
      <Block style={styles.Container} flex={1}>  
  
<Block center>
      <TouchableOpacity style={{width:"92%",alignItems:"flex-end",}} gradient onPress={() => this.props.navigation.navigate("notesposted")}>
      <Icon.FontAwesome5 name="folder" color="blue" size={40} style={{  marginLeft:width/40,marginTop:"3%", }}/>
    <Text  h3 style={{textAlign: 'center',color:"#220066" }}>My notes</Text>
    </TouchableOpacity>
      
    
            </Block>
			
          <ScrollView style={{marginTop:height/8}}>
           <Block margin={[0, 50]}>
               
           <Block center row margin={[10, 0]}>
                     <Block justifyContent="space-between" row >
                    <Text  style={{ color:"gray" }}>
                     Department
                    </Text>
                    <View style={styles.viewStyle}>
           <View style={{
                 
              backgroundColor: '#e6f5ff',
             height:40,
              width: 120,
              borderWidth:2,
              borderRadius:5,
              borderColor:"gray"
            }}>
              <Picker
                mode="dropdown"
                selectedValue={this.state.selectedcat}
                onValueChange={this.onValueChangeCat.bind(this)}
              >
                {this.state.Department.map((loca, ind) => (
                  <Picker.Item key={ind}
                  color="#000066"
                    label={loca.loc}
                    value={loca.loc}
                    index={ind}
                  />
                ))}
              </Picker>
            </View>
          </View>
                  </Block>
                </Block>
    
                <Block center row margin={[10, 0]}>
                   <Block justifyContent="space-between" row >
                    <Text  style={{ marginBottom: 5,color:"gray" }}>
                      Semester
                    </Text>
                    
                  <View style={{
                 
                      backgroundColor: '#e6f5ff',
                      height:40,
                       borderWidth:2,
                       borderRadius:5,
                       borderColor:"gray",
                      width: 120,
                    }}>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.semester}
                        onValueChange={this.onValueChange.bind(this)}
                      >
                        {this.state. Semester.map((loca1, i1) => (
                          <Picker.Item key={i1}
                             color="#000066"
                            backgroundColor="#f5f5f5"
                            label={loca1.loc}
                            value={loca1.loc}
                            index={i1} />
                        ))}
                      </Picker>
                    </View>
                  </Block>
                 
                </Block>

                <Block center row margin={[10, 0]}>
               <Block justifyContent="space-between" row >
                  <Text  style={{ marginBottom: 5,color:"gray" }}>
                    Subject
                  </Text>
                       <View style={{
                 
                    backgroundColor: '#e6f5ff',
             height:40,
              width: 120,
              borderWidth:2,
              borderRadius:5,
              borderColor:"gray"
                  }}>
                    <Picker
                      mode="dropdown"
                      selectedValue={this.state.selectedcat1}
                      onValueChange={this.onValueChangeCat1.bind(this)}
                    >
                      {this.state.Subjects.map((loca1, i2) => (
                        <Picker.Item key={i2}
                         color="#000066"
                     
                          label={loca1.loc}
                          value={loca1.loc}
                          index={i2} />
                      ))}
                    </Picker>
                  </View>
                
                </Block>
               
              </Block>
              <Block  margin={[10, 0]}>
              <KeyboardAvoidingView style={{flex:1}} enabledKeyboardOffset={30}>
              <Block style={styles.Container}>
              <ScrollView >
              
              <View style={styles.formcontainer}>
         
    
              <Input
              notes
              label="Description of notes"
              error={hasErrorsn("notes")}
              style={[styles.input, hasErrorsn("notes")]}
              defaultValue={this.state.notes}
              onChangeText={text => this.setState({ notes: text })}
            />
           
            </View>
            </ScrollView>
              </Block>
              <View>
              <TouchableOpacity  onPress={this._pickDocument}>
              <Block flex={false} row style={{justifyContent:"center",}} >
              <Icon.Feather style={{marginRight:"3%"}} name="upload" size={20} color="blue" />
              <Text h2 center style={{color:"blue"}}>
                Choose file
              </Text>
  </Block>
            </TouchableOpacity>   
            <Text h4 center style={{color:"blue"}}>{this.setState.filemessage}</Text>
            </View>
              </KeyboardAvoidingView>
              </Block>
              
              </Block>
             
             
               
              <Block center bottom  style={{marginTop:height/24}}>
              <Button style={styles.button} gradient onPress= {() => this._onPressButtonpost(this.props.navigation)} >
                <Text center semibold white>
                 Post Notes
                </Text>
              </Button>
            </Block>
  
              </ScrollView>
				<Setings  navigation={this.props.navigation} style1={{backgroundColor:"blue"}}/>
              </Block>
              
  
        
     
      
    );
  }
}



export default  postnotes;

const styles = StyleSheet.create({
   Container: {
      backgroundColor:"#e6f5ff"
    },
    formcontainer:{
      width:"100%",
      marginTop:5,
      marginBottom:height/25
      
   },
   hasErrorsn: {
    borderBottomColor: theme.colors.accent
  },
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
  
   },
   input:{
    paddingHorizontal:3,
    paddingVertical:2,
    backgroundColor:"#e6f5ff",
    height:80,
    fontSize:14,
    borderColor:"gray",
    borderWidth:2,
    marginVertical:2,
    color:"white",
    marginTop:7,
    marginLeft:0,
    color:"black",
   
},

    button:
    {
      width:110
    },
    buttonh:
    {
      width:390
    },
    Container:{
      backgroundColor:"#e6f5ff"
    },
    text:{
      justifyContent: "center"
    }
  });
