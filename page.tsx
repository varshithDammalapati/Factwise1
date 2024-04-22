"use client";

import "./page.module.css";
import celebrities from "@/celebrities.json";
import { Box, TextField } from "@mui/material";
import UserAccordian from "@/Components/UserAccordian";
import { ChangeEvent, useEffect, useState } from "react";
import { Celebrity_Details } from "@/Components/UserAccordian/userAccourdian.types";
import useDebounce from "./hooks/useDebounce";
export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [celebritiesData, setCelebritiesData] = useState(celebrities);
  const [expanded, setExpanded] = useState<number | false>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const updateCelebrityDetails = (updatedCelebrity: Celebrity_Details) =>
    setCelebritiesData((prev) =>
      prev.map((celebrity) => {
        if (celebrity.id === updatedCelebrity.id) {
          return { ...updatedCelebrity, id: celebrity.id };
        }
        return celebrity;
      })
    );

  const deleteCelebrityDetails = (id: number) =>
    setCelebritiesData((prev) =>
      prev.filter((celebrity) => celebrity.id !== id)
    );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      {celebritiesData.map((celebrity, i) => (
        <Box mt={2} width={"320px"} key={i}>
          <UserAccordian
            {...{
              ...celebrity,
              expanded,
              setExpanded,
              editMode,
              setEditMode,
              updateCelebrityDetails,
              deleteCelebrityDetails,
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
