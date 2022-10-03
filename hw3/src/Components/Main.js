import '../style.css';
import Input from './Input';
import List from './List';

function Main ({inputState}) {
    return(
        <section className="todo-app__main">
            <Input inputState={[inputState[0], inputState[1]]}/>
            <List inputState={[inputState[0], inputState[1]]}/>
        </section>
    );
  }

  export default Main;