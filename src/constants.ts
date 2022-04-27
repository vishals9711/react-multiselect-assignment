import { IDropdownData, IMultiSelect } from "./Models/MultiSelectProps";
const DROPDOWN_DATA: IDropdownData[] = [
  {
    groupId: 1,
    groupName: "ROOFTOP UNIT",
    groupAssets: [
      { data: "asdf", checked: false, assetId: 1 },
      {
        data: "RTU",
        description: "Carriera 1234 - 24230-5ui34",
        checked: false,
        assetId: 2,
      },
    ],
  },
  {
    groupId: "None",
    groupName: "Ungrouped",
    groupAssets: [
      { data: "UnGrouped", checked: false, assetId: 1 },
      {
        data: "Un RTU",
        description: "Carriera 1234 - 24230-5ui34",
        checked: false,
        assetId: 2,
      },
    ],
  },
];

export const DROPDOWN_PROPS: IMultiSelect = {
  dropdownData: DROPDOWN_DATA,
  dropdownHeading:
    "Select which assests will be worked on and what tasks will be performed on each asset.",
  dropdownPlaceHolder: "Search Assets",
  dropdownSubheading: "ASSETS TO BE WORKED ON",
};
