import React from 'react';
import {render} from 'react-dom';
import styled from 'styled-components';

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #d3d3d3;
    overflow: auto;
    cursor: pointer;
    display: flex;
    justify-content: center ;
    align-items: center;
`;

export const showModalWithComponent = (Component, configs) => {
    this.node = document.createElement('div');
    document.body.appendChild(this.node);

    const closeModal = () => {
        document.body.removeChild(this.node);
    };

    render(
        <ModalWrapper onClick={closeModal}>
            <Component {...configs} />
        </ModalWrapper>,
        this.node
    );
};
