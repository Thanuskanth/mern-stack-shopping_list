import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import {connect} from 'react-redux';
import {addItem,getItem} from '../action/itemactions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Container } from 'reactstrap';
 class Additem extends Component {
    state = {
        modal: false,
        name: ''
    }
    toggole = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const item = {
            
            name: this.state.name
        }
        this.props.addItem(item);
        this.toggole();
    }
    onChangeItem=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    render() {
        return (

            <Container>
{this.props.isAutanticate ?
                <Button color="dark" style={{marginBottom:'20px'}} onClick={this.toggole}>Add new</Button>
:""}
                <Modal isOpen={this.state.modal} toggle={this.toggole} >
                    <ModalHeader toggle={this.toggole}>Modal title</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Name</Label>
                                <Input type="text" id="item" name="item" onChange={this.onChangeItem}  placeholder="Enter item's Name" />
                            </FormGroup>
                            <Button>Submit</Button>

                        </Form>
                    </ModalBody>

                </Modal>
            </Container>

        )
    }
}
const mapstateToprops=(state)=>({
    item:state.item,
    isAutanticate: state.auth.isauthenticated

});

export default connect(mapstateToprops,{addItem,getItem})(Additem);