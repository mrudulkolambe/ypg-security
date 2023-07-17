import './App.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import ViewEmployee from './pages/ViewEmployee';
import AddEmployee from './pages/AddEmployee';
import ViewAsset from './pages/ViewAsset';
import AddAsset from './pages/AddAsset';
import AssetStatus from './pages/AssetStatus';
import AssignJobs from './pages/AssignJobs';
import ViewJobs from './pages/ViewJobs';
import ViewAlarmResponse from './pages/ViewAlarmResponse';
import ViewEmployeeAttendance from './pages/ViewEmployeeAttendance';
import AssignedJobs from './pages/AssignedJobs';
import JobRequestLogs from './pages/JobRequestLogs';
import ActivityLogs from './pages/ActivityLogs';
import EmployeeRoute from './pages/EmployeeRoute';
import { AuthContextProvider } from './context/Auth';
import { EmployeeContextProvider } from './context/Employee';
import { AssetContextProvider } from './context/Asset';
import Alert from './component/Alert';
import { UtilsContextProvider } from './context/Utlis';
import ViewEmployeeProfile from './pages/ViewEmployeeProfile';
import UpdateEmployee from './pages/UpdateEmployee';
import UpdateAsset from './pages/UpdateAsset';
import EmployeeTrack from './pages/EmployeeTrack';
import { AlarmResponseProvider } from './context/AlarmResponse';
import { JobContextProvider } from './context/Job';
import { LogContextProvider } from './context/LogContext';
import { useEffect } from 'react';
import Notification from './pages/Notification';
import ViewNotification from './pages/ViewNotification';
import { NotificationContextProvider } from './context/Notification';

function App() {

  return (
    <>
      <div className='w-screen h-full bg-white fixed z-[1000] sm:block md:hidden lg:hidden'>
        <p className='text-lg font-bold w-full h-full flex justify-center items-center'>Use tablet or large screen to view details.</p>
      </div>
      <Router>
        <UtilsContextProvider>
          <AuthContextProvider>
            <EmployeeContextProvider>
              <AssetContextProvider>
                <JobContextProvider>
                  <AlarmResponseProvider>
                    <LogContextProvider>
                      <NotificationContextProvider>
                        <Alert />
                        <Routes>
                          <Route path="/" exact element={<Home />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/view-employee" element={<ViewEmployee />} />
                          <Route path="/add-employee" element={<AddEmployee />} />
                          <Route path="/view-asset" element={<ViewAsset />} />
                          <Route path="/add-asset" element={<AddAsset />} />
                          {/* <Route path="/asset-status" element={<AssetStatus />} /> */}
                          <Route path="/assign-jobs" element={<AssignJobs />} />
                          <Route path="/view-jobs" element={<ViewJobs />} />
                          <Route path="/view-alarm-response" element={<ViewAlarmResponse />} />
                          <Route path="/view-employee-attendance" element={<ViewEmployeeAttendance />} />
                          <Route path="/view-job-assigned-logs" element={<AssignedJobs />} />
                          <Route path="/view-job-request-logs" element={<JobRequestLogs />} />
                          <Route path="/view-acitivity-logs" element={<ActivityLogs />} />
                          <Route path="/employee-route" element={<EmployeeRoute />} />
                          <Route path="/employee/:uid" element={<ViewEmployeeProfile />} />
                          <Route path="/update-employee/:uid" element={<UpdateEmployee />} />
                          <Route path="/update-asset/:uid" element={<UpdateAsset />} />
                          <Route path="/employee-track" element={<EmployeeTrack />} />
                          <Route path="/notification" element={<Notification />} />
                          <Route path="/view-notification" element={<ViewNotification />} />
                        </Routes>
                      </NotificationContextProvider>
                    </LogContextProvider>
                  </AlarmResponseProvider>
                </JobContextProvider>
              </AssetContextProvider>
            </EmployeeContextProvider>
          </AuthContextProvider>
        </UtilsContextProvider>
      </Router>
    </>
  );
}

export default App;
