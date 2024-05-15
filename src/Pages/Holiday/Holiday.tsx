import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import {
  addHoliday,
  changeHoliday,
  deleteHoliday,
  fetchAllHolidays,
} from '../../store/actions/HolidayAction'
import {
  useAllHolidays,
  useIsHolidayLoading,
  useDeletedHolidayMessage,
  useGetHolidayPages,
} from '../../store/reducers/HolidayReducer'
import ConfirmationDialog from '../../components/ConfirmationDialog'
import {
  Drawer,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { unwrapResult } from '@reduxjs/toolkit'
import SnackBar from '../../components/SnackBar'
import { editPayloadInterfaceHoliday, showSnackBarInterface } from '../../types'
import moment from 'moment'
import { validation } from '../../Services/GeneralValidation'

export default function Holiday() {
  const holidays = useAllHolidays()
  const isLoading = useIsHolidayLoading()
  const deletedMessage = useDeletedHolidayMessage()
  const pageNo = useGetHolidayPages()

  const [page, setPage] = useState(1)
  const [snackbar, showSnackbar] = useState<showSnackBarInterface | null>(null)
  const [isSnackBar, setIsSnackBar] = useState<boolean>(false)
  const [confirmDialog, setConfirmDialog] = useState<object | null>(null)
  const [holidayActionTitle, setHolidayActionTitle] = useState<string>('')
  const [showEditHoliday, setShowEditHoliday] = useState<boolean>(false)
  const [rowId, setRowId] = useState<number | null>(null)
  const [editPayload, setEditPayload] = useState({
    date: '',
    title: '',
    description: '',
    religion: '',
  } as editPayloadInterfaceHoliday)

  const formValues = ['date', 'title', 'description', 'religion']

  const dispatch = useDispatch()

  const editHoliday = (data: any, programTitle: string) => {
    setHolidayActionTitle(programTitle)
    setShowEditHoliday(true)
    setRowId(data._id)
    setEditPayload({
      ...editPayload,
      title: data.title,
      date: moment(data.date).format('YYYY-MM-DD'),
      description: data.description,
      religion: data.religion,
    })
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const addHolidayHandle = () => {
    if (validation(editPayload, formValues)) {
      dispatch(addHoliday(editPayload))
        .then(unwrapResult)
        .then((originalPromiseResult: { success: boolean }) => {
          if (originalPromiseResult.success === true) {
            showSnackbar({
              text: 'Holiday Successfully Added',
              type: 'success',
            })
            setTimeout(() => window.location.reload(), 700)
          }
        })
        .catch((rejectedValue: any) => {
          showSnackbar({
            text: rejectedValue,
            type: 'error',
          })
        })
    }
  }

  const backToHoliday = () => {
    setEditPayload({
      ...editPayload,
      date: '',
      title: '',
      description: '',
      religion: '',
    })
    setRowId(null)
    setShowEditHoliday(false)
    setHolidayActionTitle('')
  }

  const updateHoliday = () => {
    if (validation(editPayload, formValues)) {
      dispatch(
        changeHoliday({
          id: rowId,
          values: editPayload,
        }),
      )
        .then(unwrapResult)
        .then((originalPromiseResult: { success: boolean }) => {
          if (originalPromiseResult.success === true) {
            showSnackbar({
              text: 'Holiday Successfully Updated',
              type: 'success',
            })
            setTimeout(() => window.location.reload(), 700)
          }
        })
        .catch((rejectedValue: any) => {
          showSnackbar({
            text: rejectedValue,
            type: 'error',
          })
        })
    }
  }

  const handleDeleteClick = (id: any) => {
    
    setConfirmDialog({
      title: 'Delete Holiday',
      body: 'Are you sure want to delete this holiday?',
      onConfirm: async () => {
        setConfirmDialog(null)
        await dispatch(deleteHoliday(id))
        setIsSnackBar(true)
        setTimeout(() => window.location.reload(), 800)
      },
    })
  }

  useEffect(() => {
    dispatch(fetchAllHolidays())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const columns: GridColumns = [
    { field: 'title', headerName: 'Holiday', width: 220 },
    { field: 'description', headerName: 'Description', width: 220 },
    { field: 'date', headerName: 'Date', width: 220 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              backgroundColor: 'whitesmoke',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => editHoliday(params.row, 'Update Holiday')}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(params.row._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )
      },
    },
  ]

  return (
    <>
      <Box sx={{ height: '80vh' }}>
        <Box
          sx={{
            width: '100%',
            height: '20%',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              width: 'fit-content',
              height: '40px',
              backgroundColor: '#5664D2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 14px',
              borderRadius: '20px',
              color: 'white',
              cursor: 'pointer',
            }}
            onClick={() => editHoliday('', 'Add Holiday')}
          >
            Add Holiday
          </Box>
        </Box>
        <Box
          sx={{
            height: '70%',
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <DataGrid
            rows={holidays}
            columns={columns}
            disableColumnMenu
            getRowId={(row: any) => row._id}
            loading={isLoading}
            rowsPerPageOptions={[]}
            hideFooter
          />
        </Box>
        <SnackBar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isSnackBar ? isSnackBar : !!snackbar}
          handleClose={() => {
            isSnackBar ? setIsSnackBar(false) : showSnackbar(null)
          }}
          text={deletedMessage ? deletedMessage : snackbar?.text}
          type={
            deletedMessage === 'Holiday not found'
              ? 'error'
              : deletedMessage === 'Holiday deleted successfully!'
              ? 'success'
              : snackbar?.type
          }
        />
      </Box>
      <Stack
        spacing={2}
        sx={{
          width: '100%',
          height: '10%',
          diplay: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '20px',
        }}
      >
        <Pagination count={pageNo} page={page} onChange={handleChange} />
      </Stack>
      {confirmDialog && (
        <ConfirmationDialog
          open={!!confirmDialog}
          handleClose={() => setConfirmDialog(null)}
          {...confirmDialog}
        />
      )}

      <Drawer anchor={'right'} open={showEditHoliday}>
        <Box
          sx={{
            backgroundColor: '#808C96',
            height: '100%',
            color: 'white',
            fontSize: '12px',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              height: '100%',
              width: '70vw',
              fontSize: '12px',
              position: 'relative',
            }}
          >
            <div
              style={{
                height: 'fit-content',
                width: '100%',
                backgroundColor: 'white',
                top: '60px',
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: '30px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '20px',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '70%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '22px',
                    color: 'black',
                  }}
                >
                  <ArrowBackIcon
                    style={{ cursor: 'pointer', color: '#808C96' }}
                    onClick={() => backToHoliday()}
                  />
                </div>
                <div
                  style={{
                    width: 'fit-content',
                    height: '70%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#808C96',
                    fontSize: '22px',
                  }}
                >
                  {holidayActionTitle}
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 'fit-content',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0px 40px',
                }}
              >
                <div
                  style={{
                    width: '80%',
                    height: '85px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    color: '#808C96',
                    marginBottom: '8px',
                  }}
                >
                  <Typography
                    sx={{
                      height: '50%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      paddingBottom: '6px',
                    }}
                  >
                    Date
                  </Typography>
                  <input
                    style={{
                      width: '100%',
                      height: '50%',
                      outline: 'none',
                      border: '1px solid #808C96',
                      borderRadius: '6px',
                      padding: '0px 10px',
                    }}
                    placeholder="Date"
                    value={editPayload?.date}
                    type="date"
                    onChange={(e) =>
                      setEditPayload({ ...editPayload, date: e.target.value })
                    }
                  />
                </div>

                <div
                  style={{
                    width: '80%',
                    height: '85px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    color: '#808C96',
                    marginBottom: '8px',
                  }}
                >
                  <Typography
                    sx={{
                      height: '50%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      paddingBottom: '6px',
                    }}
                  >
                    Title
                  </Typography>
                  <input
                    style={{
                      width: '100%',
                      height: '50%',
                      outline: 'none',
                      border: '1px solid #808C96',
                      borderRadius: '6px',
                      padding: '0px 10px',
                    }}
                    placeholder="Title"
                    value={editPayload.title}
                    onChange={(e) =>
                      setEditPayload({ ...editPayload, title: e.target.value })
                    }
                  />
                </div>

                <div
                  style={{
                    width: '80%',
                    height: '85px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    color: '#808C96',
                    marginBottom: '8px',
                  }}
                >
                  <Typography
                    sx={{
                      height: '50%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      paddingBottom: '6px',
                    }}
                  >
                    Description
                  </Typography>
                  <input
                    style={{
                      width: '100%',
                      height: '50%',
                      outline: 'none',
                      border: '1px solid #808C96',
                      borderRadius: '6px',
                      padding: '0px 10px',
                    }}
                    placeholder="Description"
                    value={editPayload.description}
                    onChange={(e) =>
                      setEditPayload({
                        ...editPayload,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  style={{
                    width: '80%',
                    height: '85px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    color: '#808C96',
                    marginBottom: '8px',
                  }}
                >
                  <Typography
                    sx={{
                      height: '50%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      paddingBottom: '6px',
                    }}
                  >
                    Religion
                  </Typography>
                  <input
                    style={{
                      width: '100%',
                      height: '50%',
                      outline: 'none',
                      border: '1px solid #808C96',
                      borderRadius: '6px',
                      padding: '0px 10px',
                    }}
                    placeholder="Religion"
                    value={editPayload.religion}
                    onChange={(e) =>
                      setEditPayload({
                        ...editPayload,
                        religion: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  style={{
                    width: '100%',
                    height: '50px',
                    marginTop: '20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  <LoadingButton
                    variant="contained"
                    className="btn-next"
                    onClick={() => backToHoliday()}
                    sx={{
                      backgroundColor: 'whitesmoke',
                      boxShadow: 'none',
                      width: 'fit-content',
                      height: '40px',
                      display: 'flex',
                      borderRadius: '4px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#808C96',
                      cursor: 'pointer',
                      padding: '10px 20px',
                      marginBottom: '10px',
                      marginRight: '16px',
                      '&:hover': {
                        backgroundColor: 'whitesmoke',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Cancel
                  </LoadingButton>
                  <LoadingButton
                    variant="contained"
                    className="btn-next"
                    onClick={() => {
                      holidayActionTitle === 'Add Holiday'
                        ? addHolidayHandle()
                        : updateHoliday()
                    }}
                    loading={isLoading}
                    sx={{
                      backgroundColor: '#5664D2',
                      boxShadow: 'none',
                      width: 'fit-content',
                      height: '40px',
                      display: 'flex',
                      borderRadius: '4px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      cursor: 'pointer',
                      padding: '10px 20px',
                      marginRight: '16px',
                      '&:hover': {
                        backgroundColor: '#5664D2',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {holidayActionTitle}
                  </LoadingButton>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
