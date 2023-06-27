import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: 0,
  transform: 'translate(-50%, -50%)',
  width: 370,
  bgcolor: 'background.paper',
  border: '2px solid #303f9f',
  borderRadius: 1.5,
  boxShadow: 24,
  p: 3.5,
};

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  // marginLeft: 0,
  // width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(2),
  },
}));
