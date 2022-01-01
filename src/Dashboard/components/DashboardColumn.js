import {Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, useTheme} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DashboardColumn = (props) => {
    const {title, list, onItemSelected, itemSelected} = props;
    const theme = useTheme();

    return (
        <Box sx={{height: "100%", width: 400}}>
            <Table>
                <TableHead>
                    <TableRow hover>
                        <TableCell sx={{background: "#fafafa", py: 1}}>
                            <Typography variant="body" color={theme.palette.grey["700"]}>{title}</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list?.map(item => {
                        return (
                            <TableRow hover onClick={() => onItemSelected(item.id)} key={item.id}>
                                <TableCell
                                    sx={{
                                        py: 1,
                                        border: "none",
                                        background: itemSelected ? theme.palette.grey["200"] : "",
                                        display: "flex",
                                        flexDirection: "row"
                                    }}
                                >
                                    {item.label}
                                    {itemSelected &&
                                        <ArrowForwardIosIcon fontSize="small" color="disabled" sx={{ml: "auto"}}/>
                                    }
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Box>
    );
}

export default DashboardColumn;