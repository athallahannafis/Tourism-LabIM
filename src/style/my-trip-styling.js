import {StyleSheet, Dimensions} from 'react-native';
import Color from '../style/color.json';

export const myTripStyling = StyleSheet.create({
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
  destinationBubble: {
    width: '100%',
    backgroundColor: Color.color3,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  recommendationImage: {
    borderRadius: 10,
    width: Dimensions.get('window').width / 3 - 25,
    height: 50,
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
});
