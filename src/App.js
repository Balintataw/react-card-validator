import React, { Component } from 'react'
import './App.css'
import glamorous from 'glamorous'
import valid from 'card-validator'
import visa from './images/visa.svg'
import disc from './images/discover.svg'
import mc from './images/mc.svg'
import amex from './images/amex.svg'
import maestro from './images/maestro.svg'
import jcb from './images/jcb.svg'
import union from './images/union.svg'
import diners from './images/diners.svg'
import chip from './images/chip-silver.png'

const CardColor = glamorous.div(
	{
		display: 'flex',
		flexDirection: 'column',
		marginLeft: '50px',
		backgroundColor: 'blue',
		width: '470px',
		height: '300px',
		borderRadius: '10px',
		border: '1px solid black'
	},
	(props) => ({
		backgroundColor: background(props.type),
		border: error(props.val)
	})
)

const background = (type) => {
	switch (type) {
		case 'Visa':
			return 'blue'
		case 'Mastercard':
			return 'rgb(254, 167, 17)'
		case 'Discover':
			return 'black'
		case 'American Express':
			return 'green'
		case 'Maestro':
			return 'darkblue'
		case 'JCB':
			return 'red'
		case 'UnionPay':
			return 'darkorange'
		case 'Diners':
			return 'rgb(255, 226, 176)'
		default:
			return 'grey'
	}
}

const error = (check) => {
	if( check === false) {
		return '4px solid red'
	}
}

class App extends Component {
	state = {
		cardNumber: '',
		expMonth: '',
		expYear: '',
		cardholderName: '',
		securityCode: '',
		cardType: '',
		cardImage: '',
		isValid: true
	}
	componentDidMount() {
		document.title ="Card"
	}
	handleChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	}
	handleCardnumberChange = ({target}) => {
		if (this.state.cardType === "American Express") {
			this.setState({
				[target.name]: target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})?(.{6})/g, '$1 $2 ').trim()
			})
		} else {
			this.setState({
				[target.name]: target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
			})
		}
		var numberValidation = valid.number(target.value);

		//while card number is not valid
		if (!numberValidation.isPotentiallyValid) {
			  console.log('Invalid card number')
			  this.setState({
				  cardType: '',
				  cardImage: '',
				  isValid: false
			  })
		} 
		//while card number is potentially valid
		if (numberValidation.card) {
			console.log(numberValidation.card.niceType);
			this.setState({
				cardType: numberValidation.card.niceType,
				isValid: true
			})
			
			if (this.state.cardType === 'Visa') {
				this.setState({
					cardImage: visa
				})
			} else if (this.state.cardType === 'Discover') {
				this.setState({
					cardImage: disc
				})
			} else if (this.state.cardType === 'American Express') {
				this.setState({
					cardImage: amex
				})
			} else if (this.state.cardType === 'Mastercard') {
				this.setState({
					cardImage: mc
				})
			} else if (this.state.cardType === 'JCB') {
				this.setState({
					cardImage: jcb
				})
			} else if (this.state.cardType === 'Maestro') {
				this.setState({
					cardImage: maestro
				})
			} else if (this.state.cardType === 'UnionPay') {
				this.setState({
					cardImage: union
				})
			} else if (this.state.cardType === 'Diners Club') {
				this.setState({
					cardImage: diners
				})
			}
		}
	}
	//validates expiry month
	handleExpMonthChange = ({target}) => {
		this.setState({
			[target.name]: target.value.replace(/ |\//g, ''),
		 });
		var monthValidation = valid.expirationMonth(target.value);

		if (!monthValidation.isPotentiallyValid) {
			console.log('Invalid month')
			this.setState({
				isValid: false
			})
		}

		if (monthValidation.card) {
			console.log('valid month')
			this.setState({
				expMonth: target.value,
				isValid: true
			})
		}
	}
	//validates expiry year
	handleExpYearChange = ({target}) => {
		this.setState({
			[target.name]: target.value.replace(/ |\//g, ''),
		 });
		var yearValidation = valid.expirationDate(target.value);

		if (!yearValidation.isPotentiallyValid) {
			console.log('Invalid year')
			this.setState({
				isValid: false
			})
		}

		if (yearValidation.card) {
			console.log('valid year')
			this.setState({
				expYear: target.value,
				isValid: true
			})
		}
	}
	handleChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	}

	render() {
		return (
			<div className="app">
				<div className="card-container">
					<CardColor type={this.state.cardType} val={this.state.isValid} className="card">
						<p className="bank-name">Your Bank</p>
						<img src={chip} className="chip" alt="" />
						<input value={this.state.cardNumber} className="number" placeholder="Card Number"/>
						<div>
							<p className="valid">VALID THRU</p>
							<input value={this.state.expMonth} className="month" placeholder="MM"/>
							<p className="slash">/</p>
							<input value={this.state.expYear} className="year" placeholder="YY"/>
							<img src={this.state.cardImage} id="card-logo" alt ='' />
						</div>
						<input value={this.state.cardholderName} className="name" placeholder="Your name"/>
					</CardColor> 
				</div>
				<form id="form-container" action="">
					<input  type="text" 
							name="cardNumber"
							id="cardnumber"
							onKeyUp={this.handleCardnumberChange}
							onChange={this.handleChange}
							value={this.state.cardNumber}
							/>
					<input 	type="text" 
							name="expMonth"
							id="month"
							onKeyUp={this.handleExpMonthChange}
							onChange={this.handleChange}
							value={this.state.expMonth}
							/>
					<input  type="text" 
							name="expYear"
							id="year"
							onKeyUp={this.handleExpYearChange}
							onChange={this.handleChange}
							value={this.state.expYear}
							/>
					<input  type="text" 
							name="cardholderName"
							id="name"
							onChange={this.handleChange}
							value={this.state.cardholderName}
							/>
					<input type="submit" />
				</form>
				<ul> {/*card examples*/}
					<li>Visa: 4111111111111111</li>
					<li>Discover: 6011111111111117</li>
					<li>MasterCard: 5111111111111118</li>
					<li>Maestro: 5018111111111112</li>
					<li>JCB: 3511111111111119</li>
					<li>Union Pay: 6211111111111111</li>
					<li>American Express: 371111111111114</li>
					<li>Diners Club: 38111111111119</li>
				</ul>
			</div>
		);
	}
}

export default App;
