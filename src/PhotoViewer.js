import { useDispatch, useSelector } from 'react-redux';

import { moveRight, moveLeft, moveTo, deletePhoto } from './reducer';

export default function PhotoViewer() {
  const dispatch = useDispatch();
  const photosSelector = useSelector(state => state)

  const handleLeftButton = () => {
    dispatch(moveLeft());
  };
  const handleRightButton = () => {
    dispatch(moveRight());
  };
  const handleDeleteButton = () => {
    dispatch(deletePhoto());
  }
  const handlePhotoClick = (idx) => {
    dispatch(moveTo(idx));
  }

  const photos = photosSelector.photos;
  const focusedPhotoIndex = photosSelector.focusedPhoto;
  let newerPhotos = [];
  let focusedPhoto = null;
  let olderPhotos = [];
  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i];
    let element = <img src={photo.url} key={photo.id} onClick={()=>handlePhotoClick(i)} width="200" height="200" alt=""/>;
    if (i < focusedPhotoIndex) {
      newerPhotos.splice(0, 0, element);
    } else if (i === focusedPhotoIndex) {
      focusedPhoto = element;
    } else {
      olderPhotos.push(element);
    }
  }
  let photosNotEmpty = photos.length !== 0;
  return (
    <div className="photo-viewer">
      <div className="photo-viewer-side">
        {newerPhotos}
      </div>
      <div>
        <button disabled={!photosNotEmpty} onClick={handleLeftButton} className="icon-button button-left"></button>
      </div>
      <div className="photo-viewer-center">
        {focusedPhoto != null ? focusedPhoto :
          <div className="photo-viewer-placeholder"></div>}
        {photosNotEmpty && <button className="photo-viewer-delete-button" onClick={handleDeleteButton}>Удалить</button>}
      </div>
      <div>
        <button disabled={!photosNotEmpty} onClick={handleRightButton} className="icon-button button-right"></button>
      </div>
      <div className="photo-viewer-side">
        {olderPhotos}
      </div>
    </div>
  );
}
