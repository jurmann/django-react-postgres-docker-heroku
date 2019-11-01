import React from 'react';
import axios from 'axios';
import './App.css';

function handleSubmit(event) {
  const text = document.querySelector('#char-input').value

  axios.get(`/uppercase_text?text=${text}`).then(({data}) => {
      document.querySelector('#uppercase-text').textContent = `${data.uppercase_text}`
    })
    .catch(err => console.log(err))
}

function App() {
  return (
    <div className="App">
      <div>
        <label htmlFor='char-input'>Make this text uppercase: </label>
        <input id='char-input' type='text' />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div>
        <h3 id='uppercase-text'></h3>
      </div>
    </div>
  );
}

export default App;
