import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import {REQUEST_MANAGER_API_URL} from '../../config';

class EditRequest extends Component{
    constructor(props){
        super(props);
        this.state = {
            newRequest: {
                request_id: "",
                analyst_user_id: "",
                bg_task: "",
                ai_synopsis: "",
                ai_number: "",
                bg_customer_name: "",
                bg_project_name: "",
                specification_name: "",
                fmt_path: "",
                cloned_from: "",
                library_solution_id: "",
                lookup_table: "",
                release_note: "",
                attachment: "",
            },
            request:[],
            product:[],
            complexity:[],
            task:[]
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
        }).catch(function(){
            return {
                success: false,
                data: "The connection to the server failed."
            }
        });
    }

    //For request field
    createRequestInput(){
        return this.state.request.map((el, i) => 
            <div className='form-group row' key={i}>
                <div className='col-md-12'>
                    <input type='text' placeholder='request' className='form-control' value={el||''} onChange={this.RequestHandleChange.bind(this, i)} />
                </div>
            </div>          
        )
    }

    RequestHandleChange(i, event) {
        let request = [...this.state.request];
        request[i] = event.target.value;
        this.setState({ request });
    }
    
    //For product field
    createProductInput(){
        return this.state.product.map((el, i) => 
            <div className='form-group row' key={i}>
                <div className='col-md-12'>
                    <input type='text' placeholder='product' className='form-control' value={el||''} onChange={this.ProductHandleChange.bind(this, i)} />
                </div>
            </div>          
        )
    }

    ProductHandleChange(i, event) {
       let product = [...this.state.product];
       product[i] = event.target.value;
       this.setState({ product });
    }
    
    //For complexity field
    createComplexityInput(){
        return this.state.complexity.map((el, i) => 
            <div className='form-group row' key={i}>
                <div className='col-md-12'>
                    <input placeholder='complexity' type='text' className='form-control' value={el||''} onChange={this.ComplexityHandleChange.bind(this, i)} />
                </div>
            </div>          
        )
    }

    ComplexityHandleChange(i, event) {
       let complexity = [...this.state.complexity];
       complexity[i] = event.target.value;
       this.setState({ complexity });
    }
    
    //For task field
    createTaskInput(){
        return this.state.task.map((el, i) => 
            <div className='form-group row' key={i}>
                <div className='col-md-8'>
                    <input placeholder='task' type='text' className='form-control' value={el||''} onChange={this.TaskHandleChange.bind(this, i)} />
                </div>
                <div className='col-md-4'>
                    <button type='button' className='btn btn-danger form-control' onClick={this.RemoveClick.bind(this, i)}><span className='fa fa-trash'></span></button>
                </div>
            </div>          
        )
    }

    TaskHandleChange(i, event) {
       let task = [...this.state.task];
       task[i] = event.target.value;
       this.setState({ task });
    }
    
    //add and delete rows
    AddClick(){
        this.setState(prevState => ({ request: [...prevState.request, '']}));
        this.setState(prevState => ({ product: [...prevState.product, '']}));
        this.setState(prevState => ({ complexity: [...prevState.complexity, '']}));
        this.setState(prevState => ({ task: [...prevState.task, '']}));
    }
    
    RemoveClick(i){
        let request = [...this.state.request];
        request.splice(i,1);
        this.setState({ request });
        
        let product = [...this.state.product];
        product.splice(i,1);
        this.setState({ product });
        
        let complexity = [...this.state.complexity];
        complexity.splice(i,1);
        this.setState({ complexity });
        
        let task = [...this.state.task];
        task.splice(i,1);
        this.setState({ task });
    }      

    // async submitRequest(e){
    //     e.preventDefault();

    //     const r = await Axios.post(`${REQUEST_MANAGER_API_URL}/api/request/addrequest`,{
    //         'request_id': this.state.newRequest.bg_task,
    //         'analyst_user_id': this.state.newRequest.analyst_user_id,
    //         'bg_task': this.state.newRequest.bg_task,
    //         'ai_synopsis': this.state.newRequest.ai_synopsis,
    //         'ai_number': this.state.newRequest.ai_number,
    //         'bg_customer_name': this.state.newRequest.bg_customer_name,
    //         'bg_project_name': this.state.newRequest.bg_project_name,
    //         'specification_name': this.state.newRequest.specification_name,
    //         'fmt_path': this.state.newRequest.fmt_path,
    //         'cloned_from': this.state.newRequest.cloned_from,
    //         'library_solution_id': this.state.newRequest.library_solution_id,
    //         'lookup_table': this.state.newRequest.lookup_table,
    //         'release_note': this.state.newRequest.release_note,
    //         'attachment': this.state.newRequest.attachment,
    //     }).then(function(r){
    //         return r.data;
    //     }).catch(function () {
    //         return {
    //             success: false,
    //             data: "The connection to the server failed."
    //         }
    //     });
    // }

    render(){
        return(
            <div className='container'>
                <div className='card'>
                        <form onSubmit={(e) => this.submitRequest(e)}>
                        <div className='card-header'>
                            <h2>Edit Request Form</h2>
                        </div>
                    <div className='card-body'>
                            <div className='form-group row'>
                                <div className='col-md-12'>
                                    <div className='form-group row'>
                                        <div className='col-md-3'>{this.createRequestInput()}</div>
                                        <div className='col-md-3'>{this.createProductInput()}</div>
                                        <div className='col-md-3'>{this.createComplexityInput()}</div>
                                        <div className='col-md-3'>{this.createTaskInput()}</div>
                                    </div>
                                    <div className='form-group row'>
                                        <div className='col-md-12'>
                                            <input type='button' className='btn btn-secondary' value='add more' onClick={this.AddClick.bind(this)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>BG Task</div>
                                <div className='col-md-9'><input type='text' value={this.state.newRequest.bg_task} onChange={(e) => this.changeHandler(e.target.value, "bg_task")} className='form-control'/></div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>BG Customer Name</div>
                                <div className='col-md-9'><input type='text' value={this.state.newRequest.bg_customer_name} onChange={(e) => this.changeHandler(e.target.value, "bg_customer_name")} className='form-control'/></div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>BG Project Name</div>
                                <div className='col-md-9'><input type='text' value={this.state.newRequest.bg_project_name} onChange={(e) => this.changeHandler(e.target.value, "bg_project_name")} className='form-control'/></div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>AI Synopsis</div>
                                <div className='col-md-9'><input type='text' value={this.state.newRequest.ai_synopsis} onChange={(e) => this.changeHandler(e.target.value, "ai_synopsis")} className='form-control'/></div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>AI Number</div>
                                <div className='col-md-9'><input type='text' value={this.state.newRequest.ai_number} onChange={(e) => this.changeHandler(e.target.value, "ai_number")} className='form-control'/></div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>Specification Name</div>
                                <div className='col-md-9'><input type='text' value={this.state.newRequest.specification_name} onChange={(e) => this.changeHandler(e.target.value, "specification_name")} className='form-control'/></div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>FMT Path</div>
                                <div className='col-md-9'><input type='text' value={this.state.newRequest.fmt_path} onChange={(e) => this.changeHandler(e.target.value, "fmt_path")} className='form-control'/></div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>Cloned From</div>
                                <div className='col-md-9'><input type='text' value={this.state.newRequest.cloned_from} onChange={(e) => this.changeHandler(e.target.value, "cloned_from")} className='form-control'/></div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>Library/Solution ID</div>
                                <div className='col-md-9'><input type='text' value={this.state.newRequest.library_solution_id} onChange={(e) => this.changeHandler(e.target.value, "library_solution_id")} className='form-control'/></div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>Lookup Table(s)</div>
                                <div className='col-md-9'><input type='text' value={this.state.newRequest.lookup_table} onChange={(e) => this.changeHandler(e.target.value, "lookup_table")} className='form-control'/></div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>Release Note(s)</div>
                                <div className='col-md-9'><textarea value={this.state.newRequest.release_note} onChange={(e) => this.changeHandler(e.target.value, "release_note")} className='form-control'></textarea></div>
                            </div>
                            <div className='form-group row'>
                                <div className='col-md-3'>Attachments</div>
                                <div className='col-md-9'><input type='text' value={this.state.newRequest.attachment} onChange={(e) => this.changeHandler(e.target.value, "attachment")} className='form-control'/></div>
                            </div><hr/>
                            <div className='form-group row'>
                                <div className='col-md-6'><h4>Assign Resources</h4></div>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='row'>
                                <div className='col-md-4'></div>
                                <div className='col-md-4'></div>
                                <div className='col-md-4'><button type='submit' className='btn btn-primary form-control'>Submit</button></div>
                            </div>
                        </div>
                    </form>
                </div><br/>
            </div>
        );
    }
}

export default EditRequest;