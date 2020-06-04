import React, { Component } from 'react'
import {
    LineChart,

} from "expo-chart-kit";
import {
    Text,
    View,
   
} from "react-native"
import Axios from 'axios'

class Graph extends Component {

    constructor(props){
        super(props);
        this.state={
            graphdata: [],
            label: [],
            Data :[]
        }
    }
    
    async componentDidMount(){
        await Axios.get('https://novel-corona.herokuapp.com/api/covid-19/')
            .then(res => {
                    console.log(res.data)
                    this.setState({graphdata : res.data.cases_time_series})
                    var label = [];
                    var Data = [];
                    res.data.cases_time_series.map(ramji => (
                        label.push(ramji.date),
                        Data.push(parseInt(ramji.totalconfirmed))
                    ))
                    this.setState({ label: label , Data: Data });
                })
                .catch( console.error)
    }
    
    render() {
        const { label , Data } = this.state;
        console.log(Data);

        //const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400} ,{name: 'Page A', uv: 600, pv: 2400, amt: 2400} ,{name: 'Page A', uv: 800, pv: 2400, amt: 2400}]
        return (
            <View>
                <Text>Bezier Line Chart</Text>
                <LineChart
                    data={{
                    labels: label,
                    datasets: [
                        {
                        data:Data
                        }
                    ]
                    }}
                    width={500} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                />
            </View>
        )
    }
}
export default Graph;