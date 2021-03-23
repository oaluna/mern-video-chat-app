import React, { Component } from "react";
import 'rc-slider/assets/index.css';

import "./FullScreenImage.css";

export default class FullScreenImage extends Component {
    constructor(props) {
        super(props);
        let imageUrl = this.props.imageUrl;
        let downloadPath = imageUrl.split("public/")[1];
        this.state = {
            downloadPath: downloadPath
        };
    }

    componentDidMount() {
    }
    onShowImageFullScreen() {
        this.props.onShowImageFullScreen();
    }
    render() {
        return (
            
            <div>
                <div className="full-image">
                    <span 
                        onClick={this.onShowImageFullScreen.bind(this)}
                        className="close-btn"    
                    >
                        X
                    </span>
                    <a href={this.props.imageUrl} download="image-file" className="download-btn">
                        <i class="fa fa-download"></i>
                    </a>
                    <img src={this.props.imageUrl} alt=""></img>
                    
                </div>
            </div>
        );
    }
}