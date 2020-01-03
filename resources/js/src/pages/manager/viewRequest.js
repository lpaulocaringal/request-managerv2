import React, {Component} from 'react';
import Axios from 'axios';
import {REQUEST_MANAGER_API_URL} from '../../config';

class ViewRequest extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            analyst: []
        }
    }

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    componentDidMount(){
        Axios.post(`${REQUEST_MANAGER_API_URL}/api/request/getrequestdetails`,{
            'request_id': this.getCookie('request_id')
        }).then(r => {
            console.log(r)
            this.setState({
                data: r.data.data,
                analyst: r.data.analyst,
                request_type: r.data.request_type
            })
        }).catch(function () {
            return {
                success: false,
                data: "The connection to the server failed."
            }
        });
    }

    viewRequest(){
        return(
            <div className='form-group row'>
                <div className='col-md-12'>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th scope='row'>Request</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope='row'>Analyst</th>
                                <td>{this.state.analyst.first_name} {this.state.analyst.last_name}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Date/Time of Release</th>
                                <td>{this.state.data.date_time_release}</td>
                            </tr>
                            <tr>
                                <th scope='row'>BG task</th>
                                <td>{this.state.data.bg_task}</td>
                            </tr>
                            <tr>
                                <th scope='row'>AI Synopsis</th>
                                <td>{this.state.data.ai_synopsis}</td>
                            </tr>
                            <tr>
                                <th scope='row'>AI Number</th>
                                <td>{this.state.data.ai_synopsis}</td>
                            </tr>
                            <tr>
                                <th scope='row'>BG Customer Name</th>
                                <td>{this.state.data.bg_customer_name}</td>
                            </tr>
                            <tr>
                                <th scope='row'>BG Project Name</th>
                                <td>{this.state.data.bg_project_name}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Specification Name</th>
                                <td>{this.state.data.specification_name}</td>
                            </tr>
                            <tr>
                                <th scope='row'>FMT Path</th>
                                <td>{this.state.data.fmt_path}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Clone From</th>
                                <td>{this.state.data.cloned_from}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Library Solution ID</th>
                                <td>{this.state.data.library_solution_id}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Lookup Table</th>
                                <td>{this.state.data.lookup_table}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Release Note</th>
                                <td>{this.state.data.release_note}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Attachment</th>
                                <td>{this.state.data.attachment}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    render(){
        return(
            <div className='container'>
                <div className='card'>
                    <div className='card-header'>
                        <h2>View Request</h2>
                    </div>
                    <div className='card-body'>
                        {this.viewRequest()}
                    </div>
                    <div className='card-footer'>
                        <div className='row'>
                            <div className='col-md-4'></div>
                            <div className='col-md-4'></div>
                            <div className='col-md-4'><button type='submit' onClick={()=>this.props.history.push('/edit-request')} className='btn btn-primary form-control'>Edit Details</button></div>
                        </div>
                    </div>
                </div><br/>
            </div>
        );
    }
}

export default ViewRequest;