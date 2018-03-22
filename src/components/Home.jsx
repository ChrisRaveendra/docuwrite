import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableHeaderColumn,
//   TableRow,
//   TableRowColumn,
// } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import axios from 'axios';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [{ title: 'testing' }],
    }
  }
  // componentWillMount() {
  //   // fetch documents
  // }
  createNewDoc() {
    axios.get('http://localhost:3000/newdoc')
    .then( ( { data } ) => console.log(data) )
    .catch( err => console.log(err) )
  }
  
  render() {
    return (<div>
      <Paper>
        <RaisedButton label="create a new document"
        onClick = {(e) => this.createNewDoc(e) }/>
      </Paper>
    </div>)
  }
}
