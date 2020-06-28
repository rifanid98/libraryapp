import React, { Component } from 'react'
import Axios from 'axios'
import $ from 'jquery';

const Book = (props) => {
    return (
        <div>
            <p>{props.title}</p>
            <p>{`${props.description.substring(0, 100)}...`}</p>
        </div>
    )
}

export default class Training extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            books: [
                {
                    id: 0,
                    title: 'title',
                    description: 'desc'
                }
            ]
        }
        this.getAllProduct()
    }
    getAllProduct = async () => {
        const token = localStorage.getItem('token');
        await Axios({
            method: 'GET',
            url: 'http://localhost:3000/libraryapp-api/books',
            headers: {
                authorization: token
            }
        }).then((res) => {
            console.log(res);
            const books = res.data.data;
            this.setState({
                ...this.state,
                books: books
            })
            $('#token').val(res.data.data[0].description)
        }).catch((error) => {
            console.log(error.response.data)
            $('#token').val(error.response.data)
        })
    }
    
    handleLogin = async (e) => {
        e.preventDefault();
        await Axios({
            method: 'POST',
            url: 'http://localhost:3000/libraryapp-api/auth/login',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        }).then((res) => {
            const token = res.data.data[0].tokenLogin;
            $('#token').val(token)
            localStorage.setItem('token', token)
        }).catch((error) => {
            console.log(error.response.data)
            $('#token').val(error.response.data)
        })
    }

    render() {
        return (
            <div>
             <form onSubmit={this.handleLogin}>
                <label htmlFor="">Username</label>
                <input type="text" name="username" value={this.state.username} onChange={(e) => { this.setState({ ...this.state, username: e.target.value }) }} />
                <label htmlFor="">Password</label>
                <input type="text" name="password" value={this.state.password} onChange={(e) => { this.setState({ ...this.state, password: e.target.value }) }} />
                <button type="submit">Login</button>
             </form>
            <textarea name="" id="token" cols="30" rows="10" ></textarea>
            {this.state.books.map((book, index) => {
                return <Book key={index} title={book.title} description={book.description}/>
            })}
            </div>
        )
    }
}
