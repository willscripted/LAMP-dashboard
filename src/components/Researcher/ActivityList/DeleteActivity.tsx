import React, { useState } from "react"
import { Box, Icon, Fab } from "@material-ui/core"
import LAMP from "lamp-core"
import { useSnackbar } from "notistack"
import { useTranslation } from "react-i18next"
import { makeStyles, Theme, createStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import ResponsiveDialog from "../../ResponsiveDialog"
import ConfirmationDialog from "../ParticipantList/Profile/ConfirmationDialog"
import { Service } from "../../DBService/DBService"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnText: {
      background: "transparent",
      borderRadius: "40px",
      minWidth: 100,
      boxShadow: "none",
      cursor: "pointer",
      textTransform: "capitalize",
      paddingLeft: "10px !important",
      paddingRight: "15px !important",
      fontSize: "14px",
      color: "#7599FF",
      "& svg": { marginRight: 8 },
      "&:hover": { color: "#5680f9", background: "#fff" },
      "& span.MuiIcon-root": { fontSize: 20, marginRight: 3 },
      [theme.breakpoints.up("md")]: {
        //position: "absolute",
      },
    },
  })
)

export default function DeleteActivity({ activities, ...props }) {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const classes = useStyles()
  const [confirmationDialog, setConfirmationDialog] = useState(0)

  const confirmAction = async (status) => {
    if (status === "yes") {
      let activityIds = activities.map((a) => {
        return a.id
      })
      for (let activity of activities) {
        let tag
        if (activity.spec === "lamp.survey") {
          tag = await LAMP.Type.setAttachment(activity.id, "me", "lamp.dashboard.survey_description", null)
        } else {
          tag = await LAMP.Type.setAttachment(activity.id, "me", "lamp.dashboard.activity_details", null)
        }
        console.dir("deleted tag " + JSON.stringify(tag))

        let raw = await LAMP.Activity.delete(activity.id)
        //
        // let selectedStudy = studies.filter((study) => study.id === activity.parentID)[0]
        // setStudiesCount({ ...studiesCount, [selectedStudy.name]: --studiesCount[selectedStudy.name] })
        // console.dir(raw)
      }
      Service.delete("activities", activityIds)
      enqueueSnackbar(t("Successfully deleted the selected Activities."), {
        variant: "success",
      })
    } else {
      setConfirmationDialog(0)
    }
  }

  return (
    <span>
      <Fab
        variant="extended"
        size="small"
        classes={{ root: classes.btnText }}
        onClick={(event) => setConfirmationDialog(6)}
      >
        <Icon>delete_outline</Icon> {t("Delete")}
      </Fab>

      <ConfirmationDialog
        confirmationDialog={confirmationDialog}
        open={confirmationDialog > 0 ? true : false}
        onClose={() => setConfirmationDialog(0)}
        confirmAction={confirmAction}
      />
    </span>
  )
}
