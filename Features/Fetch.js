import {
    createSlice
} from '@reduxjs/toolkit';
import Axios from 'axios';

export const FetchSlice = createSlice({
    name: 'fetch',
    initialState: {
        status: {},
        isfetched: false,
        State: '',
        distance: '',
        stateData: {},
        currentDist: '',
        zones: {},
        currentState: {},
        zoneDist: {},
        ZoneState : {},
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setDetails: (state, action) => {
            state.News = action.payload.Response;
        },
        setFetched: (state, action) => {
            state.isfetched = true;
        },
        setState: (state, action) => {
            state.State = action.payload;
        },
        setDistance: (state, action) => {
            state.distance = action.payload/1000;
        },
        setStateData: (state, action) => {
            state.stateData = action.payload;
        },
        setCurrentDist: (state, action) => {
            state.currentDist = action.payload;
        },
        setZones: (state, action) => {
            state.zones = action.payload;
        },
        setCurrentState: (state, action) => {
            state.currentState = action.payload;
        },
        setZoneDist: (state, action) => {
            state.zoneDist = action.payload;
        },
        setZoanState: (state, action) => {
            state.ZoanState = action.payload;
        }
    },
});

export const {
    setStatus,
    setDetails,
    setFetched,
    setState,
    setDistance,
    setStateData,
    setZones,
    setCurrentDist,
    setCurrentState,
    setZoneDist,
    setZoanState,
} = FetchSlice.actions;

export const init = () => async (dispatch) => {
    await Axios.get('https://novel-corona.herokuapp.com/api/covid-19/status-count')
        .then(res => {
            dispatch(setStatus(res.data[0]))
        })
        .catch(err => console.error)
    
};


export const getLocation = (lat, lon) => async (dispatch) => {
   const payload =  {Latitude : lat , Longitude :lon}         
    await Axios.post('https://novel-corona.herokuapp.com/api/covid-19/geodata' , payload)
        .then( (res) => {     
            dispatch(setState(res.data));
    })
}


export const getDistance = (lat, lon) => async (dispatch) => {
    var url = "https://script.google.com/macros/s/AKfycbwqcrVhD9D6Oi2aIi9EG16ks3hLjbJqag_jznwxqpY88xdoBQun/exec?lat=" + lat + "&long=" + lon;
    await Axios.get(url)
        .then(res => {
            dispatch(setDistance(res.data))
        })
}

export const getStateData = (s) => async (dispatch) => {
    console.log(s)
    var data = s.state;
    if (data === "Telangana") {
        data = "Telengana"
    }
    var url = "https://novel-corona.herokuapp.com/api/covid-19/state";
    await Axios.get(url)
        .then(res => {
            console.log(res.data)
            res.data.map(item => {
                if (data == item.state) {
                    console.log(item);
                    dispatch(setCurrentState(item));
                }
            })
            dispatch(setStateData(res.data))
        })
        .catch(err =>console.log(err))
}

export const getZones = (s) => async (dispatch) => {
    var url = 'https://novel-corona.herokuapp.com/api/covid-19/zones';
    var data = s.city;
    var myStart = [];
    if (data === 'Secunderabad') {
        data = 'Hyderabad'
    }
    Axios.get(url)
        .then(res => {
            dispatch(setZones(res.data.zones))
            res.data.zones.map(zone => {
                if (data == zone.district) {
                    dispatch(setZoneDist(zone));
                }
                if (s.state == zone.state) {
                    myStart.push(zone);
                }
            })
            dispatch(setZoanState(myStart));
        })
}

export const SetFetched = () => dispatch => {
    dispatch(setFetched())
}

export const selectCount = state => state.counter.value;

export default FetchSlice.reducer;