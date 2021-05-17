import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Drag({
  children,
}) {
  const dragRef = useRef(null);

  const onMouseDown = (event) => {
    const shiftX = event.clientX - dragRef.current.getBoundingClientRect().left;
    const shiftY = event.clientY - dragRef.current.getBoundingClientRect().top;

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      dragRef.current.style.left = `${pageX - shiftX}px`;
      dragRef.current.style.top = `${pageY - shiftY}px`;
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    dragRef.current.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      dragRef.current.onmouseup = null;
    };
  };

  return (
    <ContainerSC
      ref={dragRef}
      onMouseDown={onMouseDown}
    >
      {
        children
      }
    </ContainerSC>
  );
}

Drag.propTypes = {
  children: PropTypes.node.isRequired,
};

const ContainerSC = styled('div')`
  position: absolute;
  left: 0;
  top: 0;
  user-select: none;
  cursor: pointer;
`;
