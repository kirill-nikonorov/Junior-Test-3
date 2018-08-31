import React from 'react';
import {render} from 'react-dom';
import styled from 'styled-components';

const ModalWindow = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    overflow: auto;
    background-color: #d3d3d3;
    text-align: center;
`;

const ModalWrapper = styled.div`
    display: inline-block;
`;

export const showModalWithComponent = (Component, configs) => {
    this.node = document.createElement('div');
    document.body.appendChild(this.node);

    const closeModal = () => {
        document.body.removeChild(this.node);
    };

    render(
        <ModalWindow onClick={closeModal}>
            <ModalWrapper>
                <Component {...configs} />
            </ModalWrapper>
        </ModalWindow>,
        this.node
    );
};
