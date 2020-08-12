import React from "react";
//import "./Overlay.scss";

export interface OverlayProps {
    children: any;
}

export function Overlay(props: OverlayProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 w-full h-full">
            {props.children}
        </div>
    );
}