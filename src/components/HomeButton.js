import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeButton extends Component {
    render() {
        return (
            <Link to="/">
                <div className="hide homeGroup clearfix">
                    <button className="button shimmer existing"><p>Home</p></button>
                    <i class="fas fa-caret-left"></i>
                </div>
            </Link>
        )
    }
}

export default HomeButton;