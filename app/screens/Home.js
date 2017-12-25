import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../components/container';
import { Logo } from '../components/logo';
import { InputWithButton } from '../components/inputWithButton';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/text';
import { Header } from '../components/header';

import { changeCurrencyAmount, swapCurrency, getInitialConversion } from '../actions/currencies';



class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    lastConvertedDate: PropTypes.object,
    isFetching: PropTypes.bool,
    primaryColor: PropTypes.string,
    conversionQuote: PropTypes.string,
  };

  componentWillMount() {
    this.props.dispatch(getInitialConversion());
  }

  handleChangeText = (text) => {
    this.props.dispatch(changeCurrencyAmount(text));
  };

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
  };

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' });
  };

  handleSwapCurrency = () => {
    
    this.props.dispatch(swapCurrency());
  };
  
  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  };
  render() {
    let quotePrice = '...';
    //if (!this.props.isFetching) {
      quotePrice = (this.props.amount * this.props.conversionRate).toFixed(6);
    //}
    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
        <Logo tintColor={this.props.primaryColor}/>
        <InputWithButton
          buttonText={this.props.baseCurrency}
          onPress={this.handlePressBaseCurrency}
          defaultValue={this.props.amount.toString()}
          keyboardType="numeric"
          onChangeText={this.handleChangeText}
          textColor={this.props.primaryColor}
        />
        <InputWithButton
          editable={false}
          buttonText={this.props.quoteCurrency}
          onPress={this.handlePressQuoteCurrency}
          value={quotePrice}
          textColor={this.props.primaryColor}
        />
        <LastConverted
          date={this.props.lastConvertedDate}
          base={this.props.baseCurrency}
          quote={this.props.quoteCurrency}
          conversionRate={this.props.conversionRate}
        />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  var selector = String("price_" + String(quoteCurrency.toLowerCase()));
  const conversionSelector = state.currencies.conversions || {};
  const rates = conversionSelector[selector] || {};
  
  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    conversionRate: parseFloat(rates) || 0,
    lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    isFetching: conversionSelector.isFetching,
    primaryColor: state.theme.primaryColor,
  };
};

export default connect(mapStateToProps)(Home);