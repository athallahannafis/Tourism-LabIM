import {StyleSheet, Dimensions} from 'react-native';
import Color from '../style/color.json';

export const myTripStyling = StyleSheet.create({
  threeImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  bigImageContainer: {
    width: Dimensions.get('window').width,
  },
  bigImage: {
    width: Dimensions.get('window').width,
    height: 270,
  },
  blackOverlay: {
    backgroundColor: 'black',
    opacity: 0.6,
    width: Dimensions.get('window').width,
    height: 270,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  blackOverlayHome: {
    backgroundColor: 'black',
    width: Dimensions.get('window').width / 3 - 35,
    height: 60,
    opacity: 0.4,
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  buttonAddDestination: {
    width: 220,
    height: 55,
    margin: 25,
    backgroundColor: Color.color5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonAddDestinationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
  },
  buttonAddItinerary: {
    width: 220,
    height: 35,
    margin: 25,
    backgroundColor: Color.color4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAddItineraryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
  },
  buttonDetail: {
    borderRadius: 12,
    width: 70,
    height: 25,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDetailText: {
    fontSize: 13,
    color: Color.white,
    fontWeight: 'bold',
  },
  buttonSimpan: {
    width: 70,
    height: 27,
    backgroundColor: Color.color5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationBubble: {
    width: '100%',
    backgroundColor: Color.color3,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  fontContainerHome: {
    position:'absolute',
    width: Dimensions.get('window').width / 3 - 35,
    top: 20,
    left: 0,
    alignItems:'center'
  },
  fontOnBlackOverlay: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17
  },
  imageInCard: {
    width: (Dimensions.get('window').width - 130) / 2,
    height: 70,
    borderRadius: 6,
  },
  itineraryButton: {
    marginTop: 20,
    backgroundColor: Color.color4,
    width: 240,
    height: 35,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationImage: {
    borderRadius: 10,
    width: Dimensions.get('window').width / 3 - 35,
    height: 60,
  },
  textInput: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
    textAlignVertical: 'center',
    padding: 4,
    paddingLeft: 10,
    backgroundColor: Color.white,
    borderRadius: 10,
  },
  reservationBubble: {
    width: '100%',
    backgroundColor: Color.color1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  smallImageInCard: {
    width: (Dimensions.get('window').width - 130) / 4 - 2,
    height: 35,
    borderRadius: 4,
  },
  squareImage: {
    width: 120,
    height: 120,
    borderRadius: 5,
  },
  textOnOverlay: {
    position: 'absolute',
    left: 115,
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInside: {
    padding: 7,
    backgroundColor: Color.color1,
    width: "100%",
    borderRadius: 7
  },
  cardInsideDetail: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    backgroundColor: Color.color3,
    borderRadius: 7
  },
  columnContainer: {
    flex: 0,
    flexDirection: "column",
  },
  cardInsideTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  recommendationCard: {
    borderRadius: 15,
    backgroundColor: Color.color3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 3,
    marginBottom: 10
  },
  restaurantRow: {
    flex:0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  restaurantCard: {
    flex: 0,
    flexDirection: "column",
    alignItems:"center",
    justifyContent: "center",
    width: "30%",
    // height: "80%",
    backgroundColor: Color.color3,
    borderRadius: 15,
    padding: 10,
    marginRight: "1%",
    marginLeft: "1%",
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 3,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 18
  }
});
