import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  DataGrid,
  GridColumns,
} from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { addMembership, changeMembership, deleteMembership, fetchAllMemberships } from '../../store/actions/MembershipAction';
import { useAllMemberships, useIsMembershipLoading, useDeletedMembershipMessage } from '../../store/reducers/MembershipReducer';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { Drawer, IconButton, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import SnackBar from '../../components/SnackBar';
import {  editMembsershipPayloadInterface, showSnackBarInterface } from '../../types';
import { validation } from '../../Services/GeneralValidation';

export default function Membership() {
  const memberships = useAllMemberships()
  const isLoading = useIsMembershipLoading()
  const deletedMessage = useDeletedMembershipMessage()

  const [snackbar, showSnackbar] = useState<showSnackBarInterface | null>(null);
  const [isSnackBar, setIsSnackBar] = useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = useState<object | null>(null)
  const [membsrshipActionTitle, setMembsrshipActionTitle] = useState<string>("")
  const [showEditMembership, setShowEditMembership] = useState<boolean>(false)
  const [rowId, setRowId] = useState<number | null>(null)
  const [editPayload, setEditPayload] = useState({
    title: "",
    price: 0,
    noOfDays: 0,
    membershipType: ""
  } as editMembsershipPayloadInterface)


  const formValues = [
    "title",
    "price",
    "noOfDays",
    "membershipType"
  ]

  const dispatch = useDispatch()

  const editMembership = (data: any, programTitle: string) => {
    setMembsrshipActionTitle(programTitle)
    setShowEditMembership(true)
    setRowId(data._id)
    setEditPayload({ ...editPayload, title: data.title, price: data.price, noOfDays: data.noOfDays, membershipType: data.membershipType })
  }

  const addMembershipHandle = () => {
    if (validation(editPayload, formValues)) {
      dispatch(
        addMembership(editPayload)
      ).then(unwrapResult)
        .then((originalPromiseResult: { success: boolean; }) => {
          if (originalPromiseResult.success === true) {
            showSnackbar({
              text: "Membership Successfully Added",
              type: "success",
            });
            setTimeout(() => window.location.reload(), 700)
          }
        })
        .catch((rejectedValue: any) => {
          showSnackbar({
            text: rejectedValue,
            type: "error",
          });
        });
    }

  }

  const backToMembership = () => {
    setEditPayload({ ...editPayload, title: "", price: "", noOfDays: "", membershipType: "" })
    setRowId(null)
    setShowEditMembership(false)
    setMembsrshipActionTitle("")
  }

  const updateMembsrhip = () => {
    if (validation(editPayload, formValues)) { 
      dispatch(
        changeMembership({
          id: rowId,
          values: editPayload,
        })
      ).then(unwrapResult)
        .then((originalPromiseResult: { success: boolean; }) => {
          if (originalPromiseResult.success === true) {
            showSnackbar({
              text: "Membership Successfully Updated",
              type: "success",
            });
            setTimeout(() => window.location.reload(), 700)
          }
        })
        .catch((rejectedValue: any) => {
          showSnackbar({
            text: rejectedValue,
            type: "error",
          });
        });
    }
  }

  const handleDeleteClick = (id: any) => {
    setConfirmDialog({
      title: 'Delete Membership',
      body: 'Are you sure want to delete this membership?',
      onConfirm: async () => {
        setConfirmDialog(null)
        await dispatch(deleteMembership(id))
        setIsSnackBar(true)
        setTimeout(() => window.location.reload(), 800)
      },
    })
  }

  useEffect(() => {
    dispatch(fetchAllMemberships())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])


  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Created By',
      width: 200,
      valueGetter: (params) => {
        return params.getValue(params.id, "createdBy").name;
      }
    },
    { field: 'title', headerName: 'Title', width: 220 },
    { field: 'price', headerName: 'Price', width: 160 },
    { field: 'membershipType', headerName: 'Membership Type', width: 200 },
    { field: 'noOfDays', headerName: 'No Of Days', width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              backgroundColor: "whitesmoke",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <IconButton onClick={() => editMembership(params.row, "Update Membership")}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(params.row._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      }
    }
  ];

  return (
    <>
      <Box sx={{ height: "80vh" }}>
        <Box sx={{
          width: "100%",
          height: "20%",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap"
        }}>
          <Box sx={{
            width: "fit-content",
            height: "40px",
            backgroundColor: "#5664D2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 14px",
            borderRadius: "20px",
            color: "white",
            cursor: "pointer"
          }}
            onClick={() => editMembership("", "Add Membership")}
          >
            Add Membership
          </Box>
        </Box>
        <Box
          sx={{
            height: "70%",
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
            rows={memberships}
            columns={columns}
            disableColumnMenu
            getRowId={(row: any) => row._id}
            loading={isLoading}
            rowsPerPageOptions={[]}
            hideFooter
          />
        </Box>
        <SnackBar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isSnackBar ? isSnackBar : !!snackbar}
          handleClose={() => {
            isSnackBar ? setIsSnackBar(false) : showSnackbar(null);
          }}
          text={deletedMessage ? deletedMessage : snackbar?.text}
          type={deletedMessage === "Membership not found" ? "error" : deletedMessage === "Membership deleted successfully!" ? "success" : snackbar?.type}
        />
      </Box>
      {confirmDialog && (
        <ConfirmationDialog
          open={!!confirmDialog}
          handleClose={() => setConfirmDialog(null)}
          {...confirmDialog}
        />
      )}
      <Drawer
        anchor={"right"}
        open={showEditMembership}
      >
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
              width: "70vw",
              fontSize: '12px',
              position: "relative",
            }}>
            <div style={{
              height: "fit-content",
              width: "100%",
              backgroundColor: "white",
              top: "60px",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              paddingBottom: "30px"
            }}>
              <div style={{
                width: "100%",
                height: "100px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "20px",
              }}>
                <div style={{
                  width: "50px",
                  height: "70%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "22px",
                  color: "black"
                }}>
                  <ArrowBackIcon style={{ cursor: "pointer", color: "#808C96" }} onClick={() => backToMembership()} />
                </div>
                <div style={{
                  width: "fit-content",
                  height: "70%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#808C96",
                  fontSize: "22px"
                }}>
                  {membsrshipActionTitle}
                </div>
              </div>
              <div style={{
                width: "100%",
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                padding: "0px 40px"
              }}>

                <div style={{
                  width: "80%",
                  height: "85px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  color: "#808C96",
                  marginBottom: "8px"
                }}>
                  <Typography sx={{ height: "50%", display: "flex", alignItems: "flex-end", paddingBottom: "6px" }}>Title</Typography>
                  <input style={{
                    width: "100%",
                    height: "50%",
                    outline: "none",
                    border: "1px solid #808C96",
                    borderRadius: "6px",
                    padding: "0px 10px"
                  }}
                    placeholder="Title"
                    value={editPayload.title}
                    onChange={(e) => setEditPayload({ ...editPayload, title: e.target.value })}
                  />
                </div>

                <div style={{
                  width: "80%",
                  height: "85px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  color: "#808C96",
                  marginBottom: "8px"
                }}>
                  <Typography sx={{ height: "50%", display: "flex", alignItems: "flex-end", paddingBottom: "6px" }}>Membership Type</Typography>
                  <input style={{
                    width: "100%",
                    height: "50%",
                    outline: "none",
                    border: "1px solid #808C96",
                    borderRadius: "6px",
                    padding: "0px 10px"
                  }}
                    placeholder="Mebership Type"
                    value={editPayload.membershipType}
                    onChange={(e) => setEditPayload({ ...editPayload, membershipType: e.target.value })}
                  />
                </div>

                <div style={{
                  width: "80%",
                  height: "85px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  color: "#808C96",
                  marginBottom: "8px"
                }}>
                  <Typography sx={{ height: "50%", display: "flex", alignItems: "flex-end", paddingBottom: "6px" }}>No Of Days</Typography>
                  <input style={{
                    width: "100%",
                    height: "50%",
                    outline: "none",
                    border: "1px solid #808C96",
                    borderRadius: "6px",
                    padding: "0px 10px"
                  }}
                    placeholder="No of days"
                    value={editPayload.noOfDays}
                    onChange={(e) => setEditPayload({ ...editPayload, noOfDays: e.target.value })}
                  />
                </div>

                <div style={{
                  width: "80%",
                  height: "85px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  color: "#808C96",
                  marginBottom: "8px"
                }}>
                  <Typography sx={{ height: "50%", display: "flex", alignItems: "flex-end", paddingBottom: "6px" }}>Price</Typography>
                  <input style={{
                    width: "100%",
                    height: "50%",
                    outline: "none",
                    border: "1px solid #808C96",
                    borderRadius: "6px",
                    padding: "0px 10px"
                  }}
                    placeholder="Price"
                    value={editPayload.price}
                    onChange={(e) => setEditPayload({ ...editPayload, price: e.target.value })}
                  />
                </div>

                <div style={{
                  width: "100%",
                  height: "50px",
                  marginTop: "20px",
                  display: "flex",
                  flexWrap: "wrap"
                }}>
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
                      marginBottom: "10px",
                      marginRight: "16px",
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
                    onClick={() => { membsrshipActionTitle === "Add Membership" ? addMembershipHandle() : updateMembsrhip() }}
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
                      marginRight: "16px",
                      '&:hover': {
                        backgroundColor: '#5664D2',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {membsrshipActionTitle}
                  </LoadingButton>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}