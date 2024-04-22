import React, { useState } from "react";

import { Celebrity_Details } from "./userAccourdian.types";
import ConfirmationDialog from "../ConfirmationDiaglog";
import { Accordion, SelectChangeEvent } from "@mui/material";
import EditCeleb from "./ui/Edit";
import { ViewCelebDetails, ViewCelebSummary } from "./ui/View";
interface UserAccordianProps extends Celebrity_Details {
  fullName: string;
}
export default function UserAccordion(props: Celebrity_Details) {
  const initialProps = {
    ...props,
    fullName: props.first + " " + props.last,
  };
  const [editedDetails, setEditedDetails] = useState<UserAccordianProps>({
    ...initialProps,
  });
  const [open, setOpen] = React.useState<boolean>(false);
  const [holdId, setID] = React.useState<number | undefined>(undefined);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (props.editMode) return;
      props.setExpanded(isExpanded ? panel : false);
    };

  const handleEdit = (value: boolean) => props.setEditMode(value);

  const handleCancel = () => {
    handleEdit(false);
    setEditedDetails({ ...initialProps });
  };

  const handleSave = () => {
    if (isDetailsValid()) {
      const lastNameArr = editedDetails.fullName?.split(" ");
      lastNameArr?.shift();
      props.updateCelebrityDetails({
        ...editedDetails,
        first: editedDetails.fullName.split(" ")[0],
        last: lastNameArr
          .reduce((init, value) => init + value + " ", "")
          .trim(),
      });
      handleEdit(false);
    }
  };

  const openConfirmation = (id: number) => {
    setID(id);
    setOpen(true);
  };
  const isDetailsValid = () => {
    const {
      fullName = "",
      dob = "",
      gender = "",
      country = "",
      description = "",
    } = editedDetails;
    let errorString = "";
    // note: just taken care of invalid date validation. can also addon min age validation here
    if (!fullName) errorString = "name should not be empty! \n";
    if (isNaN(new Date(dob).valueOf())) errorString += "return valid date! \n";
    if (!gender) errorString += "please select valid gender! \n";
    if (!country) errorString += "country should not be empty! \n";
    if (!description) errorString += "description should not be empty! \n";

    if (errorString.length > 0) {
      alert(errorString);
      return false;
    }

    return true;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setEditedDetails((prevDetails) => ({ ...prevDetails, gender: value }));
  };
  function calculateAge(dob: string) {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const viewProps = {
    ...props,
    calculateAge,
    handleChange,
    openConfirmation,
    handleEdit,
  };
  return (
    <>
      {props.editMode && props.expanded === props.id ? (
        <Accordion
          expanded={props.id == props.expanded}
          onChange={handleChange(props.id)}
        >
          <EditCeleb
            {...{
              ...editedDetails,
              calculateAge,
              handleChange,
              openConfirmation,
              handleCancel,
              handleSave,
              handleInputChange,
              handleSelectChange,
            }}
          />
        </Accordion>
      ) : (
        <Accordion
          expanded={props.id === props.expanded}
          onChange={handleChange(props.id)}
        >
          <ViewCelebSummary {...viewProps} />
          <ViewCelebDetails {...viewProps} />
        </Accordion>
      )}

      <ConfirmationDialog
        description="Are you sure you want to delete?"
        confirmButtonName="Delete"
        dialogState={{ open, setOpen }}
        onConfirm={() => holdId && props.deleteCelebrityDetails(holdId)}
      />
    </>
  );
}
