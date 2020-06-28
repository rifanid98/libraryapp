import React, { Component } from 'react'
import {
    Container,
    Row,
    Col
}
from 'reactstrap';

import $ from 'jquery';
import style from './training.module.css';



export default class Training extends Component {
    state = {
        isOpened: true
    }

    toggleSidebar = () => {
        // training_sidebar__3eZ4E opened
        // training_sidebarClosed__1Dpm0 closed
        const classSidebar = $('#sidebar').attr('class');
        if (this.state.isOpened === true) {
            this.setState({
                ...this.state,
                isOpened: false
            }, () => {
                    $('#sidebar').attr('class', 'training_sidebarClosed__1Dpm0')
            })
        } else {
            this.setState({
                ...this.state,
                isOpened: true
            }, () => {
                    $('#sidebar').attr('class', 'training_sidebar__3eZ4E')
            })
        }
    }


    render() {
        return (
             <Container fluid className={style.container}>
                <Row>
                {/* sidebar */}
                    <div class={`${style.sidebar} mySidebar`} id="sidebar">
                        
                    </div>
                    {/* content */}
                    <div className={style.content}>
                        <button onClick={this.toggleSidebar}>Toggle</button>
                        <p>content  </p>
                    </div>
                </Row>
             </Container>
        )
    }
}
