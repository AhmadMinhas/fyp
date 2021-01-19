import React, { Component } from "react";
import { StyleSheet, ScrollView, TextInput,TouchableOpacity, Alert, Picker,Image,View,Modal,TouchableWithoutFeedback } from "react-native";
import { Divider, Block, Text, Switch,Input,Button } from "../components";
import { theme, mocks } from "../constants";
import {ImageBrowser} from "../components";

import axios from "react-native-axios"
import * as Icon from "@expo/vector-icons";


class Settings extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
      title:"Settings",
        headerRight: (
    
          <TouchableOpacity style={{  backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };
  state = {
    notifications: true,
    editing: null,
    profile: {},
    newpassword:{},
    newSem: {},
    newuser:{},
    photos:[]
    ,show:false,
    imageUri:"http://192.168.0.14:5000/auth/get_picture/1",
    imageBrowserOpen:false,
    selectedcat1:"",
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
  async handlemsetting(){
    let user = await AsyncStorage.getItem('token');
  }
  async onValueChangeCat1(value) {
    this.setState({ newSem: value });
  }

 imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      console.log(photos)
      this.setState({
        imageBrowserOpen: false,
        photos,
      })
      const formData = new FormData();
formData.append("imagefile", {
 uri:  photos[0].uri,
type: 'image/jpeg', 
name: 'photo.jpeg',
});
    console.log(formData,"oooooo")
axios({
url    : 'http://192.168.0.14:5000/auth/upload_pic',
method : 'POST',
data   : formData,
headers: {
     // 'Accept': 'application/json',
     // 'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + user
  }
})
.then(function (response) {
      console.log("response :", response);
})
.catch(function (error) {
      console.log("error from image :");
})
    }).catch((e) => console.log(e))
  }

  renderImage(item, i) {
    return(
      <Image 
     
        source={{uri: item.file}}
        key={i}
        style={styles.avatar}
      />
    )
  }
  FetchCall=()=>{
   fetch('http://192.168.0.14:5000/auth/my_profile', {
    method: 'GET',
    headers: { Accept: 'application/json',
     'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user }
  })
  .then((response) => (response.json()))
  .then(json => this.setState({ profile: json}))
  //
  }
  
  

  
  componentDidMount() {
    this.FetchCall()
    this.setState({newSem:""})
  }
  //for giving raw values

  //handleEdit(name, text) {
    //const { profile } = this.state;
    //profile[name] = text;

   // this.setState({ profile });
 // }

 // toggleEdit(name) {
  //  const { editing } = this.state;
  //  this.setState({ editing: !editing ? name : null });
 // }
 

  renderEdit(name) { //"username.."
    const { profile, editing } = this.state;

    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile.name}
          onChangeText={text => this.handleEdit([name], text)}
        />
      );
    }

    return <Text bold>{profile.name}</Text>;
  }
  renderSem(semester) { //"semester"
  const { profile, editing } = this.state;

  if (editing === semester) {
    return (
      <TextInput
        defaultValue={profile.semester}
        onChangeText={text => this.handleEdit([semester], text)}
      />
    );
  }

  return <Text bold>{profile.semester}</Text>;
}
renderPassword(pass) { //"semester"
const { profile, editing } = this.state;

if (editing === pass) {
  return (
    <TextInput
      onChangeText={text => this.handleEdit([pass], text)}
    />
  );
}

return <Text bold>{profile.semester}</Text>;
}

  _onPressButtonlogout() {
    Alert.alert(
      "",
      "Are you sure you want to logout?",
      [
        {
          text: "Yes",
          onPress: () =>  this.props.navigation.navigate("Login"),
          
        },
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        
      ],
      { cancelable: false }
        
      
    );
  }
  _onPressButtonPass() {
    Alert.alert(
      "",
      "Are you sure you want to update your current password with this( "+ this.state.newpassword+") ?",
      [
        {
          text: "Yes",
          onPress: () =>  fetch('http://192.168.0.14:5000/auth/update_password', {
            method: 'POST',
            headers: { Accept: 'application/json',
             'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user },
            body : JSON.stringify({
              password : this.state.newpassword
            })
          })
          
        },
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        
      ],
      { cancelable: false }
        
      
    );
  }

  _onPressButtonUpdate() {
    Alert.alert(
      "",
      "Are you sure you want to update semester?",
      [
        {
          text: "Yes",
          onPress: () => { fetch('http://192.168.0.14:5000/auth/update_semester', {
            method: 'POST',
            headers: { Accept: 'application/json',
             'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user },
            body : JSON.stringify({
              semester : this.state.newSem
            })
          }).then((response)=>response.json())
          .then(data => {
          console.log('Success:', data);
          this.FetchCall();
          this.setState({newSem:""})
          })
          .catch((error) => {
          console.error('Error:', error);
          });
         
          }
        },
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        
      ],
      { cancelable: false }
        
      
    );
  }

  render() {
    const { editing } = this.state;
if (this.state.imageBrowserOpen) {
      return(<ImageBrowser max={1} callback={this.imageBrowserCallback}/>);
    }
    const onPressHandler = () => { //Bind to "this" with the lambda
    this.setState({imageBrowserOpen:true,imageUri:this.state.profile.image})
  }
    return (
      <Block style={styles.Container}>
        <Block flex={false} row center space="between" style={styles.header}>

 <Text center h1 bold>
 {this.state.profile.name}
          </Text>
                   {
            this.state.photos.length === 0  ?
            <View>
            <TouchableOpacity 
            onPress={()=>{
              Alert.alert(
              '',
              'What do you want to do?',
              [
                
                { text: 'Change Photo', onPress: onPressHandler },
                {
                  text: "View Photo",
                  onPress: () => { this.setState({show:true}) }
                  
                },
                
              ],
              { cancelable: false }
                
              
             
            ) }}

           ><Image style= {styles.avatar} source={{uri: this.state.profile.image}}/></TouchableOpacity>
            <Text caption>Change photo</Text>

            </View>
            :
           
            <View>
            <TouchableOpacity  
            onPress={()=>{
              Alert.alert(
              '',
              'What do you want to do?',
              [
                
                { text: 'Change Photo', onPress: onPressHandler },
                {
                  text: "View Photo",
                  onPress: () => console.log(this.state.imageUri,"Cancel Pressed"),
                  style: "cancel"
                },
                
              ],
              { cancelable: false }
                
              
             
            ) }}>
            {this.state.photos.map((item,i) => this.renderImage(item,i))}</TouchableOpacity>
            </View>
        }
          
        <Modal visible={this.state.show} transparent>
        <TouchableWithoutFeedback onPress={() => {this.setState({show:!this.state.show})}}>
          <View style={styles.modal}>
            <View style={styles.modalInner}><Image source={{uri: this.state.profile.image}} style={{width:"100%",height:"60%"}}/>
            </View></View>
            </TouchableWithoutFeedback>
            </Modal>
         
        </Block>

        <ScrollView>
          <Block style={styles.inputs}>
            <Block margin={[10, 0]} >
             
                <Text  style={{ marginBottom: 10,color:"gray" }}>
                  University email address
                </Text>
                
                    <Text  >
                      {this.state.profile.email}
                    </Text>
              
             
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text  style={{ marginBottom: 10,color:"gray" }}>
                  Username
                </Text>
              {this.renderEdit(this.state.profile.name)}
              </Block>
            
            </Block>
 
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text  style={{ marginBottom: 10,color:"gray" }}>
                Semester
              </Text>
              {this.renderSem(this.state.profile.semester)}

                 
            <Input
            label="Semester"
            //error={hasErrors("semester")}
            keyboardType="phone-pad"
            maxlength="1"
            style={styles.input}
            defaultValue={this.state.newSem}
            onChangeText={text => this.setState({newSem: text })}
          />
             
    
              <TouchableOpacity style={styles.button} color="#f5f5f5"  onPress= {() =>this._onPressButtonUpdate()} > 
              <Text style={{color:"gray"}}>
                Update Semester
              </Text>
            </TouchableOpacity>
              
            </Block>
        
          </Block>

            
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
          <Block>
            <Text style={{ marginBottom: 10 ,color:"gray"}}>
              Password
            </Text>
            <TextInput
              placeholder="type new password here..."
              onChangeText={text => this.setState({ newpassword: text })}
             // {...console.log(this.state.newpassword)}
              />
                  <TouchableOpacity style={styles.button} color="#f5f5f5"  onPress= {() =>{if (Object.keys(this.state.newpassword).length < 8){Alert.alert("Cannot set password empty or less then 8 digits!")}else {this._onPressButtonPass()}}} > 
              <Text style={{color:"gray"}}>
                Update Password
              </Text>
            </TouchableOpacity>

          </Block>
        </Block>

          </Block>


          <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />

          
          <Block style={styles.toggles}>
            <Block
              row
              center
              space="between" //space between text and switch
              style={{ marginBottom: theme.sizes.base * 1.5 }}
            >
              <Text style={{color:"gray"}}>Notifications</Text>
              <Switch
                value={this.state.notifications}
                onValueChange={value => this.setState({ notifications: value })}
              />
            </Block>
          </Block>
<View>
          <Button gradient onPress= {() => this._onPressButtonlogout(this.props.navigation)} > 
              <Text h2 style={{color:"white",textAlign:"center"}}>
                Logout                                                                                                                                                                                                                                                                                                                                              
              </Text>
            </Button>
            </View>
        </ScrollView>
      </Block>
    );
  }
}

//Settings.defaultProps = {
  //profile: mocks.profile
//};

export default Settings;

const styles = StyleSheet.create( {
   header: {
    paddingHorizontal: theme.sizes.base * 2,
    marginTop:"10%"
  },
 
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  inputRow: {
    alignItems: "flex-end"
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },

avatar:{
    height: theme.sizes.base * 4,
    width: theme.sizes.base * 4,
    borderRadius: theme.sizes.radius*5,
    backgroundColor:"#f5f5f5",
    justifyContent:"center"
  },
  button: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  Container:{
    backgroundColor:"#f5f5f5",
  flex:1},
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalInner: {
    marginVertical: 0,
    width: '90%',
    backgroundColor: '#FFFFFF',
    elevation: 5,
  },
});
