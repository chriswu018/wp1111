import '../styles.css';
import Input from './Input';
import List from './List';

function Main ({inputState}) {
    return(
        <section className="todo-app__main">
            <Input inputState={[inputState[0], inputState[1]]}/>
            <List inputState={[inputState[0], inputState[1], inputState[2], inputState[3], inputState[4], inputState[5]]}/>
        </section>
    );
  }

  export default Main;