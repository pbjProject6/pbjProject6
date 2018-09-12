import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeButton extends Component {
    render() {
        return (
            <Link to="/">
                <div className="clearfix">
                    <button className="button existing homeButton"><p>Home</p></button>
                    <i class="fas fa-caret-left"></i>
                </div>
            </Link>
        )
    }
}

export default HomeButton;