import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { Container, Dropdown, Form, Grid, Segment, Select, Button, Divider } from 'semantic-ui-react';
import { useState } from 'react';
import { restaurantOptions, transactionTimeOptions, compareType, filterOptions } from './Utility'
import { tsConstructorType } from '@babel/types';

const initialFormData = {
  restuarantIds: [],
  /*fromDate: undefined,
  toDate: undefined,
  focusedInput: undefined,*/
  fromHour: 6,
  toHour: 29,
  metricCriteria: [{
    metricCode: undefined,
    compareType: undefined,
    value: undefined,
    operatorType: 'And',
  }]
};

function App() {
  const [ restaurantIds, setRestaurantIds ]= useState([]);
  const [ fromHour, setFromHour ] = useState([6]);
  const [ toHour, setToHour ] = useState([29]);
  const [ fromDate, toDate, focusedInput] = useState([undefined]);

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
                    <Form /*onSubmit={() => onSubmit()}*/>
                      <Form.Field>
                        <label>Restuarant ID</label>
                        <Dropdown 
                          selection 
                          multiple 
                          placeholder='Select Restaurant ID'
                          options={restaurantOptions}
                          value={restaurantIds}
                          onChange={(event, data)=> setRestaurantIds(data.value)}
                        />
                      </Form.Field>

                      <Form.Group> 
                        <Form.Field>
                          <label>Date Range</label>
                          <DateRangePicker
                            /*startDate={this.state.startDate}
                            startDateId='startDate'
                            endDate={this.state.endDate}
                            endDateId='endDate'
                            onDatesChange={({startDate, endDate}) => {this.setState({startDate, endDate})}}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={(focusedInput) => {this.setState({focusedInput})}}*/
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

export default App;
