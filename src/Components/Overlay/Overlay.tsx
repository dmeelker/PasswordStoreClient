import React from "react";
import "./Overlay.scss";

export interface OverlayProps {
    children: any;
}

export function Overlay(props: OverlayProps) {
    return (
        <div className="overlay">
            {props.children}
        </div>
    );
}