import ItemVisualization from "../components/pages/Product/ItemVisualization/ItemVisualization";
import { Box, Container } from "@mui/material";

export default function Product() {
    return (
        <Box>

            <Container
                maxWidth={false}
                sx={{
                    flex: 1,
                    overflow: "auto",
                    display: "flex",
                    justifyContent: "center",
                    px: { xs: 1, sm: 2, md: 4 },
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 1000,
                    }}
                >
                    <ItemVisualization />
                </Box>
            </Container>
        </Box>
    );
}
