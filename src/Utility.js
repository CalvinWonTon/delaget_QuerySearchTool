import moment from 'moment'

export function formatValues(value, dataType, decimalPlaces) {
  if(dataType === "Percent") {
    return (value * 100).toFixed(decimalPlaces) + "%";
  }else if(dataType === "Money") {
    return "$" + value.toFixed(decimalPlaces);
  }else if(dataType === "Date") {
    return moment(value).format("MM/DD/YYYY");
  }else if(dataType === "Time") {
    return moment(value).format("hh:mm A");
  }else{
    return value.toFixed(decimalPlaces);
  }
}

export const restaurantOptions = [
  { 
    key: 1, 
    value: 1, 
    text: 'Restuarant 1' 
  },
  { 
    key: 2, 
    value: 2, 
    text: 'Restuarant 2' 
  },
  { 
    key: 3, 
    value: 3, 
    text: 'Restuarant 3' 
  },
  { 
    key: 4, 
    value: 4, 
    text: 'Restuarant 4' 
  },
  { 
    key: 5, 
    value: 5, 
    text: 'Restuarant 5' 
  },
  { 
    key: 6, 
    value: 6, 
    text: 'Restuarant 6' 
  },
  { 
    key: 7, 
    value: 7, 
    text: 'Restuarant 7' 
  },
  { 
    key: 8, 
    value: 8, 
    text: 'Restuarant 8' 
  },
  { 
    key: 9, 
    value: 9, 
    text: 'Restuarant 9' 
  },
  { 
    key: 10,
    value: 10,
    text: 'Restuarant 10' 
  },
];

export const filterOptions = [
  { 
    key: 1, 
    value: 'TotalAmount', 
    text: 'Transaction Total Amount $' 
  },
  { 
    key: 2, 
    value: 'NetAmount', 
    text: 'Transaction Net Amount $' 
  },
  { 
    key: 3, 
    value: 'ItemSoldQty', 
    text: 'Item Sold #' 
  },
  { 
    key: 4, 
    value: 'BeverageQty', 
    text: 'Beverage #' 
  },
  { 
    key: 5, 
    value: 'DiscountAmount', 
    text: 'Discount Amount $' 
  },
  { 
    key: 6, 
    value: 'ItemDeletedAmount', 
    text: 'Item Deleted Amount #' 
  },
  { 
    key: 7, 
    value: 'DiscountRatio', 
    text: 'Discount Ratio %' 
  },
  { 
    key: 8, 
    value: 'RefundAmount', 
    text: 'Refund Amount $' 
  },
];

export const compareType = [
  { 
    key: 1,
    text: '<=', 
    value: 'LessThanOrEqual'  
  },
  { 
    key: 2, 
    text: '<',
    value: 'LessThan'  
  },
  { 
    key: 3, 
    text: '=',
    value: 'Equal' 
  },
  { 
    key: 4, 
    text: '>',
    value: 'GreaterThan'
  },
  { 
    key: 5,
    text: '>=', 
    value: 'GreaterThanOrEqual',
  },
];

export const transactionTimeOptions = [
  {
    key: 1,
    text: "6 am",
    value: 6
  },
  {
    key: 2,
    text: "7 am",
    value: 7
  },
  {
    key: 3,
    text: "8 am",
    value: 8
  },
  {
    key: 4,
    text: "9 am",
    value: 9
  },
  {
    key: 5,
    text: "10 am",
    value: 10
  },
  {
    key: 6,
    text: "11 am",
    value: 11
  },
  {
    key: 7,
    text: "12 pm",
    value: 12
  },
  {
    key: 8,
    text: "1 pm",
    value: 13
  },
  {
    key: 9,
    text: "2 pm",
    value: 14
  },
  {
    key: 10,
    text: "3 pm",
    value: 15
  },
  {
    key: 11,
    text: "4 pm",
    value: 16
  },
  {
    key: 12,
    text: "5 pm",
    value: 17
  },
  {
    key: 13,
    text: "6 pm",
    value: 18
  },
  {
    key: 14,
    text: "7 pm",
    value: 19
  },
  {
    key: 15,
    text: "8 pm",
    value: 20
  },
  {
    key: 16,
    text: "9 pm",
    value: 21
  },
  {
    key: 17,
    text: "10 pm",
    value: 22
  },
  {
    key: 18,
    text: "11 pm",
    value: 23
  },
  {
    key: 19,
    text: "12 am",
    value: 24
  },
  {
    key: 20,
    text: "1 am (next day)",
    value: 25
  },
  {
    key: 21,
    text: "2 am (next day)",
    value: 26
  },
  {
    key: 22,
    text: "3 am (next day)",
    value: 27
  },
  {
    key: 23,
    text: "4 am (next day)",
    value: 28
  },
  {
    key: 24,
    text: "5 am (next day)",
    value: 29
  }
];

export const operatorTypeOptions = [
  {
    key: 1,
    text: 'And',
    value: 'And'
  },
  {
    key: 2,
    text: 'Or',
    value: 'Or'
  }
];