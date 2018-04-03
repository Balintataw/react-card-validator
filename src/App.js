import React, { Component } from 'react'
import './App.css'
import valid from 'card-validator'

class App extends Component {
	state = {
		cardNumber: '',
		expMonth: '',
		expYear: '',
		cardholderName: '',
		ccvNum: 'ccv',
		cardType: ''
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
		this.setState({
			[target.name]: target.value
		})

		var numberValidation = valid.number(target.value);

		if (!numberValidation.isPotentiallyValid) {
		// renderInvalidCardNumber();
		console.log('Invalid card number')
		}

		if (numberValidation.card) {
		console.log(numberValidation.card.type);
			this.setState({
				cardType: numberValidation.card.niceType
			})
		}
	}
	handleInputChange = ({ target }) => {
		if (target.name === 'cardNumber') {
		  this.setState({
			[target.name]: target.value.replace(/ /g, ''),
		  });
		}
		else if (target.name === 'expMonth' || target.name === 'expYear') {
		  this.setState({
			[target.name]: target.value.replace(/ |\//g, ''),
		  });
		}
		else {
		  this.setState({
			[target.name]: target.value,
		  });
		}
	  };
	render() {
		return (
			<div className="app">
				<div className="card-container">
					<div className="card">
						<p>{this.state.cardType}</p>
						<p>Card No</p>
						<input value={this.state.cardNumber} placeholder="**** **** **** ****"/>
						<div>
							<p>Expiration</p>
							<input value={this.state.expMonth} className="month" placeholder="02"/>/
							<input value={this.state.expYear} className="year" placeholder="19"/>
						</div>
						<p>Cardholders Name</p>
						<input value={this.state.cardholderName}/>
					</div> 
				</div>
				<form id="form-container" action="">
					<label>cardnumber
						<input  type="text" 
								name="cardNumber"
								id="cardnumber"
								onChange={this.handleCardnumberChange}
								onKeyUp={this.handleInputChange}
								value={this.state.cardNumber}
								placeholder="number"/>
					</label>
					<label>exp date
						<input 	type="text" 
								name="expMonth"
								id="month"
								onChange={this.handleChange}
								onKeyUp={this.handleInputChange}
								value={this.state.expMonth}
								placeholder="02"/>/
						<input  type="text" 
								name="expYear"
								id="year"
								onChange={this.handleChange}
								onKeyUp={this.handleInputChange}
								value={this.state.expYear}
								placeholder="18"/>
					</label>
					<label>cardholder name
						<input  type="text" 
								name="cardholderName"
								id="name"
								onChange={this.handleChange}
								value={this.state.cardholderName}
								placeholder="name"/>
					</label>
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default App;
