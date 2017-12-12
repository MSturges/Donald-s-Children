import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';


class UserInfo extends PureComponent {
    constructor(props) {
        super(props);
          this.state = {
            expanded: false,
          };
    }


    handleExpandChange = (expanded) => {
      this.setState({expanded: expanded});
    };

    handleToggle = (event, toggle) => {
      this.setState({expanded: toggle});
    };

    handleExpand = () => {
      this.setState({expanded: true});
    };

    handleReduce = () => {
      this.setState({expanded: false});
    };

    componentWillReceiveProps(newProps) {
    }

    render() {
      if(Object.keys(this.props.child).length < 0 ) {
        return <div></div>
      }
        return (
            <div className='user-info-container'>
              <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>

              <CardHeader
                title={`Child Name: ${this.props.child.name}`}
                subtitle={`Cryptocurrency of Choice: ${this.props.child.coin}`}
                avatar='../../../../images/user.jpeg'
                actAsExpander={true}
                showExpandableButton={true}
              />

              <CardText expandable={true}>
                <div className='wallet-text'>
                    <h5>Bitcoin Wallet Address:</h5>
                    <p>{this.props.child.btcAccount}</p>
                </div>
              </CardText>

              <CardActions>
                {!this.state.expanded ?  <FlatButton label='Show Wallet' onClick={this.handleExpand} /> : <span></span>}
                {this.state.expanded ?  <FlatButton label='Hide Wallet' onClick={this.handleReduce} /> : <span></span>}
              </CardActions>

            </Card>
          </div>
        );
    };
}

export default UserInfo
