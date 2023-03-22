import React, { useEffect } from 'react';
import { Popover } from 'react-bootstrap';
import "./MovablePopover.css";

const MovablePopover = React.forwardRef(
    ({ popper, children, show: _, ...props }, ref) => {
      useEffect(() => {
        popper.scheduleUpdate();
      }, [props.zoom, popper]);
  
      return (
        <Popover ref={ref} body {...props} className="rounded-0 border-0 bg-pop">
          {children}
        </Popover>
      );
    },
);

export default MovablePopover