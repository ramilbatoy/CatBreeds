import React, {Component} from 'react';
import { FaTrashAlt } from "react-icons/fa";
import Moment from 'react-moment';

class ListAppointment extends Component {
    render() {
         const litems = this.props.appointments.map(item => (
          <div className='per2'>
              <div >{item.ownerName}</div>
              <div >{item.petName}</div>
          </div>
      ));
        return (
            <div className="appointment-list item-list mb-3">
                {this.props.appointments.map( item => (
                    <div className="pet-item col media py-3 col-md-4" key={item.apID}>
                        <div className="mr-3">
                            <button className="pet-delete btn btn-sm btn-danger" onClick={() => this.props.deleteAppointment(item)}><FaTrashAlt /></button>
                        </div>

                        <div className="pet-info media-body">
                            <div className="pet-head d-flex">
                                <span className="pet-name">{item.petName}</span>
                                <span className="apt-date ml-auto">
                                    <Moment
                                    date = {item.aptDate}
                                    parse = "YYYY-MM-dd hh:mm"
                                    format = "MMM-d h:mma"
                                    />
                                </span>
                            </div>

                            <div className="owner-name">
                                <span className="label-item">Owner: </span>
                                <span>{item.ownerName}</span>
                            </div>
                            <div className="apt-notes">{item.aptNotes}</div>
                        </div>
                    </div>
                ))}

            </div>
        );
    }
}
export default  ListAppointment;