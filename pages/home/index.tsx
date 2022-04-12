import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { get, download } from "./api";
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FolderIcon from "@mui/icons-material/Folder";
import { useRouter } from "next/router";

const theme = createTheme();

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function SignIn() {
  const [docs, setDocs] = useState({
    content: [],
    id: undefined,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      return await get();
    };
    fetchData().then((e) => setDocs(e));
  }, [docs]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Demo>
            <List>
              {docs.content &&
                docs.content?.map((item: any, index) => {
                  // eslint-disable-next-line react/jsx-key
                  return (
                    <ListItem
                      sx={{
                        width: "380px",
                      }}
                      key={index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="download"
                          onClick={() => {
                            console.log(item.id);
                            download(item.id);
                          }}
                        >
                          <ArrowDownwardIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.id}
                        secondary={item.content}
                      />
                    </ListItem>
                  );
                })}
            </List>
          </Demo>
          <Button
            onClick={() => {
              router.push("/add");
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add New Document
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
