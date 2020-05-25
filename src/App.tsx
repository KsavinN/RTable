import * as React from 'react';
import './App.css';
import data from './dummyData';
import { RTable } from './table/table';

function App() {
  const columns = [
    {
      name: 'Name',
      width: 100,
    },
    {
      name: 'Email',
      width: 200,
    },
    {
      name: 'Money',
      width: 100,
    },
    {
      name: 'Date',
      width: 300,
    },
  ];
  const resumeColumn = {
    name: 'Resume Column',
    resumeFunc: (ele:any) => ele.name + ele.money,  
  } 

  const CodeExample = `
  const columnsConfig = [
    {
      name: 'Name',
      width: 100,
    },
    {
      name: 'Email',
      width: 200,
    },
    {
      name: 'Money',
      width: 100,
    },
    {
      name: 'Date',
      width: 300,
    },
  ];

  const resumeColumnConfig = {
    name: 'Resume Column',
    resumeFunc: (ele:any) => ele.name + ele.money,  
  }
  `

  return (
    <div className="App">

        <div>
        <h1>Demo of RTable</h1>
        <div>
          <pre>
            Config for table
                <code>
                    {CodeExample}
                </code>
              </pre>
        </div>
        <div className="demoBox">
          <h2>Result : </h2>
           
          <RTable resumeColumn={resumeColumn} data={data} columns={columns} />
        </div>
          
        </div>
        
    </div>
  );
}

export default App;
