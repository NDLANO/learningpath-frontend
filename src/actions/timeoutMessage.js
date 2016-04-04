import { clearMessage } from '.';

export default function timeoutMessage (message) {
  return dispatch => { setTimeout(
    function(){
      dispatch(clearMessage(message.id));
    },
    message.timeToLive);
  };
}
