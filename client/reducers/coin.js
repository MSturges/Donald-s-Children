import { FETCH_COIN_DATA } from '../actions/types';

const initialState = {
    coin: [],
};

const formatDataAndRank = (result) => {

  result.forEach((item, index) => {

      let formattedTimeSeries = item.timeSeries.reduce((newArray, timeItem, timeIndex) => {

        let singleTimeSeries = []
        let formattedDate =  new Date(timeItem.date).getTime()

          singleTimeSeries.push(formattedDate);
          singleTimeSeries.push(timeItem.price);

          newArray.push(singleTimeSeries);

        return newArray
      }, []);
      result[index].timeSeries = formattedTimeSeries;
    });
    return bubbleSortSites(result);
};


function bubbleSortSites(sites) {
  // copy sites to keep function pure(not to mutate parameters)
  let sitesCopy = sites.slice();
  // for loops need to best nested in order to iterate
  // through the items the correct number of times to compare every item with every other item
  for(let i = 0; i < sitesCopy.length; i++) {
    // - i - 1 because for every iteration your smallest item goes all the way to the right
    // and you don't need to compare to that item again the next time around
    for(let j = 0; j < (sitesCopy.length - i - 1); j++) {

        let lastItemInTimeSeriesCurrent = sitesCopy[j].timeSeries[sitesCopy[j].timeSeries.length-1][1];
        let lastItemInTimeSeriesNext = sitesCopy[j+1].timeSeries[sitesCopy[j+1].timeSeries.length-1][1];

        // if current item is less than the next, replace current with next and vice versa
        if(lastItemInTimeSeriesCurrent > lastItemInTimeSeriesNext) {
          let tmp = sitesCopy[j];
          sitesCopy[j] = sitesCopy[j+1];
          sitesCopy[j+1] = tmp;
        }
    }
  }

  return sitesCopy;
};


export default function (state = initialState , action) {

    switch (action.type) {
        case FETCH_COIN_DATA:

          let formattedDataAndRanked = formatDataAndRank(action.payload.data.result)

          return { ...state, coin: formattedDataAndRanked }
        default:
            return { ...state };
    }
};
