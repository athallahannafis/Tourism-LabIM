import {StyleSheet} from 'react-native';

export const profilStyling = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  btn: {
    width: 110,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    marginTop: 20,
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
    paddingLeft: 25,
    paddingRight: 25,
  },
  bubble: {
    flexDirection: 'row',
    width: '100%',
    height: 27,
    textAlignVertical: 'center',
    borderRadius: 3,
    paddingLeft: 7,
    backgroundColor: '#C1DFE1',
  },
  bubbleArrowIcon: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    textAlignVertical: 'center',
    position: 'absolute',
    top: 8,
    left: 337,
  },
  bubblePreferensi: {
    flexDirection: 'row',
    width: 350,
    height: 27,
    textAlignVertical: 'center',
    borderRadius: 3,
    paddingLeft: 7,
    backgroundColor: '#FFBEAA',
  },
  bubblePreferensiText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  bubbleText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  bubbleTextInput: {
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 3,
  },
  bubbleTitleText: {
    fontSize: 12,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  checkItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkListContainer: {
    paddingLeft: 15,
    paddingBottom: 20,
  },
  CircleShape: {
    width: 95,
    height: 95,
    borderRadius: 60,
  },
  detailContainer: {
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontCheckList: {
    fontSize: 13,
  },
  fontJudul2: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  picture: {
    width: 100,
    height: 100,
  },
  picker: {
    position: 'absolute',
    top: -12,
    left: -40,
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
    width: '128%',
  },
  pictureContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  titleContainer: {
    paddingBottom: 10,
    paddingTop: 10,
  },
});
