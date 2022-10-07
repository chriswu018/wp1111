import '../styles.css';
import { useState } from 'react';
import Header from '../Components/Header';
import Main from '../Components/Main';
import Footer from '../Components/Footer';


function Root () {
  const [input, setInput] = useState([])
  const [done, setDone] = useState(0)
  const [del, setDel] = useState(0)

  return(
    <div className='todo-app__root'>
      <Header/>
      <Main inputState={[input, setInput, done, setDone, del, setDel]}/>
      <Footer inputData={[input, done, setDone, del, setDel]}/>
    </div>
  );
}

export default Root;