import React, { Component } from "react";
import SideBarFile from "./SideBarFile";

class SideBarrequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      buttonProperty: "btn btn-primary",
      printerProperty: "Printer list-group-item",
      listProperty: "collapse"
    };
  }

  //Responsible for showing all of the files that are inside the request
  unHide() {
    this.setState({ isHidden: false });
    this.setState({
      printerProperty: "Printer list-group-item"
    });
  }

  //Responsible for hiding all of the files that are inside the request
  hide() {
    this.setState({ isHidden: true });
    this.setState({
      printerProperty: "Printer list-group-item"
    });
  }

  //Responible for the logic behind hiding and showing the items in the request
  onClick() {
    this.props.onClick(this.props.elementID);
    if (this.state.isHidden) {
      this.unHide();

      this.props.onClick(this.props.elementID);
    } else {
      this.hide();
      this.props.onClick(-1);
    }
  }

  render() {
    var request = this.props.data;
    var selected = this.props.selected;

    //The isHidden checks for wether or not the current list should be shown
    //The selected is the current index of what should be shown
    //The element id is the current index of the component that we are on
    return (
      <div className={this.state.printerProperty}>
        <div className="panel-group">
          <div className="wrap-emails"> {request["user"]} </div>
          {request["firstName"]}
          <div />
          <button
            className={this.state.buttonProperty}
            onClick={this.onClick.bind(this)}
          >
            Expand
          </button>
          <button className="btn btn-danger disabled" aria-disabled="true">Delete</button>
          {selected === this.props.elementID && (
            <FullList className={this.state.listProperty} data={request} />
          )}
        </div>
      </div>
    );
  }
}

class FullList extends Component {
  //This is the generated list responsible for holding all of the files that we are using.
  render() {
    var size = 0;
    var requests = this.props.data["requestItems"];
    return (
      <ul className="PrinterContainer">
        {requests.map(i => {
          size += 1;
          return <SideBarFile key={size - 1} elementID={size - 1} data={i} />;
        })}
      </ul>
    );
  }
}

export default SideBarrequest;
