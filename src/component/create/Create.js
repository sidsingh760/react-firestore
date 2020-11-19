import React,{Component} from 'react'
import firebase from '../../firebase'
import {  withRouter } from 'react-router-dom'
import MDSpinner from 'react-md-spinner'


import {Input,Form,FormGroup,Col,Label, Button} from 'reactstrap'
class Create extends Component {
  constructor(props) {
  super(props)
    this.ref=firebase.firestore().collection('boards')
    this.state = {
      title:'',
      description:'',
      author:'',
      id:'',
      isLoading:false
    }
  }
  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value,
      isLoading:false

    })

  }
  componentWillMount(){
    debugger
    if(this.props.history.location.state!==undefined){

      alert(this.props.history.location.state.id)
      this.setState({
        id:this.props.history.location.state.id,
        flag:this.props.history.location.state.edit
      })
      let id=this.props.history.location.state.id;
    
      const res= firebase.firestore().collection("boards").doc(id).get().then((doc)=>{
        if(doc.exists){
              const{title,description,author}=doc.data()
              this.setState({
                title,
                description,
                author
              })
              console.log("state",this.state)
            }else
            console.log("no such document found")
              
      })
      if(res){
      this.setState({
        isLoading:true
      })
      }

    

    }
  }
  onSubmit_Click=(e)=>{
    e.preventDefault()
  
    if(this.state.author==="" || this.state.title==="" || this.state.description===""){
          alert("please fill all data");
    }else{
    console.log("state",this.state)
    const {title,author,description}=this.state
    this.ref.add({
    author,
    description,
    title  
    }).then((docRef)=>{
        this.setState({
          title:'',
          author:'',
          description:''
        })
        console.log("inserted sucessfully")
        this.props.history.push("/");

    }).catch(error=>console.log("error in inserting",error))
    }
    
  }
  onEdit_Click=(e)=>{
    e.preventDefault()
    if(this.state.author==="" || this.state.title==="" || this.state.description===""){
          alert("please fill all data");
    }else{
    console.log("state",this.state)
   let update= firebase.firestore().collection('boards').doc(this.state.id).set({
      title:this.state.title,
      description:this.state.description,
      author:this.state.author
    }).then((doc)=>{
      this.setState({
        title:'',
        author:'',
        description:''
      })
    }).catch(error=>console.log("error in updating document"));
    if(update){
      this.props.history.push({pathname:"/",state:{}})
  
    }
    
    
    }
    
  }
  render(){
  
    
    return(
      <div>
         {!this.state.isLoading && this.state.id?<MDSpinner style={{position:"fixed",top:"50%",left:"50%"}} size={60}/>:
        <center>
        <Form>
          <FormGroup row>
            <Col sm={2} >
            </Col>
            <Col sm={10}>
              <FormGroup row>
          <Col sm={2}>
            <Label>Title</Label>
            </Col>
            <Col sm={4}>
            <Input type="text" name="title" value={this.state.title}  onChange={(e)=>{this.handleChange(e)}}   />
          </Col>

          </FormGroup>
          <FormGroup row>
          <Col sm={2}>
            <Label>Description</Label>
            </Col>
            <Col sm={4}>
            <Input type="textarea" name="description" value={this.state.description} onChange={(e)=>{this.handleChange(e)}}   />
          </Col>

          </FormGroup>
          <FormGroup row>
          <Col sm={2}>
            <Label>Author</Label>
            </Col>
            <Col sm={4}>
            <Input type="text" name="author" value={this.state.author} onChange={(e)=>{this.handleChange(e)}}   />
          </Col>

          </FormGroup>
        <FormGroup row>
        <Col sm={2}></Col>
          <Col sm={4}>
           {this.state.id?
          <Button color="primary" onClick={(e)=>{this.onEdit_Click(e)}} >Edit Post</Button>
          :
          <Button color="primary" onClick={(e)=>{this.onSubmit_Click(e)}} >Add Post</Button>
           }
          </Col>
          
        </FormGroup>
        </Col>
          </FormGroup>
     
        </Form>
        </center>
  }
       
      </div>
    )
  }
}

  export default Create