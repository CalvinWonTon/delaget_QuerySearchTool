import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-datez/dist/css/react-datez.css';
import { ReactDatez } from 'react-datez'
import { Container, Dropdown, Form, Grid, Segment, Select, Button, Divider, Input, Table } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { restaurantOptions, transactionTimeOptions, compareType, filterOptions } from './Utility'

function App() {
  const [ restaurantIds, setRestaurantIds ]= useState([]);
  const [ fromDate, setDateInput ] = useState("");
  const [ toDate, setToDateInput ] = useState("");
  const [ fromHour, setFromHour ] = useState(6);
  const [ toHour, setToHour ] = useState(29);
  const [ metricCodeState, setMetricCode ] = useState("");
  const [ compareTypeState, setCompareType ] = useState("");
  const [ valueState, setValue ] = useState("");

  const userPull = async () => {
    const response = await fetch('https://customsearchqueryapi.azurewebsites.net/Search/MetricDefinitions');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
  }

  useEffect(() => {
    userPull();
    console.log("Information");

  }, []);

  //const request = {"restaurantIds":[1],"fromDate":"2020-09-22T00:00:00","toDate":"2020-09-22T00:00:00","fromHour":6,"toHour":29,"metricCriteria":[{"metricCode":"TotalAmount","compareType":"GreaterThanOrEqual","value":35,"operatorType":"And"}]};

  const userPush = async (formData) => {
    const response = await fetch('https://customsearchqueryapi.azurewebsites.net/Search/Query', {
      method: 'POST',
      body: JSON.stringify(formData), // string or object
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
  }

  function onSubmit() {
    const formData = {
      restuarantIds: restaurantIds,
      fromDate: fromDate,
      toDate: toDate,
      fromHour: fromHour,
      toHour: toHour,
      metricCriteria: [{
        metricCode: metricCodeState,
        compareType: compareTypeState,
        value: parseFloat(valueState),
        operatorType: 'And',
      }]
    };

    console.log(formData);

    userPush(formData);
  }

  return (
    <div className="App">
      <Grid>
        <Grid.Row>
          <Container>
            <Segment className='Segment'>
              <Grid centered>
                <Grid.Row columns='1'>
                  <Grid.Column textAlign='center'>
                    <h3>Custom Search Query Tool</h3>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns='1'>
                  <Grid.Column>
                    <Form onSubmit={() => onSubmit()}>
                      <Form.Field>
                        <label>Restuarant ID</label>
                        <Dropdown 
                          selection 
                          multiple={true}
                          placeholder='Select Restaurant ID'
                          options={restaurantOptions}
                          onChange={(event, data) => setRestaurantIds(data.value)}
                        />
                      </Form.Field>

                      <Form.Group> 
                        <Form.Field>
                          <label>Start Date</label>
                          <ReactDatez
                            name="fromDate"
                            allowPast
                            dateFormat='MM/DD/YYYY'
                            placeholder='MM/DD/YYYY'
                            firstDayOfWeek='Su'
                            handleChange={fromDate => {setDateInput(fromDate)}}
                            value={fromDate}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>End Date</label>
                          <ReactDatez
                            name="toDate"
                            allowPast
                            dateFormat='MM/DD/YYYY'
                            placeholder='MM/DD/YYYY'
                            firstDayOfWeek='Su'
                            handleChange={toDate => {setToDateInput(toDate)}}
                            value={toDate}
                          />
                        </Form.Field>                      
                      </Form.Group>

                      <Form.Group>
                        <Form.Field
                          control={Select}
                          label={'Transaction Time Start'}
                          options={transactionTimeOptions}
                          value={fromHour}
                          placeholder='Start'
                          onChange={(event, data) => setFromHour(data.value)}
                        />
                        <Form.Field
                          control={Select}
                          label={'Transaction Time Start'}
                          options={transactionTimeOptions}
                          placeholder='End'
                          value={toHour}
                          onChange={(event, data) => setToHour(data.value)}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Field
                          control={Select}
                          label='Metric'
                          options={filterOptions}
                          placeholder='Select Metric'
                          value={metricCodeState}
                          onChange={(event, data) => setMetricCode(data.value)}
                        />
                        <Form.Field
                          control={Select}
                          options={compareType}
                          label='Comparator'
                          placeholder='Select Comparator'
                          value={compareTypeState}
                          onChange={(event, data) => setCompareType(data.value)}
                        />
                        <Form.Field
                          control={Input}
                          label='Value'
                          placeholder='e.g. 12345'
                          value={valueState}
                          onChange={(event, data) => setValue(data.value)}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Field>
                          <Button /*onClick={() => addCriteria()}*/ color='blue'>Add Criteria</Button>
                        </Form.Field>
                      </Form.Group>
                      <Form.Field>
                        <Button color='olive' type='submit'>Submit</Button>
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Container>
        </Grid.Row>
        <Divider hidden></Divider>
        <Grid.Row>
          <Container>
            <Segment>
              <h3>Results</h3>
              <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Restaurant ID</Table.HeaderCell>
                  <Table.HeaderCell>BusDt</Table.HeaderCell>
                  <Table.HeaderCell>Order Time</Table.HeaderCell>
                  <Table.HeaderCell>Ticket Nunmber</Table.HeaderCell>
                  <Table.HeaderCell>Net Amount</Table.HeaderCell>
                  <Table.HeaderCell>Total Amount</Table.HeaderCell>
                  <Table.HeaderCell>Items Sold</Table.HeaderCell>
                  <Table.HeaderCell>Beverage Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Discount Amount</Table.HeaderCell>
                  <Table.HeaderCell>Discount Ratio</Table.HeaderCell>
                  <Table.HeaderCell>Deleted Items</Table.HeaderCell>
                  <Table.HeaderCell>Refund Amount</Table.HeaderCell>
                </Table.Row>
              </Table.Header>   

               <Table.Body>

               </Table.Body>
            </Table>
            </Segment>



          </Container>
        </Grid.Row>
      </Grid>
    </div>
  );
}

/*function addCriteria() {

}*/

export default App;
