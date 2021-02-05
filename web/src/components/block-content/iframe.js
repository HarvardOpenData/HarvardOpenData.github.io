import React from "react";
import { Text } from "theme-ui";

function IFrame(props) {
    return (
        <div style={{alignItems: "center"}}>
            <br />
            {props.url && <iframe src={props.url}/>}
            <Text variant="caption">{props.caption}</Text>
            <br />
        </div>
    );
}

export default IFrame;
