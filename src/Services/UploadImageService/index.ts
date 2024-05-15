export const uploadFile = async ({
  file,
  onUploadProgress,
  abortSignal,
  onUploadComplete,
}: any) => {
  let formData = new FormData()
  formData.append('file', file)
  formData.append('cloud_name', 'Getweys')
  formData.append('upload_preset', 'avatar')

  var requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow',
  } as any

  fetch(
    'https://api.cloudinary.com/v1_1/getweys/image/upload',
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => onUploadComplete(result.url))
    .catch((error) => console.log('error', error))
}
