import React, {Component} from 'react';  
import {Platform, StyleSheet, Text,  
  View,TouchableOpacity, AsyncStorage,  
} from 'react-native';  
  
export default class App extends Component {  
  saveData(key){    
    AsyncStorage.setItem('token',key);  
  }  
  displayData = async ()=>{  
    try{  
      let user = await AsyncStorage.getItem('token');  
      return user  
    }  
    catch(error){  
      console.log('errrrer',error)  
    }  
  }  
  render() {  
    return (  
      <View style={styles.container}>  
        <TouchableOpacity onPress ={this.saveData}>  
          <Text>Click to save data</Text>  
        </TouchableOpacity>    
        <TouchableOpacity onPress ={this.displayData}>  
          <Text>Click to display data</Text>  
        </TouchableOpacity>   
      </View>  
    );  
  }  
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    backgroundColor: '#F5FCFF',  
  },  
});  