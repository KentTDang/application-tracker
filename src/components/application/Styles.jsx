import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  modalStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  reviewFormContainerStyle: {
    backgroundColor: "white",
    height: "25rem",
    width: "45rem",
    padding: 24,
    borderRadius: "12px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  reviewFormStyle: {
    backgroundColor: "white",
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gridColumnGap: "1rem",
    gridRowGap: "1rem",
  },
  reviewFormHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  closeFormButtonX: {
    background: "transparent",
    color: "gray",
    border: "none",
  },
  addApplicationButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "3rem",
    width: "10rem",
    fontSize: "14.8px",
    "& > svg": {
      marginRight: "0.25rem",
    },
  },
  appliedStage: {
    color: "green",
    height: "2rem !important",
    width: "2rem !important",
  },
});

export default useStyles;
