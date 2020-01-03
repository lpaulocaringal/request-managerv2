import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import {Link} from 'react-router-dom';
import "react-table/react-table.css";
import Axios from 'axios';
import {REQUEST_MANAGER_API_URL} from '../../config';

class AnalystHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: false,
            pages: 0
        }
    }

    getData(page, pageSize){
        this.setState({ loading: true });
        let url = `${REQUEST_MANAGER_API_URL}/api/request/getrequestsummary?page=${page}&size=${pageSize}`;
        Axios.get(url).then(r => {
            this.setState({
                data: r.data.data,
                pages: r.data.last_page,
                loading: false
            })
        }).catch(response => console.log(response));
    }

    render(){
        const tableStyle = {
            textAlign: 'center'
        }

        const columns = [{
            Header: 'Request',
            accessor: 'request_id'
        },{
            Header: 'Date/Time of Release',
            accessor: 'date_time_release'
        },{
            Header: 'Resources',
            accessor: 'resources_id'
        },{
            Header: 'Status',
            accessor: 'status'
        }]
        return(
            <div className='container'>
                <div className='card'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className='mr-auto col-md-6'><h2>Requests</h2></div>
                            <div className='col-md-6'>
                                <div className='float-md-right'><Link className='btn btn-primary' to='/new-request'>New Request</Link></div>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <ReactTable
                                    columns={columns}
                                    data={this.state.data}
                                    pages={this.state.pages}
                                    defaultPageSize={10}
                                    loading={this.state.loading}
                                    pageSizeOptions={[10, 20, 30, 40]}
                                    manual
                                    onFetchData={(state, instance) => this.getData((state.page + 1), state.pageSize)}
                                    style = {tableStyle}
                                    getTrProps={(state, rowInfo) => {
                                        if (rowInfo && rowInfo.row) {
                                            return {
                                                onClick: (e) => {
                                                    this.props.history.push({pathname:'/view-request',data:rowInfo.original})
                                                }
                                            }
                                        }
                                        else{
                                            return {}
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div><br/>
            </div>
        );
    }
}

export default AnalystHome;