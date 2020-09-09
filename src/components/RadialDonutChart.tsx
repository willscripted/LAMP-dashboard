import React from "react"
import { scaleOrdinal } from "@vx/scale"
import { LegendOrdinal } from "@vx/legend"
import { RadialChart, ArcLabel, ArcSeries } from "@data-ui/radial-chart"
import { Box, useMediaQuery, useTheme, Typography } from "@material-ui/core"

const colorScale = scaleOrdinal({ range: ["#CFE3FF", "#7DB2FF", "#5784EE", "#3C5DDD"] })

export default function RadialDonutChart(props) {
  const data = props.data[0]
  const supportsSidebar = useMediaQuery(useTheme().breakpoints.up("md"))

  return (
    <Box>
      <Box>
        <RadialChart
          ariaLabel="This is a radial-chart chart of..."
          width={props.width}
          height={props.height}
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          // renderTooltip={({ event, datum, data, fraction }) => (
          //   <div>
          //     <strong>{datum.label}</strong>
          //     {datum.value} ({(fraction * 100).toFixed(2)}%)
          //   </div>
          // )}
          renderTooltip={({ datum, fraction }) => {
            const { label } = datum
            const style = { color: colorScale(label) }

            return (
              <div>
                <div>
                  <strong style={style}>{label}</strong>
                </div>
                <div>{(fraction * 100).toFixed()}%</div>
              </div>
            )
          }}
        >
          <ArcSeries
            data={data}
            pieValue={(d) => d.value}
            fill={(arc) => colorScale(arc.data.label)}
            padAngle={0.03}
            cornerRadius={5}
            stroke="#fff"
            strokeWidth={1}
            label={
              (arc) => (props.detailPage ? `${arc.data.label} - ${arc.data.value.toFixed(1)}%` : "")
              // <div>
              //   <div>
              //     <strong>{arc.data.label}</strong>
              //   </div>
              //   <div>{arc.data.value.toFixed(1)}%</div>
              // </div>
            }
            labelComponent={<ArcLabel />}
            innerRadius={(radius) => 0.35 * radius}
            outerRadius={(radius) => 0.6 * radius}
            labelRadius={(radius) => 0.75 * radius}
          />
        </RadialChart>
      </Box>
      {/* {props.detailPage && (
        <Box style={{ paddingLeft: supportsSidebar ? "10%" : "28%" }}>
          <LegendOrdinal
            direction="column"
            scale={colorScale}
            shape="rect"
            fill={({ datum }) => colorScale(datum)}
            labelFormat={(label) => label}
          />
        </Box>
      )} */}
    </Box>
  )
}
