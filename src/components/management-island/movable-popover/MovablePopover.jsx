import React, { useEffect } from 'react';
import { Popover } from 'react-bootstrap';
import "./MovablePopover.css";

const MovablePopover = React.forwardRef(
    ({ popper, children, show: _, ...props }, ref) => {
      useEffect(() => {
        popper.scheduleUpdate();
      }, [props.zoom, popper]);
  
      return (
        <div ref={ref} body {...props} className="rounded-0 border-0 bg-pop">
          {children}
        </div>
      );
    },
);

export default MovablePopover