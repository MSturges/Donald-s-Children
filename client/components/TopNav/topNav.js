import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import toggleSideNav from '../../actions/toggleSideNav';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Stars from 'material-ui/svg-icons/action/stars';
import Cart from 'material-ui/svg-icons/action/shopping-cart';
import Bagel from 'material-ui/svg-icons/image/adjust';
import People from 'material-ui/svg-icons/social/people';

class TopNav extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    render() {
        return (
            <div className='top-bar-container'>
                <AppBar style={{ backgroundColor: 'rgb(70,62,63)' }}
                        title={ `Donald's Children` }
                        onLeftIconButtonTouchTap={ () => this.props.toggleSideNav(true) } />
            </div>
        );
    }
}

export default connect(null, { toggleSideNav })(TopNav);
