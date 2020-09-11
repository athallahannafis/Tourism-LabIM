import {StyleSheet} from 'react-native';
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
  cardSection: {
    borderRadius: 15,
    flex: 0,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '95%',
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.color2,
    marginBottom: 10,
  },
  subCardTitle: {
    fontSize: 15,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  smallRectangularCard: {
    flex: 0,
    flexDirection: 'column',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    borderRadius: 10,
  },
  bigImage: {
    borderRadius: 10,
    width: 150,
    height: 100,
    marginTop: 10,
  },
  smallImage: {
    borderRadius: 10,
    width: 110,
    height: 60,
    marginTop: 10,
  },
});
