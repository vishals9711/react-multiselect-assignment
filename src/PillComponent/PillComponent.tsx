import React from "react";
import { ReactComponent as CrossSvg } from "../assets/cross-23.svg";
import { IOnChange } from "../Models/MultiSelectProps";
import "./PillComponent.scss";

interface IPillComponent {
  groupId: number | string;
  assetId: number | string;
  value: string;
  onChange: (data: IOnChange) => void;
}

const PillComponent = (props: IPillComponent): React.ReactElement => {
  const { groupId, onChange, value, assetId } = props;
  return (
    <div className="pill-component">
      <p className="pill-text">{value}</p>
      <CrossSvg
        className="pill-button"
        onClick={(e) =>
          onChange({ checked: false, groupId, assetId: assetId, value: value })
        }
      />
    </div>
  );
};

export default PillComponent;
