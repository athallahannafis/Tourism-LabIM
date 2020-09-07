import {StyleSheet} from 'react-native'
import Color from './color.json'

export const ticketStyling = StyleSheet.create({
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
  },
  smallIcons: {
    height: 40,
    width: 40,
    marginRight: 5
  },
  bubble: {
    flexDirection: 'row',
    alignItems: "center",
    width: 270,
    height: 40,
    textAlignVertical: 'center',
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: '#C1DFE1',
    marginVertical: 5,
  },
  personBubble: {
    flexDirection: 'row',
    alignItems: "center",
    width: 270,
    height: 40,
    textAlignVertical: 'center',
    borderRadius: 10,
    backgroundColor: Color.color3,
    marginVertical: 5,
  },
  littleBubble: {
    flexDirection: 'row',
    alignItems: "center",
    width: 300,
    height: 40,
    textAlignVertical: 'center',
    borderRadius: 10,
    backgroundColor: Color.color1,
    marginVertical: 5,

  },
  pesanButton: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.color6,
    borderRadius: 1000,
    width: 100,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  okButton: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.color4,
    borderRadius: 1000,
    width: 100,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2
  },
  alertMessage: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 30,
    textAlign: "center"
  },
  modalContainer: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    minHeight: 300,
    backgroundColor: "#fff",
    marginTop: "50%",
    padding: 20,
    borderWidth: 2,
    borderColor: Color.color4,
    borderRadius: 20
  }
});