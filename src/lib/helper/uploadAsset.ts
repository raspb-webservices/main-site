export async function createAsset() {
  const response = await fetch('/api/asset/create');
  const requiredFields = ['url', 'date', 'key', 'signature', 'algorithm', 'policy', 'credential', 'securityToken'];

  let assetId: string;
  let uploadData: any;

  if (!response.ok) {
    console.error('Upload Asset API Error:', response.status, response.statusText);
    assetId = 'error';
  } else {
    const json = await response.json();
    console.log('Upload Asset API Response:', json);
    // Überprüfe die Struktur der API-Antwort
    if (!json || !json.createAsset) {
      console.error('Invalid API response structure:', json);
      assetId = 'error';
    } else {
      const createAsset = json.createAsset;
      if (!createAsset.id) {
        console.error('No asset ID in response:', createAsset);
        assetId = 'error';
      } else {
        assetId = createAsset.id;
        if (!createAsset.upload || !createAsset.upload.requestPostData) {
          console.error('No upload data in response:', createAsset);
          assetId = 'error';
        } else {
          uploadData = createAsset.upload.requestPostData;
          for (const field of requiredFields) {
            if (!uploadData[field]) {
              console.error(`Missing required upload field: ${field}`, uploadData);
              assetId = 'error';
            }
          }
        }
      }
    }
  }

  return {
    id: assetId,
    uploadData: uploadData
  };
}

export async function uploadAsset(file: File) {
  try {
    const createdAssetResponse = await createAsset();
    if (createdAssetResponse.id != 'error') {
      const form = new FormData();
      form.append('X-Amz-Date', createdAssetResponse.uploadData.date);
      form.append('key', createdAssetResponse.uploadData.key);
      form.append('X-Amz-Signature', createdAssetResponse.uploadData.signature);
      form.append('X-Amz-Algorithm', createdAssetResponse.uploadData.algorithm);
      form.append('policy', createdAssetResponse.uploadData.policy);
      form.append('X-Amz-Credential', createdAssetResponse.uploadData.credential);
      form.append('X-Amz-Security-Token', createdAssetResponse.uploadData.securityToken);
      form.append('file', file);

      const fileUploadResponse = await fetch(createdAssetResponse.uploadData.url, {
        method: 'POST',
        body: form
      });

      if (fileUploadResponse.ok) {
        console.log('File uploaded successfully:', file.name, 'Asset ID:', createdAssetResponse.id);
        return createdAssetResponse.id;
      } else {
        console.error('File upload failed:', fileUploadResponse.status, fileUploadResponse.statusText);
        return 'error';
      }
    } else {
      return 'error';
    }
  } catch (error) {
    console.error('Upload Asset Error:', error);
    return 'error';
  }
}

export async function uploadImage(fileName, dataUrlString) {
  if (!fileName || !dataUrlString) {
    console.error('Missing fileName or dataUrlString');
    return 'error';
  }

  try {
    const createdAssetResponse = await createAsset();
    const imageData = dataUrlToFile(dataUrlString, fileName);
    const imageId = createdAssetResponse.id;
    const form = new FormData();
    form.append('X-Amz-Date', createdAssetResponse.uploadData.date);
    form.append('key', createdAssetResponse.uploadData.key);
    form.append('X-Amz-Signature', createdAssetResponse.uploadData.signature);
    form.append('X-Amz-Algorithm', createdAssetResponse.uploadData.algorithm);
    form.append('policy', createdAssetResponse.uploadData.policy);
    form.append('X-Amz-Credential', createdAssetResponse.uploadData.credential);
    form.append('X-Amz-Security-Token', createdAssetResponse.uploadData.securityToken);
    form.append('file', imageData);

    const fileUploadResponse = await fetch(createdAssetResponse.uploadData.url, {
      method: 'POST',
      body: form
    });

    if (fileUploadResponse.ok) {
      console.log('Image uploaded successfully:', fileName, 'Asset ID:', imageId);
      return imageId;
    } else {
      console.error('Image upload failed:', fileUploadResponse.status, fileUploadResponse.statusText);
      return 'error';
    }
  } catch (error) {
    console.error('Upload Image Error:', error);
    return 'error';
  }
}

export async function publishAsset(id: string) {
  if (id === 'error ') return id;
  const fetchString = '/api/asset/publish/' + id;
  const publishAssetsResponse = await fetch(fetchString);
  if (publishAssetsResponse.ok) {
    const json = await publishAssetsResponse.json();
    return JSON.stringify(json);
  } else {
    return 'error';
  }
}

export async function getAssetStatus(id: string) {
  if (id === 'error ') return id;
  const fetchString = '/api/asset/publish/' + id;
  const assetStatusResponse = await fetch(fetchString);
  if (assetStatusResponse.ok) {
    const json = await assetStatusResponse.json();
    return JSON.stringify(json);
  } else {
    return 'error';
  }
}

function dataUrlToFile(dataUrl: string, fileName: string) {
  const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
  return new File([buffer], fileName, { type: 'image/png' });
}
