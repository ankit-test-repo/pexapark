import {AgCartesianAxisOptions} from 'ag-charts-community';

export const MAX_OUTPUT: number = 10;
export const DEFAULT_BUCKET_SIZE = 24;
export const BUCKET_SIZES = [3, 4, 6, 8, 12, 24];

export const CHART_THEME = {
  palette: {
    fills: ['#4c90f1', '#ff3065', '#4e8558', '#ec7cb5', '#001e52'],
    strokes: ['#4c90f1', '#ff3065', '#4e8558', '#ec7cb5', '#001e52'],
  },
  overrides: {
    column: {
      series: {
        highlightStyle: {
          item: {
            fill: '#001e52',
            stroke: '#001e52',
          },
        },
      },
    },
  },
};



export const CAPACITY_FACTOR_CHART_AXES = [
  {
    type: 'category',
    position: 'bottom',
    gridStyle: [
      {
        strokeWidth: 0,
      },
    ],
  },
  {
    // primary y axis
    type: 'number',
    position: 'left',
    keys: ['capacityFactor'],
    title: {
      text: 'Electricity generated / ' + MAX_OUTPUT,
    },
  },
  {
    // secondary y axis
    type: 'number',
    position: 'right',
    min: 0,
    max: 24,
    keys: ['readings'],
    title: {
      text: 'Number of readings per bucket',
    },
  },
] as AgCartesianAxisOptions[];
