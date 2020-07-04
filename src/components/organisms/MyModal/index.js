/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MyModal = (props) => {
    const {
        // buttonLabel,
        size,
        modalTitle,
        modalBody,
        className,
        id
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <span onClick={toggle} id={id}></span>
            <Modal isOpen={modal} toggle={toggle} className={className} size={size}>
                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody>
                    {modalBody}
                    <Button color="secondary" className="float-right" onClick={toggle} style={{ marginRight: '10px' }}>Cancel</Button>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default MyModal;