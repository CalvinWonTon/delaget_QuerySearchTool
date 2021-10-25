import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-datez/dist/css/react-datez.css';
import { ReactDatez } from 'react-datez'
import { Container, Dropdown, Form, Grid, Segment, Select, Button, Divider, Input } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { restaurantOptions, transactionTimeOptions, compareType, filterOptions } from './Utility'

const initialFormData = {
  restuarantIds: [],
  fromDate: "",
  toDate: '',
  fromHour: 6,
  toHour: 29,
  metricCriteria: [{
    metricCode: "",
    compareType: "",
    value: "",
    operatorType: 'And',
  }]
};

function App() {
  const [ restaurantIds, setRestaurantIds ]= useState([]);
  const [ fromDate, setDateInput ] = useState("");
  const [ toDate, setToDateInput ] = useState("");
  const [ fromHour, setFromHour ] = useState([6]);
  const [ toHour, setToHour ] = useState([29]);

  /*
  const userPull = async () => {
    const response = await fetch('https://http://localhost:3000/');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
  }

  useEffect(() => {
    userPull();
    console.log("Information");

  }, []);

  const request = {"restaurantIds":[1],"fromDate":"2020-09-22T00:00:00","toDate":"2020-09-22T00:00:00","fromHour":6,"toHour":29,"metricCriteria":[{"metricCode":"TotalAmount","compareType":"GreaterThanOrEqual","value":35,"operatorType":"And"}]};

  const userPush = async () => {
    const response = await fetch('https://http://localhost:3000/', {
      method: 'POST',
      body: request, // string or object
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(response);
  }*/
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const form = {restaurantIds, fromDate, toDate, fromHour, toHour};
    fetch('http://http://localhost:3000/', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json' 
      }
    }).then(() => {
      console.log(form)
    })
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
                    <Form onSubmit={handleSubmit}>
                      <Form.Field>
                        <label>Restuarant ID</label>
                        <Dropdown 
                          selection 
                          multiple={true}
                          placeholder='Select Restaurant ID'
                          options={restaurantOptions}
                          value={restaurantIds}
                          onChange={(event, data)=> setRestaurantIds(data.value)}
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
                            handleChange={value => {setDateInput(value)}}
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
                            handleChange={value => {setToDateInput(value)}}
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
                          label='Filter'
                          options={filterOptions}
                          placeholder='Select Filter'
                        />
                        <Form.Field
                          control={Select}
                          options={compareType}
                          label='Metric'
                          placeholder='Select Metric'
                        />
                        <Form.Field
                          control={Input}
                          label='Value'
                          placeholder='e.g. 12345'
                          
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
            </Segment>
          </Container>
        </Grid.Row>
      </Grid>
    </div>
  );
}

function addCriteria() {

}

export default App;
