import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItem, deleteItem, addItem } from '../action/itemactions';
import PropType from 'prop-types';
class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItem();
        console.log(this.props)
    }
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
        console.log("delete item", id)
    }
    render() {


        const { items } = this.props.item;
        return (

            <div>
                <Container>
                    {!this.props.isAutanticate ?
                        <h4>Plese login to manage items</h4> : ""}
                    <ListGroup>
                        <TransitionGroup>
                            {items.map((data) => (
                                <CSSTransition key={data._id} timeout={500} classNames="fade">
                                    <ListGroupItem className="list_item">
                                        {this.props.isAutanticate ? <Button
                                            color="danger"
                                            className="remove"
                                            onClick={() => this.onDeleteClick(data._id)}
                                        >&times;</Button> : ""}

                                        {data.name}
                                    </ListGroupItem>
                                </CSSTransition>
                            ))

                            }

                        </TransitionGroup>
                    </ListGroup>
                </Container>
            </div>

        )
    }
}
ShoppingList.propType = {
    getItem: PropType.func.isRequired,

    item: PropType.object.isRequired
}

const mapstateToprops = (state) => ({
    item: state.item,
    isAutanticate: state.auth.isauthenticated
})
export default connect(mapstateToprops, { getItem, deleteItem, addItem })(ShoppingList);