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
import NewDocIcon from 'material-ui/svg-icons/action/note-add';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import TextField from 'material-ui/TextField';
// import FontIcon from 'material-ui/FontIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SocialShareIcon from 'material-ui/svg-icons/social/share';
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import { connect } from 'react-redux';


import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from 'material-ui/List';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      selected: [],
      dialogDeleteOpen: false,
      dialogShareOpen: false,
      shareEmail: null
    };
  }

  componentWillMount() {
    axios.get('http://localhost:3000/docs').then(({ data }) => {
      if (data.success) {
        this.setState({ documents: data.docs });
      }
    }).catch(err => console.log(err));
  }
  createNewDoc(e) {
    // debugger;
    e.preventDefault();

    axios.get('http://localhost:3000/newdoc')
    .then(({ data }) => {
      if (data.success) {
        this.props.socket.emit('join-document', { userID: this.props.userID, docID: data.docs._id}, ({title, state, contributors}) => {
          if (title) { this.props.joinDoc(title, state, data.docs._id, contributors); }
        });
      }
    })
    .catch(err => console.log(err));
  }
  deleteDocs() {
    // debugger;
    const selectedDocIDs = this.state.documents
                          .filter((x, index) => this.state.selected.indexOf(index) > -1)
                          .map(doc => doc._id);
    this.props.socket.emit('delete-document',
    { docIDs: selectedDocIDs, userID: this.props.userID},
    ({success, errors}) => {
      let newDocs = this.state.documents.filter((doc) => Object.keys(success).indexOf(doc._id) < 0).map(doc => Object.assign({}, doc));
      this.setState({ dialogDeleteOpen: false, selected: [] , documents: newDocs });
    })
  }

  shareDocs(e) {
    e.preventDefault();
    this.props.socket.emit('share-document',
    { docIDs: this.state.documents.filter((x, index) => this.state.selected.indexOf(index) > -1).map(doc => doc._id),
      emails: this.state.shareEmail
    },
    (({ success }) => {
      console.log('success in sharedocs?!? ', success );
      this.setState({dialogShareOpen: false, selected: [] });
    })
    )
  }
  openDoc(rowNum, colNum) {
    // console.log('in openDoc', rowNum, colNum);
    if (this.state.documents[rowNum]) {
      console.log(this.props.userID);
      this.props.socket.emit('join-document',
      { userID: this.props.userID, loggedIn: this.props.loggedIn, docID: this.state.documents[rowNum]._id}, (data) => {
        console.log(data);
      const  {title, state, contributors} = data;
        if (title) {
          this.props.joinDoc(title, state, this.state.documents[rowNum]._id, contributors);
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
    console.log(this.props.contributors);
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
    const deleteActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={(e)=> {e.preventDefault(); this.setState({ dialogDeleteOpen: false, selected: [] }) }}
      />,
      <FlatButton
        label="Delete Forever"
        secondary={true}
        onClick={(e)=> this.deleteDocs(e)}
      />,
    ];
    const shareActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={(e)=> {e.preventDefault(); this.setState({ dialogShareOpen: false, selected: [] }) }}
      />,
      <FlatButton
        label="Share"
        secondary={true}
        onClick={(e)=> this.shareDocs(e)}
      />,
    ]
    const anythingSelected = this.state.selected.length < 1;
    return (<div>
      <Paper>
        <Dialog
          actions={deleteActions}
          modal={false}
          contentStyle={{width: '30%'}}
          open={this.state.dialogDeleteOpen}
          // onRequestClose={(e)=> this.deleteDocs(e)}
        >
          Delete Forever?
        </Dialog>

        <Dialog
          actions={shareActions}
          modal={true}
          open={this.state.dialogShareOpen}
          contentStyle={{width: '30%'}}
          // onRequestClose={(e)=> this.shareDocs(e)}
        >
          <TextField
            hintText="Enter Email"
            onChange={(e)=>this.setState({shareEmail: e.target.value})}
          />
        </Dialog>

        <Toolbar>
          <ToolbarTitle text={`Welcome ${this.props.loggedIn}`} />
          <ToolbarGroup>
            <IconButton
              onClick={(e) => this.createNewDoc(e)}
              tooltip="new document"
              tooltipPosition="bottom-right"
            >
              <AddContentIcon />
            </IconButton>
            <IconButton
              onClick={() => this.setState({ dialogDeleteOpen: true })}
              disabled={anythingSelected}
              tooltip="delete forever"
              tooltipPosition="bottom-right"
            >
              <DeleteForeverIcon />
            </IconButton>
            <IconButton
              onClick={() => this.setState({ dialogShareOpen: true })}
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
              <TableHeaderColumn>Last Modified</TableHeaderColumn>
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


const mapStateToProps = ({ currDOC, room, loggedIn, userID, socket, title, contributors }) => ({
  currDOC, room, loggedIn, userID, socket, title, contributors
});

const mapStateToDispatch = dispatch => ({
  joinDoc: (title, state, docID, contributors) => dispatch({ type: 'JOIN_DOC', title, state, docID, contributors }),
  logout: () => dispatch({ type: 'LOGOUT' })
});

export default connect(mapStateToProps, mapStateToDispatch)(Home);
