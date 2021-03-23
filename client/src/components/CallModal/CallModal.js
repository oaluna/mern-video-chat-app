import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { RESTAPIUrl } from '../../config/config';
import './CallModal.css';


function CallModal({ status, callFrom, startCall, rejectCall, contactUser, userAvatar }) {
  const acceptWithVideo = (video) => {
    const config = { audio: true, video };
    return () => startCall(false, callFrom, config);
  };

  return (
    <div className={classnames('call-modal', status)}>
      <div className="target-avatar">
        <img src={`${RESTAPIUrl}/public/profile/${userAvatar}`} alt="contact-user"></img>
      </div>
      <p>
        <span className="caller">{`${contactUser}`}</span>
      </p>
      <span className="incoming">Incoming call...</span>
      <button
        type="button"
        className="btn-action fa fa-video"
        onClick={acceptWithVideo(true)}
      />
      <button
        type="button"
        className="btn-action fa fa-phone"
        onClick={acceptWithVideo(false)}
      />
      <button
        type="button"
        className="btn-action hangup fa fa-phone"
        onClick={rejectCall}
      />
    </div>
  );
}

CallModal.propTypes = {
  status: PropTypes.string.isRequired,
  callFrom: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  rejectCall: PropTypes.func.isRequired
};

export default CallModal;