import React, { useEffect, useState } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Box, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core"
import { Vega } from "react-vega"
import NativeSelect from "@material-ui/core/NativeSelect"
import { useTranslation } from "react-i18next"
import { emotions } from "./charts/emotions_chart"
import { effective } from "./charts/effective_chart"
import { ineffective } from "./charts/ineffective_chart"
import { actions } from "./charts/actions_chart"
import { selfcare } from "./charts/selfcare_chart"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    graphContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    titleContainer: {
      display: "flex",
      width: 500,
      marginBottom: 40,
      justifyContent: "space-between",
    },
    separator: {
      border: "2px solid rgba(0, 0, 0, 0.1)",
      width: 500,
      marginTop: 50,
      marginBottom: 50,
      height: 0,
    },
    addContainer: {
      display: "flex",
      alignItems: "center",
    },
    addButtonTitle: {
      color: "#5784EE",
      fontWeight: 600,
      fontSize: 14,
    },
    addButton: {
      marginRight: 19,
      color: "#5784EE",
      width: 22,
      height: 22,
      marginLeft: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    rangeButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 80,
      height: 32,
      borderRadius: 16,
      border: "1px solid #C6C6C6",
    },
    rangeTitle: {
      color: "rgba(0, 0, 0, 0.4)",
      fontSize: 14,
      fontWeight: "bold",
    },
    rangeButtonSelected: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 80,
      height: 32,
      borderRadius: 16,
      backgroundColor: "#ECF4FF",
    },
    rangeTitleSelected: {
      color: "#4C66D6",
      fontSize: 14,
      fontWeight: "bold",
    },
    selector: {
      display: "fixed",
      marginBottom: -30,
      marginRight: -300,
      zIndex: 1000,
    },
    blueBoxStyle: {
      background: "linear-gradient(0deg, #ECF4FF, #ECF4FF)",
      borderRadius: "10px",
      padding: "5px 20px 20px 20px",
      textAlign: "justify",
      marginBottom: 20,
      "& span": {
        color: "rgba(0, 0, 0, 0.4)",
        fontSize: "12px",
        lineHeight: "40px",
      },
    },
    graphSubContainer: {
      maxWidth: 500,
      "& h5": { fontSize: 25, color: "rgba(0, 0, 0, 0.75)", fontWeight: 600, marginBottom: 30 },
    },
    heading: {
      fontSize: 17,
      fontWeight: 600,
    },
    accordionContent: {
      display: "block",
      "& > div": {
        "&:first-child": {
          "& h6": {
            borderTop: 0,
            marginTop: 0,
            paddingTop: 0,
          },
        },
      },
    },
    accordionContentSub: {
      "& h6": { fontSize: 17, borderTop: "#e4e4e4 solid 1px", marginTop: 15, paddingTop: 15 },
      "& span": { color: "#666" },
    },
  })
)

function getDates() {
  let dates = []
  let curr = new Date()
  curr.setDate(curr.getDate() - 6)
  while (curr.getTime() <= new Date().getTime()) {
    let day = new Date(curr).toLocaleDateString()
    dates.push(day)
    curr.setDate(curr.getDate() + 1)
  }
  return dates
}

export default function PreventDBT({ participant, selectedEvents, ...props }) {
  const classes = useStyles()
  const { t } = useTranslation()

  const [emotionsData, setEmotionsData] = useState(JSON.parse(JSON.stringify(emotions)))
  const [effectiveData, setEffectiveData] = useState(JSON.parse(JSON.stringify(effective)))
  const [ineffectiveData, setIneffectiveData] = useState(JSON.parse(JSON.stringify(ineffective)))
  const [actionsData, setActionsData] = useState(JSON.parse(JSON.stringify(actions)))
  const [selfcareData, setSelfcareData] = useState(JSON.parse(JSON.stringify(selfcare)))
  const [skillData, setSkillData] = useState(null)

  const getDateString = (date: Date) => {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return (
      weekday[date.getDay()] +
      " " +
      monthname[date.getMonth()] +
      ", " +
      date.getDate() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    )
  }
  useEffect(() => {
    let dates = getDates()
    let effectivesData = []
    let inEffectiveData = []
    let emotionData = []
    let summaryData = []
    let timelineData = []
    let tData = []
    let dData = []
    let skills = {}
    let category
    selectedEvents.map((event) => {
      let date = new Date(event.timestamp)
      var curr_date = date.getDate()
      var curr_month = date.getMonth() + 1 //Months are zero based
      var curr_year = date.getFullYear()
      let dateString = curr_year + "-" + curr_month + "-" + curr_date

      if (dates.includes(date.toLocaleDateString())) {
        event.temporal_slices.map((slice) => {
          if (slice.level === "skill") {
            !!skills[curr_month + "/" + curr_date]
              ? skills[curr_month + "/" + curr_date].push({ category: slice.value, value: slice.item })
              : (skills[curr_month + "/" + curr_date] = [{ category: slice.value, value: slice.item }])
          }
          if (slice.level === "target_effective" || slice.level === "target_ineffective") {
            tData[dateString] = tData[dateString] ? tData[dateString] + parseInt(slice.type) : parseInt(slice.type)
            dData[slice.item] = dData[slice.item] ? dData[slice.item] + parseInt(slice.type) : parseInt(slice.type)
          }
          switch (slice.level) {
            case "target_effective":
              effectivesData.push({ value: slice.value, date: dateString, symbol: slice.item })
              break
            case "target_ineffective":
              inEffectiveData.push({ value: slice.value, date: dateString, symbol: slice.item })
              break
            case "emotion":
              emotionData.push({ value: slice.value, date: dateString, symbol: slice.item })
              break
          }
        })
      } else {
        event.temporal_slices.map((slice) => {
          if (slice.level === "target_effective" || slice.level === "target_ineffective") {
            dData[slice.item] = dData[slice.item] ? dData[slice.item] + parseInt(slice.type) : parseInt(slice.type)
          }
          if (slice.level === "skill") {
            !!skills[curr_month + "/" + curr_date]
              ? skills[curr_month + "/" + curr_date].push({ category: slice.value, value: slice.item })
              : (skills[curr_month + "/" + curr_date] = [{ category: slice.value, value: slice.item }])
          }
        })
      }
    })

    let categories = []
    Object.keys(skills).map((key) => {
      categories = []
      skills[key].map((skill, index) => {
        if (categories.includes(skill.category)) {
          delete skills[key][index].category
        } 
        categories.push(skill.category)       
      })
    })

    setSkillData(skills)
    dates.map((d) => {
      if (effectivesData.filter((eff) => eff.date === d).length === 0) {
        effectivesData.push({ value: null, date: d, symbol: "None" })
      }
      if (inEffectiveData.filter((eff) => eff.date === d).length === 0) {
        inEffectiveData.push({ value: null, date: d, symbol: "None" })
      }
      if (emotionData.filter((eff) => eff.date === d).length === 0) {
        emotionData.push({ value: null, date: d, symbol: "None" })
      }
    })

    Object.keys(tData).forEach(function (key) {
      timelineData.push({ date: key, count: tData[key] })
    })
    Object.keys(dData).forEach(function (key) {
      summaryData.push({ action: key, count: dData[key] })
    })

    let actionsD = actionsData
    let emotionsD = emotionsData
    let ineffectiveD = ineffectiveData
    let effectiveD = effectiveData
    let selfcareD = selfcareData

    actionsD.data.values = summaryData
    emotionsD.data.values = emotionData
    ineffectiveD.data.values = inEffectiveData
    effectiveD.data.values = effectivesData
    selfcareD.data.values = timelineData
    actionsD.title = t(actionsD.title)
    emotionsD.title = t(emotionsD.title)
    ineffectiveD.title = t(ineffectiveD.title)
    effectiveD.title = t(effectiveD.title)
    selfcareD.title = t(selfcareD.title)
    setActionsData(actionsD)
    setEmotionsData(emotionsD)
    setIneffectiveData(ineffectiveD)
    setSelfcareData(selfcareD)
    setEffectiveData(effectiveD)
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={3} />
        <Grid item xs={12} sm={6}>
          <div className={classes.graphContainer}>
            <NativeSelect className={classes.selector}>
              <option value={10}>{t("TEN")}</option>
              <option value={20}>{t("TWENTY")}</option>
              <option value={30}>{t("THIRTY")}</option>
            </NativeSelect>
            <Vega spec={emotionsData} />
            <div className={classes.separator} />
            <NativeSelect className={classes.selector}>
              <option value={10}>{t("TEN")}</option>
              <option value={20}>{t("TWENTY")}</option>
              <option value={30}>{t("THIRTY")}</option>
            </NativeSelect>
            <Vega spec={effectiveData} />
            <div className={classes.separator} />
            <NativeSelect className={classes.selector}>
              <option value={10}>{t("TEN")}</option>
              <option value={20}>{t("TWENTY")}</option>
              <option value={30}>{t("THIRTY")}</option>
            </NativeSelect>
            <Vega spec={ineffectiveData} />
            <div className={classes.separator} />
            <NativeSelect className={classes.selector}>
              <option value={10}>{t("TEN")}</option>
              <option value={20}>{t("TWENTY")}</option>
              <option value={30}>{t("THIRTY")}</option>
            </NativeSelect>
            <Vega spec={actionsData} />
            <div className={classes.separator} />
            <NativeSelect className={classes.selector}>
              <option value={10}>{t("TEN")}</option>
              <option value={20}>{t("TWENTY")}</option>
              <option value={30}>{t("THIRTY")}</option>
            </NativeSelect>
            <Vega spec={selfcareData} />
            <div className={classes.separator} />

            {/* <div className={classes.titleContainer}>
                <ButtonBase className={classes.addContainer} style={{ marginBottom: 49, marginTop: 15 }}>
                    <div className={classes.addButton}>
                        <AddCircleOutline />
                    </div>
                    <Typography className={classes.addButtonTitle}>{t("ADD_ITEM")}</Typography>
                </ButtonBase>
            </div> */}

            {selectedEvents.filter((event) => !!event.static_data.reason).length > 0 && (
              <Box display="flex" justifyContent="center" width={1} className={classes.graphContainer}>
                <Box width={1} className={classes.graphSubContainer}>
                  <Typography variant="h5">Didn't use skills because...</Typography>
                  {selectedEvents.map(
                    (event) =>
                      !!event.static_data.notes && (
                        <Box className={classes.blueBoxStyle}>
                          <Typography variant="caption" gutterBottom>
                            {getDateString(new Date(event.timestamp))}
                          </Typography>
                          <Typography variant="body2" component="p">
                            {event.static_data.reason}
                          </Typography>
                        </Box>
                      )
                  )}
                </Box>
              </Box>
            )}
            {skillData !== null && (
              <Box display="flex" justifyContent="center" width={1} className={classes.graphContainer}>
                <div className={classes.separator} />
                <Box width={1} className={classes.graphSubContainer}>
                  <Typography variant="h5">Skills used:</Typography>
                  {Object.keys(skillData).map((key) => (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>{key}</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.accordionContent}>
                        {skillData[key].map((detail) => (
                          <Box width={1} className={classes.accordionContentSub}>
                            {!!detail.category && <Typography variant="h6">{detail.category}</Typography>}
                            <Typography variant="body2" component="span">
                              {detail.value}
                            </Typography>
                          </Box>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </Box>
            )}

            {selectedEvents.filter((event) => !!event.static_data.notes).length > 0 && (
              <Box display="flex" justifyContent="center" width={1} className={classes.graphContainer}>
                <div className={classes.separator} />
                <Box width={1} className={classes.graphSubContainer}>
                  <Typography variant="h5">Optional notes:</Typography>
                  {selectedEvents.map(
                    (event) =>
                      !!event.static_data.reason && (
                        <Box className={classes.blueBoxStyle}>
                          <Typography variant="caption" gutterBottom>
                            {getDateString(new Date(event.timestamp))}
                          </Typography>
                          <Typography variant="body2" component="p">
                            {event.static_data.notes}
                          </Typography>
                        </Box>
                      )
                  )}
                </Box>
              </Box>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
