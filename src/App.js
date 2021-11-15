import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-datez/dist/css/react-datez.css';
import { ReactDatez } from 'react-datez'
import { Container, Dropdown, Form, Grid, Segment, Select, Button, Divider, Input, Table, Pagination, Icon } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { restaurantOptions, transactionTimeOptions, compareType, filterOptions, operatorTypeOptions, formatValues } from './Utility'

const initialMetricCriteria = [{
  metricCode: "",
  compareType: "",
  value: "",
  operatorType: "And",
}]

function App() {
  const [ restaurantIdsState, setRestaurantIds ]= useState([]);
  const [ fromDateState, setDateInput ] = useState("");
  const [ toDateState, setToDateInput ] = useState("");
  const [ fromHourState, setFromHour ] = useState(6);
  const [ toHourState, setToHour ] = useState(29);
  
  const [ metrics, setMetrics ] = useState([]);
  const [ resultData, setResultData ] = useState([]);
  const [ metricCriteriaState, setMetricCriteria ] = useState(initialMetricCriteria);
  const [ activePageState, setActivePage ] = useState(1);
  const itemsPerPage = 10;

  function addCriteria() {
    const metricCriteriaNew = [];
    for (var i = 0; i < metricCriteriaState.length; i++) {
      metricCriteriaNew[i] = metricCriteriaState[i];
    } 

    metricCriteriaNew.push({
      metricCode: "",
      compareType: "",
      value: "",
      operatorType: "And"
    });

    setMetricCriteria(metricCriteriaNew);
  } 

  function removeCriteria(index) {
    const metricCriteriaNew = [];
    for (var i = 0; i < metricCriteriaState.length; i++) {
      metricCriteriaNew[i] = metricCriteriaState[i];
    } 

    metricCriteriaNew.splice(index, 1);
    setMetricCriteria(metricCriteriaNew);
  }

  function changeMetricCriteria(index, propertyName, data) {
    const metricCriteriaNew = []
    for(var i = 0; i < metricCriteriaState.length; i++) {
      metricCriteriaNew[i] = metricCriteriaState[i]
    }

    if(propertyName === "value") {
      metricCriteriaNew[index][propertyName] = Number(data.value);
    }else{
      metricCriteriaNew[index][propertyName] = data.value;
    }

    setMetricCriteria(metricCriteriaNew)
  }

  function changePage(data){
    setActivePage(data.activePage)
  }
  const slicedResultsData = resultData.slice((activePageState - 1) * itemsPerPage, activePageState * itemsPerPage)
  
  function onSubmit() {
    const formData = {
      restaurantIds: restaurantIdsState,
      fromDate: fromDateState,
      toDate: toDateState,
      fromHour: fromHourState,
      toHour: toHourState,
      metricCriteria: metricCriteriaState
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

                      {metricCriteriaState.map((criteria, index) => {
                        return(
                          <Form.Group key={index}>
                            {metricCriteriaState.length > 1 &&
                              <Form.Field>
                                <div>
                                  <Icon name='close' onClick={() => removeCriteria(index)}/>
                                </div>
                              </Form.Field>
                            }
                            <Form.Field
                              control={Select}
                              label='Metric'
                              options={filterOptions}
                              placeholder='Select Metric'
                              value={metricCriteriaState[index].metricCode}
                              onChange={(event, data) => changeMetricCriteria(index, 'metricCode', data)}
                            />
                            <Form.Field
                              control={Select}
                              options={compareType}
                              label='Comparator'
                              placeholder='Select Comparator'
                              value={metricCriteriaState[index].compareType}
                              onChange={(event, data) => changeMetricCriteria(index, 'compareType', data)}
                            />
                            <Form.Field
                              control={Input}
                              label='Value'
                              placeholder='e.g. 12345'
                              value={metricCriteriaState[index].value}
                              onChange={(event, data) => changeMetricCriteria(index, 'value', data)}
                            />
                            <Form.Field
                              control={Select}
                              label={"Operator Type"}
                              options={operatorTypeOptions}
                              placeholder={"Type"}
                              value={metricCriteriaState[index].operatorType}
                              onChange={(event, data) => changeMetricCriteria(index, 'operatorType', data)}
                              disabled={index === 0 ? true : false}
                            />
                          </Form.Group>
                        )
                      })}


                      <Form.Group>
                        <Form.Field>
                          <Button type='button' onClick={() => addCriteria()} color='violet'>Add Criteria</Button>
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
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <h3>Results</h3>
                  </Grid.Column>
                  <Grid.Column>
                    {resultData.length >= itemsPerPage &&
                      <Pagination
                        className={'Page'}
                        size='small'
                        activePage={activePageState}
                        onPageChange={(event, data) => changePage(data)}
                        totalPages={Math.ceil(resultData.length / itemsPerPage)}

                        ellipsisItem={{
                          content: <Icon name='ellipsis horizontal'/>,
                          icon: true
                        }}
                        firstItem={null}
                        lastItem={null}
                        prevItem={null}
                        nextItem={null}
                      />
                    }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
                <Table celled>   
                  <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Restaurant ID</Table.HeaderCell>
                        <Table.HeaderCell>Transaction Date</Table.HeaderCell>
                        <Table.HeaderCell>Transaction Time</Table.HeaderCell>
                        <Table.HeaderCell>Ticket Number</Table.HeaderCell>
                        {metrics.map((m, index) => { return <Table.HeaderCell key={index}>{m.alias}</Table.HeaderCell> })}
                    </Table.Row>
                  </Table.Header>

                  {resultData &&
                    <Table.Body>
                      {slicedResultsData.map((data, index) => {
                        return(
                          <Table.Row key={index}>
                            <Table.Cell>
                              {data["restaurantId"]}
                            </Table.Cell>
                            <Table.Cell>
                              {formatValues(data["busDt"], "Date", 0)}
                            </Table.Cell>
                            <Table.Cell>
                              {formatValues(data["orderTime"], "Time", 0)}
                            </Table.Cell>
                            <Table.Cell>
                              {data["orderNumber"]}
                            </Table.Cell>

                            {metrics.map((m, index2) => {
                            const fieldName = m.metricCode[0].toLowerCase() + m.metricCode.substring(1);
                            return(
                              <Table.Cell key={index2}>
                                {formatValues(data[fieldName], m.dataType, m.decimalPlaces)}
                              </Table.Cell>
                            )
                            })}
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
