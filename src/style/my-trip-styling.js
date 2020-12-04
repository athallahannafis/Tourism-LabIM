import {StyleSheet, Dimensions} from 'react-native';
import Color from '../style/color.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export const myTripStyling = StyleSheet.create({
  threeImagesContainer: {
    flexDirection: 'row',
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
    height: hp(8),
    opacity: 0.4,
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  buttonAddDestination: {
    width: wp(55),
    height: hp(7),
    margin: 25,
    backgroundColor: Color.color5,
    borderRadius: hp(7)/7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonAddDestinationText: {
    fontSize: RFPercentage(2.3),
    fontWeight: 'bold',
    color: Color.white,
  },
  buttonAddItinerary: {
    width: wp(60),
    height: hp(7),
    margin: 15,
    backgroundColor: Color.color4,
    borderRadius: hp(7)/7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAddItineraryText: {
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
    color: Color.white,
  },
  buttonDetail: {
    borderRadius: hp(5)/5,
    width: wp(20),
    height: hp(5),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDetailText: {
    fontSize: RFPercentage(1.7),
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
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    position:'absolute',
    width: Dimensions.get('window').width / 3 - 35,
    height: hp(8),
    left: 0,
    alignItems:'center'
  },
  fontOnBlackOverlay: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  imageInCard: {
    // width: (Dimensions.get('window').width - 130) / 2,
    width: wp(32),
    height: hp(10),
    borderRadius: 6,
  },
  itineraryButton: {
    marginTop: 20,
    backgroundColor: Color.color4,
    width: "50%",
    height: "4%",
    borderRadius: hp(4)/4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationImage: {
    borderRadius: 10,
    width: Dimensions.get('window').width / 3 - 35,
    height: hp(8),
  },
  textInput: {
    fontSize: RFPercentage(2.3),
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
    // width: (Dimensions.get('window').width - 130) / 4 - 2,
    width: wp(15),
    height: hp(5),
    borderRadius: 4,
    marginRight: "4%"
  },
  squareImage: {
    width: wp(30),
    height: hp(10),
    borderRadius: 5,
  },
  textOnOverlay: {
    flex: 0,
    flexDirection: "column",
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%"
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
    marginBottom: "2%",
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 3,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: RFPercentage(1.7)
  }
});
