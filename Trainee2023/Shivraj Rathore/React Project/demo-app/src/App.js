import logo from './logo.svg';
import './App.css';
import Logos from './logoNew';
import Nav from 'rsuite/Nav';
import Sidebar from './sidebar';
import Main from './body';

function App() {
  return (
    <div className='container-fluid'>
      <div className="App">

        <header className="App-header">
          <div className='row'>
            <div className='col-md-4 d-flex justify-content-center align-items-center'>
              <Logos></Logos>
            </div>
            <div className='col-md-4 p-2 d-flex justify-content-center align-items-center'>
              <h2>Hello Welcome To React</h2>
            </div>
            <div className='col-md-4 p-2 d-flex justify-content-center align-items-center'>
              <p class="display-6">Shiv Raj
                <br />
                <div className='lead text-center'> ID : 7777</div>
              </p>
            </div>
          </div>
        </header>
        <div className='row '>
          <div className='col-md-2'>
            <Sidebar />
          </div>
          <div className='col-md-8'>
            <Main></Main>
          </div>
          <div className='col-md-2'>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

