import React, { useEffect } from "react";
import { Popover } from "react-bootstrap";
import "./MovablePopover.css";
import useSound from 'use-sound';
import click from '../../../sounds/click.mp3';




const MovablePopover = React.forwardRef(
  ({ popper, children, show: _, ...props }, ref) => {
    useEffect(() => {
      popper.scheduleUpdate();
    }, [props.zoom, popper]);

    const [play1] = useSound(click, {
      volume: 0.2
    });
    
    const handleSound = () => {
      play1();
    };

    return (
      <Popover ref={ref} body {...props} className="border-0 rounded-0">
        <div className="bg-pop font-btn" onClick={()=>handleSound()}>{children}</div>
      </Popover>
    );
  }
);

export default MovablePopover;