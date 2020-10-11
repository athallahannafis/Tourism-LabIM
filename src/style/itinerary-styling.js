import {StyleSheet} from 'react-native';
import Color from './color.json';

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
    fontSize: 20,
    fontWeight: "bold",
  }
})