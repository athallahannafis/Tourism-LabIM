import {StyleSheet, Dimensions} from 'react-native';
import Color from './color.json';

export const attractionStyling = StyleSheet.create({
  bottomImage: {
    width: '50%',
    height: '50%',
  },
  btn: {
    height: 25,
    borderRadius: 5,
    backgroundColor: Color.color6,
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },
  btnAddtoItinerary: {
    width: 90,
    height: 40,
    borderRadius: 5,
    backgroundColor: Color.color4,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },
  btnAddtoItinerary2: {
    width: 90,
    height: 25,
    borderRadius: 5,
    backgroundColor: Color.color4,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 4,
    elevation: 5,
  },
  btnAddtoItineraryText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnGotoItinerary: {
    width: 110,
    height: 25,
    borderRadius: 5,
    backgroundColor: Color.color4,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
  },
  cardMediumText: {
    fontSize: 13,
  },
  cardTitleText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  cardSmallText: {
    fontSize: 11,
    flex: 1,
    flexWrap: 'wrap',
  },
  columnInCard: {
    flexDirection: 'column',
    paddingBottom: 10,
  },
  columnTwo: {
    flexDirection: 'column',
    width: '50%',
    paddingRight: 10,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    padding: 5,
    backgroundColor: Color.color6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: Platform.OS === 'android' ? 50 : 0,
  },
  floatingButtonText: {
    flexWrap: 'wrap',
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainContainer: {
    marginBottom: '10%',
  },
  mainImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    marginTop: 5,
  },
  mainImage: {
    width: 300,
    height: 150,
  },
  modalOverlay: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1Bubble: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderRadius: 5,
    backgroundColor: Color.color3,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'space-between',
  },
  modal1Container2: {
    flexDirection: 'row',
    marginRight: 18,
  },
  modal1MainContainer: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10,
    borderColor: Color.color4,
    borderWidth: 2,
  },
  modal1SubBubble: {
    width: '100%',
    flexDirection: 'row',
  },
  modal2Container: {
    backgroundColor: 'white',
    width: 370,
    borderRadius: 10,
    borderColor: Color.color4,
    borderWidth: 2,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  modal3MainContainer: {
    width: 200,
    height: 80,
    borderRadius: 8,
    backgroundColor: Color.color6,
    justifyContent: 'center',
    paddingTop: 10,
  },
  modal3PlainContainer: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    elevation: Platform.OS === 'android' ? 50 : 0,
  },
  modal3SubContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  modal3SubContainer2: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowFlexStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 5,
  },
  rowImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    paddingTop: 4,
    paddingBottom: 20,
    flex: 1,
  },
  rowInCard: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  rowInList: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  rowSpaceBetweenInCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  smallCircle: {
    width: 15,
    height: 15,
    borderRadius: 60,
    backgroundColor: Color.color4,
    marginRight: 10,
  },
  smallCircle2: {
    width: 10,
    height: 10,
    borderRadius: 60,
    backgroundColor: '#C4C4C4',
    margin: 5,
  },
  smallImage2: {
    width: 72,
    height: 36,
  },
  smallImage2WithText: {
    width: 72,
    height: 36,
    opacity: 0.8,
  },
  smallImageBlackOverlay: {
    backgroundColor: 'black',
    width: 72,
    height: 36,
    opacity: 0.4,
    position: 'absolute',
    top: 4,
    left: 228,
  },
  textBubbleSmall: {
    flexWrap: 'wrap',
    fontSize: 10,
    color: 'white',
    textAlign: 'left',
  },
  textCloseBubbleSmall: {
    flexWrap: 'wrap',
    fontSize: 10,
    color: 'white',
    textAlign: 'right',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  textMediumBold: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textMediumBoldColor4AlignCenter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.color4,
    textAlign: 'center',
  },
  textMediumColor4: {
    fontSize: 20,
    color: Color.color4,
  },
  textOnImage: {
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 0.85,
    color: 'white',
  },
  textOnImageContainer: {
    position: 'absolute',
    top: 6,
    left: 232,
    alignItems: 'center',
  },
  textSmall: {fontSize: 11},
});
