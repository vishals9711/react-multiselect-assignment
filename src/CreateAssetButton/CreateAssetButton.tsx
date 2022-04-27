import React from 'react'
import { ReactComponent as PlusSvg } from "../assets/plus.svg";
import "./CreateAssetButton.scss";
const CreateAssetButton = (props: {
    onClick: () => void
}): React.ReactElement => {
    return (
        <button className="create-asset-btn" onClick={props.onClick}>
            <div className="create-asset-main-div"><PlusSvg className='plus-svg' /><p className="input-value">Create A New Asset</p></div>
        </button>
    )
}

export default CreateAssetButton;