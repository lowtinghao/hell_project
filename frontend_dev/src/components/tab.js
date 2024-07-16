// Navbar.js
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from './ToggleButton';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import delllogo from '../assets/dell_logo.avif';
import CssBaseline from '@mui/material/CssBaseline';
import StickyHeadTable from '../pages/adminhome';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Navbarssss() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mx: 'auto' , ml:2, mr:2}}>
      <CssBaseline />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <img src={delllogo} alt="dell logo" style={{ height: '50px', objectFit: 'contain' }} />
          <Tab label={<Typography variant="body1" sx={{ color: theme.palette.text.primary }}>Home</Typography>} {...a11yProps(0)} />
          <Tab label={<Typography variant="body1" sx={{ color: theme.palette.text.primary }}>Form</Typography>} {...a11yProps(1)} />
          <Tab label={<Typography variant="body1" sx={{ color: theme.palette.text.primary }}>Trainers</Typography>} {...a11yProps(2)} />
          <ToggleButton />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <StickyHeadTable/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
      <StickyHeadTable/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}></CustomTabPanel>
      <CustomTabPanel value={value} index={3}></CustomTabPanel>
    </Box>
  );
}
