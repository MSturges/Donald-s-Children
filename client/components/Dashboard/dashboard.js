import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import fetchCoinData from '../../actions/fetchCoinData';
import UserInfo from './componenets/UserInfo/userInfo';
import StockChart from './componenets/StockChart/stockChart';


class DashBoard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
          selectedChild: {}
        }
    }

    checkRouteParams(params) {
      const allowedCoins = ['ethereum', 'litecoin', 'dash'];
      const allowedChildren = ['huey', 'duey', 'luey'];

      if(allowedCoins.indexOf(params.coin.toLowerCase()) < 0 || allowedChildren.indexOf(params.child.toLowerCase()) < 0) {
        this.props.history.push('/dashboard/Huey/Ethereum')
      }
    };


    componentWillMount() {
      this.checkRouteParams(this.props.match.params)
      this.props.fetchCoinData(this.props.match.params.coin.toLowerCase())
    };


    componentWillReceiveProps(newProps) {
      this.checkRouteParams(newProps.match.params)

      let oldCoin = this.props.match.params.coin
      let newCoin = newProps.match.params.coin

      if(oldCoin !== newCoin) {
        this.props.fetchCoinData(newCoin.toLowerCase())
      }

      newProps.children.forEach((item, index) => {
        if(item.name.toLowerCase() === newProps.match.params.child.toLowerCase()) {
          this.setState({
                selectedChild: item
            });
        }
      });
    };


    createChart() {
      return this.props.coinData.map((item, index) => {
        return <StockChart key={item._id} data={item} />
      })
    };


    render() {
        return (
          <div className='dashboard-container'>
            <UserInfo child={this.state.selectedChild}/>
            {this.createChart()}
          </div>
        );
    }
};


function mapStateToProps(state) {
  return {
    children: state.children.children,
    coinData: state.coinData.coin,
  }
};

export default withRouter(connect(mapStateToProps, { fetchCoinData } )(DashBoard));
