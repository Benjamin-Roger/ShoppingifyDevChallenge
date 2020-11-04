import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#F9A109'
        },
        secondary: {
            main: `#56CCF2`,
        }
    },
    typography: {
        fontFamily: [
            "Quicksand", "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", "Geneva",
            "Verdana", "sans-serif"
        ].join(','),
    },
});


export default theme;


