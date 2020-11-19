import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap';
import firebase from './firebase'
import {confirmAlert} from 'react-confirm-alert'

import 'react-confirm-alert/src/react-confirm-alert.css'
import MDSpinner from 'react-md-spinner'

class App extends Component{
constructor(props) {
    super(props)
this.ref=firebase.firestore().collection('boards') 
this.unSubScribe=null 
    this.state = {
       boards:[],
       isLoading:false
    }
  }
  onDeleteButton=(e)=>{
    e.preventDefault();
    let id=e.target.id;
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>{
             this.ref.doc(id).delete().then(()=>{
               console.log("document deleted sucessfully");
               this.unSubScribe()
             }).catch((error)=>console.log("error in deleting document",error));            
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    })


  }
  onBtnEditClick=(e)=>{
    e.preventDefault()
    this.props.history.push({pathname:'/create',state:{id:e.target.id,edit:true}})
  }
  onCollectionUpdate=(querySnapShot)=>{
    const boards=[];
    querySnapShot.forEach((doc)=>{
        const {title,author,description}=doc.data();
        boards.push({
          key:doc.id,
          doc,
          title,
          description,
          author
        });
    });
    this.setState({
      boards,
      isLoading:true
    })
    
  }
  componentWillUnmount(){
    this.unSubScribe();
  }
  componentDidMount(){
    debugger
    this.unSubScribe=this.ref.onSnapshot(this.onCollectionUpdate);
  }
  render(){
  
  return (
     <div class="container">
       {!this.state.isLoading?<MDSpinner style={{position:"fixed",top:"50%",left:"50%"}} size={60}/>:
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                BOARD LIST
          </h3>
            </div>
            <div class="panel-body">
              <h4><Link to="/create">Add Board</Link></h4>
              <table class="table table-stripe">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Author</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  
                   this.state.boards.map((board,key)=>{
                    return(
                      <tr key={key} >
                        <td key={key}><Link to={`/show/${board.title}`} >{board.title}</Link></td>
                        <td key={key}>{board.description}</td>
                        <td key={key}>{board.author}</td>
                        <td><Button onClick={(e)=>this.onDeleteButton(e)} id={board.key} color="danger">Delete</Button> 
                        <Button color="primary"  id={board.key} onClick={(e)=>{this.onBtnEditClick(e)}} >Edit</Button></td>



                      </tr>
                    )

                   })
                 
                   }

                </tbody>
              </table>
            </div>
       
          </div>
        }
    </div>
  );
}
}

export default App;
