'use strict';

var fetch = require('fetch');
var React = require('react-native');
var {
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var OwersScreen = React.createClass({
  getInitialState() {
    return {
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.key[0] !== row2.key[0],
      }),
    };
  },

  componentDidMount() {
    this.fetchOwers();
  },

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  },

  renderRow(data) {
    var [ ower ] = data.key;
    var amount = data.value;
    return (
      <View key={ower}>
        <Text style={styles.ower}>
          {ower} owes ${amount.toFixed(2)}
        </Text>
      </View>
    );
  },

  fetchOwers() {
    this.setState({
      isLoading: true,
    });
    fetch('http://stage.iouo.me/api/owers')
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(json.rows),
        });
      })
      .catch(e => {
        this.setState({
          isLoading: false,
        });
        console.error('Failed to fetch owers', e.message);
      })
      .done();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  ower: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = OwersScreen;
