import React, { Component } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,Image, Alert,
  Picker, TouchableOpacity,Linking
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { Card2, Block, Text } from "../components";
import { theme, mocks } from "../constants";

const { width } = Dimensions.get("window");
import Setings from "./Setings"

class downloadingnotes extends Component {
  static navigationOptions = ({ navigation }) => {
    return{
		title:"Notes",
        headerRight: (
    
          <TouchableOpacity style={{	backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };

  state = {
    link: "",
    categories: [],
    data : [],
    selectedcat: "",
    dep: "",
    sem: "",
   
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
        loc: "Fundamentals of Computer Programming"
      },
      {
        loc: "Mathematics"
      },
    ],
  };
  async handlenotedown(){
    let user = await AsyncStorage.getItem('token');
  }
  _onPressDel(postid) {
    Alert.alert(
      "",
      "Are you sure you want to delete the post?",
      [
        {
          text: "Yes",
          onPress: () => { fetch(
            'http://192.168.0.14:5000/auth/delete_my_notes', {
            method: 'DELETE',
            headers: { Accept: 'application/json',
             'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user },
            body : JSON.stringify({
              post_id : postid
            }) 
          }).then((response)=>response.json())
            .then(data => {
            console.log('Success:', data);
            this.FetchCall();
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
  _onPressdownload(notes_id) {
    Alert.alert(
      "",
      "Do you want to download these notes?",
      [
        { text: "YES", onPress: () => { Linking.openURL(`http://192.168.0.14:5000/auth/download/${notes_id}`)
          
      } },
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }, 
        
      ],
      { cancelable: false }
    );
  }

FetchCall=()=>{
  const { navigation } = this.props;  
  const dep = this.props.navigation.getParam('department')
  console.log(dep)
  const sem = this.props.navigation.getParam('semester')  
  console.log(sem)
  fetch(`http://192.168.0.14:5000/auth/search_notes/${sem}/${dep}`,{
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .then(json => this.setState({data : json}))
}

  componentDidMount() {
   
  
    this.FetchCall()
    this.setState({ categories: this.props.categories });
  }

  async onValueChangeCat(value) {
    this.setState({ selectedcat: value });
  }

  render() {
    const { categories } = this.state;

    return (
      <Block style={styles.container} >
        
          <Text center h1 bold>
            Notes available
          </Text>

          
          <View style={{marginLeft:50,marginRight:50}}>
              {/* <Text  style={{ color:"gray" }}>
              Subjects
              </Text>
              
    
        <Picker style={{marginBottom:8}}
          mode="dropdown"
          selectedValue={this.state.selectedcat}
          onValueChange={this.onValueChangeCat.bind(this)}
        >
          {this.state.Subjects.map((loca, index1) => (
            <Picker.Item key={index1}
              color="#b22222"
              label={loca.loc}
              value={loca.loc}
              index={index1}
            />
          ))}
        </Picker> */}
     
   
        </View> 

        <ScrollView 
          showsVerticalScrollIndicator={false}
        >
          <Block style={styles.categories} margin={[10,0]}>
          {this.state.data.map((category,i4) =>{
            const reg=/^\d+$/
            if(reg.test(category.NotesId))
            { 
              return(
            <Card2  middle shadow style={styles.card} key={i4}>

		
	   <Block flex={false} row   >
         
        
              <Image style={styles.avatar} source={category.image} />
               <Block> 
              <Text h3 bold medium >
              {category.email}
            </Text>
            <Text caption  gray height={12}>
             {category.username} 
           </Text>
            </Block> 
            </Block>

              <Text medium height={20}>
               Department: {category.department}
              </Text>
              <Text  medium height={20}>
               Subject: {category.subject} 
              </Text>
              <Text  medium height={20}>
              Semester: {category.semester} 
             </Text>
             
              <Text  medium height={20}>
               Description: {category.description} 
              </Text>
              <Text  caption gray>
              Posted at: {category.datetime} 
             </Text>
             <View style={styles.alternativeLayoutButtonContainer}>
             <TouchableOpacity  onPress={() => this._onPressdownload(category.NotesId)}  >
                <Icon.Ionicons size={25} name="md-download" color={theme.colors.accent}/>
                </TouchableOpacity>
                <TouchableOpacity right onPress={() =>this._onPressDel(category.NotesId)}   >
             <Icon.MaterialCommunityIcons size={25} name="delete" color={theme.colors.accent} />
              </TouchableOpacity>   
                </View>
         
          
            </Card2>
            )}
            else return <View style={{justifyContent:"center"}} key={i4}><Text style={{textAlign:"center"}}>No Post Available</Text></View>
          })}
          </Block>
        </ScrollView>
        <Setings navigation={this.props.navigation} style1={{backgroundColor:"blue"}}/>
      </Block>
    );
  }
}
downloadingnotes.defaultProps = {
  categories: mocks.categories
};


export default downloadingnotes;

const styles = StyleSheet.create(
  {
  container:{backgroundColor:"#f5f5f5"
  },
  sp:
  {
    marginRight:15
  },
   space:
   {
     justifyContent:"space-between",
        flexDirection: 'row'
   },

  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  },
  card:{
    width:300
  },
  button:{
    width:70
  },
sp:{marginLeft:15},
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent:"flex-end"
   }
});