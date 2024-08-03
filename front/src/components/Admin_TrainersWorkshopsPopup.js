import { Dialog, DialogActions, DialogContent, Paper, DialogTitle, Box, Typography, Modal, Backdrop, Fade, Button,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';

const WorkshopDetailsPopup =({open, handleClose, workshops}) => {
	return(
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Assigned Workshops</DialogTitle>
			<DialogContent sx={{ p: 0 }}>
				{workshops && workshops.length > 0 ? (
						<TableContainer component={Paper} sx={{ height: 'calc(100% - 64px)', width: '100%' }}>
							<Table aria-label="workshops table" stickyHeader sx={{ minWidth: '650' }}>
								<TableHead>
									<TableRow>
										<TableCell align="center">Workshop ID</TableCell>
										<TableCell align="center">Workshop Name</TableCell>
										<TableCell align="center">Client</TableCell>
										<TableCell align="center">Venue</TableCell>
										<TableCell align="center">From</TableCell>
										<TableCell align="center">To</TableCell>
									</TableRow>
							</TableHead>
							<TableBody>
								{workshops.map((workshop) => (
										<TableRow key={workshop.id}>
												<TableCell align="center">{workshop.workshopId}</TableCell>
												<TableCell align="center">{workshop.workshopName}</TableCell>
												<TableCell align="center">{workshop.venue}</TableCell>
												<TableCell align="center">{workshop.companyName}</TableCell>
												<TableCell align="center">{(new Date(workshop.dates[0])).toLocaleDateString()}</TableCell>
												<TableCell align="center">{(new Date(workshop.dates[1])).toLocaleDateString()}</TableCell>
										</TableRow>
								))}
								{console.log('popup',workshops)}
							</TableBody>
						</Table>
						</TableContainer>
				) : (
					<Typography align='center'>No workshops assigned.</Typography>
				)}
			</DialogContent>
			<DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">Close</Button>
      </DialogActions>
		</Dialog>
	)
}

export default WorkshopDetailsPopup;