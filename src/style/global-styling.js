import {StyleSheet} from 'react-native';

export const globalStyling = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    marginBottom: "10%",
  },
  columnContainer: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%"
  },
  cardSection: {
    borderRadius: 20,
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f0f9f8",
    padding: 5,
    width: "90%"
  },
  smallRectangularCard: {
    flex: 0,
    flexDirection: "column",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "grey",
  }
})