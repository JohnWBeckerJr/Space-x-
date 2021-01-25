import React, { Component } from 'react'; 
import { gql } from "apollo-boost"; 
import { useQuery, ApolloConsumer } from "@apollo/react-hooks";

const LAUNCHES_QUERY = gql `
query LaunchesQuery {
    launches{
        flight_number
        mission_name
        date_local
        launch_success

    }
}
`;


export class Launches extends Component {
    render() {
        return(
            <div>
                <h1 className = "display-4 my-3">Launches</h1>
                <useQuery query = {LAUNCHES_QUERY}>
                    {
                        ({loading, error, data}) => {
                            if(loading) return <h4>Loading...</h4>
                            if(error) console.log(error);
                            console.log(data)
                            return <h1>Test</h1>
                        }
                    }
                </useQuery>
            </div>
        )
    }
}

export default Launches; 