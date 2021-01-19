import MapView, { Polyline, Marker,PROVIDER_GOOGLE } from "react-native-maps";
import React, { Component } from "react";
import call from "react-native-phone-call"
import {
  Dimensions,
  Image,
  StyleSheet,TextInput,
  ScrollView,
  TouchableOpacity,View, KeyboardAvoidingView
} from "react-native";
import { Button, Block, Text,Cardcar ,Input} from "../components";
import { theme, mocks } from "../constants";
import * as Icon from "@expo/vector-icons";

const BookRide =()=>{
<Cardcar style={{ 
    backgroundColor:"#eff8fb",
    marginTop:"8%",
    flexGrow:0.95
    }}>
    <ScrollView><Block>
    {categories.map((category) => (         
    <View></View>
    ))}
  </Block>
    </ScrollView>
    </Cardcar>}