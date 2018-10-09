import React from 'react';
import { connect } from 'react-redux';
import imageLink from '../../../vanilla/assets/image/repair2.png';
import helper from '../../helpers';
import Nav from '../common/Navigation';
import Footer from '../common/Footer';
import { createRequest, editRequest, uploadImage } from '../../actions/requestAction';
import MessageText from '../common/MessageText';
import UserWelcomeText from '../common/UserWelcomeText';
import NewRequestForm from './NewRequestForm';

export class NewRequestPage extends React.Component {
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
        isLoading: false,
        counterDisplay: {
            title: '',
            description: ''
        },
    };

    componentDidMount() {
        const { match, currentRequest } = this.props;
        const { request } = this.state;
        if (match.params.requestId) this.setState({ request: { ...request, ...currentRequest }, isEdit: true });
    }

    handleChange = (event) => {
      const { request, counterDisplay } = this.state;
      const maxInput = { title: 21, description: 251 };
    this.setState({ request: { ...request, [event.target.name] : event.target.value }});
    if (event.target.value.length < maxInput[event.target.name]) this.setState({ counterDisplay: { ...counterDisplay, [event.target.name]: `${event.target.value.length}/${maxInput[event.target.name] - 1} max characters` } });
      else this.setState({ counterDisplay: { ...counterDisplay, [event.target.name]: 'Max characters exceeded' } });
    }
    onSubmit = () => {
        const { editRequestAction, currentRequest, history } = this.props;
        const { request, isEdit } = this.state;
        const { category, title, description, image } = request;
        this.setState({ message: 'Please wait...', color: 'lightblue' });
        if (isEdit) {
            editRequestAction(currentRequest.id, { title, description, image, category }).then(response => {
                if (response.message === 'Request Updated Successfully') {
                    history.push('/requests');
                }
                else if (response.message === 'Image failed to upload') {
                    this.setState({ request: { ...request, image: '' }, message: response.message });
                  }
            })
            return;
        }
        this.props.createRequestAction({ title, description, image, category }).then((response) => {
          this.setState({ message: response.message, color: 'red' });
          if (response.message === 'Request Added Successfully') {
              this.setState({ message: response.message });
              history.push('/requests');
          }
          else if (response.message === 'Image failed to upload') {
            this.setState({ request: { ...request, image: '' }, message: response.message, color: 'red' });
          }
          else if (response.message === 'Authentication failed') history.push('/signin');
    })
    }

    onImageChange = (event) => {
        const { uploadImageAction } = this.props;
        const { request } = this.state;
        this.setState({ message: 'Uploading image...', color: 'lightblue' });
        uploadImageAction(event.target.files[0]).then(response => {
            if (response.message === 'File uploaded!') {
                this.setState({ request: { ...request,
                  imageData: require('../../../vanilla/assets/image/request.jpg'),
                  image: 'vanilla/assets/image/request.jpg' },
                  message: response.message,
              });
              }
              else this.setState({ image: '', message: response.message });
        })
    }

    render() {
        const { message, color,  request, counterDisplay } = this.state;
        const { currentUser } = this.props;
        return (
          <div>
            <Nav Tab1={helper('')} Tab2={helper('list')} Tab3={helper('signout')} />
            <div>
              <UserWelcomeText username={currentUser.detail.role === 'admin' ? "Admin" : currentUser.detail.firstname} />
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
              <NewRequestForm {...{request}} handleChange={this.handleChange} {...{counterDisplay}} />
              {message && <MessageText {...{ color, message }} />}
              <div id="request-btn">
                <button onClick={this.onSubmit}>Submit</button>
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
export const mapStateToProps = (state, ownProps) => {
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
