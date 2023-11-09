import {
  Paper,
  Typography,
  Checkbox,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
  editHandler: (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ) => void;
};

const TodoItem = ({
  todo,
  completeHandler,
  deleteHandler,
  editHandler,
}: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);
  
const saveHandler = ():void => {
  if(editActive && textVal !== ""){
    setEditActive(false);
    editHandler(todo.id,textVal);
  }
  else{
    setEditActive(true);
  }
}


  return (
    <Paper
      sx={{
        padding: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />
        {editActive ? (
          <TextField
          variant="outlined"
          sx={{mr:"0.5rem",width:"70%"}}
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textVal !== "") {
                editHandler(todo.id, textVal);
                setEditActive(false);
              }
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        
        <Button
          sx={{
            fontWeight: "600",
          }}
          onClick={() => saveHandler()}
        >
          {editActive ? "Save" : "Edit"}
        </Button>
        <Button
          onClick={() => deleteHandler(todo.id)}
          sx={{ opacity: 0.6, color: "tomato" ,}}
        >
          <Delete />
        </Button>
        
      </Stack>
    </Paper>
  );
};

export default TodoItem;
