export const tabs = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Start",
    href: "/start/default",
  },
  {
    name: "About us",
    href: "/about-us",
  },
  {
    name: "Guide",
    href: "/docs",
  },
  {
    name: "Cite us",
    href: "/cite-us",
  },
  {
    name: "Contact us",
    href: "/contact-us",
  },
];

export const presets =[
        {
            "ID":"MeanSdOps",
            "category":1,
            "groups":10,
            "prepost":0,
            "colnames":[
                "Study_ID",
                "group_ID",
                "Mean",
                "SD",
                "N",
                "SE",
                "llci",
                "ulci",
                "Median",
                "q1",
                "q3",
                "min",
                "max"

            ]
        },
        {
            "ID":"TeSe",
            "category":2,
            "groups":1,
            "prepost":0,
            "colnames":[
                "Study_ID",
                "N",
                "N_total",
                "Mean",
                "SD"
            ]
        },
        {
            "ID":"CombineMeans",
            "category":3,
            "groups":2,
            "prepost":0,
            "colnames":[
               "Study_ID",
                "Mean",
                "SD",
                "N",
                "SE",
                "Median",
                "q1",
                "q3",
                "min",
                "max"
            ]
        },
        {
            "ID":"Labs",
            "category":5,
            "groups":1,
            "prepost":0,
            "colnames":[
                "lab_apply",
                "labs"
            ]
        },
        {
            "ID":"IPD",
            "category":4,
            "groups":1,
            "prepost":0,
            "colnames":[
                "patient_data"
            ]
        }
    ]