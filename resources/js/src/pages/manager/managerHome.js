import React, {Component} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Axios from 'axios';
import {REQUEST_MANAGER_API_URL} from '../../config';

class ManagerHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: false,
            pages: 0
        }
    }

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    deleteCookie(name){
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    componentDidMount(){
        if(this.getCookie('request_id')){
            this.deleteCookie('request_id');
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
                                                    // console.log(rowInfo.original.request_id);
                                                    document.cookie = 'request_id=' + rowInfo.original.request_id;
                                                    this.props.history.push({pathname:'/view-request'})
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

export default ManagerHome;