// import React from "react";
// import { View , StyleSheet} from "native-base";
// import MapView from "react-native-maps";

// import SearchBox from "../SearchBox";
// import SearchResults from "../SearchResults";

// import styles from "./MapContainerStyles.js";

// export const MapContainer = ({ 
// 		region,
// 		getInputData,
// 		toggleSearchResultModal,
// 		getAddressPredictions,
// 		resultTypes,
// 		predictions,
// 		getSelectedAddress,
// 		selectedAddress,
// 	})=>{

// 	const { selectedPickUp, selectedDropOff } = selectedAddress || {};

// 	return(
// 		<View style={styles.container}>
// 			<MapView
// 				provider={MapView.PROVIDER_GOOGLE}
// 				style={styles.map}
// 				region={region}
// 			>

// 				{ selectedPickUp &&
// 					<MapView.Marker
// 						coordinate={{latitude:selectedPickUp.latitude, longitude:selectedPickUp.longitude}}
// 						pinColor="green"

// 					/>	
// 				}
// 				{ selectedDropOff &&
// 					<MapView.Marker
// 						coordinate={{latitude:selectedDropOff.latitude, longitude:selectedDropOff.longitude}}
// 						pinColor="blue"

// 					/>	
// 				}

				


// 			</MapView>
// 			<SearchBox 
// 				getInputData={getInputData}
// 				toggleSearchResultModal={toggleSearchResultModal}
// 				getAddressPredictions={getAddressPredictions}
// 				selectedAddress={selectedAddress}
// 			/>
// 			{ (resultTypes.pickUp || resultTypes.dropOff) &&
// 			<SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress}/>
// 			}
// 		</View>
// 	)
// }



// // const styles = {
// // 	container:{
// // 		flex:1,
// // 		justifyContent:"center",
// // 		alignItems:"center"
// // 	},
// // 	map:{
// // 		...StyleSheet.absoluteFillObject
// // 	}
// // }

// // export default styles;