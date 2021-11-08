import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-datez/dist/css/react-datez.css';
import { ReactDatez } from 'react-datez'
import { Container, Dropdown, Form, Grid, Segment, Select, Button, Divider, Input, Table } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { restaurantOptions, transactionTimeOptions, compareType, filterOptions, operatorTypeOptions, companyData } from './Utility'

function App() {
  const [ restaurantIdsState, setRestaurantIds ]= useState([]);
  const [ fromDateState, setDateInput ] = useState("");
  const [ toDateState, setToDateInput ] = useState("");
  const [ fromHourState, setFromHour ] = useState(6);
  const [ toHourState, setToHour ] = useState(29);
  const [ metricCodeState, setMetricCode ] = useState("");
  const [ compareTypeState, setCompareType ] = useState("");
  const [ valueState, setValue ] = useState("");
  const [ operatorTypeState, setOperatorType ] = useState("And")
  
  const [ metrics, setMetrics ] = useState([])
  const [ resultData, setResultData ] = useState([]);


  /*function addCrieria() {
    const metricCriteriaNew = [];
    for (var i = 0; i < metricCriteriaTest.length; i++) {
      metricCriteriaNew[i] = metricCriteriaTest[i];
    } 

    metricCriteriaTest.push({
      metricCode: "",
      compareType: "",
      value: "",
      operatorType: "And"
    });
  }*/
  
  function onSubmit() {
    const formData = {
      restaurantIds: restaurantIdsState,
      fromDate: fromDateState,
      toDate: toDateState,
      fromHour: fromHourState,
      toHour: toHourState,
      metricCriteria: [{
        metricCode: metricCodeState,
        compareType: compareTypeState,
        value: Number(valueState),
        operatorType: operatorTypeState,
      }]
    };

    console.log(formData);

    const userPush = async (formData) => {
      const response = await fetch('https://customsearchqueryapi.azurewebsites.net/Search/Query', {
        method: 'POST',
        body: JSON.stringify(formData), // string or object
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.json();
    }

    userPush(formData).then(data => {
      console.log(data)
      setResultData(data)
    })
  }

  useEffect(() => {
    const url = "https://customsearchqueryapi.azurewebsites.net/Search/MetricDefinitions";
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const myJson = await response.json();
                console.log(myJson)
                setMetrics(myJson)
            } catch (error) {
                console.log("ERROR", error);
            }
        };
        fetchData();
  }, []);

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
                            value={fromDateState}
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
                            value={toDateState}
                          />
                        </Form.Field>                      
                      </Form.Group>

                      <Form.Group>
                        <Form.Field
                          control={Select}
                          label={'Transaction Time Start'}
                          options={transactionTimeOptions}
                          value={fromHourState}
                          placeholder='Start'
                          onChange={(event, data) => setFromHour(data.value)}
                        />
                        <Form.Field
                          control={Select}
                          label={'Transaction Time Start'}
                          options={transactionTimeOptions}
                          placeholder='End'
                          value={toHourState}
                          onChange={(event, data) => setToHour(data.value)}
                        />
                      </Form.Group>

                      {/* {metricCriteriaTest.map((criteria, index) => {
                        return(
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
                        <Form.Field
                          control={Select}
                          label={"Operator Type"}
                          options={operatorTypeOptions}
                          placeholder={"Type"}
                          onChange={(event, data) => setOperatorType(data.value)}
                        />
                      </Form.Group>
                        )
                      })} */}
                      
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
                        <Form.Field
                          control={Select}
                          label={"Operator Type"}
                          options={operatorTypeOptions}
                          placeholder={"Type"}
                          onChange={(event, data) => setOperatorType(data.value)}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Field>
                          <Button /*type="button onClick={() => addCriteria()}*/ color='violet'>Add Criteria</Button>
                        </Form.Field>
                      </Form.Group>

                      <Form.Field>
                        <Button color='teal' type='submit'>Submit</Button>
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
                        <Table.HeaderCell>Transaction Date</Table.HeaderCell>
                        <Table.HeaderCell>Order Number</Table.HeaderCell>
                        <Table.HeaderCell>Order Time</Table.HeaderCell>
                        {metrics.map((m, index) => { return <Table.HeaderCell key={index}>{m.metricCodeState}</Table.HeaderCell> })}
                    </Table.Row>
                  </Table.Header>

                  {resultData &&
                    <Table.Body>
                      {resultData.map((data, index) => {
                        return(
                          <Table.Row key={index}>
                            <Table.Cell>
                              {data["restaurantId"]}
                            </Table.Cell>
                            <Table.Cell>
                              {data["busDt"]}
                            </Table.Cell>
                            <Table.Cell>
                              {data["orderNumber"]}
                            </Table.Cell>
                            <Table.Cell>
                              {data["orderTime"]}
                            </Table.Cell>

                            {/* {metrics.map((m, index2) => {
                            const fieldName = m.metricCodeState[0].toLowerCase() + m.metricCodeState.substring(1);
                            return(
                              <Table.Cell key={index2}>
                                {data[fieldName]}
                              </Table.Cell>
                            )
                          })} */}
                          </Table.Row>
                        )
                      })}
                    </Table.Body>
                  }
                </Table>
            </Segment>



          </Container>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
