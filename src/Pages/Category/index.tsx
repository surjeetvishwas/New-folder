import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import DemoUser from '../../assets/Demo_user.png'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import ConfirmationDialog from '../../components/ConfirmationDialog'
import { Drawer, IconButton, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { unwrapResult } from '@reduxjs/toolkit'
import SnackBar from '../../components/SnackBar'
import {
  editCategoryPayloadInterface,
  showSnackBarInterface,
} from '../../types'
import {
  addCategory,
  changeCategory,
  deleteCategory,
  fetchAllCatergory,
} from '../../store/actions/CategoryAction'
import {
  useAllCategories,
  useDeletedCategoryMessage,
  useIsCategoryLoading,
} from '../../store/reducers/CategoryReducer'
import ImageUploadButton from '../../components/Buttons/ImageUploadButton'
import { validation } from '../../Services/GeneralValidation'

export default function Category() {
  const categories = useAllCategories()
  const isLoading = useIsCategoryLoading()
  const deletedMessage = useDeletedCategoryMessage()

  const [snackbar, showSnackbar] = useState<showSnackBarInterface | null>(null)
  const [isSnackBar, setIsSnackBar] = useState<boolean>(false)
  const [confirmDialog, setConfirmDialog] = useState<object | null>(null)
  const [categoryActionTitle, setCategoryActionTitle] = useState<string>('')
  const [showEditCategory, setShowEditCategory] = useState<boolean>(false)
  const [rowId, setRowId] = useState<number | null>(null)
  const [editPayload, setEditPayload] = useState({
    image: '',
    title: '',
    order: 0,
  } as editCategoryPayloadInterface)

  const formValues = ['image', 'title', 'order']

  const dispatch = useDispatch()

  console.log("editPayload", editPayload);
  

  const editCategory = (data: any, programTitle: string) => {
    setCategoryActionTitle(programTitle)
    setShowEditCategory(true)
    setRowId(data._id)
    setEditPayload({
      ...editPayload,
      title: data.title,
      order: data.order,
      image: data.image,
    })
  }

  const addCategoryHandle = () => {
    if (validation(editPayload, formValues)) {
      dispatch(addCategory(editPayload))
        .then(unwrapResult)
        .then((originalPromiseResult: { success: boolean }) => {
          if (originalPromiseResult.success === true) {
            showSnackbar({
              text: 'Category Successfully Added',
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

  const backToMembership = () => {
    setEditPayload({ ...editPayload, title: '', order: '', image: '' })
    setRowId(null)
    setShowEditCategory(false)
    setCategoryActionTitle('')
  }

  const updateCategory = () => {
    console.log("editPayload", editPayload)
    if (validation(editPayload, formValues)) {
      dispatch(
        changeCategory({
          id: rowId,
          values: editPayload,
        }),
      )
        .then(unwrapResult)
        .then((originalPromiseResult: { success: boolean }) => {
          if (originalPromiseResult.success === true) {
            showSnackbar({
              text: 'Category Successfully Updated',
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
      title: 'Delete Category',
      body: 'Are you sure want to delete this Category?',
      onConfirm: async () => {
        setConfirmDialog(null)
        await dispatch(deleteCategory(id))
        setIsSnackBar(true)
        setTimeout(() => window.location.reload(), 800)
      },
    })
  }

  const onUploadImage = (url: any, callback: any) => {
    setEditPayload({ ...editPayload, image: url })
    callback && callback()
  }

  useEffect(() => {
    dispatch(fetchAllCatergory())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const columns: GridColumns = [
    // {
    //   field: 'name',
    //   headerName: 'Created By',
    //   width: 200,
    //   valueGetter: (params) => {
    //     return params.getValue(params.id, "createdBy").name;
    //   }
    // },
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
            style={{ width: '60%', height: '70%', borderRadius: '100%' }}
          />
        </Box>
      ),
    },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'order', headerName: 'Orders', width: 100 },
    {
      field: 'attributeName',
      headerName: 'Memberships',
      width: 120,
      valueGetter: (params) => {
        return params.getValue(params.id, 'members').length
      },
    },
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
              onClick={() => editCategory(params.row, 'Update Category')}
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
            onClick={() => editCategory('', 'Add Category')}
          >
            Add Category
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
            rows={categories}
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
            deletedMessage === 'Category not found'
              ? 'error'
              : deletedMessage === 'Category deleted successfully!'
              ? 'success'
              : snackbar?.type
          }
        />
      </Box>
      {confirmDialog && (
        <ConfirmationDialog
          open={!!confirmDialog}
          handleClose={() => setConfirmDialog(null)}
          {...confirmDialog}
        />
      )}
      <Drawer anchor={'right'} open={showEditCategory}>
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
                    onClick={() => backToMembership()}
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
                  {categoryActionTitle}
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
                    height: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    color: '#808C96',
                    marginBottom: '8px',
                  }}
                >
                  <Typography
                    sx={{
                      height: '40%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      paddingBottom: '6px',
                    }}
                  >
                    Image
                  </Typography>
                  {/* <input style={{
                    width: "100%",
                    height: "50%",
                    outline: "none",
                    border: "1px solid #808C96",
                    borderRadius: "6px",
                    padding: "0px 10px"
                  }}
                    placeholder="Image"
                    type="file"
                    // value={editPayload.image}
                    // onChange={(e) => setEditPayload({ ...editPayload, title: e.target.value })}
                  /> */}

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      height: '60%',
                    }}
                  >
                    {/* <div style={{ width: "150px" }}>
                      <Button variant="contained" component="label" sx={{ width: "100px" }}>
                        Upload
                        <input hidden accept="image/*" multiple type="file" />
                      </Button>
                      <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                      </IconButton>
                    </div>
                    <div style={{
                      width: "60px",
                      height: "60%",
                      // backgroundColor: "red", 
                      borderRadius: "10px",
                      backgroundImage: `url(${editPayload.image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center"
                    }}></div> */}
                    <ImageUploadButton
                      url={editPayload?.image}
                      onUpload={onUploadImage}
                    />
                  </div>
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
                    Order
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
                    placeholder="Order"
                    value={editPayload.order}
                    onChange={(e) =>
                      setEditPayload({ ...editPayload, order: e.target.value })
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
                    onClick={() => backToMembership()}
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
                      categoryActionTitle === 'Add Category'
                        ? addCategoryHandle()
                        : updateCategory()
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
                    {categoryActionTitle}
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
