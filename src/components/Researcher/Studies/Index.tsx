import React, { useState, useEffect } from "react"
import {
  Box,
  IconButton,
  Icon,
  Button,
  TextField,
  Popover,
  AppBar,
  Toolbar,
  Divider,
  MenuItem,
  Chip,
  Tooltip,
  Grid,
  Fab,
  Container,
  Typography,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  Switch,
  FormControlLabel,
} from "@material-ui/core"
import { useSnackbar } from "notistack"
import { makeStyles, Theme, createStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import Header from "./Header"
import EditStudyField from "./EditStudyField"
import { useTranslation } from "react-i18next"
import DeleteStudy from "./DeleteStudy"
import EditStudy from "./EditStudy"

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#333",
    },
  },
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: "#fff solid 1px",
        padding: 10,
      },
    },
    MuiToolbar: {
      root: {
        maxWidth: 1055,
        width: "80%",
        margin: "0 auto",
        background: "#fff !important",
      },
    },
    MuiInput: {
      root: {
        border: 0,
      },
      underline: {
        "&&&:before": {
          borderBottom: "none",
        },
        "&&:after": {
          borderBottom: "none",
        },
      },
    },
    MuiIcon: {
      root: { color: "rgba(0, 0, 0, 0.4)" },
    },
  },
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnBlue: {
      background: "#7599FF",
      borderRadius: "40px",
      minWidth: 100,
      boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.20)",
      lineHeight: "38px",

      cursor: "pointer",
      textTransform: "capitalize",
      fontSize: "16px",
      color: "#fff",
      "& svg": { marginRight: 8 },
      "&:hover": { background: "#5680f9" },
      [theme.breakpoints.up("md")]: {
        position: "absolute",
      },
    },
    toolbardashboard: {
      minHeight: 100,
      padding: "0 10px",
      "& h5": {
        color: "rgba(0, 0, 0, 0.75)",
        textAlign: "left",
        fontWeight: "600",
        fontSize: 30,
        width: "calc(100% - 96px)",
      },
    },
    tableContainer: {
      "& div.MuiInput-underline:before": { borderBottom: "0 !important" },
      "& div.MuiInput-underline:after": { borderBottom: "0 !important" },
      "& div.MuiInput-underline": {
        "& span.material-icons": {
          width: 21,
          height: 19,
          fontSize: 27,
          lineHeight: "23PX",
          color: "rgba(0, 0, 0, 0.4)",
        },
        "& button": { display: "none" },
      },
    },
    studyCode: {
      margin: "4px 0",
      backgroundColor: "#ECF4FF",
      border: "2px solid #FFFFFF",
      color: "#000000",
      maxWidth: 250,
    },
    switchLabel: { color: "#4C66D6" },

    dataQuality: {
      margin: "4px 0",
      backgroundColor: "#E9F8E7",
      color: "#FFF",
    },
    tableOptions: {
      background: "#ECF4FF",
      padding: "10px 0",
    },
    btnOptions: {
      textTransform: "capitalize",
      color: "#4C66D6",
      margin: "0 45px 0 0",
      "& span": { cursor: "pointer" },
      "& svg": { width: 24, height: 24, fill: "#4C66D6" },
    },
    tableOuter: {
      width: "100vw",
      position: "relative",
      left: "50%",
      right: "50%",
      marginLeft: "-50.6vw",
      marginRight: "-50.6vw",
      marginBottom: 30,
      marginTop: -20,
      // paddingTop: 40,
      "& input": {
        width: 350,
        [theme.breakpoints.down("md")]: {
          width: 200,
        },
      },
      "& div.MuiToolbar-root": { maxWidth: 1232, width: "100%", margin: "0 auto" },
      "& h6": { fontSize: 30, fontWeight: 600 },
    },
    tagFiltered: {
      color: "#5784EE",
    },
    tagFilteredBg: {
      color: "#5784EE !important",
      "& path": { fill: "#5784EE !important", fillOpacity: 1 },
    },
    btnFilter: {
      color: "rgba(0, 0, 0, 0.4)",
      fontSize: 14,
      lineHeight: "38px",
      cursor: "pointer",
      textTransform: "capitalize",
      boxShadow: "none",
      background: "transparent",
      margin: "0 15px",
      paddingRight: 0,
      "& svg": { marginRight: 10 },
    },
    tableContainerWidth: {
      maxWidth: 1055,
      width: "80%",
    },
    disabledButton: {
      color: "#4C66D6 !important",
      opacity: 0.5,
    },
    customPopover: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
    customPaper: {
      maxWidth: 380,
      marginTop: 75,
      marginLeft: 100,
      borderRadius: 10,
      padding: "10px 0",
      "& h6": { fontSize: 16 },
      "& li": {
        display: "inline-block",
        width: "100%",
        padding: "15px 30px",
        "&:hover": { backgroundColor: "#ECF4FF" },
      },
      "& *": { cursor: "pointer" },
    },
    popexpand: {
      backgroundColor: "#fff",
      color: "#618EF7",
      zIndex: 11111,
      "& path": { fill: "#618EF7" },
      "&:hover": { backgroundColor: "#f3f3f3" },
    },
    deleteBtn: { background: "#7599FF", color: "#fff", "&:hover": { background: "#5680f9" } },
    backdrop: {
      zIndex: 111111,
      color: "#fff",
    },
    dataGreen: { backgroundColor: "#e0ffe1 !important", color: "#4caf50" },
    dataYellow: { backgroundColor: "#fff8bc !important", color: "#a99700" },
    dataRed: { backgroundColor: "#ffcfcc !important", color: "#f44336" },
    dataGrey: { backgroundColor: "#d4d4d4 !important", color: "#424242" },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    activityContent: {
      padding: "25px 50px 0",
    },
    manageStudypop: {
      padding: "25px 25px 30px 35px",
    },
    studyList: {
      borderBottom: "#e8e8e8 solid 1px",
    },
    errorMsg: { color: "#FF0000", fontSize: 12 },
    studyOption: { width: "100%" },
    addNewDialog: { maxWidth: 350 },
    manageStudyDialog: { maxWidth: 700 },
    manageStudyBtn: {
      marginRight: 15,
      background: "#7599FF",
      color: "#fff",
      boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.20)",
      "&:hover": { background: "#5680f9" },
    },
    studyName: { maxWidth: 200, minWidth: 200, alignItems: "center", display: "flex" },
    studyMain: { background: "#F8F8F8", borderRadius: 4 },
  })
)

export default function StudiesList({ title, researcher, studies, ...props }) {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [editStudy, setEditStudy] = useState(false)
  const [editStudyName, setEditStudyName] = useState("")
  const [aliasStudyName, setAliasStudyName] = useState("")
  const [studyArray, setStudyNameArray] = useState([])
  const [openDialogStudies, setOpenDialogManageStudies] = useState(false)

  const updateStudyName = (data) => {
    setEditStudy(false)
    setAliasStudyName(data)
    let oldNameArray = Object.assign({}, studyArray)
    oldNameArray[editStudyName] = data
    setStudyNameArray(oldNameArray)
  }

  // Parent Component
  const callbackModal = () => {
    // refreshPage()
    setOpenDialogManageStudies(false)
  }

  const editStudyField = (selectedRows, event) => {
    setEditStudy(true)
    setEditStudyName(selectedRows)
  }

  return (
    <React.Fragment>
      {/* <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <Header studies={studies} researcher={researcher} />
      <Box className={classes.tableContainer} py={4}>
        <Grid container spacing={3}>
          {studies.map((study) => (
            <Grid item lg={6} xs={12}>
              <Box display="flex" p={1} key={study.id} className={classes.studyMain}>
                <Box flexGrow={1}>
                  {" "}
                  <EditStudy study={study} />
                </Box>
                <DeleteStudy study={study} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  )
}
