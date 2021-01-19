import React,{useState} from 'react'
import { StyleSheet,TouchableOpacity, View,Alert} from "react-native";

import Block from "./Block";
import * as Icon from "@expo/vector-icons";
import { theme } from "../constants";






 const renderTermsService=()=>{
            
    const categories=useState([])
    const [showTerms,setTerms]= useState(false)

    return (
      <Modal
        animationType="slide"
        visible={showTerms}
        onRequestClose={() =>setState({ showTerms: false })}
        
      >
        <Block
        padding={[theme.sizes.padding , theme.sizes.padding]}
        >
        <Text h1 style={styles.text}>
        Comments
      </Text>
        <ScrollView style={{ marginVertical: theme.sizes.padding }} showsVerticalScrollIndicator={false}>
         
          <View style={styles.icon}>
          <TextInput
        style={styles.input}
        placeholder="Add a comment"

            />
            <TouchableOpacity  >
            <Icon.Ionicons
            name='md-send'
            color={this.state.buttonColor} onPress={this.onButtonPress}
            size={25}
          />
          </TouchableOpacity>
        
            </View>
          
            {categories.map((category,indexC) => (
  
              <CardC middle shadow style={styles.card} key={indexC}>

                <Text caption  gray height={12}>
                 {category.comments}
                </Text>
                
               
               
              </CardC>
          
          ))}
          </ScrollView>
        </Block>
      </Modal>
    );
    
  }

  export default renderTermsService

