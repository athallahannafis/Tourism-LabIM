import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {globalStyling as gs} from '../style/global-styling';
import {profilStyling as ps} from '../style/profil-styling';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

import data from '../data-dummy/data.json';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isChecked1: false,
      isChecked2: false,
      isChecked3: false,
      isChecked4: false,
      isChecked5: false,
      isChecked6: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      isChecked1: data.profil.preferensiAkomodasi.akomodasi1,
      isChecked2: data.profil.preferensiAkomodasi.akomodasi2,
      isChecked3: data.profil.preferensiAkomodasi.akomodasi3,
      isChecked4: data.profil.preferensiAkomodasi.akomodasi4,
      isChecked5: data.profil.preferensiAkomodasi.akomodasi5,
      isChecked6: data.profil.preferensiAkomodasi.akomodasi6,
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={gs.mainContainer}>
          <View style={ps.backgroundContainer}>
            <View style={ps.titleContainer}>
              <Text style={ps.fontJudul2}>Jenis Akomodasi</Text>
            </View>

            <View style={ps.checkListContainer}>
              <View style={ps.checkItemContainer}>
                {/*<Text>{`[value: ${this.state.value1}]`}</Text>*/}
                <CheckBox
                  value={this.state.isChecked1}
                  onValueChange={(value) =>
                    this.setState({
                      isChecked1: value,
                    })
                  }
                />
                <Text style={ps.fontCheckList}>Hotel (Bintang 5)</Text>
              </View>

              <View style={ps.checkItemContainer}>
                {/*<Text>{`[value: ${this.state.value1}]`}</Text>*/}
                <CheckBox
                  value={this.state.isChecked2}
                  onValueChange={(value) =>
                    this.setState({
                      isChecked2: value,
                    })
                  }
                />
                <Text style={ps.fontCheckList}>Hotel (Bintang 4)</Text>
              </View>

              <View style={ps.checkItemContainer}>
                {/*<Text>{`[value: ${this.state.value1}]`}</Text>*/}
                <CheckBox
                  value={this.state.isChecked3}
                  onValueChange={(value) =>
                    this.setState({
                      isChecked3: value,
                    })
                  }
                />
                <Text style={ps.fontCheckList}>Hotel (Bintang 3)</Text>
              </View>

              <View style={ps.checkItemContainer}>
                {/*<Text>{`[value: ${this.state.value1}]`}</Text>*/}
                <CheckBox
                  value={this.state.isChecked4}
                  onValueChange={(value) =>
                    this.setState({
                      isChecked4: value,
                    })
                  }
                />
                <Text style={ps.fontCheckList}>Hotel (Bintang 2)</Text>
              </View>

              <View style={ps.checkItemContainer}>
                {/*<Text>{`[value: ${this.state.value1}]`}</Text>*/}
                <CheckBox
                  value={this.state.isChecked5}
                  onValueChange={(value) =>
                    this.setState({
                      isChecked5: value,
                    })
                  }
                />
                <Text style={ps.fontCheckList}>Hotel (Bintang 1)</Text>
              </View>

              <View style={ps.checkItemContainer}>
                {/*<Text>{`[value: ${this.state.value1}]`}</Text>*/}
                <CheckBox
                  value={this.state.isChecked6}
                  onValueChange={(value) =>
                    this.setState({
                      isChecked6: value,
                    })
                  }
                />
                <Text style={ps.fontCheckList}>Guest House</Text>
              </View>
            </View>

            <View style={ps.detailContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProfileHome')}
                style={ps.btn}>
                <Text style={ps.btnText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
