
//Author : Ashutosh Nigam
//Date : 06/04/2018
import React from 'react';
import _classNames_ from 'classnames';

class Card extends React.Component{

    constructor(props)
    {
        super(props);
    }

    render(){
        return (
            <div className="col-xs-12 col-sm-4 card-col" >
                <a href={this.props.listitem.Url}>
                    <div className="card-image-wrapper">
                        <img src={this.props.listitem.ImageUrl} />
                    </div>
                    <div className={_classNames_({ "details": !this.props.white_bg , "details-white-bg" : this.props.white_bg })}>
                        <span className="title">{this.props.listitem.Title}</span>                             
                        <span className="description">
                            {this.props.listitem.Description}
                        </span>
                    </div>
                </a> 
            </div>
        )
    }
}

export default Card;