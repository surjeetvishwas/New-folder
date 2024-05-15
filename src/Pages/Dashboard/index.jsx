import { Route, Routes } from 'react-router-dom'
import DashboardDrawer from '../../components/DashboardDrawer/DashboardDrawer'
import { defaultRoutes } from '../../routes'

const Dashboard = () => {
  return (
    <>
      <DashboardDrawer>
        <Routes>
          {defaultRoutes.map((route) => (
            <Route
              exact
              key={route.name}
              path={route.layout + route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </DashboardDrawer>
    </>
  )
}

export default Dashboard
