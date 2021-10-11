import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

function App() {
  const restaurantOptions = [
    { key: 'ph', value: 'ph', text: 'Pizza Hut' },
    { key: 'tb', value: 'tb', text: 'Taco Bell' },
    { key: 'md', value: 'md', text: 'McDonalds' },
  ]

  const filterOptions = [
    { key: 'tta', value: 'tta', text: 'TransactionTotalAmount' },
    { key: 'tna', value: 'tna', text: 'TransactionNetAmount' },
    { key: 'isq', value: 'isq', text: 'ItemSoldQty' },
    { key: 'bq', value: 'bq', text: 'BeverageQty' },
    { key: 'da', value: 'da', text: 'DiscountAmount' },
    { key: 'ida', value: 'ida', text: 'ItemDeletedAmount' },
    { key: 'dr', value: 'dr', text: 'DiscountRatio' },
    { key: 'ra', value: 'ra', text: 'RefundAmount' },
  ]

  const measureOptions = [
    { key: '1', value: '1', text: '<=' },
    { key: '2', value: '2', text: '<' },
    { key: '3', value: '3', text: '=' },
    { key: '4', value: '4', text: '>' },
    { key: '4', value: '5', text: '>=' },
  ]

  return (
    <div className="App">
      <h4>Restaurants</h4>
      <Dropdown 
        selection
        placeholder='Select Restaurant'
        search
        clearable options={restaurantOptions}
      />

      <h4>Dates</h4>
      <Dropdown
        selection 
        placeholder='MM/DD/YYYY'
        clearable
      />

      <h4>Transaction Times</h4>
      <p><Input placeholder='HH:MM'/>to<Input placeholder='HH:MM'/></p>

      <h4>Metrics</h4>
      <p><Dropdown placeholder='Filter' selection clearable options={filterOptions}/>
      <Dropdown placeholder='Measure' selection clearable options={measureOptions}/>
      <Input placeholder='Amount'/></p>
    </div>
  );
}

export default App;
