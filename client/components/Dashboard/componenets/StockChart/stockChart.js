import React, { PureComponent } from 'react';
var ReactHighstock = require('react-highcharts/ReactHighstock.src');

class StockChart extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
          highChartConfig: {
            chart: {
              type: 'line',
              zoomType: 'xy'
            },
            rangeSelector: {
              selected: 1
            },

            title: {
              text: ''
            },
            subtitle: {
              text: ''
            },
            series: [{
              name: '',
              data: [],
              tooltip: {
                valueDecimals: 4
              }
            }]
          }
        };
    }

    componentDidMount() {

      let dataClone = { ...this.state.highChartConfig };

      dataClone.series[0].data = this.props.data.timeSeries;
      dataClone.series[0].name = this.props.data.coinName;
      dataClone.title.text = `${this.props.data.siteName}`;
      dataClone.subtitle.text = `${this.props.data.coinName} to BTC`;


      this.setState({
        ...this.state,
        highChartConfig: dataClone
      });


      setTimeout(() => {
      }, 100);
    };

    render() {
        return (
          <div className="stock-chart-container">
            <ReactHighstock config={this.state.highChartConfig} ref='chart'></ReactHighstock>
          </div>
        );
    }
}


export default StockChart
