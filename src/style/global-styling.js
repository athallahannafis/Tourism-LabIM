import {StyleSheet} from 'react-native';

export const globalStyling = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    marginBottom: "5%",
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
  },
  cardSection: {
    borderRadius: 15,
    flex: 0,
    flexDirection: "column",
    backgroundColor: "#f0f9f8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "95%",
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  smallRectangularCard: {
    flex: 0,
    flexDirection: "column",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    borderRadius: 10,
    backgroundColor: "#c2b9b8",
  }
})