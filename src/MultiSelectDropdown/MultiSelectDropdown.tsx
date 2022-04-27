import React, { useState, useEffect } from "react";
import { IDropdownData, IMultiSelect } from "../Models/MultiSelectProps";
import "./MultiSelectDropdown.scss";
import { ReactComponent as YourSvg } from "../assets/chevron-up-solid.svg";
import CheckboxDropdown from "../CheckboxDropdown/CheckboxDropdown";
import PillComponent from "../PillComponent/PillComponent";
import CreateAsset from "../CreateAssetButton/CreateAssetButton";
import CreateAssetComponent from "../CreateAssetComponent/CreateAssetComponent";

const MultiSelectDropdown = (props: IMultiSelect): React.ReactElement => {
  const {
    dropdownData,
    dropdownHeading,
    dropdownPlaceHolder,
    dropdownSubheading,
  } = props;
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [stateDropdownData, setStateDropdownData] = useState<IDropdownData[]>(
    []
  );
  const [selectedAssets, setSelectedAssets] = useState<
    { groupId: number | string; assetId: number | string; value: string }[]
  >([]);
  const [selectAllData, setSelectAllData] = useState<
    { groupAssetId: string | number; checked: boolean }[]
  >([]);
  const [filterString, setFilterString] = useState("");
  const [addAssetDiv, setAddAssetDiv] = useState(false);
  const rotate = !toggleDropdown ? "rotate(180deg)" : "rotate(0)";

  useEffect(() => {
    setStateDropdownData(dropdownData);
  }, [dropdownData]);

  useEffect(() => {
    if (!selectAllData.length) {
      const arr: {
        groupAssetId: string | number;
        checked: boolean;
      }[] = [{ groupAssetId: "All", checked: false }];
      dropdownData.forEach((data) => {
        arr.push({ groupAssetId: data.groupId, checked: false });
      });
      setSelectAllData([...arr]);
    }
  }, [selectAllData, dropdownData]);

  const handleSearchChange = (search: string) => {
    setFilterString(search);
    const finalFilteredArray: IDropdownData[] = [];
    dropdownData.forEach((group) => {
      const filteredArr = group.groupAssets.filter(
        (data) =>
          data.data.toLowerCase().indexOf(search) > -1 ||
          (data.description &&
            data.description.toLowerCase().indexOf(search) > -1)
      );
      if (filteredArr.length) {
        filteredArr.forEach((data) => {
          data.checked =
            selectedAssets.filter(
              (asset) =>
                asset.assetId === data.assetId &&
                asset.groupId === group.groupId
            ).length > 0;
        });
        finalFilteredArray.push({
          groupId: group.groupId,
          groupName: group.groupName,
          groupAssets: filteredArr,
        });
      }
    });
    setStateDropdownData([...finalFilteredArray]);
  };

  const checkboxChangeHandler = (data: {
    checked: boolean;
    groupId: number | string;
    assetId: number | string;
    value: string;
  }) => {
    const selectedArray = [];
    const { checked, groupId, assetId } = data;
    let newStateDropdownData = [...stateDropdownData];
    if (groupId !== "All") {
      const group = newStateDropdownData.find(
        (data) => data.groupId === groupId
      );
      if (group) {
        if (assetId === "All") {
          const newSelectAllData = [...selectAllData];
          const selectAllFind = newSelectAllData.find(
            (data) => data.groupAssetId === groupId
          );
          if (selectAllFind) selectAllFind.checked = checked;
          setSelectAllData([...newSelectAllData]);
          group.groupAssets.forEach((data) => {
            selectedArray.push({
              groupId: group.groupId,
              assetId: data.assetId,
              value: data.data,
            });
            data.checked = checked;
          });
        } else {
          const asset = group.groupAssets.find(
            (data) => data.assetId === assetId
          );
          if (asset) {
            selectedArray.push({
              groupId: group.groupId,
              assetId: data.assetId,
              value: asset.data,
            });
            asset.checked = checked;
          }
          const newSelectAllData = [...selectAllData];
          const selectAllFind = newSelectAllData.find(
            (data) => data.groupAssetId === groupId
          );
          if (selectAllFind)
            selectAllFind.checked = group.groupAssets.every(
              (data) => data.checked
            );
          setSelectAllData([...newSelectAllData]);
        }
      }
    } else {
      newStateDropdownData.forEach((data) =>
        data.groupAssets.forEach((group) => {
          selectedArray.push({
            groupId: data.groupId,
            assetId: group.assetId,
            value: group.data,
          });
          group.checked = checked;
        })
      );
      const newSelectAllData = [...selectAllData];
      newSelectAllData.forEach((data) => (data.checked = checked));
      setSelectAllData(newSelectAllData);
    }
    checkIfAllSelected();
    selectedAssetsHandler(selectedArray, checked);
    setStateDropdownData([...newStateDropdownData]);
  };

  const checkIfAllSelected = () => {
    const newSelectedData = [...selectAllData];
    if (
      newSelectedData
        .filter((data) => data.groupAssetId !== "All")
        .every((data) => data.checked)
    ) {
      newSelectedData.forEach((data) => (data.checked = true));
      setSelectAllData([...newSelectedData]);
    } else {
      const found = newSelectedData.find((data) => (data.groupAssetId = "All"));
      if (found) {
        found.checked = false;
        setSelectAllData([...newSelectedData]);
      }
    }
  };

  const selectedAssetsHandler = (
    data: {
      groupId: number | string;
      assetId: number | string;
      value: string;
    }[],
    checked: boolean
  ) => {
    if (checked) {
      const newSelectedAssets = [...selectedAssets, ...data];
      const uniqueAssets = newSelectedAssets.filter(
        (a, i) =>
          newSelectedAssets.findIndex(
            (s) => a.assetId === s.assetId && a.groupId === s.groupId
          ) === i
      );
      setSelectedAssets([...uniqueAssets]);
    } else {
      const filteredArr = selectedAssets.filter(
        (asset) =>
          !data.find(
            (elem) =>
              elem.assetId === asset.assetId && elem.groupId === asset.groupId
          )
      );
      setSelectedAssets([...filteredArr]);
    }
  };

  const handleAddAsset = (
    groupId: string | number,
    assetName: string,
    assetDescription: string
  ) => {
    const newDropData = dropdownData.find(
      (data) => data.groupId.toString() === groupId
    );
    if (newDropData)
      newDropData.groupAssets.push({
        assetId: Math.floor(Math.random() * 1000),
        checked: false,
        data: assetName,
        description: assetDescription.length ? assetDescription : undefined,
      });
    setAddAssetDiv(false);
  };

  const checkIfAllChecked = (groupId: string | number): boolean =>
    selectAllData.find((data) => data.groupAssetId === groupId)?.checked ||
    false;

  return (
    <div className="multi-select-dropdown">
      <h3>{dropdownHeading}</h3>
      <div className="dropdown-subclass">
        <p className="dropdown-subheading">{dropdownSubheading}</p>
        <div>
          <div
            className="dropdown-toggle"
            onClick={() =>
              !toggleDropdown && setToggleDropdown(!toggleDropdown)
            }
          >
            {selectedAssets.map(
              (data, index) =>
                index < 2 && (
                  <PillComponent
                    key={index}
                    onChange={(res) => checkboxChangeHandler(res)}
                    value={data.value}
                    assetId={data.assetId}
                    groupId={data.groupId}
                  />
                )
            )}
            <div className="toggle-div">
              <input
                className="dropdown-placeholder"
                placeholder={dropdownPlaceHolder}
                disabled={!toggleDropdown}
                onChange={(e) =>
                  handleSearchChange(e.target.value.trim().toLowerCase())
                }
              />
              <div className="chevron-class">
                <YourSvg
                  style={{ transform: rotate, transition: "all 0.2s linear" }}
                  onClick={() => {
                    if (toggleDropdown) setAddAssetDiv(false);
                    setToggleDropdown(!toggleDropdown);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {
          <div
            style={{
              transition: "all .2s",
              border: "1px solid",
              visibility: !toggleDropdown ? "hidden" : "visible",
              opacity: !toggleDropdown ? "0" : "1",
            }}
          >
            <>
              {filterString.length === 0 && (
                <CheckboxDropdown
                  key={`select_all`}
                  value={{
                    data: "Select All Assests",
                    checked: checkIfAllChecked("All"),
                    assetId: "All",
                  }}
                  onChange={(res) => checkboxChangeHandler(res)}
                  groupId={"All"}
                />
              )}
              {stateDropdownData.map((dropdown, index) => (
                <div key={index} className="dropdown-group">
                  <p className="dropdown-groupName">{dropdown.groupName}</p>
                  {filterString.length === 0 && (
                    <CheckboxDropdown
                      value={{
                        data: "Select All",
                        checked: checkIfAllChecked(dropdown.groupId),
                        assetId: "All",
                      }}
                      onChange={(res) => checkboxChangeHandler(res)}
                      groupId={dropdown.groupId}
                    />
                  )}
                  {dropdown?.groupAssets &&
                    dropdown.groupAssets.map((data, index) => (
                      <CheckboxDropdown
                        key={index}
                        value={data}
                        onChange={(res) => checkboxChangeHandler(res)}
                        groupId={dropdown.groupId}
                      />
                    ))}
                </div>
              ))}
              <CreateAsset onClick={() => setAddAssetDiv(true)} />
            </>
          </div>
        }
        {addAssetDiv && (
          <CreateAssetComponent
            groups={dropdownData.map((data) => {
              return {
                groupId: data.groupId,
                groupName: data.groupName,
              };
            })}
            onCancel={() => setAddAssetDiv(false)}
            onAdd={(e) =>
              handleAddAsset(e.groupId, e.assetName, e.assetDescription)
            }
          />
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
