import React, { useState } from "react";
import "./CreateAssetComponent.scss";

interface ICreateAssetComponent {
  groups: {
    groupId: number | string;
    groupName: string;
  }[];
  onAdd: (data: {
    groupId: string | number;
    assetName: string;
    assetDescription: string;
  }) => void;
  onCancel: () => void;
}

const CreateAssetComponent = (
  props: ICreateAssetComponent
): React.ReactElement => {
  const { groups } = props;
  const [groupAndAsset, setGroupAndAsset] = useState({
    groupId: "",
    assetName: "",
    assetDescription: "",
  });
  return (
    <div className="create-asset-div">
      <select
        onChange={(e) =>
          setGroupAndAsset({ ...groupAndAsset, groupId: e.target.value })
        }
        placeholder={"Select Group"}
        className="create-asset-select"
        defaultValue={"selectYourOption"}
      >
        <option value="selectYourOption" disabled>
          Select your option
        </option>
        {groups.map((group, index) => (
          <option key={index} value={group.groupId}>
            {group.groupName}
          </option>
        ))}
      </select>
      <input
        className="create-asset-input"
        placeholder="Asset Name"
        onChange={(e) =>
          setGroupAndAsset({ ...groupAndAsset, assetName: e.target.value })
        }
      />
      <input
        className="create-asset-input"
        placeholder="Asset Description"
        onChange={(e) =>
          setGroupAndAsset({
            ...groupAndAsset,
            assetDescription: e.target.value,
          })
        }
      />
      <div className="button-div">
        <button
          className="add-button"
          onClick={() => props.onAdd(groupAndAsset)}
        >
          Add
        </button>
        <button className="cancel-button" onClick={() => props.onCancel()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateAssetComponent;
