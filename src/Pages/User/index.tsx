import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import DemoUser from '../../assets/Demo_user.png'
import SearchIcon from '@mui/icons-material/Search'
import { DataGrid, GridColumns, GridActionsCellItem } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import {
  deleteAllUser,
  deleteUser,
  fetchAllUsers,
} from '../../store/actions/UserAction'
import {
  useAllUsers,
  useDeletedMessage,
  useGetUsersPages,
  useIsUserLoading,
} from '../../store/reducers/UserReducer'
import { Stack } from '@mui/system'
import { Pagination } from '@mui/material'
import { GetAllUsersPayload } from '../../store/types/auth'
import ConfirmationDialog from '../../components/ConfirmationDialog'
import SnackBar from '../../components/SnackBar'
import useDebounce from '../../hooks/useDebounce'

export default function User() {
  const users = useAllUsers()
  const pageNo = useGetUsersPages()
  const isLoading = useIsUserLoading()
  const deletedMessage = useDeletedMessage()

  console.log("users", users);
  

  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [confirmDialog, setConfirmDialog] = useState<object | null>(null)
  // const [snackbar, setSnackbar] = useState<showSnackBarInterface | null>(deletedMessage);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

  const userPayload = {
    id: page,
    search: searchValue,
  } as GetAllUsersPayload

  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleDeleteClick = (id: any) => {
    setConfirmDialog({
      title: 'Delete User',
      body: 'Are you sure want to delete this user?',
      onConfirm: async () => {
        setConfirmDialog(null)
        await dispatch(deleteUser(id))
        setShowSnackbar(true)
        dispatch(fetchAllUsers(userPayload))
      },
    })
  }

  const deleteAllUsers = () => {
    setConfirmDialog({
      title: 'Delete All User',
      body: 'Are you sure want to delete all users?',
      onConfirm: async () => {
        setConfirmDialog(null)
        await dispatch(deleteAllUser())
        setShowSnackbar(true)
        dispatch(fetchAllUsers(userPayload))
      },
    })
  }

  useEffect(() => {
    dispatch(fetchAllUsers(userPayload))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page])

  useDebounce(() => dispatch(fetchAllUsers(userPayload)), 500, [searchValue])

  const columns: GridColumns = [
    // { field: '_id', headerName: 'Id', width: 80 },
    {
      field: 'image',
      headerName: 'Image',
      width: 80,
      renderCell: (params) => (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <img
            src={params.value ? params.value : DemoUser}
            alt={params.value ? params.value : DemoUser}
            style={{
              width: '40px',
              height: '40px',
              margin: '10px 0px',
              borderRadius: '100%',
            }}
          />
        </Box>
      ),
    },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'number', headerName: 'Phone Number', width: 160 },
    {
      field: 'religion',
      headerName: 'Religion',
      width: 200,
    },
    {
      field: 'verified',
      headerName: 'Verified',
      width: 140,
    },
    {
      field: 'seller',
      headerName: 'Seller',
      width: 100,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      type: 'date',
      width: 200,
    },
    {
      field: '_id',
      type: '_id',
      headerName: 'Delete User',
      width: 100,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            handleDeleteClick(params.value)
          }}
        >
          <DeleteIcon />
        </Box>
      ),
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
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              width: '250px',
              height: '33px',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '20px',
              border: '1px solid #808C96',
            }}
          >
            <Box
              sx={{
                width: '20%',
                height: '80%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SearchIcon />
            </Box>
            <input
              style={{
                width: '80%',
                height: '80%',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                borderLeft: '1px solid #808C96',
                padding: '0PX 10px',
              }}
              placeholder="Search..."
              onChange={(e) => searchHandle(e)}
            />
          </Box>
          <Box
            sx={{
              width: 'fit-content',
              height: '40px',
              backgroundColor: '#D93452',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 14px',
              borderRadius: '20px',
              justifySelf: 'flex-end',
              color: 'white',
              cursor: 'pointer',
            }}
            onClick={deleteAllUsers}
          >
            Delete All Users
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
            getRowHeight={() => 'auto'}
            rows={users}
            columns={columns}
            disableColumnMenu
            getRowId={(row: any) => row.membership + row.email}
            loading={isLoading}
            rowsPerPageOptions={[]}
            hideFooter
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
            margin: '20px 0px',
            paddingBottom: '20px',
          }}
        >
          <Pagination count={pageNo} page={page} onChange={handleChange} />
        </Stack>
        <SnackBar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!showSnackbar}
          handleClose={() => {
            setShowSnackbar(false)
          }}
          text={showSnackbar ? 'Deleted successfully!' : ''}
          type={showSnackbar ? 'success' : ''}
        />
      </Box>
      {confirmDialog && (
        <ConfirmationDialog
          open={!!confirmDialog}
          handleClose={() => setConfirmDialog(null)}
          {...confirmDialog}
        />
      )}
    </>
  )
}
