//@ts-nocheck
import Avatar from '@mui/material/Avatar'
import React, { useEffect, useRef, useState } from 'react'
import Stack from '@mui/material/Stack'
import { CircularProgress } from '@mui/material'
import { uploadFile } from '../../Services/UploadImageService'
import { LoadingButton } from '@mui/lab'

const ImageUploadButton = ({ url, onUpload }: any) => {
  const inputRef = useRef<HTMLSelectElement | HTMLInputElement>(null)
  const [currentFile, setCurrentFile] = useState(null)
  const [uploadUrl, setUploadUrl] = useState()
  const [uploading, setUploading] = useState(false)

  const selectFile = (e: any) => {
    setCurrentFile(e.target.files[0])
  }

  const handleUpload = () => {
    inputRef.current?.click()
  }
  useEffect(() => {
    if (currentFile) {
      setUploading(true)
      uploadFile({
        file: currentFile,
        onUploadComplete: (url: any) => {
          setCurrentFile(null)
          setUploadUrl(url)
          setUploading(false)
          onUpload && onUpload(url)
          localStorage.setItem('IMAGE_URL', url)
        },
      })
    }
  }, [currentFile])

  return (
    <div
      style={{
        height: '70px',
        width: '70px',
        borderRadius: '10px',
        margin: '0px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <input
        type="file"
        id="file-input"
        onChange={selectFile}
        style={{ display: 'none' }}
        hidden
        ref={inputRef}
      />

      {uploading ? (
        <Stack
          sx={{
            width: '100px',
            height: '100px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress sx={{ color: '#808C96' }} />
        </Stack>
      ) : (
        <Avatar
          alt="Profile photo"
          src={uploadUrl || url}
          className="avatar"
          style={{ width: '100%', height: '100%', borderRadius: '10px' }}
        />
      )}
      <LoadingButton
        variant="contained"
        className="btn-next"
        onClick={handleUpload}
        sx={{
          backgroundColor: '#808C96',
          boxShadow: 'none',
          width: 'fit-content',
          height: '40px',
          display: 'flex',
          borderRadius: '4px',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'whitesmoke',
          cursor: 'pointer',
          padding: '10px 50px',
          marginRight: '16px',
          marginLeft: '20px',
          '&:hover': {
            backgroundColor: '#808C96',
            boxShadow: 'none',
          },
        }}
      >
        Upload
      </LoadingButton>
    </div>
  )
}

export default ImageUploadButton
