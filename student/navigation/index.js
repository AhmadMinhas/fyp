import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import * as Icon from "@expo/vector-icons";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import carp from "../screens/carp";
import Home from "../screens/home";
import Rider1 from "../screens/Rider1"
import Settings from "../screens/Settings";
import Carpooling from "../screens/carpooling";
import Hostels from "../screens/hostels";
import Tutors from "../screens/tutors";
import NotesSharing from "../screens/NotesSharing";
import Driver from "../screens/driver";
import Rider from "../screens/rider";
import choosehostel from"../screens/choosehostel";
import viewadshostel from"../screens/viewadshostel"
import downloadingnotes from "../screens/downloadingnotes"
import notesposted from "../screens/notesposted"
import postnotes from "../screens/postnotes"
import posttutors from "../screens/posttutors"
import mytutorpost from "../screens/mytutorpost"
import discuss from "../screens/discuss"
import comments from "../screens/comments"
import myhostelads from "../screens/myhostelads"
import Setings from "../screens/Setings"
import BookRide from "../screens/bookRide"
import { theme } from "../constants";
import AddRide from '../screens/AddRide'
import DriverRide from '../screens/DriverRide'
import ChooseTutor from '../screens/ChooseTutor'
import ViewLoc from '../screens/ViewLoc'
import RiderDestinationFiltering from '../screens/RiderDestinationFiltering'
import MyPosts from '../screens/Myposts'

const screens = createStackNavigator(
  {  
   
  
    Welcome,
    Login,
    SignUp,
    Forgot,
    carp,
    Home,
    BookRide,
    discuss,
    Rider1,
    Hostels,
    Setings,
   ChooseTutor,
    Settings,
    choosehostel,
    viewadshostel, 
    Tutors,
    NotesSharing,
    DriverRide,
    Driver,
    Carpooling,
    Rider,
    postnotes,
    downloadingnotes,
    notesposted ,
    posttutors,
    mytutorpost,
    ViewLoc,
    comments,
    myhostelads,
    AddRide,
    RiderDestinationFiltering,
    MyPosts
  },
  {
    defaultNavigationOptions : {
        
      headerStyle: {
        height: theme.sizes.base * 3.4,
        backgroundColor: "#220066" ,
        borderBottomColor: "black",
        elevation: 1.5,// for android
        marginBottom:1.2,
        borderBottomColor:"black",
      
      },
     
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      
      headerTitleStyle:{color:"white",alignItems:"center" },
      headerLeftContainerStyle: {
        backgroundColor:"#220066",
        alignItems: "center",
        marginLeft: theme.sizes.base * 1.5,
        marginRight: theme.sizes.base*3
      },
       
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      }
    }}
  
);

export default createAppContainer(screens);
