import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import toggleSideNav from '../../actions/toggleSideNav';
import fetchChildren from '../../actions/fetchChildren';

import Badge from 'material-ui/Badge';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import People from 'material-ui/svg-icons/social/people';




class SideBar extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      if(this.props.children.length === 0) {
        this.props.fetchChildren();
      }
    }


    returnListOfChildren() {
      return this.props.children.map((item, index) => {
        return (
          <Link to={`/dashboard/${item.name}/${item.coin}`} key={index}>
              <MenuItem primaryText={item.name}
                        onClick={ () => this.props.toggleSideNav(false) }
                        leftIcon={ <People /> } />
          </Link>
        )
      });

    }

    render() {
        return (
            <div className='side-bar-container'>
                <Drawer open={ this.props.dimensions.width >= 1013 ? true : this.props.sideNavOpen }
                        docked={ this.props.dimensions.width >= 1013 ? true : false }
                        onRequestChange={ () => this.props.dimensions.width >= 1013 ? null : this.props.toggleSideNav() }>

                    <Link to='/'>
                        <MenuItem className='logo-menu-item text-center' onClick={ () => this.props.toggleSideNav(false) }>
                            <h3>Donald's Children</h3>
                            <div className='logo-backdrop'></div>
                        </MenuItem>
                    </Link>
                    {this.returnListOfChildren()}
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sideNavOpen: state.sideNav.sideNavOpen,
        dimensions: state.dimenstions.dimensions,
        children: state.children.children
    };
}

export default connect(mapStateToProps, { toggleSideNav, fetchChildren })(SideBar);
