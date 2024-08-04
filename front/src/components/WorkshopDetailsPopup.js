import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

function WorkshopDetailsPopup({ open, handleClose, workshop }) {
  const formatValue = (key, value) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <div key={index}>
          {typeof item === 'object' ? (
            <Typography variant="body2" component="div">{JSON.stringify(item)}</Typography>
          ) : (
            <Typography variant="body2" component="div">{item}</Typography>
          )}
        </div>
      ));
    } else if (typeof value === 'object' && value !== null) {
      return (
        <Table>
          <TableBody>
            {Object.entries(value).map(([subKey, subValue]) => (
              <TableRow key={subKey}>
                <TableCell>{subKey}</TableCell>
                <TableCell>{formatValue(subKey, subValue)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (key.toLowerCase().includes('date')) {
      return new Date(value).toLocaleString();
    } else {
      return value;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth data-testid="workshop-dialog">
      <DialogTitle data-testid="workshop-dialog-title">Workshop Details</DialogTitle>
      <DialogContent>
        <Table>
          <TableBody>
            {Object.entries(workshop).map(([key, value]) => (
              <TableRow key={key} data-testid={`workshop-row-${key}`}>
                <TableCell>{key}</TableCell>
                <TableCell>{formatValue(key, value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" data-testid="close-button">Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default WorkshopDetailsPopup;
