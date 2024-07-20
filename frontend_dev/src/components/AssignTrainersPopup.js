import * as React from 'react';
import { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme, MenuItem, FormControl, Select, InputLabel, Box, Typography } from '@mui/material';
import { Box, Typography, Modal, Backdrop, Fade, Button } from '@mui/material';

const AssignTrainersPopup = ({ open, handleClose, workshop}) => {
    return(
			<Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Assign Instructors
          </Typography>
          {workshop ? (
            <Box>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Client Name: {workshop.clientname}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Workshop Name: {workshop.workname}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Workshop Type: {workshop.worktype}
              </Typography>
							<Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Workshop duration: {workshop.fromDate} to {workshop.toDate}
              </Typography>
              {/* Add more details or inputs for assigning instructors */}
              <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
            </Box>
          ) : (
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              No workshop data found.
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
	);
};

export default AssignTrainersPopup;