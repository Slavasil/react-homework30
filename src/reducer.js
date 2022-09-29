import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'photos',
  initialState: {
    photos: [],
    focusedPhoto: -1
  },
  reducers: {
    addPhoto: (state, action) => {
      let newPhotos = state.photos.slice();
      newPhotos.splice(0, 0, action.payload);
      return {...state, focusedPhoto: 0, photos: newPhotos};
    },
    moveLeft: (state) => {
      let newFocusedPhoto = state.focusedPhoto > 0 ? state.focusedPhoto-1 : state.photos.length-1;
      return {...state, focusedPhoto: newFocusedPhoto};
    },
    moveRight: (state) => {
      let newFocusedPhoto = state.focusedPhoto < state.photos.length-1 ? state.focusedPhoto+1 : 0;
      return {...state, focusedPhoto: newFocusedPhoto};
    },
    moveTo: (state, action) => {
      return {...state, focusedPhoto: action.payload};
    },
    deletePhoto: (state, action) => {
      let index = typeof action.payload == 'number' ? action.payload : state.focusedPhoto;
      let newPhotos = state.photos.slice();
      newPhotos.splice(index, 1);
      let newFocusedPhoto = newPhotos.length > 0 ? state.focusedPhoto : -1;
      if (newPhotos.length - state.focusedPhoto == 0) newFocusedPhoto--;
      return {...state, photos: newPhotos, focusedPhoto: newFocusedPhoto}
    }
  }
});

export default slice.reducer;
export const { addPhoto, moveRight, moveLeft, deletePhoto, moveTo } = slice.actions;
