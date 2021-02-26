import React, { useState, useEffect } from "react"
import { Box, Chip, Tooltip } from "@material-ui/core"
import { getTimeAgo, dataQuality } from "./Index"
import { makeStyles } from "@material-ui/core/styles"
import { useTranslation } from "react-i18next"

const useStyles = makeStyles((theme) => ({
  dataQuality: {
    margin: "4px 0",
    backgroundColor: "#E9F8E7",
    color: "#FFF",
  },
  dataGreen: { backgroundColor: "#e0ffe1 !important", color: "#4caf50" },
  dataYellow: { backgroundColor: "#fff8bc !important", color: "#a99700" },
  dataRed: { backgroundColor: "#ffcfcc !important", color: "#f44336" },
  dataGrey: { backgroundColor: "#d4d4d4 !important", color: "#424242" },
}))

export default function Active({ participant, ...props }) {
  const classes = useStyles()
  const [logins, setLogins] = useState(null)
  const [active, setActive] = useState(null)
  const [passive, setPassive] = useState(null)
  const { t, i18n } = useTranslation()
  const timeAgo = getTimeAgo(i18n.language)

  useEffect(() => {
    let res = participant.analytics
    setLogins(!!res ? res[0] : null)
    let passive = {
      gps: participant.gps,
      accel: participant.accelerometer,
    }
    setPassive(passive)
    let active = participant.active
    setActive(active)
  }, [])

  const dateInfo = (id) => ({
    relative: active?.timestamp ?? 0,
    absolute: new Date(parseInt((logins || {}).timestamp)).toLocaleString("en-US", Date.formatStyle("medium")),
    device: (logins || { data: {} }).data?.device_type || t("an unknown device"),
    userAgent: (logins || { data: {} }).data?.user_agent || t("unknown device model"),
  })

  const userAgentConcat = (userAgent) => {
    let appVersion = userAgent.hasOwnProperty("app_version") ? userAgent.app_version : ""
    let osVersion = userAgent.hasOwnProperty("os_version") ? userAgent.os_version : ""
    let deviceName = userAgent.hasOwnProperty("deviceName") ? userAgent.deviceName : ""
    let model = userAgent.hasOwnProperty("model") ? userAgent.model : ""
    return (
      t("App Version:") +
      appVersion +
      " " +
      t("OS Version:") +
      osVersion +
      " " +
      t("DeviceName:") +
      deviceName +
      " " +
      t("Model:") +
      model
    )
  }
  return (
    <Box>
      {dateInfo(participant.id).relative !== "in NaN years" && dateInfo(participant.id).relative !== undefined ? (
        <Tooltip
          title={`${timeAgo.format(new Date(parseInt(dateInfo(participant.id).relative)))} on ${
            dateInfo(participant.id).device
          } (${dateInfo(participant.id).absolute} 
           ${
             typeof dateInfo(participant.id).userAgent === "object"
               ? userAgentConcat(dateInfo(participant.id).userAgent)
               : dateInfo(participant.id).userAgent
           })`}
        >
          <Chip
            label={t("Last Active")}
            className={classes.dataQuality + " " + dataQuality(passive, timeAgo, t, classes).class}
          />
        </Tooltip>
      ) : (
        <Tooltip title={t("Never")}>
          <Chip
            label={t("Last Active")}
            className={classes.dataQuality + " " + dataQuality(passive, timeAgo, t, classes).class}
          />
        </Tooltip>
      )}
    </Box>
  )
}
