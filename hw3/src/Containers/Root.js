import '../style.css';
import { useState } from 'react';
import Header from '../Components/Header';
import Main from '../Components/Main';
import Footer from '../Components/Footer';


function Root () {
  const [input, setInput] = useState([])

  return(
    <div className='todo-app__root'>
      <Header/>
      <Main inputState={[input, setInput]}/>
      <Footer inputData={input}/>
    </div>
  );
}

export default Root;