import {
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Typography,
  FormLabel,
  IconButton,
  Accordion,
} from "@mui/material";
import { Delete, Edit, ExpandMore } from "@mui/icons-material";
import { Celebrity_Details } from "../userAccourdian.types";
import {
  ContentText,
  DetailsContainer,
  FooterContainer,
  HeaderContainer,
  HeaderText,
  PrimaryDetailsContainer,
} from "../userAccordian.styles";
interface ViewProps extends Celebrity_Details {
  handleEdit: (value: boolean) => void;
  calculateAge: (value: string) => number;
  openConfirmation: (value: number) => void;
  handleChange: Function;
}

export function ViewCelebSummary(props: ViewProps) {
  return (
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Box sx={HeaderContainer}>
        <Avatar alt="Remy Sharp" src={props.picture} />
        <Typography ml={1} sx={HeaderText}>
          {props.first} {props.last}
        </Typography>
      </Box>
    </AccordionSummary>
  );
}

export function ViewCelebDetails(props: ViewProps) {
  return (
    <AccordionDetails>
      <Box sx={DetailsContainer}>
        <Box sx={PrimaryDetailsContainer} justifyContent="space-between">
          <Box>
            <FormLabel>Age</FormLabel>
            <Typography sx={ContentText}>
              {props.calculateAge(props.dob)} years
            </Typography>
          </Box>
          <Box>
            <FormLabel>Gender</FormLabel>
            <Typography sx={ContentText}>{props.gender}</Typography>
          </Box>
          <Box>
            <FormLabel>Country</FormLabel>
            <Typography sx={ContentText}>{props.country}</Typography>
          </Box>
        </Box>

        <Box mt={1}>
          <FormLabel>Description</FormLabel>
          <Typography sx={ContentText}>{props.description}</Typography>
        </Box>
      </Box>
      <Box mt={1} sx={FooterContainer}>
        <IconButton onClick={() => props.openConfirmation(props.id)}>
          <Delete color="error" />
        </IconButton>

        <IconButton onClick={() => props.handleEdit(true)}>
          <Edit color="info" />
        </IconButton>
      </Box>
    </AccordionDetails>
  );
}
