import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    googleBtn: {
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "0.25rem",
      boxSizing: "border-box",
      color: "rgba(0, 0, 0, 0.85)",
      cursor: "pointer",
      display: "inline-flex",
      fontSize: "16px",
      fontWeight: "600",
      justifyContent: "center",
      lineHeight: "1.25",
      minHeight: "1rem",
      height: "2.5rem",
      padding: "calc(.875rem - 1px) calc(1.5rem - 1px)",
      textDecoration: "none",
      transition: "all 250ms",
      userSelect: "none",
      WebkitUserSelect: "none",
      touchAction: "manipulation",
      verticalAlign: "baseline",
      width: "100%",
      '&:hover, &:focus': {
      borderColor: "rgba(0, 0, 0, 0.15)",
      boxShadow: "rgba(0, 0, 0, 0.1) 0 4px 12px",
      color: "rgba(0, 0, 0, 0.65)",
    },
    '&:hover': {
      transform: "translateY(-1px)",
    },
    '&:active': {
      backgroundColor: "#F0F0F1",
      borderColor: "rgba(0, 0, 0, 0.15)",
      boxShadow: "rgba(0, 0, 0, 0.06) 0 2px 4px",
      color: "rgba(0, 0, 0, 0.65)",
      transform: "translateY(0)",
    }
    },
    buttonRole: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "16px"
    },
    divider: {
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: "16px",
        color: "rgb(55, 65, 81, 1)",
        '&:before': {
          flex: 1,
          content: '""',
          padding: '0.5px',
          backgroundColor: "rgb(55, 65, 81, 1)",
          margin: '5px',
        },
        '&:after': {
          flex: 1,
          content: '""',
          padding: '0.5px',
          backgroundColor: "rgb(55, 65, 81, 1)",
          margin: '5px',
        },
      },
      
  });

export default useStyles;