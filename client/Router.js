import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';
import updateDimensions from './actions/updateDimensions';

// const Home = asyncComponent({
//     resolve: () => import('./containers/Dapp/components/Home/Home')
// });

import SideNav from './components/SideNav/sideNav';
import TopNav from './components/TopNav/topNav';
import DashBoard from  './components/Dashboard/dashboard'


class Router extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

      this.props.updateDimensions(window.innerHeight, window.innerWidth);

      window.addEventListener('resize', () => {
          this.props.updateDimensions(window.innerHeight, window.innerWidth);
      });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                  <TopNav />
                  <SideNav />
                    <div className='main-stage-container'>
                        <Switch>
                            <Route path='/dashboard/:child/:coin' component={DashBoard} />
                            <Redirect from='*' to='/dashboard/Huey/Ethereum' />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
};



export default connect(null, { updateDimensions })(Router);
