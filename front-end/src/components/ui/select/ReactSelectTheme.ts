const ReactSelectTheme = (theme: string | "dark" | "light" | undefined) => ({
  control: (base: any) => ({
    ...base,
    height: "54px",
    minHeight: "54px",
    backgroundColor: "#48647D3D",
    borderColor: "#48647D3D",
    boxShadow: null,
    flexWrap: "nowrap",
    color: "#fff",

    ":active": {
      ...base[":active"],
      color: "#fff",
      backgroundColor: "#f05445",
    },
  }),
  valueContainer: (base: any) => ({
    ...base,
    height: "54px",
    minHeight: "54px",
    padding: "0 6px",
    flexWrap: "nowrap",
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: "54px",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#FFF",
  }),
  option: (base: any, { isFocused }: { isFocused: boolean }) => {
    return {
      ...base,
      backgroundColor: isFocused && "#f05445",

      borderRadius: 10,
      color: "#fff",
      cursor: "pointer",
      ":active": {
        ...base[":active"],
        backgroundColor: "#f05445",
        color: "#48647D3D",
      },
    };
  },
  menu: (base: any) => ({
    ...base,
    zIndex: 9999,

    backgroundColor: "#48647D3D",
    borderRadius: 10,
    marginTop: 10,
  }),
  menuList: (base: any) => ({
    ...base,
    padding: 10,
  }),

  multiValue: (base: any) => {
    return {
      ...base,
      backgroundColor: "#f05445",
    };
  },
  multiValueLabel: (base: any) => ({
    color: "white",
  }),
  multiValueRemove: (base: any) => ({
    color: "white",
    ":hover": {
      backgroundColor: "red",
      color: "white",
    },
  }),
});

export default ReactSelectTheme;
