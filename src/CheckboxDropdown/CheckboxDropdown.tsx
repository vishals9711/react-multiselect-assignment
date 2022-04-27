import React from "react";
import { ICheckboxDropdown } from "../Models/MultiSelectProps";
import "./CheckboxDropdown.scss";

const CheckboxDropdown = (props: ICheckboxDropdown): React.ReactElement => {
  const { value, onChange, groupId } = props;
  const { assetId, checked, data, description } = value;
  return (
    <div className="checkbox-div">
      <input
        type="checkbox"
        className="input-checkbox"
        checked={checked}
        onChange={(e) =>
          onChange({
            checked: e.currentTarget.checked,
            groupId,
            assetId,
            value: data,
          })
        }
      />
      <p className="input-value">{data}</p>
      {description && <p className="checkbox-description">{description}</p>}
    </div>
  );
};

export default CheckboxDropdown;
