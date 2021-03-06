import { connect } from 'react-redux';
import ServerIndex from './server_index'
import {fetchAllServers, createServer} from '../../../actions/server_actions'
import { openModal } from '../../../actions/modal_actions';

const msp = (state) => {
    return({
    servers: Object.values(state.entities.servers),
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels)
})}

const mdp = dispatch => ({
    fetchAllServers: () => dispatch(fetchAllServers()),
    createServer: server => dispatch(createServer(server)),
    openModal: modal => dispatch(openModal("chooseServer"))
})

export default connect(msp, mdp)(ServerIndex)