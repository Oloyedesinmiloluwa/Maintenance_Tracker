import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import imageLink from '../../vanilla/assets/image/repair2.png';
import helper from '../helpers';
import Nav from './Navigation';
import Footer from './Footer';
import { createRequest, editRequest, uploadImage } from '../actions/requestAction';
import MessageText from './MessageText';
import UserWelcomeText from './UserWelcomeText';

class NewRequestPage extends React.Component {
    state = {
        request: {
            title: '',
            description: '',
            category: 'general',
            image: '',
            imageData: ''
        },
        message: '',
        color: '',
        isEdit: false,
    };

    componentDidMount() {
        const { match, currentRequest } = this.props;
        const { request } = this.state;
        if (match.params.requestId) this.setState({ request: { ...request, ...currentRequest }, isEdit: true });
    }

    handleChange = (event) => {
    let request = Object.assign({}, this.state.request);
    request[event.target.name] = event.target.value;
        this.setState({ request });
    }
    onSubmit = () => {
        const { editRequestAction, currentRequest, history } = this.props;
        const { request, isEdit } = this.state;
        const { category, title, description, image } = request;
        if (isEdit) {
            editRequestAction(currentRequest.id, { title, description, image, category }).then(response => {
                if (response.message === 'Request Updated Successfully') {
                    history.push('/requests');
                }
                else if (response.message === 'Image failed to upload') {
                    // messageText.textContent = response.message;
                    this.setState({ request: { ...request, image: '' } });
                  }
            })
            return;
        }
        this.props.createRequestAction({ title, description, image, category }).then((response) => {
          if (response.message === 'Request Added Successfully') {
              this.setState({ message: response.message });
              history.push('/requests');
          } else {
            this.setState({ message: response.message, color: 'red' });
          }
    })
    }

    onImageChange = (event) => {
        const { uploadImageAction } = this.props;
        const { request } = this.state;
        // console.log(event.target.files[0],'fsdfdfdfd', event.target);
        uploadImageAction(event.target.files[0]).then(response => {
            if (response.message === 'File uploaded!') {
                // this.setState({ imageData: require('../../client/assets/image/request.jpg'), image: 'client/assets/image/request.jpg' });
                this.setState({ request: { ...request, imageData: require('../../vanilla/assets/image/request.jpg'), image: 'client/assets/image/request.jpg' } });
              }
              else this.setState({ image: '' });
        })
    }

    render() {
        const { message, color,  request } = this.state;
        const { currentUser } = this.props;
        return (
            <div>
            <Nav Tab1={helper('')} Tab2= {helper('list')} Tab3={helper('signout')} />
            <div>
            <UserWelcomeText username = {currentUser.detail.role === 'admin' ? "Admin" :currentUser.detail.firstname } />
    <h2 id="addrequest-h2" className="text-center">Have you got a fault? Tell us about it</h2>
    <div className="show-detail-card">
          <img id="image" src={request.imageData || request.image || imageLink} />
          <div className="card-content">
            </div>
        </div>
        <div id="file-div">
            <label> Choose Image ...
                <input onChange={this.onImageChange} type="file" id="file-upload" name="request" accept="image/*" />
            </label>
      </div>
      <div className="addrequest-form">
      <div className="category-div">
      <p className="category-p-textarea">Title</p><input id = "title-input" name="title" value={this.state.request.title} onChange={this.handleChange} placeholder="Title" />
      </div>
      <p className="counter"></p>
      <div className="textarea-div">
      <p className="description-p-textarea">Description</p>
      <textarea id="description-input" name="description" rows="3" value={this.state.request.description} onChange={this.handleChange} placeholder="...write detailed description of the fault"></textarea>
      </div>
      <p className="counter"></p>
      <div className="category-div">
      <p className="category-p-textarea">Category</p>
      <form>
            <select id="category-input" value={this.state.request.category} onChange={this.handleChange}  name="category">
            <option value="general" selected>General</option>
            <option value="electrical">Electrical</option>
            <option value="physical">Physical</option>
            <option value="mechanical">Mechanical</option>
            <option value="electronic">Electronic</option>
            <option value="software">Software</option>
            </select>
        </form>
    </div>
</div>
    {message && <MessageText {...{ color, message }} /> }
    <div id="request-btn">
        <button onClick = { this.onSubmit }>Submit</button>
      </div>
      < Footer />
      </div>
      </div>
      )
    }
}
const getOneRequest = (requests, id) => {
    const request = requests.filter((request) => request.id === parseInt(id));
    if (request) return request[0];
    else return null;
    }
const mapStateToProps = (state, ownProps) => {
    let request;
    if (state.requests.length > 0) {
      request = getOneRequest(state.requests, ownProps.match.params.requestId);
    }
  return {
    currentRequest: request || state.currentRequest,
    currentUser: state.currentUser,
  }
  };
export default connect(mapStateToProps, { createRequestAction: createRequest,
    editRequestAction: editRequest, uploadImageAction: uploadImage })(NewRequestPage);
