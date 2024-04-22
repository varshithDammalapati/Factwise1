import {
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  FormLabel,
  IconButton,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
  Accordion,
} from "@mui/material";
import {
  ExpandMore,
  CheckCircleOutlineSharp,
  CancelOutlined,
} from "@mui/icons-material";
import { Celebrity_Details } from "../userAccourdian.types";
import {
  ContentText,
  DetailsContainer,
  FooterContainer,
  HeaderContainer,
  PrimaryDetailsContainer,
} from "../userAccordian.styles";
import { genderArr } from "@/app/page.constants";

interface EditProps extends Celebrity_Details {
  fullName: string;
  handleChange: Function;
  calculateAge: (value: string) => number;
  openConfirmation: (value: number) => void;
  handleCancel: () => void;
  handleSave: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent) => void;
}
export default function EditCeleb(props: EditProps) {
  return (
    <>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box sx={HeaderContainer}>
          <Avatar alt="Remy Sharp" src={props.picture} />

          <TextField
            size="small"
            value={props.fullName}
            name={"fullName"}
            onChange={props.handleInputChange}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={DetailsContainer}>
          <Box sx={PrimaryDetailsContainer} justifyContent="flex-start">
            <Box sx={DetailsContainer}>
              <FormLabel>Age</FormLabel>

              <TextField
                size="small"
                value={props.dob}
                name={"dob"}
                inputProps={{ max: new Date().toISOString().split("T")[0] }}
                type="date"
                onChange={props.handleInputChange}
              />
            </Box>
            <Box sx={DetailsContainer}>
              <FormLabel>Gender</FormLabel>
              <Select
                labelId="select-label"
                id="select"
                value={props.gender}
                size="small"
                onChange={props.handleSelectChange}
              >
                {genderArr.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={DetailsContainer}>
              <FormLabel>Country</FormLabel>
              <TextField
                size="small"
                value={props.country}
                name={"country"}
                onChange={props.handleInputChange}
              />
            </Box>
          </Box>

          <Box mt={1} sx={DetailsContainer}>
            <FormLabel>Description</FormLabel>
            <TextField
              sx={ContentText}
              multiline
              value={props.description}
              name={"description"}
              onChange={props.handleInputChange}
            />
          </Box>
        </Box>
        <Box mt={1} sx={FooterContainer}>
          <IconButton onClick={() => props.handleCancel()}>
            <CancelOutlined color="error" />
          </IconButton>

          <IconButton onClick={() => props.handleSave()}>
            <CheckCircleOutlineSharp color="success" />
          </IconButton>
        </Box>
      </AccordionDetails>
    </>
  );
}
