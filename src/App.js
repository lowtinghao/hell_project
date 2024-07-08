import './App.css';
import { useState } from 'react';
import EditForm from './EditForm';
import PreviewForm from './PreviewForm';


function App() {
  const EDIT = 0;
  const PREVIEW = 1;
  const [tab, setTab] = useState(PREVIEW);

  const Child = tab === EDIT ? EditForm : PreviewForm;

  return (
    <><div>
      <div>
        <span onClick={() => { setTab(EDIT); } }>Edit</span> &nbsp; | &nbsp;
        <span onClick={() => { setTab(PREVIEW); } }>Preview</span>
      </div>
      <hr />
      <Child />
    </div></>
  );
}

export default App;
