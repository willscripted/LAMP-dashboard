import LAMP from "lamp-core"
import { Service } from "../../DBService/DBService"
import i18n from "./../../../i18n"
import { games } from "./Activity"
export const SchemaList = () => {
  return {
    "lamp.spin_wheel": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          required: ["low_risk", "high_risk", "spins_per_game"],
          properties: {
            low_risk: {
              title: i18n.t("Low Risk"),
              type: "array",
              minItems: 1,
              items: {
                type: "object",
                required: ["win", "loose", "zero"],
                properties: {
                  win: {
                    title: i18n.t("Win"),
                    type: "object",
                    required: ["sum", "probability"],
                    properties: {
                      sum: {
                        title: i18n.t("Sum"),
                        type: "number",
                        default: 50,
                        enum: [50, 100, 250],
                      },
                      probability: {
                        title: i18n.t("Probability"),
                        type: "number",
                        default: 50,
                        enum: [0, 25, 50, 75],
                      },
                    },
                  },
                  loose: {
                    title: i18n.t("Loose"),
                    type: "object",
                    required: ["sum", "probability"],
                    properties: {
                      sum: {
                        title: i18n.t("Sum"),
                        type: "number",
                        default: 50,
                        enum: [50, 100, 250],
                      },
                      probability: {
                        title: i18n.t("Probability"),
                        type: "number",
                        default: 50,
                        enum: [0, 25, 50, 75],
                      },
                    },
                  },
                  zero: {
                    title: i18n.t("Zero"),
                    type: "object",
                    required: ["sum", "probability"],
                    properties: {
                      sum: {
                        title: i18n.t("Sum"),
                        type: "number",
                        default: 0,
                        enum: [0],
                      },
                      probability: {
                        title: i18n.t("Probability"),
                        type: "number",
                        default: 50,
                        enum: [0, 25, 50, 75],
                      },
                    },
                  },
                },
              },
              "ui:options": {
                addable: false,
                removable: false,
                orderable: false,
              },
              "ui:grid": {
                xs: 6,
              },
            },
            high_risk: {
              title: i18n.t("High Risk"),
              type: "array",
              minItems: 1,
              items: {
                type: "object",
                required: ["win", "loose", "zero"],
                properties: {
                  win: {
                    title: i18n.t("Win"),
                    type: "object",
                    required: ["sum", "probability"],
                    properties: {
                      sum: {
                        title: i18n.t("Sum"),
                        type: "number",
                        default: 100,
                        enum: [50, 100, 250],
                      },
                      probability: {
                        title: i18n.t("Probability"),
                        type: "number",
                        default: 50,
                        enum: [0, 25, 50, 75],
                      },
                    },
                  },
                  loose: {
                    title: i18n.t("Loose"),
                    type: "object",
                    required: ["sum", "probability"],
                    properties: {
                      sum: {
                        title: i18n.t("Sum"),
                        type: "number",
                        default: 250,
                        enum: [50, 100, 250],
                      },
                      probability: {
                        title: i18n.t("Probability"),
                        type: "number",
                        default: 50,
                        enum: [0, 25, 50, 75],
                      },
                    },
                  },
                  zero: {
                    type: "object",
                    title: i18n.t("Zero"),

                    required: ["sum", "probability"],
                    properties: {
                      sum: {
                        title: i18n.t("Sum"),
                        type: "number",
                        default: 0,
                        enum: [0],
                      },
                      probability: {
                        title: i18n.t("Probability"),
                        type: "number",
                        default: 50,
                        enum: [0, 25, 50, 75],
                      },
                    },
                  },
                },
              },
              "ui:options": {
                addable: false,
                removable: false,
                orderable: false,
              },
              "ui:grid": {
                xs: 6,
              },
            },
            spins_per_game: {
              title: i18n.t("Spins per game"),
              type: "number",
              minimum: 1,
              maximum: 100,
              default: 20,
              "ui:grid": {
                xs: 6,
              },
            },
          },
        },
      },
    },
    "lamp.balloon_risk": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          required: ["balloon_count", "breakpoint_mean", "breakpoint_std"],
          properties: {
            balloon_count: {
              title: i18n.t("Balloon Count"),
              description: i18n.t("The number of balloons to display."),
              type: "number",
              default: 15,
              minimum: 1,
              maximum: 100,
              "ui:grid": {
                xs: 4,
              },
            },
            breakpoint_mean: {
              title: i18n.t("Breakpoint Mean"),
              description: i18n.t("The mean of the breakpoint for balloon risk."),
              type: "number",
              default: 64.5,
              minimum: 1,
              maximum: 100,
              "ui:grid": {
                xs: 4,
              },
            },
            breakpoint_std: {
              title: i18n.t("Breakpoint Standard Deviation"),
              description: i18n.t("The standard deviation of the breakpoint for balloon risk."),
              type: "number",
              default: 37,
              maximum: 100,
              minimum: 1,
              "ui:grid": {
                xs: 4,
              },
            },
          },
        },
      },
    },
    "lamp.pop_the_bubbles": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          required: ["bubble_count", "bubble_speed", "intertrial_duration", "bubble_duration"],
          properties: {
            bubble_count: {
              title: i18n.t("Bubble Count"),
              description: i18n.t("Multiple bubble counts per level."),
              type: "array",
              minItems: 3,
              maxItems: 3,
              items: {
                title: i18n.t("Level Count"),
                type: "number",
                minimum: 1,
                default: 80,
              },
              "ui:options": {
                addable: false,
                removable: false,
                orderable: false,
              },
              "ui:grid": {
                xs: 6,
              },
            },
            bubble_speed: {
              title: i18n.t("Bubble Speed"),
              description: i18n.t("Multiple bubble speeds per level."),
              type: "array",
              minItems: 3,
              maxItems: 3,
              items: {
                title: i18n.t("Level Speed"),
                type: "number",
                minimum: 1,
                default: 80,
              },
              "ui:options": {
                addable: false,
                removable: false,
                orderable: false,
              },
              "ui:grid": {
                xs: 6,
              },
            },
            intertrial_duration: {
              title: i18n.t("Intertrial Duration"),
              description: i18n.t("The duration between bubbles."),
              type: "number",
              minimum: 0,
              default: 0.5,
              "ui:grid": {
                xs: 6,
              },
            },
            bubble_duration: {
              title: i18n.t("Bubble Duration"),
              description: i18n.t("The duration the bubble appears on screen."),
              type: "number",
              minimum: 1,
              default: 1.0,
              "ui:grid": {
                xs: 6,
              },
            },
          },
        },
      },
    },
    "lamp.memory_game": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          properties: {
            foils: {
              title: i18n.t("Foils"),
              description: "3 from 9 :-  3x3 grid and 9 foils, 4 from 12 :-  3x3 grid and 12 foils.",
              type: "string",
              enum: [1, 2],
              enumNames: [i18n.t("3 from 9"), i18n.t("4 from 12")],
              default: 1,
              "ui:grid": {
                xs: 6,
              },
            },
            // encoding_trials: {
            //   title: i18n.t("Encoding trials"),
            //   description: "",
            //   type: "number",
            //   minimum: 0,
            //   maximum: 3,
            //   default: 3,
            //   readonly: true,
            //   "ui:grid": {
            //     xs: 3,
            //   },
            // },
            animation_interval: {
              title: i18n.t("Animation interval"),
              description: i18n.t("seconds"),
              type: "number",
              minimum: 1,
              maximum: 5,
              default: 2,
              "ui:grid": {
                xs: 3,
              },
            },
            animation_persistance: {
              title: i18n.t("Animation persistance"),
              description: i18n.t("seconds"),
              type: "number",
              minimum: 1,
              maximum: 5,
              default: 1,
              "ui:grid": {
                xs: 3,
              },
            },
          },
        },
      },
    },
    "lamp.spatial_span": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          required: ["reverse_tapping"],
          properties: {
            reverse_tapping: {
              title: i18n.t("Tap Order"),
              description: i18n.t("Whether taps are going forwards or backwards."),
              type: "boolean",
              enumNames: [i18n.t("Backward"), i18n.t("Forward")],
              default: true,
              "ui:widget": "radio",
            },
          },
        },
      },
    },
    "lamp.recording": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          required: ["microphone_text"],
          properties: {
            record_label: {
              title: i18n.t("Microphone record label"),
              description: i18n.t("This text will be shown for record"),
              type: "string",
              default: "Press the microphone to record",
            },
            rerecord_label: {
              title: i18n.t("Microphone re-record label"),
              description: i18n.t("To change the default label - 'Click upload or clear to record again'."),
              type: "string",
              default: "Click upload or clear to record again",
            },
          },
        },
      },
    },
    "lamp.jewels_a": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          required: [
            "mode",
            "variant",
            "beginner_seconds",
            "intermediate_seconds",
            "advanced_seconds",
            "expert_seconds",
            "diamond_count",
            "shape_count",
            "bonus_point_count",
          ],
          dependencies: {
            variant: {
              oneOf: [
                {
                  properties: {
                    variant: {
                      const: "trails_a",
                    },
                  },
                },
                {
                  properties: {
                    variant: {
                      const: "trails_b",
                    },
                    y_changes_in_level_count: {
                      title: i18n.t("Y changes in level count"),
                      description: "",
                      type: "number",
                      minimum: 0,
                      maximum: 25,
                      default: 2,
                      "ui:grid": {
                        xs: 3,
                      },
                    },
                    y_shape_count: {
                      title: i18n.t("Y shape count"),
                      description: "",
                      type: "number",
                      minimum: 0,
                      maximum: 4,
                      default: 1,
                      "ui:grid": {
                        xs: 3,
                      },
                    },
                  },
                },
              ],
            },
          },

          properties: {
            mode: {
              title: i18n.t("Mode"),
              description: i18n.t("The mode of the jewels game."),
              type: "number",
              enum: [1, 2, 3, 4],
              enumNames: [i18n.t("Beginner"), i18n.t("Intermediate"), i18n.t("Advanced"), i18n.t("Expert")],
              default: 1,
              "ui:grid": {
                xs: 6,
              },
            },
            variant: {
              title: i18n.t("Variant"),
              description: "The variant of the Jewels game (A or B).",
              type: "string",
              enum: ["trails_a", "trails_b"],
              enumNames: [i18n.t("Trails A"), i18n.t("Trails B")],
              default: "trails_a",
              "ui:grid": {
                xs: 6,
              },
            },
            beginner_seconds: {
              title: i18n.t("Beginner Duration"),
              description: i18n.t("The duration of a Jewels session on Beginner mode (in seconds)."),
              type: "number",
              minimum: 1,
              maximum: 300,
              default: 90,
              "ui:grid": {
                xs: 3,
              },
            },
            intermediate_seconds: {
              title: i18n.t("Intermediate Duration"),
              description: i18n.t("The duration of a Jewels session on Intermediate mode (in seconds)."),
              type: "number",
              minimum: 1,
              maximum: 300,
              default: 30,
              "ui:grid": {
                xs: 3,
              },
            },
            advanced_seconds: {
              title: i18n.t("Advanced Duration"),
              description: i18n.t("The duration of a Jewels session on Advanced mode (in seconds)."),
              type: "number",
              minimum: 1,
              maximum: 300,
              default: 25,
              "ui:grid": {
                xs: 3,
              },
            },
            expert_seconds: {
              title: i18n.t("Expert Duration"),
              description: i18n.t("The duration of a Jewels session on Expert mode (in seconds)."),
              type: "number",
              minimum: 1,
              maximum: 300,
              default: 15,
              "ui:grid": {
                xs: 3,
              },
            },
            diamond_count: {
              title: i18n.t("Initial Diamond Count"),
              description: i18n.t("The number of diamonds in Jewels game."),
              type: "number",
              minimum: 3,
              maximum: 25,
              default: 15,
              "ui:grid": {
                xs: 3,
              },
            },
            shape_count: {
              title: i18n.t("Initial Shape Count"),
              description: i18n.t("The number of shapes in Jewels game"),
              type: "number",
              minimum: 1,
              maximum: 3,
              default: 1,
              "ui:grid": {
                xs: 3,
              },
            },
            bonus_point_count: {
              title: i18n.t("Bonus points for next level"),
              description: "",
              type: "number",
              minimum: 0,
              maximum: 500,
              default: 50,
              "ui:grid": {
                xs: 6,
              },
            },
            x_changes_in_level_count: {
              title: i18n.t("X changes in level count"),
              description: "",
              type: "number",
              minimum: 0,
              maximum: 25,
              default: 1,
              "ui:grid": {
                xs: 3,
              },
            },
            x_diamond_count: {
              title: i18n.t("X diamond count"),
              description: "",
              type: "number",
              minimum: 0,
              maximum: 25,
              default: 4,
              "ui:grid": {
                xs: 3,
              },
            },
          },
        },
      },
    },
    "lamp.jewels_b": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          required: [
            "mode",
            "variant",
            "beginner_seconds",
            "intermediate_seconds",
            "advanced_seconds",
            "expert_seconds",
            "diamond_count",
            "shape_count",
            "bonus_point_count",
          ],
          dependencies: {
            variant: {
              oneOf: [
                {
                  properties: {
                    variant: {
                      const: "trails_a",
                    },
                  },
                },
                {
                  properties: {
                    variant: {
                      const: "trails_b",
                    },
                    y_changes_in_level_count: {
                      title: i18n.t("Y changes in level count"),
                      description: "",
                      type: "number",
                      minimum: 0,
                      maximum: 25,
                      default: 2,
                      "ui:grid": {
                        xs: 3,
                      },
                    },
                    y_shape_count: {
                      title: i18n.t("Y shape count"),
                      description: "",
                      type: "number",
                      minimum: 0,
                      maximum: 4,
                      default: 1,
                      "ui:grid": {
                        xs: 3,
                      },
                    },
                  },
                },
              ],
            },
          },
          properties: {
            mode: {
              title: i18n.t("Mode"),
              description: i18n.t("The mode of the jewels game."),
              type: "number",
              enum: [1, 2, 3, 4],
              enumNames: [i18n.t("Beginner"), i18n.t("Intermediate"), i18n.t("Advanced"), i18n.t("Expert")],
              default: 1,
              "ui:grid": {
                xs: 6,
              },
            },
            variant: {
              title: i18n.t("Variant"),
              description: i18n.t("The variant of the Jewels game (A or B)."),
              type: "string",
              enum: ["trails_a", "trails_b"],
              enumNames: [i18n.t("Trails A"), i18n.t("Trails B")],
              default: "trails_b",
              "ui:grid": {
                xs: 6,
              },
            },
            beginner_seconds: {
              title: i18n.t("Beginner Duration"),
              description: i18n.t("The duration of a Jewels session on Beginner mode (in seconds)."),
              type: "number",
              minimum: 1,
              maximum: 300,
              default: 90,
              "ui:grid": {
                xs: 3,
              },
            },
            intermediate_seconds: {
              title: i18n.t("Intermediate Duration"),
              description: i18n.t("The duration of a Jewels session on Intermediate mode (in seconds)."),
              type: "number",
              minimum: 1,
              maximum: 300,
              default: 30,
              "ui:grid": {
                xs: 3,
              },
            },
            advanced_seconds: {
              title: i18n.t("Advanced Duration"),
              description: i18n.t("The duration of a Jewels session on Advanced mode (in seconds)."),
              type: "number",
              minimum: 1,
              maximum: 300,
              default: 25,
              "ui:grid": {
                xs: 3,
              },
            },
            expert_seconds: {
              title: i18n.t("Expert Duration"),
              description: i18n.t("The duration of a Jewels session on Expert mode (in seconds)."),
              type: "number",
              minimum: 1,
              maximum: 300,
              default: 15,
              "ui:grid": {
                xs: 3,
              },
            },
            diamond_count: {
              title: i18n.t("Initial Diamond Count"),
              description: i18n.t("The number diamonds in Jewels game"),
              type: "number",
              minimum: 3,
              maximum: 25,
              default: 15,
              "ui:grid": {
                xs: 3,
              },
            },
            shape_count: {
              title: i18n.t("Initial Shape Count"),
              description: i18n.t("The number of shapes in Jewels game"),
              type: "number",
              minimum: 1,
              maximum: 3,
              default: 1,
              "ui:grid": {
                xs: 3,
              },
            },
            bonus_point_count: {
              title: i18n.t("Bonus points for next level"),
              description: "",
              type: "number",
              minimum: 0,
              maximum: 500,
              default: 50,
              "ui:grid": {
                xs: 6,
              },
            },
            x_changes_in_level_count: {
              title: i18n.t("X changes in level count"),
              description: "",
              type: "number",
              minimum: 0,
              maximum: 25,
              default: 1,
              "ui:grid": {
                xs: 3,
              },
            },
            x_diamond_count: {
              title: i18n.t("X diamond count"),
              description: "",
              type: "number",
              minimum: 0,
              maximum: 25,
              default: 4,
              "ui:grid": {
                xs: 3,
              },
            },
          },
        },
      },
    },

    "lamp.survey": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Survey Questions"),
          description: i18n.t("Configure questions, parameters, and options."),
          type: "array",
          items: {
            required: ["text", "type"],

            type: "object",
            dependencies: {
              type: {
                oneOf: [
                  {
                    properties: {
                      type: {
                        enum: ["text", "boolean", "short_answer", "likert", "matrix"],
                      },
                    },
                  },
                  {
                    properties: {
                      type: {
                        enum: ["list", "multiselect"],
                      },
                      options: {
                        type: "array",
                        title: i18n.t("Response Options"),
                        minItems: 1,
                        items: {
                          type: "object",
                          properties: {
                            value: {
                              title: i18n.t("Option Text"),
                              type: "string",
                              minLength: 1,
                              default: "",
                            },
                            description: {
                              title: i18n.t("Option Description"),
                              type: "string",
                              default: "",
                            },
                          },
                        },
                      },
                    },
                    required: ["options"],
                  },
                  {
                    properties: {
                      type: {
                        enum: ["time"],
                      },
                      options: {
                        type: "array",
                        title: i18n.t("Response Options"),
                        minItems: 1,
                        maxItems: 1,
                        items: {
                          type: "object",
                          properties: {
                            value: {
                              title: i18n.t("Time pattern"),
                              type: "string",
                              enum: ["standard", "military"],
                              enumNames: [i18n.t("STANDARD TIME"), i18n.t("MILITARY TIME")],
                              default: "standard",
                            },
                          },
                        },
                      },
                    },
                  },
                  {
                    properties: {
                      type: {
                        enum: ["slider", "rating"],
                      },
                      options: {
                        type: "array",
                        title: i18n.t("Response Options"),
                        minItems: 1,
                        items: {
                          type: "object",
                          properties: {
                            value: {
                              title: i18n.t("Option Text (Numerical)"),
                              type: "number",
                              default: 0,
                            },
                            description: {
                              title: i18n.t("Option Description"),
                              type: "string",
                              default: "",
                            },
                          },
                        },
                      },
                    },
                    required: ["options"],
                  },
                ],
              },
            },

            properties: {
              text: {
                type: "string",
                title: i18n.t("Question Text"),
                minLength: 1,
                default: "",
              },
              required: {
                title: i18n.t("Required"),
                type: "boolean",
                default: true,
              },
              description: {
                type: "string",
                title: i18n.t("Question Description"),
                default: "",
              },
              type: {
                type: "string",
                title: i18n.t("Question Type"),
                enum: [
                  "text",
                  "boolean",
                  "list",
                  "multiselect",
                  "slider",
                  "short",
                  "rating",
                  "time",
                  "likert",
                  "matrix",
                ],
                enumNames: [
                  i18n.t("Text"),
                  i18n.t("Boolean"),
                  i18n.t("List"),
                  i18n.t("Multi-Select"),
                  i18n.t("Slider"),
                  i18n.t("Short Answer"),
                  i18n.t("Rating"),
                  i18n.t("Time"),
                  i18n.t("Likert"),
                  i18n.t("Matrix"),
                ],
                default: "text",
              },
              warnings: {
                type: "array",
                title: i18n.t("Warnings"),
                description: i18n.t(
                  "Set warnings that will be shown in a dialog to participants when the corresponding answers are submitted."
                ),
                items: {
                  type: "object",
                  properties: {
                    answer: {
                      title: i18n.t("Answer"),
                      description: i18n.t("The answer for which the warning will be shown."),
                      type: "string",
                    },
                    warningText: {
                      title: i18n.t("Warning Text"),
                      description: i18n.t("The message that will be shown to participants."),
                      type: "string",
                    },
                  },
                  required: ["answer", "warningText"],
                },
              },
            },
          },
        },
      },
    },
    "lamp.dbt_diary_card": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          required: ["livingGoal", "targetEffective", "targetIneffective", "emotions"],
          properties: {
            livingGoal: {
              title: i18n.t("Life worth living goal"),
              description: i18n.t("300 max characters."),
              type: "string",
              default: "",
              "ui:widget": "textarea",
              "ui:options": {
                rows: 10,
              },
            },
            targetEffective: {
              title: i18n.t("Effective Target Behaviors"),
              type: "array",
              items: {
                type: "object",
                required: ["target", "measure"],
                properties: {
                  target: {
                    title: i18n.t("Behavior name"),
                    type: "string",
                    minLength: 1,
                  },
                  measure: {
                    title: i18n.t("Measure of Action"),
                    type: "string",
                    minLength: 1,
                    examples: [i18n.t("Times"), i18n.t("Hours"), i18n.t("Minutes"), i18n.t("Amount")],
                  },
                },
              },
            },
            targetIneffective: {
              title: i18n.t("Ineffective Target Behaviors"),
              description: i18n.t(
                "Default Ineffective Behaviors: Die, Self-Harm, Quit Therapy, Die by Suicide. Do not add these below."
              ),
              type: "array",
              items: {
                type: "object",
                required: ["target", "measure"],
                properties: {
                  target: {
                    title: i18n.t("Behavior name"),
                    type: "string",
                    minLength: 1,
                  },
                  measure: {
                    title: i18n.t("Measure of action"),
                    type: "string",
                    minLength: 1,
                    examples: [i18n.t("Times"), i18n.t("Hours"), i18n.t("Minutes"), i18n.t("Amount")],
                  },
                },
              },
            },
            emotions: {
              title: i18n.t("Emotions"),
              description: i18n.t("Default Emotions: Sadness, Shame, Anger, Fear/Worry, Joy. Do not add these below."),
              type: "array",
              items: {
                type: "object",
                properties: {
                  emotion: {
                    title: i18n.t("Emotions"),
                    type: "string",
                    minLength: 1,
                  },
                },
              },
            },
          },
        },
      },
    },
    "lamp.cats_and_dogs": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
        },
      },
    },
    "lamp.maze_game": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
        },
      },
    },
    "lamp.cats_and_dogs_new": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
        },
      },
    },
    "lamp.journal": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
        },
      },
    },
    "lamp.scratch_image": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          required: ["threshold"],
          properties: {
            threshold: {
              title: i18n.t("Threshold"),
              description: i18n.t("The scratch threshold percentage."),
              type: "number",
              minimum: 1,
              maximum: 100,
              default: 80,
            },
          },
        },
      },
    },
    "lamp.goals": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          required: ["unit", "value"],
          properties: {
            unit: {
              title: i18n.t("Unit"),
              description: "",
              type: "string",
              default: "",
            },
            value: {
              title: i18n.t("Value"),
              description: "",
              type: "number",
            },
          },
        },
      },
    },
    "lamp.medications": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          required: ["unit", "value"],
          properties: {
            unit: {
              title: i18n.t("Unit"),
              description: "",
              type: "string",
              default: "",
            },
            value: {
              title: i18n.t("Value"),
              description: "",
              type: "number",
            },
          },
        },
      },
    },
    "lamp.tips": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Tip Details"),
          type: "array",
          items: {
            type: "object",
            required: ["title", "text"],
            minItems: 1,
            properties: {
              title: {
                title: i18n.t("Tips Title"),
                type: "string",
                minLength: 1,
              },
              text: {
                title: i18n.t("Tips Description"),
                type: "string",
                minLength: 1,
                "ui:widget": "textarea",
                "ui:options": {
                  rows: 5,
                },
              },
              image: {
                title: i18n.t("Tips Image"),
                description: i18n.t(
                  "Images should be in the format .jpeg/.png/.gif/.svg and the size should not exceed 4 MB."
                ),
                type: "string",
                format: "data-url",
                "ui:widget": "file",
                "ui:options": {
                  accept: ".gif,.jpg,.png,.svg",
                },
              },
            },
          },
        },
      },
    },
    "lamp.breathe": {
      type: "object",
      properties: {
        settings: {
          title: i18n.t("Activity Settings"),
          type: "object",
          properties: {
            audio_url: {
              title: i18n.t("Remote Audio URL"),
              description: i18n.t("Do not provide an audio URL AND upload audio below."),
              type: "string",
              format: "url",
            },
            audio: {
              title: i18n.t(""),
              description: i18n.t("Do not upload audio AND provide an audio URL above."),
              type: "string",
              format: "data-url",
              "ui:options": {
                accept: [".mp3", ".ogg", ".wav"],
              },
            },
          },
        },
      },
    },
  }
}

// Splice a raw Activity object with its ActivityDescription object.
export function spliceActivity({ raw, tag }) {
  return {
    id: raw.id,
    study_id: raw.study_id,
    category: raw.category,
    spec: "lamp.survey",
    name: raw.name,
    description: tag?.description,
    photo: tag?.photo,
    streak: tag?.streak,
    showFeed: tag?.showFeed,
    schedule: raw.schedule,
    settings: !Array.isArray(raw.settings)
      ? raw.settings
      : raw.settings.map((question, idx) => ({
          text: question.text,
          type: question.type,
          required: question.required ?? false,
          description: tag?.questions?.[idx]?.description,
          options:
            question.options === null
              ? null
              : question.type !== "matrix" && question.type !== "time"
              ? question.options?.map((z, idx2) => ({
                  value: z,
                  description: tag?.questions?.[idx]?.options?.[idx2],
                }))
              : question.options,
          warnings: question.warnings,
        })),
  }
}
// Un-splice an object into its raw Tips Activity object
export function unspliceTipsActivity(x) {
  return {
    raw: {
      id: x.id,
      name: x.name,
      spec: "lamp.tips",
      icon: x.icon,
      schedule: x.schedule,
      settings: x.settings,
      studyID: x.studyID,
      category: x.category,
    },
  }
}

// Un-splice an object into its raw Activity object and ActivityDescription object.
export function unspliceActivity(x) {
  return {
    raw: {
      id: x.id,
      study_id: x.study_id,
      category: x.category,
      spec: "lamp.survey",
      name: x.name,
      schedule: x.schedule,
      settings: (x.settings && Array.isArray(x.settings) ? x.settings : [])?.map((y) => ({
        text: y?.text,
        type: y?.type,
        options:
          y?.options === null
            ? null
            : y?.type !== "matrix" && y?.type !== "time"
            ? y?.options?.map((z) => z?.value ?? z)
            : y?.options,
        required: y?.required ?? false,
        warnings: y?.warnings,
      })),
    },
    tag: {
      description: x.description,
      photo: x.photo,
      streak: x.streak,
      showFeed: x.showFeed,
      questions: (x.settings && Array.isArray(x.settings) ? x.settings : [])?.map((y) => ({
        multiselect: y?.type,
        description: y?.description,
        options:
          y?.options === null
            ? null
            : y?.type !== "matrix" && y?.type !== "time"
            ? y?.options?.map((z) => z?.description ?? "")
            : null,
      })),
    },
  }
}

export function unspliceCTActivity(x) {
  return {
    raw: {
      id: x.id,
      spec: x.spec,
      name: x.name,
      schedule: x.schedule,
      settings: x.settings,
      category: x.category,
    },
    tag: {
      description: x.description,
      photo: x.photo,
      streak: x.streak,
      showFeed: x.showFeed,
    },
  }
}

export function spliceCTActivity({ raw, tag }) {
  return {
    id: raw.id,
    study_id: raw.study_id,
    spec: raw.spec,
    name: raw.name,
    description: tag?.description,
    photo: tag?.photo,
    streak: tag?.streak,
    showFeed: tag?.showFeed,
    schedule: raw.schedule,
    settings: raw.settings,
    category: raw.category,
  }
}

// Create a new Activity object & survey descriptions if set.
export async function saveTipActivity(x) {
  const { raw } = unspliceTipsActivity(x)
  let result
  if (!x.id && x.name) {
    result = (await LAMP.Activity.create(x.studyID, raw)) as any
    await LAMP.Type.setAttachment(result.data, "me", "lamp.dashboard.activity_details", {
      photo: x.icon,
      streak: x.streak,
      showFeed: x.showFeed,
    })
  } else {
    result = (await LAMP.Activity.update(x.id, {
      settings: x.settings,
    })) as any
    await LAMP.Type.setAttachment(x.id, "me", "lamp.dashboard.activity_details", {
      photo: x.icon,
      streak: x.streak,
      showFeed: x.showFeed,
    })
  }
  return result
}

export async function saveCTestActivity(x) {
  let newItem = (await LAMP.Activity.create(x.studyID, x)) as any
  await LAMP.Type.setAttachment(newItem.data, "me", "lamp.dashboard.activity_details", {
    description: x.description,
    photo: x.photo,
    streak: x.streak,
    showFeed: x.showFeed,
  })
  return newItem
}

export async function saveSurveyActivity(x) {
  const { raw, tag } = unspliceActivity(x)
  let newItem = (await LAMP.Activity.create(x.studyID, raw)) as any
  await LAMP.Type.setAttachment(newItem.data, "me", "lamp.dashboard.survey_description", tag)
  return newItem
}

export async function getActivitySpec(spec) {
  let result = await LAMP.ActivitySpec.view(spec)
  return result
}

export async function getDefaultTab(spec) {
  let activitySpec = await getActivitySpec(spec)
  if (!!activitySpec?.category) {
    return activitySpec?.category[0]
  } else {
    if (
      games.includes(spec) ||
      spec === "lamp.group" ||
      spec === "lamp.dbt_diary_card" ||
      spec === "lamp.recording" ||
      spec === "lamp.survey"
    ) {
      return "assess"
    }
    if (
      spec === "lamp.goals" ||
      spec === "lamp.medications" ||
      spec === "lamp.journal" ||
      spec === "lamp.breathe" ||
      spec === "lamp.scratch_image"
    ) {
      return "manage"
    }
    if (spec === "lamp.tips") return "learn"
  }
}

export const updateSchedule = async (activity) => {
  await LAMP.Activity.update(activity.id, { schedule: activity.schedule })
  Service.update("activities", { activities: [{ schedule: activity.schedule, id: activity.id }] }, "schedule", "id")
}
// Commit an update to an Activity object (ONLY DESCRIPTIONS).
export async function updateActivityData(x, isDuplicated, selectedActivity) {
  let result
  if (!["lamp.group", "lamp.survey", "lamp.tips"].includes(x.spec)) {
    // Short-circuit for groups and CTests
    if (isDuplicated) {
      result = (await LAMP.Activity.create(x.studyID, x)) as any
      await LAMP.Type.setAttachment(result.data, "me", "lamp.dashboard.activity_details", {
        description: x?.description ?? "",
        photo: x?.photo ?? "",
        streak: x?.streak ?? null,
        showFeed: x?.showFeed,
      })
      return result
    } else {
      if (selectedActivity?.study_id !== x.studyID) {
        // let tag = await LAMP.Type.setAttachment(x.id, "me", "lamp.dashboard.activity_details", null)
        // await LAMP.Activity.delete(x.id)
        // result = (await LAMP.Activity.create(x.studyID, x)) as any
        // await LAMP.Type.setAttachment(result.data, "me", "lamp.dashboard.activity_details", {
        //   description: x?.description ?? "",
        //   photo: x?.photo ?? "",
        // })
      } else {
        result = (await LAMP.Activity.update(x.id, x)) as any
        await LAMP.Type.setAttachment(selectedActivity?.id, "me", "lamp.dashboard.activity_details", {
          description: x.description,
          photo: x.photo,
          streak: x.streak,
          showFeed: x?.showFeed,
        })
        return result
      }
    }
  } else if (x.spec === "lamp.group" || x.spec === "lamp.dbt_diary_card") {
    if (isDuplicated) {
      result = (await LAMP.Activity.create(x.studyID, x)) as any
      await LAMP.Type.setAttachment(result.data, "me", "lamp.dashboard.activity_details", {
        description: x.description,
        photo: x.photo,
        streak: x.streak,
        showFeed: x?.showFeed,
      })
      return result
    } else {
      result = (await LAMP.Activity.update(selectedActivity?.id, x)) as any

      await LAMP.Type.setAttachment(selectedActivity?.id, "me", "lamp.dashboard.activity_details", {
        description: x.description,
        photo: x.photo,
        streak: x.streak,
        showFeed: x?.showFeed,
      })
      return result
    }
  } else if (x.spec === "lamp.survey") {
    const { raw, tag } = unspliceActivity(x)
    if (isDuplicated) {
      result = (await LAMP.Activity.create(x.studyID, raw)) as any
      await LAMP.Type.setAttachment(result.data, "me", "lamp.dashboard.survey_description", tag)
      return result
    } else {
      result = (await LAMP.Activity.update(selectedActivity?.id, raw)) as any
      await LAMP.Type.setAttachment(selectedActivity?.id, "me", "lamp.dashboard.survey_description", tag)
      return result
    }
  } else if (x.spec === "lamp.tips") {
    if (x.id === undefined) {
      let tipObj = {
        id: x.id,
        name: x.name,
        icon: x.icon,
        studyID: selectedActivity?.study_id,
        spec: "lamp.tips",
        settings: x.settings,
        streak: x.streak,
        showFeed: x?.showFeed,
        schedule: [],
        category: x.category,
      }
      result = await saveTipActivity(tipObj)
      return result
    } else {
      result = (await LAMP.Activity.update(selectedActivity?.id, x)) as any
      await LAMP.Type.setAttachment(selectedActivity?.id, "me", "lamp.dashboard.activity_details", {
        photo: x.icon,
        streak: x.streak,
        showFeed: x?.showFeed,
      })
      return result
    }
  }
}
export function addActivity(x, studies) {
  Service.updateCount("studies", x.studyID, "activity_count")
  x["study_id"] = x.studyID
  x["study_name"] = studies.filter((study) => study.id === x.studyID)[0]?.name
  delete x["studyID"]
  Service.addData("activities", [x])
}
