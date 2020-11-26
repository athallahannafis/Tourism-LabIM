import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {RFPercentage} from 'react-native-responsive-fontsize'
import Color from './color.json';

export const globalStyling = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
    paddingTop: '5%',
    backgroundColor: '#ffff',
  },
  columnContainer: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  rowContainerNoWrap: {
    flex:0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardSection: {
    borderRadius: 15,
    flex: 0,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingVertical: "3%",
    paddingHorizontal: "3%",
    width: '95%',
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 3,
  },
  cardTitle: {
    fontSize: RFPercentage(2.4),
    fontWeight: 'bold',
    color: Color.color2,
    marginBottom: 10,
  },
  closeIcon: {
    alignItems: 'flex-end',
    width: '100%',
  },
  subCardTitle: {
    fontSize: RFPercentage(2.1),
    marginBottom: 15,
    fontWeight: 'bold',
  },
  smallRectangularCard: {
    flex: 0,
    flexDirection: 'column',
    height: hp(8),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(25),
    borderRadius: 10,
  },
  bigImage: {
    borderRadius: 10,
    width: wp(30),
    height: hp(10),
    marginTop: 10,
  },
  smallImage: {
    borderRadius: 10,
    width: 110,
    height: 60,
    marginTop: 10,
  },
});
