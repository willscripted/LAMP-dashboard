// Core Imports
import React, { useEffect } from "react"
import {
  Container,
  Typography,
  Grid,
  Card,
  Icon,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  AppBar,
  Toolbar,
  ButtonBase,
  Link,
  Backdrop,
  CircularProgress,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core"
import ResponsiveDialog from "./ResponsiveDialog"
import { ReactComponent as JournalBlue } from "../icons/journal_blue.svg"
import PreventData from "./PreventData"
import { getImage } from "./Manage"
import LAMP, {
  Participant as ParticipantObj,
  Activity as ActivityObj,
  ActivityEvent as ActivityEventObj,
  SensorEvent as SensorEventObj,
} from "lamp-core"
import MultipleSelect from "./MultipleSelect"
import Journal from "./Journal"
import PreventGoalData from "./PreventGoalData"
import PreventDBT from "./PreventDBT"
import { ReactComponent as BreatheIcon } from "../icons/Breathe.svg"
import JournalImg from "../icons/Journal.svg"
import { ReactComponent as GoalIcon } from "../icons/Goal.svg"
import { ReactComponent as JournalIcon } from "../icons/Goal.svg"
import { ReactComponent as HopeBoxIcon } from "../icons/HopeBox.svg"
import { ReactComponent as MedicationIcon } from "../icons/Medication.svg"
import InfoIcon from "../icons/Info.svg"
import ScratchCard from "../icons/ScratchCard.svg"
import { ReactComponent as PreventExercise } from "../icons/PreventExercise.svg"
import { ReactComponent as PreventReading } from "../icons/PreventReading.svg"
import { ReactComponent as PreventSleeping } from "../icons/PreventSleeping.svg"
import { ReactComponent as PreventNutrition } from "../icons/PreventNutrition.svg"
import { ReactComponent as PreventMeditation } from "../icons/PreventMeditation.svg"
import { ReactComponent as PreventEmotions } from "../icons/PreventEmotions.svg"
import { ReactComponent as PreventBreatheIcon } from "../icons/PreventBreathe.svg"
import { ReactComponent as PreventSavings } from "../icons/PreventSavings.svg"
import { ReactComponent as PreventWeight } from "../icons/PreventWeight.svg"
import { ReactComponent as PreventCustom } from "../icons/PreventCustom.svg"
import { ReactComponent as AssessDbt } from "../icons/AssessDbt.svg"
import ReactMarkdown from "react-markdown"
import emoji from "remark-emoji"
import gfm from "remark-gfm"
import en from "javascript-time-ago/locale/en"
import hi from "javascript-time-ago/locale/hi"
import es from "javascript-time-ago/locale/es"
import TimeAgo from "javascript-time-ago"
import { useTranslation } from "react-i18next"
import { Vega, VegaLite } from "react-vega"
import classnames from "classnames"
import EmbeddedActivity from "./EmbeddedActivity"

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo("en-US")

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    thumbMain: { maxWidth: 255 },
    mainIcons: {
      width: 80,
      height: 80,
      [theme.breakpoints.up("lg")]: {
        width: 130,
        height: 130,
      },
      [theme.breakpoints.down("sm")]: {
        width: 75,
        height: 75,
      },
    },
    linkButton: {
      padding: "15px 25px 15px 25px",
    },

    dialogueStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    cardlabel: {
      fontSize: 14,

      padding: "0 18px",
      bottom: 15,
      position: "absolute",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        fontSize: 12,
        padding: "0 5px",
      },
    },
    inlineHeader: {
      background: "#FFFFFF",
      boxShadow: "none",

      "& h5": { fontSize: 25, color: "rgba(0, 0, 0, 0.75)", fontWeight: 600 },
    },
    vega: {
      "& .vega-embed": {
        width: "100%",
        "& vega-actions": { paddingRight: "0 !important", top: "-25px" },
        "& vega-summary": { paddingRight: "0 !important", top: "15px" },
      },
      "& canvas": { width: "100% !important", height: "auto !important" },
    },
    toolbardashboard: {
      minHeight: 65,
      padding: "0 10px",
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
      "& h5": {
        color: "rgba(0, 0, 0, 0.75)",
        textAlign: "left",
        fontWeight: "600",
        fontSize: 25,
        width: "calc(100% - 96px)",
      },
    },
    toolbar: {
      minHeight: 90,
      alignItems: "flex-start",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    preventlabel: {
      fontSize: 16,
      minHeight: 48,
      padding: "0 0 0 15px",
      marginTop: 8,
      width: "100%",
      textAlign: "left",
      "& span": { color: "#618EF7" },
    },
    prevent: {
      background: "#ECF4FF",
      padding: "10px 0",
      minHeight: 180,
      textAlign: "center",
      boxShadow: "none",
      borderRadius: 18,
      position: "relative",
      width: "100%",
      "& h6": { color: "#4C66D6", fontSize: 12, position: "absolute", bottom: 10, width: "100%" },
      "& svg": {
        [theme.breakpoints.up("lg")]: {
          width: 150,
          height: 150,
        },
      },

      [theme.breakpoints.up("lg")]: {
        minHeight: 240,
        maxHeight: 240,
      },
    },

    btnprevent: {
      background: "#ECF4FF",
      borderRadius: "40px",
      minWidth: "200px",
      boxShadow: " 0px 10px 15px rgba(255, 172, 152, 0.25)",
      lineHeight: "22px",
      display: "inline-block",
      textTransform: "capitalize",
      fontSize: "16px",
      color: "rgba(0, 0, 0, 0.75)",
      fontWeight: "bold",
      marginBottom: 20,
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        marginBottom: 0,
      },
      "& span": { cursor: "pointer" },
      "&:hover": {
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      },
    },

    topicon: {
      minWidth: 150,
      minHeight: 150,
      [theme.breakpoints.up("lg")]: {
        width: 150,
        height: 150,
      },
      [theme.breakpoints.down("sm")]: {
        minWidth: 105,
        minHeight: 105,
      },
    },
    dialogueContent: {
      padding: "20px 40px 40px",
      "& h4": { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
      [theme.breakpoints.down("lg")]: {
        padding: "20px 20px 10px",
      },
    },
    dialogtitle: { padding: 0 },

    preventFull: {
      background: "#ECF4FF",
      padding: "10px 0",
      minHeight: 180,
      textAlign: "center",
      boxShadow: "none",
      borderRadius: 18,
      position: "relative",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        minHeight: "auto",
      },
      [theme.breakpoints.up("lg")]: {
        minHeight: 240,
        maxHeight: 240,
      },

      "& h6": {
        color: "#4C66D6",
        fontSize: 12,
        textAlign: "right",
        padding: "0 15px",
        [theme.breakpoints.up("sm")]: {
          position: "absolute",
          bottom: 10,
          right: 10,
        },
      },
    },
    preventlabelFull: {
      minHeight: "auto",
      fontSize: 16,

      padding: "0 0 0 15px",
      marginTop: 8,
      width: "100%",
      textAlign: "left",
      "& span": { color: "#618EF7" },
    },

    addicon: { float: "right", color: "#6083E7" },
    preventHeader: {
      [theme.breakpoints.up("sm")]: {
        flexGrow: "initial",
        paddingRight: 10,
      },
      "& h5": {
        fontWeight: 600,
        fontSize: 18,
        color: "rgba(0, 0, 0, 0.4)",
      },
    },
    marBottom10: {
      marginBottom: 10,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    addbtnmain: {
      maxWidth: 24,
      "& button": { padding: 0 },
    },
    sensorhd: {
      margin: "80px 0 15px 0",
      [theme.breakpoints.down("xs")]: {
        marginTop: 50,
      },
    },
    activityhd: {
      margin: "0 0 15px 0",
    },
    header: {
      background: "#ECF4FF",
      padding: "35px 40px 10px",
      textAlign: "center",
      [theme.breakpoints.down("lg")]: {
        padding: "35px 20px 10px",
      },
      "& h2": {
        fontSize: 25,
        fontWeight: 600,
        color: "rgba(0, 0, 0, 0.75)",
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
          fontSize: 18,
        },
      },
      "& h6": {
        fontSize: "14px",
        fontWeight: "normal",
        textAlign: "left",
      },
    },
    maxw150: { maxWidth: 150, marginLeft: "auto", marginRight: "auto" },
    maxw300: {
      maxWidth: 300,
      marginLeft: "auto",
      marginRight: "auto",
      [theme.breakpoints.up("lg")]: {
        maxWidth: "90%",
        marginTop: 40,
      },
    },
    activitydatapop: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    activityContent: {
      maxHeight: "280px",
    },
    thumbContainer: {
      maxWidth: 1055,
      width: "80%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        paddingBottom: 80,
      },
    },
    fullwidthBtn: { width: "100%" },
    preventGraph: {
      marginTop: -35,
      maxHeight: 100,
      "& svg": {
        [theme.breakpoints.up("lg")]: {
          marginTop: 15,
        },
      },
      "& h2": {
        fontWeight: 600,
        fontSize: 75,
        color: "#4C66D6",
        marginTop: 22,
        [theme.breakpoints.up("lg")]: {
          marginTop: 40,
        },
      },
    },
    preventRightSVG: {
      "& svg": { maxWidth: 40, maxHeight: 40 },
    },
    dialogueCurve: { borderRadius: 10, maxWidth: 400 },
    backbtn: {
      [theme.breakpoints.down("xs")]: {
        paddingLeft: 0,
      },
    },
    linkBlue: { color: "#6083E7", cursor: "pointer" },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    automation: {
      padding: "15px 0px 30px",
      boxShadow: "none",
      border: "#ccc solid 1px",
      "& h6": { fontSize: 16, textAlign: "center", marginBottom: 20 },
    },
  })
)

//const { t } = useTranslation()

function _patientMode() {
  return LAMP.Auth._type === "participant"
}

function getSocialContextGroups(gps_events?: SensorEventObj[]) {
  gps_events = gps_events?.filter((x) => !!x.data?.context?.social) ?? [] // Catch missing data.
  let events = [
    {
      label: "Alone",
      value: gps_events.filter((x) => x.data.context.social === "alone").length,
    },
    {
      label: "Friends",
      value: gps_events.filter((x) => x.data.context.social === "friends").length,
    },
    {
      label: "Family",
      value: gps_events.filter((x) => x.data.context.social === "family").length,
    },
    {
      label: "Peers",
      value: gps_events.filter((x) => x.data.context.social === "peers").length,
    },
    {
      label: "Crowd",
      value: gps_events.filter((x) => x.data.context.social === "crowd").length,
    },
  ]
  return events
}

function getEnvironmentalContextGroups(gps_events?: SensorEventObj[]) {
  gps_events = gps_events?.filter((x) => !!x.data?.context?.environment) ?? [] // Catch missing data.
  let events = [
    {
      label: "Home",
      value: gps_events.filter((x) => x.data.context.environment === "home" || x.data.context.environment === null)
        .length,
    },
    {
      label: "School",
      value: gps_events.filter((x) => x.data.context.environment === "school").length,
    },
    {
      label: "Work",
      value: gps_events.filter((x) => x.data.context.environment === "work").length,
    },
    {
      label: "Hospital",
      value: gps_events.filter((x) => x.data.context.environment === "hospital").length,
    },
    {
      label: "Outside",
      value: gps_events.filter((x) => x.data.context.environment === "outside").length,
    },
    {
      label: "Shopping",
      value: gps_events.filter((x) => x.data.context.environment === "shopping").length,
    },
    {
      label: "Transit",
      value: gps_events.filter((x) => x.data.context.environment === "transit").length,
    },
  ]

  return events
}

// Perform event coalescing/grouping by sensor or activity type.
async function getSensorEvents(participant: ParticipantObj): Promise<{ [groupName: string]: SensorEventObj[] }> {
  let _events = ((await LAMP.SensorEvent.allByParticipant(participant.id)) as any).groupBy("sensor")

  // Perform datetime coalescing to either days or weeks.
  _events["lamp.steps"] = Object.values(
    ((_events || {})["lamp.steps"] || [])
      .map((x) => ({
        ...x,
        timestamp: Math.round(x.timestamp / (24 * 60 * 60 * 1000)) /* days */,
      }))
      .groupBy("timestamp")
  )
    .map((x: any[]) =>
      x.reduce(
        (a, b) =>
          !!a.timestamp
            ? {
                ...a,
                data: {
                  value:
                    (typeof a.data.value !== "number" ? 0 : a.data.value) +
                    (typeof b.data.value !== "number" ? 0 : b.data.value),
                  units: "steps",
                },
              }
            : b,
        {}
      )
    )
    .map((x) => ({
      ...x,
      timestamp: x.timestamp * (24 * 60 * 60 * 1000) /* days */,
    }))
  return _events
}

// Perform event coalescing/grouping by sensor or activity type.
async function getActivityEvents(
  participant: ParticipantObj,
  _activities: ActivityObj[],
  _hidden: string[]
): Promise<{ [groupName: string]: ActivityEventObj[] }> {
  let original = (await LAMP.ActivityEvent.allByParticipant(participant.id))
    .map((x) => ({
      ...x,
      activity: _activities.find((y) => x.activity === y.id),
    }))
    .filter((x) => (!!x.activity ? !_hidden.includes(`${x.timestamp}/${x.activity.id}`) : true))
    .sort((x, y) => (x.timestamp > y.timestamp ? 1 : x.timestamp < y.timestamp ? -1 : 0))
    .map((x) => ({
      ...x,
      activity: (x.activity || { name: "" }).name || x.static_data?.survey_name,
    }))
    .groupBy("activity") as any
  let customEvents = _activities
    .filter((x) => x.spec === "lamp.dashboard.custom_survey_group")
    .map((x) =>
      x?.settings?.map((y, idx) =>
        original?.[y.activity]
          ?.map((z) => ({
            idx: idx,
            timestamp: z.timestamp,
            duration: z.duration,
            activity: x.name,
            slices: z.temporal_slices.find((a) => a.item === y.question),
          }))
          .filter((y) => y.slices !== undefined)
      )
    )
    .filter((x) => x !== undefined)
    .flat(2)
    .groupBy("activity")
  let customGroups = Object.entries(customEvents).map(([k, x]) => [
    k,
    Object.values(x.groupBy("timestamp")).map((z: any) => ({
      timestamp: z?.[0].timestamp,
      duration: z?.[0].duration,
      activity: z?.[0].activity,
      static_data: {},
      temporal_slices: Array.from(
        z?.reduce((prev, curr) => ({ ...prev, [curr.idx]: curr.slices }), {
          length:
            z
              .map((a) => a.idx)
              .sort()
              .slice(-1)[0] + 1,
        })
      ).map((a) => (a === undefined ? {} : a)),
    })),
  ])
  return Object.fromEntries([...Object.entries(original), ...customGroups])
}

async function getActivities(participant: ParticipantObj) {
  let original = await LAMP.Activity.allByParticipant(participant.id, null, true)
  let originalFiltered = original.filter((data) => data.spec !== "lamp.recording")
  return [...originalFiltered]
}

async function getSelectedActivities(participant: ParticipantObj) {
  return (
    Object.fromEntries(
      (
        await Promise.all(
          [participant.id || ""].map(async (x) => [
            x,
            await LAMP.Type.getAttachment(x, "lamp.selectedActivities").catch((e) => []),
          ])
        )
      )
        .filter((x: any) => x[1].message !== "404.object-not-found")
        .map((x: any) => [x[0], x[1].data])
    )[participant.id || ""] ?? []
  )
}
async function getSelectedSensors(participant: ParticipantObj) {
  return (
    Object.fromEntries(
      (
        await Promise.all(
          [participant.id || ""].map(async (x) => [
            x,
            await LAMP.Type.getAttachment(x, "lamp.selectedSensors").catch((e) => []),
          ])
        )
      )
        .filter((x: any) => x[1].message !== "404.object-not-found")
        .map((x: any) => [x[0], x[1].data])
    )[participant.id || ""] ?? []
  )
}

async function getSelectedExperimental(participant: ParticipantObj) {
  return (
    Object.fromEntries(
      (
        await Promise.all(
          [participant.id || ""].map(async (x) => [
            x,
            await LAMP.Type.getAttachment(x, "lamp.selectedExperimental").catch((e) => []),
          ])
        )
      )
        .filter((x: any) => x[1].message !== "404.object-not-found")
        .map((x: any) => [x[0], x[1].data])
    )[participant.id || ""] ?? []
  )
}

function getActivityEventCount(activity_events: { [groupName: string]: ActivityEventObj[] }) {
  return Object.assign(
    {},
    ...Object.entries(activity_events || {}).map(([k, v]: [string, any[]]) => ({
      [k]: v.length,
    }))
  )
}
async function getGoals(participant: ParticipantObj) {
  return Object.fromEntries(
    (
      await Promise.all(
        [participant.id || ""].map(async (x) => [x, await LAMP.Type.getAttachment(x, "lamp.goals").catch((e) => [])])
      )
    )
      .filter((x: any) => x[1].message !== "404.object-not-found")
      .map((x: any) => [x[0], x[1].data])
  )[participant.id || ""]
}

async function getJournalCount(participant: ParticipantObj) {
  return (
    Object.fromEntries(
      (
        await Promise.all(
          [participant.id || ""].map(async (x) => [
            x,
            await LAMP.Type.getAttachment(x, "lamp.journals").catch((e) => []),
          ])
        )
      )
        .filter((x: any) => x[1].message !== "404.object-not-found")
        .map((x: any) => [x[0], x[1].data])
    )[participant.id || ""]?.length ?? 0
  )
}

// Perform count coalescing on processed events grouped by type.
function getSensorEventCount(sensor_events: { [groupName: string]: SensorEventObj[] }) {
  return {
    "Environmental Context":
      sensor_events?.["lamp.gps.contextual"]?.filter((x) => !!x.data?.context?.environment)?.length ?? 0,
    "Social Context": sensor_events?.["lamp.gps.contextual"]?.filter((x) => !!x.data?.context?.social)?.length ?? 0,
    "Step Count": sensor_events?.["lamp.steps"]?.length ?? 0,
  }
}

export const strategies = {
  "lamp.survey": (slices, activity, scopedItem) =>
    (slices ?? [])
      .filter((x, idx) => (scopedItem !== undefined ? idx === scopedItem : true))
      .map((x, idx) => {
        let question = (Array.isArray(activity.settings) ? activity.settings : []).filter((y) => y.text === x.item)[0]
        if (!!question && question.type === "boolean") return ["Yes", "True"].includes(x.value) ? 1 : 0
        else if (!!question && question.type === "list") return Math.max(question.options.indexOf(x.value), 0)
        else return parseInt(x?.value ?? 0) || 0
      })
      .reduce((prev, curr) => prev + curr, 0),
  "lamp.jewels_a": (slices, activity, scopedItem) =>
    (parseInt(slices.score ?? 0).toFixed(1) || 0) > 100 ? 100 : parseInt(slices.score ?? 0).toFixed(1) || 0,
  "lamp.jewels_b": (slices, activity, scopedItem) =>
    (parseInt(slices.score ?? 0).toFixed(1) || 0) > 100 ? 100 : parseInt(slices.score ?? 0).toFixed(1) || 0,
  "lamp.spatial_span": (slices, activity, scopedItem) =>
    (parseInt(slices.score ?? 0).toFixed(1) || 0) > 100 ? 100 : parseInt(slices.score ?? 0).toFixed(1) || 0,
  "lamp.balloon_risk": (slices, activity, scopedItem) => parseInt(slices.points ?? 0).toFixed(1) || 0,
  "lamp.pop_the_bubbles": (slices, activity, scopedItem) => {
    let temporalSlices = slices.filter(function (data) {
      return data.type === true
    })
    return temporalSlices.length > 0 && slices.length > 0 ? temporalSlices.length / slices.length : 0
  },
  "lamp.cats_and_dogs": (slices, activity, scopedItem) =>
    (parseInt(slices.score ?? 0).toFixed(1) || 0) > 100 ? 100 : parseInt(slices.score ?? 0).toFixed(1) || 0,
  "lamp.scratch_image": (slices, activity, scopedItem) =>
    ((parseInt(slices.duration ?? 0) / 1000).toFixed(1) || 0) > 100
      ? 100
      : (parseInt(slices.duration ?? 0) / 1000).toFixed(1) || 0,
  "lamp.breathe": (slices, activity, scopedItem) =>
    ((parseInt(slices.duration ?? 0) / 1000).toFixed(1) || 0) > 100
      ? 100
      : (parseInt(slices.duration ?? 0) / 1000).toFixed(1) || 0,
  __default__: (slices, activity, scopedItem) =>
    slices.map((x) => parseInt(x.item) || 0).reduce((prev, curr) => (prev > curr ? prev : curr), 0),
}
async function getVisualizations(participant: ParticipantObj) {
  let visualizations = {}
  for (let attachmentID of ((await LAMP.Type.listAttachments(participant.id)) as any).data || []) {
    if (!attachmentID.startsWith("lamp.dashboard.experimental")) continue
    let bstr = ((await LAMP.Type.getAttachment(participant.id, attachmentID)) as any).data

    // if(typeof bstr === "object") {
    //   bstr.config.view={}
    //   bstr.height=400

    //   bstr.width="container"

    // }
    console.log(attachmentID, bstr, typeof bstr === "object", typeof bstr === "string" && bstr.startsWith("data:"))

    visualizations[attachmentID] =
      typeof bstr === "object"
        ? bstr
        : typeof bstr === "string" && bstr.startsWith("data:")
        ? bstr
        : `data:image/svg+xml;base64,${bstr}` // defaults
  }
  console.log(visualizations)
  return visualizations
}
export default function Prevent({
  participant,
  activeTab,
  allActivities,
  hiddenEvents,
  enableEditMode,
  showSteak,
  onEditAction,
  onCopyAction,
  onDeleteAction,
  ...props
}: {
  participant: ParticipantObj
  activeTab: Function
  allActivities: any
  hiddenEvents: string[]
  enableEditMode: boolean
  showSteak: Function
  onEditAction: (activity: ActivityObj, data: any) => void
  onCopyAction: (activity: ActivityObj, data: any) => void
  onDeleteAction: (activity: ActivityObj, data: any) => void
}) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [dialogueType, setDialogueType] = React.useState(0)
  const [openData, setOpenData] = React.useState(false)
  const [activityData, setActivityData] = React.useState(null)
  const [graphType, setGraphType] = React.useState(0)
  const { t, i18n } = useTranslation()
  const [savedActivities, setSavedActivities] = React.useState([])
  const [tag, setTag] = React.useState([])
  const [classType, setClassType] = React.useState("")
  const [spec, setSpec] = React.useState(null)
  const [launchedActivity, setLaunchedActivity] = React.useState<string>()

  const getCurrentLanguage = () => {
    let lang
    switch (i18n.language) {
      case "en":
        lang = "en-US"
        break
      case "en-US":
        lang = "en-US"
        break
      case "en-IN":
        lang = "en-US"
        break
      case "en-AU":
        lang = "en-US"
        break
      case "en-CA":
        lang = "en-US"
        break
      case "en-IE":
        lang = "en-US"
        break
      case "hi":
        lang = "hi-IN"
        break
      case "hi-IN":
        lang = "hi-IN"
        break
      case "es":
        lang = "es-ES"
        break
      case "es-ES":
        lang = "es-ES"
        break
      default:
        lang = "en-US"
        break
    }
    return lang
  }

  const getCurrentLanguageCode = () => {
    let langCode
    switch (i18n.language) {
      case "en":
        langCode = en
        break
      case "en-US":
        langCode = en
        break
      case "en-IN":
        langCode = en
        break
      case "en-AU":
        langCode = en
        break
      case "en-CA":
        langCode = en
        break
      case "en-IE":
        langCode = en
        break
      case "hi":
        langCode = hi
        break
      case "hi-IN":
        langCode = hi
        break
      case "es":
        langCode = es
        break
      case "es-ES":
        langCode = es
        break
      default:
        langCode = en
        break
    }
    return langCode
  }

  const currentLanguage = getCurrentLanguage()
  const currentLanguageCode = getCurrentLanguageCode()
  TimeAgo.addLocale(currentLanguageCode)
  const timeAgo = new TimeAgo(currentLanguage)

  const handleClickOpen = (type: number) => {
    setDialogueType(type)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const openDetails = (activity: any, data: any, graphType?: number) => {
    setGraphType(graphType)
    setSelectedActivity(activity)
    if (!graphType) {
      setSelectedActivityName(activity.name)
    } else {
      setSelectedActivityName("")
    }
    setActivityData(data)
    setOpenData(true)
  }

  const openRadialDetails = (activity: any, events: any, data: any, graphType?: number) => {
    setGraphType(graphType)
    setSelectedActivity(activity)
    if (!graphType) {
      setSelectedActivityName(activity.name)
    } else {
      setSelectedActivityName("")
    }
    setActivityData(data)
    setOpenData(true)
  }

  const [selectedActivities, setSelectedActivities] = React.useState([])
  const [selectedSpec, setSelectedSpec] = React.useState("")
  const [activityCounts, setActivityCounts] = React.useState({})
  const [activities, setActivities] = React.useState([])
  const [sensorEvents, setSensorEvents] = React.useState({})
  const [selectedSensors, setSelectedSensors] = React.useState([])
  const [sensorCounts, setSensorCounts] = React.useState({})
  const [activityEvents, setActivityEvents] = React.useState({})
  const [selectedActivity, setSelectedActivity] = React.useState(null)
  const [selectedActivityName, setSelectedActivityName] = React.useState(null)
  const [journalCount, setJournalCount] = React.useState(0)
  const [timeSpans, setTimeSpans] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [disabledData, setDisabled] = React.useState(true)
  const [visualizations, setVisualizations] = React.useState({})
  const [selectedExperimental, setSelectedExperimental] = React.useState([])
  const [cortex, setCortex] = React.useState({})
  const [activity, setActivity] = React.useState(null)
  const [activityOpen, setActivityOpen] = React.useState(false)
  let socialContexts = ["Alone", "Friends", "Family", "Peers", "Crowd"]
  let envContexts = ["Home", "School", "Work", "Hospital", "Outside", "Shopping", "Transit"]

  const goalIcon = (goalType: string) => {
    return goalType == "Exercise" ? (
      <PreventExercise width="40px" height="40px" />
    ) : goalType == "Weight" ? (
      <PreventWeight width="40px" height="40px" />
    ) : goalType == "Nutrition" ? (
      <PreventNutrition width="40px" height="40px" />
    ) : goalType == "Medication" ? (
      <PreventBreatheIcon width="40px" height="40px" />
    ) : goalType == "Sleep" ? (
      <PreventSleeping width="40px" height="40px" />
    ) : goalType == "Reading" ? (
      <PreventReading width="40px" height="40px" />
    ) : goalType == "Finances" ? (
      <PreventSavings />
    ) : goalType == "Mood" ? (
      <PreventEmotions width="40px" height="40px" />
    ) : goalType == "Meditation" ? (
      <PreventMeditation width="40px" height="40px" />
    ) : (
      <PreventCustom width="40px" height="40px" />
    )
  }

  const setTabActivities = () => {
    let gActivities = allActivities.filter((x: any) => !!x?.category && (x?.category[0] || "") === "prevent")
    setSavedActivities(gActivities)
    if (gActivities.length > 0) {
      let tags = []
      let count = 0
      gActivities.map((activity, index) => {
        getImage(activity.id).then((img) => {
          tags[activity.id] = img
          if (count === gActivities.length - 1) {
            setLoading(false)
            setTag(tags)
          }
          count++
        })
      })
    } else {
      setLoading(false)
    }
  }

  const handleActivityClickOpen = (y: any) => {
    setDialogueType(y.spec)
    let classT = classes.header
    setClassType(classT)
    LAMP.Activity.view(y.id).then((data) => {
      setActivity(data)
      setActivityOpen(true)
    })
  }

  React.useEffect(() => {
    setTabActivities()
    ;(async () => {
      let disabled =
        ((await LAMP.Type.getAttachment(participant.id, "lamp.dashboard.disable_data")) as any)?.data ?? false
      setDisabled(disabled)

      let activities = !disabled
        ? allActivities.filter((activity) => activity.spec !== "lamp.recording")
        : allActivities.filter((activity) => activity.spec === "lamp.journal" || activity.spec !== "lamp.recording")
      getActivityEvents(participant, activities, hiddenEvents).then((activityEvents) => {
        let timeSpans = Object.fromEntries(
          Object.entries(activityEvents || {}).map((x) => [x[0], x[1][x[1].length - 1]])
        )
        setActivityEvents(activityEvents)
        let activityEventCount = getActivityEventCount(activityEvents)
        setTimeSpans(timeSpans)
        setActivityCounts(activityEventCount)
        activities = activities.filter(
          (activity) =>
            activityEventCount[activity.name] > 0 && activity.spec !== "lamp.group" && activity.spec !== "lamp.tips"
        )
        setActivities(activities)
        setLoading(false)
        getSelectedActivities(participant).then(setSelectedActivities)
      })
      if (!disabled) {
        getSelectedSensors(participant).then(setSelectedSensors)
        getSelectedExperimental(participant).then(setSelectedExperimental)
        getSensorEvents(participant).then((sensorEvents) => {
          let sensorEventCount = getSensorEventCount(sensorEvents)
          setSensorEvents(sensorEvents)
          setCortex(
            [`Environmental Context`, `Step Count`, `Social Context`]
              .filter((sensor) => sensorEventCount[sensor] > 0)
              .concat(Object.keys(visualizations).map((x) => x.replace("lamp.dashboard.experimental.", "")))
          )
          getVisualizations(participant).then((data) => {
            setVisualizations(data)
            let visualizationCount = Object.keys(data)
              .map((x) => x.replace("lamp.dashboard.experimental.", ""))
              .reduce((prev, curr) => ({ ...prev, [curr]: 1 }), {})
            setSensorCounts(Object.assign({}, sensorEventCount, visualizationCount))
          })
        })
      }
    })()
  }, [])

  const getSocialContextGroups = (gps_events?: SensorEventObj[]) => {
    gps_events = gps_events?.filter((x) => !!x.data?.context?.social) ?? [] // Catch missing data.
    let events = [
      {
        label: t("Alone"),
        value: gps_events.filter((x) => x.data.context.social === "alone").length,
      },
      {
        label: t("Friends"),
        value: gps_events.filter((x) => x.data.context.social === "friends").length,
      },
      {
        label: t("Family"),
        value: gps_events.filter((x) => x.data.context.social === "family").length,
      },
      {
        label: t("Peers"),
        value: gps_events.filter((x) => x.data.context.social === "peers").length,
      },
      {
        label: t("Crowd"),
        value: gps_events.filter((x) => x.data.context.social === "crowd").length,
      },
    ]
    return events
  }

  const getEnvironmentalContextGroups = (gps_events?: SensorEventObj[]) => {
    gps_events = gps_events?.filter((x) => !!x.data?.context?.environment) ?? [] // Catch missing data.
    let events = [
      {
        label: t("Home"),
        value: gps_events.filter((x) => x.data.context.environment === "home" || x.data.context.environment === null)
          .length,
      },
      {
        label: t("School"),
        value: gps_events.filter((x) => x.data.context.environment === "school").length,
      },
      {
        label: t("Work"),
        value: gps_events.filter((x) => x.data.context.environment === "work").length,
      },
      {
        label: t("Hospital"),
        value: gps_events.filter((x) => x.data.context.environment === "hospital").length,
      },
      {
        label: t("Outside"),
        value: gps_events.filter((x) => x.data.context.environment === "outside").length,
      },
      {
        label: t("Shopping"),
        value: gps_events.filter((x) => x.data.context.environment === "shopping").length,
      },
      {
        label: t("Transit"),
        value: gps_events.filter((x) => x.data.context.environment === "transit").length,
      },
    ]

    return events
  }

  const earliestDate = () =>
    (activities || [])
      .filter((x) => (selectedActivities || []).includes(x.name))
      .map((x) => (activityEvents || {})[x.name] || [])
      .map((x) => (x.length === 0 ? 0 : x.slice(0, 1)[0].timestamp))
      .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
      .slice(0, 1)
      .map((x) => (x === 0 ? undefined : new Date(x)))[0]

  return (
    <Container className={classes.thumbContainer}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2} className={classes.marBottom10}>
        {savedActivities.length > 0 &&
          savedActivities.map((activity) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={3}
              onClick={() => {
                setSpec(activity.spec)
                handleActivityClickOpen(activity)
              }}
              className={classes.thumbMain}
            >
              <ButtonBase focusRipple className={classes.fullwidthBtn}>
                <Card className={classes.prevent}>
                  <Box mt={2} mb={1}>
                    <Box
                      className={classes.mainIcons}
                      style={{
                        margin: "auto",
                        background: tag[activity.id]?.photo
                          ? `url(${tag[activity?.id]?.photo}) center center/contain no-repeat`
                          : activity.spec === "lamp.breathe"
                          ? `url(${BreatheIcon}) center center/contain no-repeat`
                          : activity.spec === "lamp.journal"
                          ? `url(${JournalIcon}) center center/contain no-repeat`
                          : activity.spec === "lamp.scratch_image"
                          ? `url(${ScratchCard}) center center/contain no-repeat`
                          : `url(${InfoIcon}) center center/contain no-repeat`,
                      }}
                    ></Box>
                  </Box>
                  <Typography className={classes.cardlabel}>{t(activity.name)}</Typography>
                </Card>
              </ButtonBase>
            </Grid>
          ))}
      </Grid>
      {!loading && (
        <Box>
          <Grid container xs={12} spacing={0} className={classes.activityhd}>
            <Grid item xs className={classes.preventHeader}>
              <Typography variant="h5">{t("Activity")}</Typography>
            </Grid>
            <Grid item xs className={classes.addbtnmain}>
              <IconButton onClick={() => handleClickOpen(0)}>
                <Icon className={classes.addicon}>add_circle_outline</Icon>
              </IconButton>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {(activities || [])
              .filter((x) => (selectedActivities || []).includes(x.name))
              .map((
                activity // Uncomment if you want to view the Voice Recording Details on Prevent
              ) =>
                /*activity.spec === "lamp.recording" ||*/ activity.spec === "lamp.journal" ||
                activity.spec === "lamp.dbt_diary_card" ? (
                  <Grid item xs={6} sm={3} md={3} lg={3}>
                    <ButtonBase focusRipple className={classes.fullwidthBtn}>
                      <Card
                        className={classes.prevent}
                        onClick={() => {
                          setSelectedSpec(activity.spec)
                          if (activity.spec === "lamp.dbt_diary_card") {
                            openDetails(activity, activityEvents, 0)
                          } else {
                            setSelectedActivity(activityEvents?.[activity.name] ?? null)
                            setSelectedActivityName(
                              activity.spec === "lamp.journal"
                                ? "Journal entries"
                                : /*: activity.spec === "lamp.recording" // Uncomment if you want to view the Voice Recording Details on Prevent 
                                ? "Voice Recording entries"*/
                                  "DBT entries"
                            )
                            setOpenData(true)
                          }
                        }}
                      >
                        <Box display="flex">
                          <Box flexGrow={1}>
                            <Typography className={classes.preventlabel}>{t(activity.name)}</Typography>
                          </Box>
                          <Box mr={1} className={classes.preventRightSVG}>
                            {activity.spec === "lamp.journal" ? (
                              <JournalBlue /> /*: activity.spec === "lamp.recording" ? ( // Uncomment if you want to view the Voice Recording Details on Prevent 
                              <PreventRecording />
                            )*/
                            ) : (
                              <AssessDbt width="50" height="50" />
                            )}
                          </Box>
                        </Box>
                        <Box className={classes.preventGraph}>
                          <Typography variant="h2">{(activityEvents?.[activity.name] || []).length}</Typography>
                        </Box>
                        <Typography variant="h6">
                          {t("entries")} {timeAgo.format(timeSpans[activity.name].timestamp)}
                        </Typography>
                      </Card>
                    </ButtonBase>
                  </Grid>
                ) : activity.type === "goals" ? (
                  <Grid item xs={6} sm={3} md={3} lg={3}>
                    <ButtonBase focusRipple className={classes.fullwidthBtn}>
                      <Card
                        className={classes.prevent}
                        // onClick={() => {
                        //   setSelectedActivityName(`Goal: ${activity.name}`)
                        //   setOpenData(true)
                        // }}
                      >
                        <Box display="flex">
                          <Box flexGrow={1}>
                            <Typography className={classes.preventlabel}>{t(activity.name)}</Typography>
                          </Box>
                          <Box mr={1} className={classes.preventRightSVG}>
                            {goalIcon(activity.name)}
                          </Box>
                        </Box>
                        <Box className={classes.preventGraph}>
                          <Typography variant="h2">{activityCounts[activity.name]}</Typography>
                        </Box>
                        <Typography variant="h6">
                          {t("entries")} {timeAgo.format(timeSpans[activity.name + "-goal"].timestamp)}
                        </Typography>
                      </Card>
                    </ButtonBase>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <ButtonBase focusRipple className={classes.fullwidthBtn}>
                      <Card className={classes.preventFull} onClick={() => openDetails(activity, activityEvents, 0)}>
                        <Typography className={classes.preventlabelFull}>
                          <ReactMarkdown
                            source={`${t(activity.name)} (${activityCounts[activity.name]})`}
                            escapeHtml={false}
                            plugins={[gfm, emoji]}
                          />
                        </Typography>
                        <Box className={classes.maxw300}>
                          <VegaLite
                            actions={false}
                            style={{ backgroundColor: "#00000000" }}
                            spec={{
                              data: {
                                values: activityEvents?.[activity.name]?.map((d) => ({
                                  x: new Date(d.timestamp),
                                  y: strategies[activity.spec]
                                    ? strategies[activity.spec](
                                        activity.spec === "lamp.survey" || activity.spec === "lamp.pop_the_bubbles"
                                          ? d?.temporal_slices ?? d["temporal_slices"]
                                          : d.static_data,
                                        activity,
                                        undefined
                                      )
                                    : 0,
                                })),
                              },
                              width: 300,
                              height: 70,
                              background: "#00000000",
                              config: {
                                view: { stroke: "transparent" },
                                title: {
                                  color: "rgba(0, 0, 0, 0.75)",
                                  fontSize: 25,
                                  font: "Inter",
                                  fontWeight: 600,
                                  align: "left",
                                  anchor: "start",
                                },
                                legend: {
                                  title: null,
                                  orient: "bottom",
                                  columns: 2,
                                  labelColor: "rgba(0, 0, 0, 0.75)",
                                  labelFont: "Inter",
                                  labelFontSize: 14,
                                  labelFontWeight: 600,
                                  symbolStrokeWidth: 12,
                                  symbolSize: 150,
                                  symbolType: "circle",
                                  offset: 0,
                                },
                                axisX: {
                                  disable: true,
                                },
                                axisY: {
                                  disable: true,
                                },
                              },
                              mark: { type: "line", interpolate: "cardinal", tension: 0.8, color: "#3C5DDD" },
                              encoding: {
                                x: { field: "x", type: "ordinal", timeUnit: "utcyearmonthdate" },
                                y: { field: "y", type: "quantitative" },
                                strokeWidth: { value: 2 },
                              },
                            }}
                          />
                        </Box>
                        <Typography variant="h6">{timeAgo.format(timeSpans[activity.name]?.timestamp)}</Typography>
                      </Card>
                    </ButtonBase>
                  </Grid>
                )
              )}
          </Grid>
          <Grid container xs={12} spacing={0} className={classes.sensorhd}>
            <Grid item xs className={classes.preventHeader}>
              <Typography variant="h5">{t("Cortex")}</Typography>
            </Grid>
            <Grid item xs className={classes.addbtnmain}>
              <IconButton onClick={() => handleClickOpen(1)}>
                <Icon className={classes.addicon}>add_circle_outline</Icon>
              </IconButton>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {(selectedSensors || []).includes("Social Context") && sensorCounts["Social Context"] > 0 && (
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <ButtonBase focusRipple className={classes.fullwidthBtn}>
                  <Card
                    className={classes.prevent}
                    onClick={() =>
                      openRadialDetails(
                        "Social Context",
                        sensorEvents["lamp.gps.contextual"].filter(
                          (x) => socialContexts.indexOf(x.data.context.environment) >= 0
                        ),
                        getSocialContextGroups(sensorEvents["lamp.gps.contextual"]),
                        1
                      )
                    }
                  >
                    <Typography className={classes.preventlabel}>
                      {t("Social Context")} <Box component="span">({sensorCounts["Social Context"]})</Box>
                    </Typography>
                    <Box>
                      {/*<RadialDonutChart
                        type={socialContexts}
                        data={getSocialContextGroups(sensorEvents?.["lamp.gps.contextual"])}
                        detailPage={false}
                        width={150}
                        height={150}
                      />*/}
                    </Box>
                  </Card>
                </ButtonBase>
              </Grid>
            )}
            {(selectedSensors || []).includes("Environmental Context") && sensorCounts["Environmental Context"] > 0 && (
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <ButtonBase focusRipple className={classes.fullwidthBtn}>
                  <Card
                    className={classes.prevent}
                    onClick={() =>
                      openRadialDetails(
                        "Environmental Context",
                        sensorEvents["lamp.gps.contextual"].filter(
                          (x) => envContexts.indexOf(x.data.context.environment) >= 0
                        ),
                        getEnvironmentalContextGroups(sensorEvents["lamp.gps.contextual"]),
                        1
                      )
                    }
                  >
                    <Typography className={classes.preventlabel}>
                      {t("Environmental Context")} <Box component="span">({sensorCounts["Environmental Context"]})</Box>
                    </Typography>
                    <Box>
                      {/*<RadialDonutChart
                        type={envContexts}
                        data={getEnvironmentalContextGroups(sensorEvents?.["lamp.gps.contextual"])}
                        detailPage={false}
                        width={150}
                        height={150}
                      />*/}
                    </Box>
                  </Card>
                </ButtonBase>
              </Grid>
            )}

            {(selectedSensors || []).includes("Step Count") && sensorCounts["Step Count"] > 0 && (
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <ButtonBase focusRipple className={classes.fullwidthBtn}>
                  <Card
                    className={classes.prevent}
                    onClick={() =>
                      openDetails(
                        "Step Count",
                        sensorEvents?.["lamp.steps"]?.map((d) => ({
                          x: new Date(parseInt(d.timestamp)),
                          y: typeof d.data.value !== "number" ? 0 : d.data.value || 0,
                        })) ?? [],
                        2
                      )
                    }
                  >
                    <Typography className={classes.preventlabel}>
                      {t("Step Count")} <Box component="span">({sensorCounts["Step Count"]})</Box>
                    </Typography>

                    <Box mt={3} mb={1} className={classes.maxw150}>
                      <VegaLite
                        actions={false}
                        spec={{
                          data: {
                            values:
                              sensorEvents?.["lamp.steps"]?.map((d) => ({
                                x: new Date(parseInt(d.timestamp)),
                                y: typeof d.data.value !== "number" ? 0 : d.data.value || 0,
                              })) ?? [],
                          },
                          background: "#00000000",
                          width: 126,
                          height: 70,
                          config: {
                            view: { stroke: "transparent" },
                            title: {
                              color: "rgba(0, 0, 0, 0.75)",
                              fontSize: 25,
                              font: "Inter",
                              fontWeight: 600,
                              align: "left",
                              anchor: "start",
                              dy: -40,
                            },
                            legend: {
                              title: null,
                              orient: "bottom",
                              columns: 2,
                              labelColor: "rgba(0, 0, 0, 0.75)",
                              labelFont: "Inter",
                              labelFontSize: 14,
                              labelFontWeight: 600,
                              rowPadding: 20,
                              columnPadding: 50,
                              symbolStrokeWidth: 12,
                              symbolSize: 150,
                              symbolType: "circle",
                              offset: 30,
                            },
                            axisX: {
                              orient: "bottom",
                              format: "%b %d",
                              labelColor: "rgba(0, 0, 0, 0.4)",
                              labelFont: "Inter",
                              labelFontWeight: 500,
                              labelFontSize: 10,
                              ticks: false,
                              labelPadding: 32,
                              title: null,
                              grid: false,
                              disable: true,
                            },
                            axisY: {
                              orient: "left",
                              tickCount: 5,
                              labelColor: "rgba(0, 0, 0, 0.4)",
                              labelFont: "Inter",
                              labelFontWeight: 500,
                              labelFontSize: 10,
                              ticks: false,
                              labelPadding: 10,
                              title: null,
                              grid: false,
                              disable: true,
                            },
                          },
                          mark: { type: "line", interpolate: "cardinal", tension: 0.9, color: "#3C5DDD" },
                          encoding: {
                            x: { field: "x", type: "ordinal", timeUnit: "utcyearmonthdate" },
                            y: { field: "y", type: "quantitative" },
                            strokeWidth: { value: 2 },
                          },
                        }}
                      />
                    </Box>
                  </Card>
                </ButtonBase>
              </Grid>
            )}

            <Grid container xs={12} spacing={2}>
              {(selectedExperimental || []).map((x) => (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Card key={x} className={classes.automation}>
                    <Typography component="h6" variant="h6">
                      {x}
                    </Typography>
                    <Grid container justify="center">
                      {typeof visualizations["lamp.dashboard.experimental." + x] === "object" &&
                      visualizations["lamp.dashboard.experimental." + x] !== null ? (
                        <Box className={classes.vega}>
                          <Vega spec={visualizations["lamp.dashboard.experimental." + x]} />
                        </Box>
                      ) : (
                        <img
                          alt="visualization"
                          src={visualizations["lamp.dashboard.experimental." + x]}
                          height="100%"
                          width="100%"
                        />
                      )}
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      )}
      <Dialog
        open={open && typeof dialogueType === "string"}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        classes={{
          root: classes.activitydatapop,
          paper: classes.dialogueCurve,
        }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {dialogueType === 0 ? t("Activity data") : t("Cortex data")}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <Icon>close</Icon>
          </IconButton>
          <Box mt={2}>
            <Typography>{t("Choose the data you want to see in your dashboard.")}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers={false} classes={{ root: classes.activityContent }}>
          {dialogueType === 0 && (
            <MultipleSelect
              selected={selectedActivities}
              items={(activities || []).map((x) => x.name)}
              showZeroBadges={false}
              badges={activityCounts}
              onChange={(x) => {
                LAMP.Type.setAttachment(participant.id, "me", "lamp.selectedActivities", x)
                setSelectedActivities(x)
              }}
            />
          )}
          {dialogueType === 1 && (
            <MultipleSelect
              selected={selectedSensors.concat(selectedExperimental) || []}
              items={cortex}
              showZeroBadges={false}
              badges={sensorCounts}
              onChange={(x) => {
                if ([`Environmental Context`, `Step Count`, `Social Context`].includes(x[x.length - 1])) {
                  LAMP.Type.setAttachment(participant.id, "me", "lamp.selectedSensors", x)
                  setSelectedSensors(x)
                } else {
                  LAMP.Type.setAttachment(participant.id, "me", "lamp.selectedExperimental", x)
                  setSelectedExperimental(x)
                }
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Box textAlign="center" width={1} mt={3} mb={3}>
            <Link onClick={handleClose} className={classes.linkBlue}>
              {t("Done")}
            </Link>
          </Box>
        </DialogActions>
      </Dialog>

      <ResponsiveDialog
        transient={false}
        animate
        fullScreen
        open={openData}
        onClose={() => {
          setOpenData(false)
        }}
      >
        <AppBar position="static" className={classes.inlineHeader}>
          <Toolbar className={classes.toolbardashboard}>
            <IconButton
              onClick={() => setOpenData(false)}
              color="default"
              aria-label="Menu"
              className={classes.backbtn}
            >
              <Icon>arrow_back</Icon>
            </IconButton>
            <Typography variant="h5"> {t(selectedActivityName)} </Typography>
          </Toolbar>
        </AppBar>

        {selectedActivityName === "Journal entries" ? (
          <Journal
            participant={participant}
            selectedEvents={selectedActivity}
          /> /* : selectedSpec === "lamp.recording" ? ( // Uncomment if you want to view the Voice Recording Details on Prevent 
          <VoiceRecoding participant={participant} selectedEvents={selectedActivity} />
        ) */
        ) : selectedActivityName === "Goal: Water" ? (
          <PreventGoalData />
        ) : selectedActivity !== null && selectedActivity?.spec === "lamp.dbt_diary_card" ? (
          <PreventDBT participant={participant} selectedEvents={(activityData || {})[selectedActivityName]} />
        ) : (
          <PreventData
            participant={participant}
            activity={selectedActivity}
            type={graphType === 2 ? (selectedActivity === "Environmental Context" ? envContexts : socialContexts) : []}
            events={graphType === 0 ? (activityData || {})[selectedActivityName] || [] : activityData}
            graphType={graphType}
            earliestDate={earliestDate}
            enableEditMode={!_patientMode()}
            onEditAction={onEditAction}
            onCopyAction={onCopyAction}
            onDeleteAction={onDeleteAction}
          />
        )}
      </ResponsiveDialog>

      <ResponsiveDialog
        transient={false}
        animate
        fullScreen
        open={!!launchedActivity}
        onClose={() => {
          setLaunchedActivity(undefined)
        }}
      >
        {
          {
            embed: (
              <EmbeddedActivity
                name={activity?.name ?? ""}
                activity={activity ?? []}
                participant={participant}
                onComplete={(response) => {
                  if (!!response && (!!response?.completed || !!response.timestamp)) showSteak(participant, activity.id)
                  setLaunchedActivity(undefined)
                }}
              />
            ),
            // resources: <Resources onComplete={() => setLaunchedActivity(undefined)} />,
            // Medication_tracker: (
            //   <NewMedication
            //     participant={participant}
            //     onComplete={() => {
            //       setLaunchedActivity(undefined)
            //     }}
            //   />
            // ),
          }[launchedActivity ?? ""]
        }
      </ResponsiveDialog>
      <Dialog
        open={activityOpen}
        onClose={() => setActivityOpen(false)}
        scroll="paper"
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        classes={{
          root: classes.dialogueStyle,
          paper: classes.dialogueCurve,
        }}
      >
        <DialogTitle id="alert-dialog-slide-title" className={classes.dialogtitle}>
          <IconButton aria-label="close" className={classes.closeButton} onClick={() => setActivityOpen(false)}>
            <Icon>close</Icon>
          </IconButton>
          <div className={classType}>
            <Box mt={2} mb={1}>
              <Box
                className={classes.topicon}
                style={{
                  margin: "auto",
                  background: tag[activity?.id]?.photo
                    ? `url(${tag[activity?.id]?.photo}) center center/contain no-repeat`
                    : activity?.spec === "lamp.breathe"
                    ? `url(${BreatheIcon}) center center/contain no-repeat`
                    : activity?.spec === "lamp.journal"
                    ? `url(${JournalIcon}) center center/contain no-repeat`
                    : activity?.spec === "lamp.scrath_image"
                    ? `url(${ScratchCard}) center center/contain no-repeat`
                    : `url(${InfoIcon}) center center/contain no-repeat`,
                }}
              ></Box>

              {/* {dialogueType === "Goals" && <GoalIcon className={classes.topicon} />}
              {dialogueType === "HopeBox" && <HopeBoxIcon className={classes.topicon} />}
              {dialogueType === "Medication_tracker" && <MedicationIcon className={classes.topicon} />} */}
            </Box>
            <Box>
              <Typography variant="body2" align="left">
                {t("Prevent")}
              </Typography>
              <Typography variant="h2">{t(activity?.name) ?? (spec !== null ? " (" + spec + ")" : "")}</Typography>
            </Box>
          </div>
        </DialogTitle>
        <DialogContent className={classes.dialogueContent}>
          {tag[activity?.id]?.description && (
            <Box>
              <Typography variant="h4" gutterBottom>
                {t(tag[activity.id]?.description.split(".")[0])}
              </Typography>
              {tag[activity?.id]?.description.split(".").length > 1 && (
                <Typography variant="body2" component="p">
                  {t(tag[activity?.id]?.description.split(".").slice(1).join("."))}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Box textAlign="center" width={1} mt={1} mb={3}>
            <Link
              onClick={() => {
                setOpen(false)
                setLaunchedActivity("embed")
              }}
              underline="none"
              className={classnames(classes.btnprevent, classes.linkButton)}
            >
              {t("Begin")}
            </Link>
          </Box>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
