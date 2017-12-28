import React, { Component } from 'react';
import { FlatList, StatusBar, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { ListItem, Separator } from '../components/list';
import currencies from '../data/currencies';
import crypto from '../data/crypto';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      cryptoFilter: crypto,
      currencyFilter: currencies
    }
  }
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
  };

  handlePress = (currency) => {
    const { type } = this.props.navigation.state.params;
    if (type === 'base') {
      this.props.dispatch(changeBaseCurrency(currency));
    } else if (type === 'quote') {
      this.props.dispatch(changeQuoteCurrency(currency));
    }

    this.props.navigation.goBack(null);
  };

  handleSearch = (term) => {
    this.setState({ searchTerm: term });
    const { type } = this.props.navigation.state.params;
    if (type === 'base') {
      this.setState({cryptoFilter: crypto.filter(createFilter(this.state.searchTerm, null)) });
    } else if (type === 'quote') {
      this.setState({currencyFilter: currencies.filter(createFilter(this.state.searchTerm, null)) });
    }
    console.log(this.state.cryptoFilter);
  }

  render() {
    let comparisonCurrency = this.props.baseCurrency;
    if (this.props.navigation.state.params.type === 'quote') {
      comparisonCurrency = this.props.quoteCurrency;
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="default" />
        <SearchInput 
          onChangeText={(term) => { this.handleSearch(term) }} 
          style={styles.searchInput}
          placeholder="Type a message to search"
          />
        <FlatList
          data={this.props.navigation.state.params.type === 'base' ? this.state.cryptoFilter : this.state.currencyFilter}
          renderItem={({ item }) => (
            <ListItem
              text={item}
              selected={item === comparisonCurrency}
              onPress={() => this.handlePress(item)}
              iconBackground={this.props.primaryColor}
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});


const mapStateToProps = state => ({
  baseCurrency: state.currencies.baseCurrency,
  quoteCurrency: state.currencies.quoteCurrency,
  primaryColor: state.theme.primaryColor,
});

export default connect(mapStateToProps)(CurrencyList);