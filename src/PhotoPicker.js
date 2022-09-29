import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addPhoto } from './reducer';

export default function PhotoPicker() {
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const handlePickFileClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      dispatch(addPhoto({url: reader.result, id: Math.random()}));
    });
    const waitForLoad = () => (new Promise((resolve) => {
      const listener = () => {
        reader.removeEventListener('load', listener)
        resolve();
      };
      reader.addEventListener('load', listener)
    }));
    for (let file of files) {
      reader.readAsDataURL(file);
      await waitForLoad();
    }
  };
  return (
    <div className="photo-picker">
      <div className="photo-picker-button" onClick={handlePickFileClick}>Выбрать изображение</div>
      <input type="file" accept="image/*" multiple onChange={handleFileChange} ref={fileInputRef}/>
    </div>
  );
}
