import '../styles.css';
import Popup from 'reactjs-popup';
 
const CustomPopup = ({ isOpen, onClose, phone }) => {
  const handleError = (e) => {
    e.target.src = "images/techwavelogo.png";
  };

 

  return (
    <Popup open={isOpen} closeOnDocumentClick onClose={onClose} modal nested>
      <div className='modal'>
        <div className='modal-content'>
          <span className='modal-close-icon' onClick={onClose}>&times;</span>
          <div className='modal-image-container'>
            <img src={`images/${phone.image}`} alt={phone.name} onError={handleError} className='modal-image' />
            <h3>Key Parameters</h3>
            <ul className='key-parameters'>
            <li  className="p-small">&#128073; {phone.key1}</li>
                <li  className="p-small">&#128073; {phone.key2}</li>
                <li  className="p-small">&#128073; {phone.key3}</li>
                <li  className="p-small">&#128073; {phone.key4}</li>
                <li  className="p-small">&#128073; {phone.key5}</li>
            </ul>
          </div>
          <div className='modal-details'>
            <h1 className='modal-title'>{phone.name}</h1>
            <button className="modal-close-btn"><i className="fa-regular fa-circle-play"></i> BUY FROM VIDEO STORE</button>
            <h3>Introduction</h3>
            <p className="p-small">{phone.description}</p> {}
            <div>
            <span className="phone-card-extras-popup">{phone.processor}</span>
            <span className="phone-card-extras-popup">{phone.warranty}</span>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};
 
export default CustomPopup;