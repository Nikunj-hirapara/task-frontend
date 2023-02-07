import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import Layout from "./component/layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./component/NoPage";
import TaskList from "./component/task/TaskList";
import { DndList } from "./component/task/Task_";
import { TaskProvider } from "./context/TaskStore";

const queryClient = new QueryClient();
const data = {
    "data": [
      {
        "position": 6,
        "mass": 12.011,
        "symbol": "C",
        "name": "Carbon"
      },
      {
        "position": 7,
        "mass": 14.007,
        "symbol": "N",
        "name": "Nitrogen"
      },
      {
        "position": 39,
        "mass": 88.906,
        "symbol": "Y",
        "name": "Yttrium"
      },
      {
        "position": 56,
        "mass": 137.33,
        "symbol": "Ba",
        "name": "Barium"
      },
      {
        "position": 58,
        "mass": 140.12,
        "symbol": "Ce",
        "name": "Cerium"
      }
    ]
  }

function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <QueryClientProvider client={queryClient}>
              <TaskProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Layout />}>
                            {/* <Route index element={<DndList data={data.data}/>} /> */}
                            <Route index element={<TaskList/>} />
                            <Route path='*' element={<NoPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
              </TaskProvider>
            </QueryClientProvider>
        </MantineProvider>
    );
}

export default App;
