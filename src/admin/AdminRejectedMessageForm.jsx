import React from 'react';
import Lightbox from '../common/Lightbox';

const AdminRejectedMessageForm = ({show, onClose, onSubmit, message}) => (
    <Lightbox
      display={show}
      onClose={onClose}>
      <form onSubmit={onSubmit}>
        <textarea value={message} />
        <input type="submit" />
      </form>
    </Lightbox>
  )


export default AdminRejectedMessageForm;
