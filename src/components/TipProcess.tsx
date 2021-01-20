import React, { FC, useEffect } from 'react';
import { Modal } from 'antd';
import './TipProcess.scss';
import { useDispatch } from 'react-redux';
import { getRecords, getSubRecords } from '../store/record/actions';
const { ipcRenderer } = window.require('electron');

type Props = {
  /* 是否显示 */
  visible: boolean;
  /* 取消或关闭 */
  onCancelHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};
const TipProcess: FC<Props> = ({ visible, onCancelHandler }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('ipc-message', renderTip);

    ipcRenderer.on('ipc-synced', dataSynced);

    return () => {
      ipcRenderer.removeListener('ipc-message', renderTip);
      ipcRenderer.removeListener('ipc-synced', dataSynced);
    };
  }, []);

  const renderTip = (event: any, result: any) => {
    let p = document.createElement('p');
    p.innerText = result.msg;
    let span = document.createElement('span');
    span.className = result.status + ' status';
    span.innerText = `[ ${result.status} ] :`;
    p.prepend(span);
    document.querySelector('#tip')?.prepend(p);
  };

  const dataSynced = () => {
    dispatch(getRecords());
    dispatch(getSubRecords(''));
  };
  return (
    <Modal
      title="提示"
      visible={visible}
      onOk={onCancelHandler}
      onCancel={onCancelHandler}
      className="tip"
      destroyOnClose={true}
    >
      <div id="tip"></div>
    </Modal>
  );
};

export default TipProcess;
