import React, { Component } from "react";
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,Alert,Picker
} from "react-native";

import { Card, Badge, Button, Block, Text ,Divider} from "../components";
import { theme, mocks } from "../constants";
import * as Icon from "@expo/vector-icons";
import Setings from "./Setings"
const { width } = Dimensions.get("window");

class Browse extends Component {
static navigationOptions = ({ navigation }) => {
    return{
        headerRight: (
    
          <TouchableOpacity style={{	backgroundColor:"##00bfff"}}  onPress={() => navigation.navigate("Settings")} >
          <Icon.AntDesign  size={20} name="setting" color="white"/>
        </TouchableOpacity>
        
        )
    }
      };
  state = {
    active: "Products",
    tutors: [],
    
    selectedcat: "",
   
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

  async onValueChangeCat(value) {
    this.setState({ selectedcat: value });
  }



  componentDidMount() {

    fetch('http://192.168.0.14:5000/auth/all_tutors', {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
    })
    .then((response) => response.json())
    .then(json => this.setState({tutors : json}))
      if ('error' in this.state.tutors) {
        alert('No available notes');
      } 
  }

  



  render() {
    const { navigation } = this.props;

    return (
      <Block style={styles.container} >
           <Block center bottom flex={0.06} >
           
          <Text center h1 bold>
          Tutors For You
         </Text>
            
              </Block>
      
              <Block flex={0.05}>
              <Divider margin={[theme.sizes.base, 2 ]}/>
              </Block>
             
              
              <Block >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base  }}
        >
          <Block style={styles.categories}>
            {this.state.tutors.map((tutor,i7) => {
              const reg=/^\d+$/
              if(reg.test(tutor.tutor_id))
              { 
                return(
                <Card  middle shadow style={styles.card} key={i7}>
                 <View style={{flexDirection:'row'}}>
                 <Image style={styles.avatar} source={{uri: tutor.image}}/>
                 <View>
                <Text medium height={20}>
                   Name: {tutor.fullname}
                  </Text>
                  <Text  caption gray >
                  Posted at: {tutor.datetime} 
                 </Text> 
                 </View>
                  </View>
                  <Text  medium height={20}>
                   Department: {tutor.department} 
                  </Text>
                  <Text  medium height={20}>
                  Semester: {tutor.semester} 
                 </Text>
                 <Text selectable medium height={20}>
                 email: {tutor.email} 
                </Text>
                <Text selectable medium height={20}>
                Description: {tutor.description} 
               </Text> 
                 
                </Card>
                )
              }
                else return <Text key={i7}>No Post Available</Text>
              })}
          </Block>
        </ScrollView>
        </Block>
  <Setings  navigation={this.props.navigation} style4={{backgroundColor:"blue"}}/>
      </Block>
    );
  }
}

Browse.defaultProps = {
  tutors: mocks.tutors
};

export default Browse;

const styles = StyleSheet.create({
  
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  container:{backgroundColor:"#f5f5f5"},
  sp:{marginRight:15},
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent:"flex-end"
   },
   space:{justifyContent:"space-between",   flexDirection: 'row',},
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  },
  card:{
    width:300
  }, buttonh:{width:380, marginTop:0},
  button:{
    width:70
  },avatar:{
    height: theme.sizes.base * 2,
    width: theme.sizes.base * 2,
    borderRadius: theme.sizes.radius*10,
    backgroundColor:"#f5f5f5",
    justifyContent:"center",
    marginRight:"3%"
  },
});