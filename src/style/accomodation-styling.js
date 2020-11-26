import {StyleSheet, Dimensions} from 'react-native';
import Color from './color.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';


export const accomodationStyling = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subCardTitle: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
  },
  mainImageinCard: {
    width: Dimensions.get('window').width - 50,
    height: hp(40),
  },
  mainImageinCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    marginBottom: 5,
    marginTop: 5,
  },
  pilihButton: {
    width: 90,
    height: 25,
    backgroundColor: Color.color6,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentOfCardInSearchResult: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '32%',
  },
  smallCardText: {
    fontSize: RFPercentage(1.4),
  },
  sliderContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
});
