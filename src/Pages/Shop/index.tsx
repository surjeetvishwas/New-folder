import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import DemoUser from '../../assets/Demo_user.png'
import SearchIcon from '@mui/icons-material/Search'
import { DataGrid, GridColumns, GridActionsCellItem } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import { Stack } from '@mui/system'
import { Pagination } from '@mui/material'
import { GetAllShopsPayload } from '../../store/types/auth'
import {
  useAllShops,
  useGetShopsPages,
  useIShopLoading,
} from '../../store/reducers/ShopReducer'
import {
  deleteAllShop,
  deleteShop,
  fetchAllShops,
} from '../../store/actions/ShopAction'
import ConfirmationDialog from '../../components/ConfirmationDialog'
import useDebounce from '../../hooks/useDebounce'
import SnackBar from '../../components/SnackBar'

export default function Shop() {
  const shops = useAllShops()
  const pageNo = useGetShopsPages()
  const isLoading = useIShopLoading()

  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [confirmDialog, setConfirmDialog] = useState<object | null>(null)
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

  const shopPayload = {
    id: page,
    search: searchValue,
  } as GetAllShopsPayload

  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleDeleteClick = (id: any) => {
    setConfirmDialog({
      title: 'Delete Shop',
      body: 'Are you sure want to delete this shop?',
      onConfirm: async () => {
        setConfirmDialog(null)
        await dispatch(deleteShop(id))
        setShowSnackbar(true)
        dispatch(fetchAllShops(shopPayload))
      },
    })
  }

  const handleDeleteAllShops = () => {
    setConfirmDialog({
      title: 'Delete All Shops',
      body: 'Are you sure want to delete shops?',
      onConfirm: async () => {
        setConfirmDialog(null)
        await dispatch(deleteAllShop())
        setShowSnackbar(true)
        dispatch(fetchAllShops(shopPayload))
      },
    })
  }

  useEffect(() => {
    dispatch(fetchAllShops(shopPayload))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page])

  useDebounce(() => dispatch(fetchAllShops(shopPayload)), 500, [searchValue])

  const columns: GridColumns = [
    {
      field: 'featuredImage',
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
            style={{ width: '40px', height: '40px', margin: "10px 0px", borderRadius: '100%' }}
          />
        </Box>
      ),
    },
    { field: 'title', headerName: 'Title', width: 180 },
    {
      field: 'Category',
      headerName: 'Category',
      width: 200,
      valueGetter: (params) => {
        return params.getValue(params.id, 'category').title
      },
    },
    {
      field: 'numbers',
      headerName: 'Phone Number',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
    },
    {
      field: 'Holidays',
      headerName: 'Holidays',
      width: 220,
      valueGetter: (params) => {
        return params.getValue(params.id, 'category').holiday
      },
    },
    {
      field: 'Availablity',
      headerName: 'Availablity',
      width: 220,
      valueGetter: (params) => {
        return params.getValue(params.id, 'category').availablity
      },
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
      headerName: 'Delete Shop',
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
              placeholder="Search by name..."
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
            onClick={handleDeleteAllShops}
          >
            Delete All Shops
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
            rows={shops}
            columns={columns}
            disableColumnMenu
            getRowId={(row: any) => row._id}
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
