import React from "react";

export interface OverlayProps {
    children: any;
}

export function Overlay(props: OverlayProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 w-screen h-screen flex">
            <div className="m-auto bg-white shadow overflow-hidden sm:rounded-lg">
                {props.children}
            </div>
        </div>
    );
}