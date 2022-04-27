export interface IMultiSelect {
  dropdownHeading: string;
  dropdownSubheading: string;
  dropdownPlaceHolder: string;
  dropdownData: IDropdownData[];
}

export interface ICheckboxDropdown {
  value: GroupAsset;
  groupId: number | string;
  onChange: (data: IOnChange) => void;
}

export interface IDropdownData {
  groupId: number | string;
  groupName: string;
  groupAssets: GroupAsset[];
}

interface GroupAsset {
  assetId: number | string;
  data: string;
  description?: string;
  checked: boolean;
}

export interface IOnChange {
  checked: boolean;
  groupId: number | string;
  assetId: number | string;
  value: string;
}
