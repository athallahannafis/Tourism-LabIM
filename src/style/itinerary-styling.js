import {StyleSheet} from 'react-native';
import Color from './color.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export const itineraryStyling = StyleSheet.create({
  cardInside: {
    padding: 7,
    borderWidth: 2,
    borderColor: Color.color1,
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
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  }
})