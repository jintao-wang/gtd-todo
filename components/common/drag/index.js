import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Drag({
  children,
  position,
}) {
  const dragRef = useRef(null);
  const [_position, setPosition] = useState({
    left: '0px',
    top: '0px',
  });

  useEffect(() => {
    console.log(children.type.name);
  }, []);

  useEffect(() => {
    const widgetPositionString = localStorage.widgetPosition;
    const widgetPosition = widgetPositionString && JSON.parse(widgetPositionString);
    const currentPosition = widgetPosition?.[children.type.name];
    if (currentPosition) {
      dragRef.current.style.left = currentPosition.left;
      dragRef.current.style.top = currentPosition.top;
      return;
    }
    if (!position) return;
    if (typeof position === 'object') {
      setPosition(position);
      return;
    }
    const leftCenter = `${document.body.clientWidth / 2 - dragRef.current.clientWidth / 2}px`;
    const leftRight = `${document.body.clientWidth - dragRef.current.clientWidth}px`;
    const topCenter = `${document.body.clientHeight / 2 - dragRef.current.clientHeight / 2}px`;
    const topBottom = `${document.body.clientHeight - dragRef.current.clientHeight}px`;

    switch (position) {
      case 'top_left':
        setPosition({
          left: '0px',
          top: '0px',
        });
        break;
      case 'top_center':
        setPosition({
          left: leftCenter,
          top: '0px',
        });
        break;
      case 'top_right':
        setPosition({
          left: leftRight,
          top: '0px',
        });
        break;
      case 'right_center':
        setPosition({
          left: leftRight,
          top: topCenter,
        });
        break;
      case 'right_bottom':
        setPosition({
          left: leftRight,
          top: topBottom,
        });
        break;
      case 'bottom_center':
        setPosition({
          left: leftCenter,
          top: topBottom,
        });
        break;
      case 'bottom_left':
        setPosition({
          left: 0,
          top: topBottom,
        });
        break;
      case 'left_center':
        setPosition({
          left: 0,
          top: topCenter,
        });
        break;
      case 'left_top':
        setPosition({
          left: '0px',
          top: '0px',
        });
        break;
      case 'left_bottom':
        setPosition({
          left: 0,
          top: topBottom,
        });
        break;
      case 'center':
        setPosition({
          left: leftCenter,
          top: topCenter,
        });
        break;
      default:
        break;
    }
  }, []);

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
      const widgetPositionString = localStorage.widgetPosition;
      const widgetPosition = widgetPositionString ? JSON.parse(widgetPositionString) : {};
      widgetPosition[children.type.name] = {
        left: dragRef.current.style.left,
        top: dragRef.current.style.top,
      };
      localStorage.widgetPosition = JSON.stringify(widgetPosition);
    };
  };

  return (
    <ContainerSC
      ref={dragRef}
      onMouseDown={onMouseDown}
      positionSC={_position}
    >
      {
        children
      }
    </ContainerSC>
  );
}

Drag.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.shape({
    left: PropTypes.string,
    top: PropTypes.string,
  }) || PropTypes.string,
};

Drag.defaultProps = {
  position: {
    left: '0px',
    top: '0px',
  },
};

const ContainerSC = styled('div', 'positionSC')`
  box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
  border-radius: 12px;
  height: fit-content;
  width: fit-content;
  position: absolute;
  ${(props) => props.positionSC};
`;
