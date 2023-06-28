import { Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: 0,
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #303f9f',
  borderRadius: theme.spacing(1.5),
  boxShadow: 24,
  padding: theme.spacing(4),

  [theme.breakpoints.down('sm')]: {
    width: 310,
    padding: theme.spacing(2.5),
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(2),
  },
}));
