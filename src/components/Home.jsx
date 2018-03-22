import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import AddContentIcon from 'material-ui/svg-icons/content/add';
// import FontIcon from 'material-ui/FontIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SocialShareIcon from 'material-ui/svg-icons/social/share';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      selected: [],
      dialogOpen: false,
    };
  }

  componentWillMount() {
    axios.get('http://localhost:3000/docs').then(({ data }) => {
      if (data.success) {
        this.setState({ documents: data.docs });
      }
    }).catch(err => console.log(err));
  }
  createNewDoc() {
    axios.get('http://localhost:3000/newdoc')
    .then(({ data }) => {
      if (data.success) {
        this.props.socket.emit('join-document', { userID: this.props.userID, docID: this.state.documents[rowNum]._id}, ({room, state}) => {
          if (room) {
            this.props.joinDoc(room, state, { docID: this.state.documents[rowNum]._id});
          }
        });
      }
    })
    .catch(err => console.log(err));
  }
  deleteDocs() {
    const selectedDocIDs = this.state.documents
                          .filter((x, index) => this.state.selected.indexOf(index) > -1)
                          .map(doc => doc._id);
    this.props.socket.emit('delete-document',
    { docIDs: selectedDocIDs, userID: this.props.userID},
    ({success, errors}) => {
      let newDocs = this.state.documents.filter((doc) => Object.keys(success).indexOf(doc._id) < 0).map(doc => Object.assign({}, doc));
      this.setState({ dialogOpen: false, selected: [] , documents: newDocs });
    })
  }

  shareDocs(e) {
    console.log('hello from share');
    debugger;
    e.preventDefault();
    const { selected } = this.state;
    console.log(this.state.documents.filter((x, index) => selected.indexOf(index) > -1));
    this.props.socket.emit('share-document', { docIDs: this.state.documents.filter((x, index) => selected.indexOf(index) > -1)})
  }
  openDoc(rowNum, colNum) {
    // console.log('in openDoc', rowNum, colNum);
    if (this.state.documents[rowNum]) {
      this.props.socket.emit('join-document', { userID: this.props.userID, docID: this.state.documents[rowNum]._id}, ({room, state}) => {
        if (room) {
          this.props.joinDoc(room, state, { docID: this.state.documents[rowNum]._id});
        }
      });
    }
  }

  logOut() {
    axios.get('http://localhost:3000/logout')
    .catch(err => console.log('error in logging out: ', err))
    .then((data) => {
      this.props.socket.disconnect();
      this.props.logout();
    })
  }
  
  render() {
    const dateStyles = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const amISelected = (index) => {
      if (typeof this.state.selected === 'string') {
        return this.state.selected === 'all';
      }
      return this.state.selected.indexOf(index) > -1;
    };
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={(e)=> this.deleteDocs(e)}
      />,
      <FlatButton
        label="Delete Forever"
        secondary={true}
        onClick={(e)=> this.deleteDocs(e)}
      />,
    ];
    const anythingSelected = this.state.selected.length < 1;
    return (<div>
      <Paper>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={(e)=> this.deleteDocs(e)}
        >
          Delete Forever?
        </Dialog>

        <Toolbar>
          <ToolbarTitle text={`Welcome ${this.props.loggedIn}`} />
          <ToolbarGroup>
            <IconButton
              onClick={() => this.createNewDoc()}
              tooltip="new document"
              tooltipPosition="bottom-right"
            >
              <AddContentIcon style={{nativeColor: 'white'}} />
            </IconButton>
            <IconButton
              onClick={() => this.setState({ dialogOpen: true })}
              disabled={anythingSelected}
              tooltip="delete forever"
              tooltipPosition="bottom-right"
            >
              <DeleteForeverIcon />
            </IconButton>
            <IconButton
              onClick={(e) => this.shareDocs(e)}
              disabled={anythingSelected}
              tooltip="share"
              tooltipPosition="bottom-right"
            >
              <SocialShareIcon />
            </IconButton>
            <IconMenu
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              iconButtonElement={
                <IconButton touch>
                  <MoreVertIcon />
                </IconButton>}
            >
              <MenuItem primaryText="Hire us" />
              <MenuItem
                onClick={() => this.logOut()}
                primaryText="Logout"
              />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <Table
          fixedHeader
          multiSelectable
          onRowSelection={selectedRows => this.setState({ selected: selectedRows })}
          onCellClick={(i, j) =>  j < 0 ? null : this.openDoc(i, j) }
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Created At</TableHeaderColumn>
              <TableHeaderColumn>Owned By</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.state.documents.map((doc, index) => (
              <TableRow
                key={doc.id}
                selected={amISelected(index)}
              >
                <TableRowColumn>{doc.title}</TableRowColumn>
                <TableRowColumn>
                  {new Date(doc.createdAt).toLocaleString('en-US', dateStyles)}
                </TableRowColumn>
                <TableRowColumn>{doc.ownedBy.username}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
    );
  }
}

Home.propTypes = {
  currDOC: PropTypes.string,
  room: PropTypes.string,
  joinDoc: PropTypes.func,
  loggedIn: PropTypes.string,
};


const mapStateToProps = ({ currDOC, room, loggedIn, userID, socket }) => ({
  currDOC, room, loggedIn, userID, socket
});

const mapStateToDispatch = dispatch => ({
  joinDoc: (room, state, docID) => dispatch({ type: 'JOIN_DOC', room, state, docID }),
  logout: () => dispatch({ type: 'LOGOUT' })
});

export default connect(mapStateToProps, mapStateToDispatch)(Home);
