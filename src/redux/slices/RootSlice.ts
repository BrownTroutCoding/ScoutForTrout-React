import { createSlice } from "@reduxjs/toolkit";

const generateId = () => Math.floor(Math.random() * 1000000);

const rootSlice = createSlice({
  name: "root",
  initialState: {
    id: "ID",
    name: "Name",
    latitude: "Latitude",
    longitude: "Longitude",
    description: "Description",
    user_token: "User Token"
  },
  reducers: {
    chooseId: (state) => { state.id = generateId().toString() },
    chooseName: (state, action) => { state.name = action.payload },
    chooseLatitude: (state, action) => { state.latitude = action.payload },
    chooseLongitude: (state, action) => { state.longitude = action.payload },
    chooseDescription: (state, action) => { state.description = action.payload },
    chooseUserToken: (state, action) => { state.user_token = action.payload },
  }
});

export const reducer = rootSlice.reducer;
export const { chooseId, chooseName, chooseLatitude, chooseLongitude, chooseDescription, chooseUserToken } = rootSlice.actions;
